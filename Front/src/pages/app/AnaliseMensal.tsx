import { findUser } from "@/api/findUser"
import { CriarSelo } from "@/components/CriarSelo"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Spinner } from "@/components/ui/spinner"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { analiseDTO } from "@/dtos/analiseDTO"
import type { userDTO, usersDTO } from "@/dtos/userDto"
import { api } from "@/lib/axios"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { PiMedalFill } from "react-icons/pi"

export function AnaliseMensal() {
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<string | null>(null)
  const [criarSelo, setCriarSelo] = useState<usersDTO[] | null>(null)

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

  const { data: analise, isPending } = useQuery<analiseDTO[]>({
      queryKey: [
        "analises",
        userIdConsulta
      ],
      queryFn: async () => {
        const { data } = await api.post("/analise/find", {
          userId: userIdConsulta,
        })
        return data
      },
      enabled:
        !!userIdConsulta
    })

  // async function handleBaixarPdf(mes: number, ano: number) {
  //   if (!userIdConsulta) return
    
  //   try {
  //     const response = await api.post(
  //       "/analise/pdf",
  //       {
  //         userId: userIdConsulta,
  //         mes,
  //         ano,
  //       },
  //       {
  //         responseType: "blob", // 🔥 IMPORTANTE
  //       }
  //     )

  //     // Criar arquivo PDF no navegador
  //     const blob = new Blob([response.data], {
  //       type: "application/pdf",
  //     })

  //     // Criar link temporário
  //     const url = URL.createObjectURL(blob)

  //     const link = document.createElement("a")
  //     link.href = url
  //     link.download = `selo-${mes}-${ano}.pdf`
  //     link.click()

  //     // Limpa memória
  //     window.URL.revokeObjectURL(url)
  //   } catch (err) {
  //     alert("Erro ao gerar PDF")
  //   }
  // }

  return (
    <div className="m-10 h-[80%]">
      <Helmet title="SELOS"/>
      {isInformatica && (
        <div className="flex justify-around items-center">
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

          <Button
            size="sm"
            variant="outline"
            className="bg-slate-700 text-white px-3 py-1 hover:bg-slate-500 hover:text-white cursor-pointer rounded-b-sm"
            onClick={() => setCriarSelo(usuarios)}
          >
            CRIAR SELO
          </Button>
        </div>
      )}

      <h1>Consultar Selos</h1>
      <ScrollArea className="h-[60%] border rounded overflow-x-auto">
        <div className="w-full overflow-x-auto">
          <Table className="min-w-[1000px] text-xs sm:text-sm">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center text-xs sm:text-sm">Mês</TableHead>
                <TableHead className="text-center text-xs sm:text-sm">Ano</TableHead>
                <TableHead className="text-center text-xs sm:text-sm">Presença E.</TableHead>
                <TableHead className="text-center text-xs sm:text-sm">Faltas E.</TableHead>
                <TableHead className="text-center text-xs sm:text-sm">Atrasos E.</TableHead>
                <TableHead className="text-center text-xs sm:text-sm">% participação E.</TableHead>
                <TableHead className="text-center text-xs sm:text-sm">Presença I.</TableHead>
                <TableHead className="text-center text-xs sm:text-sm">Faltas I.</TableHead>
                <TableHead className="text-center text-xs sm:text-sm">% participação I.</TableHead>
                <TableHead className="text-center text-xs sm:text-sm">Selos</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isPending && <Spinner />}
              {analise?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    Nenhuma presença encontrada
                  </TableCell>
                </TableRow>
              )}

              {analise?.map((dados) => (
                <TableRow
                  key={dados.id}
                  className="text-center"
                >
                  <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{dados.mes}</TableCell>
                  <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{dados.ano}</TableCell>
                  <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{dados.diasCumpridosEmpresa}</TableCell>
                  <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{dados.diasEsperadosEmpresa - dados.diasCumpridosEmpresa}</TableCell>
                  <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{dados.atrasos}</TableCell>
                  <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{dados.percentualEmpresa}</TableCell>
                  <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{dados.diasCumpridosInstituicao}</TableCell>
                  <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{dados.diasEsperadosInstituicao- dados.diasCumpridosInstituicao}</TableCell>
                  <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{dados.percentualIntituicao}</TableCell>
                  <TableCell className={ `flex justify-center gap-4 text-xs sm:text-sm px-2 sm:px-4
                    ${dados.selo === "VERDE" ? ' text-green-800' 
                    : dados.selo === "VERMELHO" ? 'text-red-800' 
                    : dados.selo === "DOURADO" ? 'text-gold' : ''}`
                  }>
                    <PiMedalFill  className={`w-[1rem] h-[1rem] m-0 
                    ${dados.selo === "VERDE" ? ' text-green-800' 
                    : dados.selo === "VERMELHO" ? 'text-red-800' 
                    : dados.selo === "DOURADO" ? 'text-gold' : ''}`} />
                    {
                      dados.selo
                    }
                  </TableCell>
                  {/* <TableCell>
                    <button
                      className="bg-slate-700 text-white px-3 py-1 rounded hover:bg-slate-500"
                      onClick={() => handleBaixarPdf(dados.mes, dados.ano)}
                    >
                      Baixar PDF
                    </button>
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>

      {criarSelo && (
        <CriarSelo
          user={criarSelo}
          onClose={() => setCriarSelo(null)}
        />
      )}
    </div>
  )
}