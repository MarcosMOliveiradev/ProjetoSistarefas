import { findUser } from "@/api/findUser"
import { AtualizarStatusPresencaDialog } from "@/components/AtualizarStatusPresencaDialog"
import { DataPicker, type dataPickerSchema } from "@/components/Calendar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Spinner } from "@/components/ui/spinner"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { presecaDTOS } from "@/dtos/presencaDTOS"
import type { userDTO } from "@/dtos/userDto"
import { api } from "@/lib/axios"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import { Helmet } from "react-helmet-async"
import type z from "zod"

export function ConsultarPresenca() {
  const [getPresencas, setPresencas] = useState<presecaDTOS[]>([])
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<string | null>(null)
  const [presencaSelecionada, setPresencaSelecionada] =
    useState<presecaDTOS | null>(null)
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc" | null>(null);

  const [periodo, setPeriodo] = useState<z.infer<typeof dataPickerSchema>>({
    dateRage: {
      from: new Date(),
      to: new Date(),
    }
  })

  // Buscar dados do usuário logado
  const queryClient = useQueryClient()
  const user = queryClient.getQueryData<userDTO>(['profile'])

  // Buscar todos os usuários para o select
  const {data: usuarios} = useQuery({
    queryKey: ['usuarios'],
    queryFn: findUser,
  })
   
  // Definir o userId a ser consultado
  const isInformatica = user?.user_roles.role === "INFORMATICA"
  const userIdConsulta = isInformatica
  ? usuarioSelecionado
  : user?.user.id

  // Buscar presenças conforme o período e usuário selecionado
  const { data: presencas, isFetching } = useQuery<presecaDTOS[]>({
    queryKey: [
      "presencas",
      userIdConsulta,
      periodo.dateRage.from?.toISOString(),
      periodo.dateRage.to?.toISOString(),
    ],
    queryFn: async () => {
      const { data } = await api.post("/grupos/findbyperiod", {
        userId: userIdConsulta,
        inicio: periodo.dateRage.from,
        fim: periodo.dateRage.to,
      })
      setPresencas(data)
    },
    enabled:
      !!userIdConsulta &&
      !!periodo.dateRage.from &&
      !!periodo.dateRage.to,
  })

  function handleSort(col: string) {
    if (sortCol !== col) {
      // primeira vez clicando → ASC
      setSortCol(col);
      setSortDir("asc");
      return;
    }

    if (sortDir === "asc") {
      // segunda vez → DESC
      setSortDir("desc");
      return;
    }

    if (sortDir === "desc") {
      // terceira vez → remove ordenação
      setSortCol(null);
      setSortDir(null);
      return;
    }
  }

  const dadosOrdenados = useMemo(() => {
    if (!sortCol || !sortDir) return [...getPresencas]

    return [...getPresencas].sort((a, b) => {
      let result = 0

      if (sortCol === "data") {
        result = new Date(a.data).getTime() - new Date(b.data).getTime()
      }

      if (sortCol === "tipo") {
        result = (a.tipoEsperado ?? "").localeCompare(b.tipoEsperado ?? "")
      }

      if (sortCol === "status") {
        result = a.status.localeCompare(b.status)
      }

      return sortDir === "asc" ? result : -result
    })
  }, [getPresencas, sortCol, sortDir])

  return (
    <div className="m-10 h-[80%]">
      <Helmet title="CONSULTAR PRESENÇA"/>
      <DataPicker onDadosTarefas={setPeriodo} />
      {isInformatica && (
        <div className="w-[20rem] mb-4">
          <label className="text-sm font-medium">Selecionar usuário</label>

          <select
            className="w-full border p-2 rounded"
            value={usuarioSelecionado ?? ""}
            onChange={(e) => setUsuarioSelecionado(e.target.value)}
          >
            <option value="">Selecione um usuário</option>
            {usuarios?.map((u: any) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>
      )}
      <h1>Consultar Presença</h1>

      <ScrollArea className="h-[60%] border rounded">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Usuário</TableHead>
              <TableHead className="text-center">Matrícula</TableHead>
              <TableHead 
                className="text-center cursor-pointer"
                onClick={() => handleSort("data")}
              >
                Data {sortCol === "data" && (sortDir === "asc" ? "▲" : "▼")}
              </TableHead>
              <TableHead 
                className="text-center cursor-pointer"
                onClick={() => handleSort("tipo")}
              >
                Tipo
              </TableHead>
              <TableHead 
                className="text-center cursor-pointer"
                onClick={() => handleSort("status")}
                >
                Status
              </TableHead>
              <TableHead className="text-center">Hora Entrada</TableHead>
              <TableHead className="text-center">Origem</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isFetching && <Spinner />}
            {presencas?.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  Nenhuma presença encontrada
                </TableCell>
              </TableRow>
            )}

            {dadosOrdenados.map((dados) => (
              <TableRow
                key={dados.id}
                className="text-center"
              >
                <TableCell>{dados.usuario}</TableCell>
                <TableCell>{dados.matricula}</TableCell>
                <TableCell>{dados.data}</TableCell>
                <TableCell>{dados.tipoEsperado}</TableCell>
                <TableCell
                  className={dados.status == "PRESENTE" ? "text-green-600" 
                    : dados.status == "PENDENTE" ? "text-yellow-600"
                    : dados.status == "FALTA" ? "text-red-600" : ""
                  }
                >{dados.status}</TableCell>
                <TableCell>
                  {dados.horaEntrada ?? "—"}
                </TableCell>
                <TableCell>{dados.origem}</TableCell>
                {isInformatica && (
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setPresencaSelecionada(dados)}
                    >
                      Alterar status
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>

      {/* DIALOG */}
      {presencaSelecionada && (
        <AtualizarStatusPresencaDialog
          presenca={presencaSelecionada}
          onClose={() => setPresencaSelecionada(null)}
        />
      )}
    </div>
  )
}