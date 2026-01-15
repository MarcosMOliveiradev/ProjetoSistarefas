import { findUser } from "@/api/findUser"
import { DataPicker, type dataPickerSchema } from "@/components/Calendar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Spinner } from "@/components/ui/spinner"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { presecaDTOS } from "@/dtos/presencaDTOS"
import type { userDTO } from "@/dtos/userDto"
import { api } from "@/lib/axios"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import type z from "zod"

export function ConsultarPresenca() {
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<string | null>(null)
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
      return data
    },
    enabled:
      !!userIdConsulta &&
      !!periodo.dateRage.from &&
      !!periodo.dateRage.to,
  })

  return (
    <div className="m-10 h-[80%]">
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
              <TableHead className="text-center">Data</TableHead>
              <TableHead className="text-center">Tipo</TableHead>
              <TableHead className="text-center">Status</TableHead>
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

            {presencas?.map((dados) => (
              <TableRow
                key={dados.id}
                className="text-center"
              >
                <TableCell>{dados.usuario}</TableCell>
                <TableCell>{dados.matricula}</TableCell>
                <TableCell>{dados.data}</TableCell>
                <TableCell>{dados.tipoEsperado}</TableCell>
                <TableCell>{dados.status}</TableCell>
                <TableCell>
                  {dados.horaEntrada ?? "—"}
                </TableCell>
                <TableCell>{dados.origem}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  )
}