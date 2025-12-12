import { averageTime } from "@/api/averageTime"
import { contagem } from "@/api/contagelTotal"
import { contagemCodigo } from "@/api/contagemCodigo"
import { contagemSetor } from "@/api/contaSetor"
import { findUser } from "@/api/findUser"
import { topAtividade } from "@/api/topFiveAtividades"
import { totalMeses } from "@/api/totalMesAMes"
import { totalTarefas } from "@/api/totalTarefas"
import { ChartBar } from "@/components/ChartBat"
import { ChartLin } from "@/components/ChartLin"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import type { atividadesDTO } from "@/dtos/atividadesDTOS"
import type { userDTO } from "@/dtos/userDto"
import { useAuth } from "@/hooks/useAuth"
import { api } from "@/lib/axios"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Clock, FileCheck } from "lucide-react"
import { useEffect, useState } from "react"

export function Dashboard() {
  const [dados, setDados] = useState<atividadesDTO[]>([])
  const [codSelecionado, setCodSelecionado] = useState(101)
  const [setorSelecionado, setSetorSelecionado] = useState("SECRETARIA")

  async function listAtividades() {
    const response = await api.get("/atividade/list")

    setDados(response.data)
  }
  useEffect(() => {
    listAtividades()
  }, []);
  
  const codigosUnicos = [...new Set(dados.map(item => item.cod_atividade))].sort((a, b) => a - b)
  const setoresUnicos = [...new Set(dados.map(item => item.setor))].sort((a, b) => a.localeCompare(b))

  const { signOut } = useAuth()
  const queryClient = useQueryClient()
  const user = queryClient.getQueryData<userDTO>(['profile'])

  if(!user) {
    return signOut()
  }
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(user.user.id)

  useEffect(() => {
    setUsuarioSelecionado(user.user.id)
  }, [user.user.id])

  const { data: listUsuarios } = useQuery({
    queryKey: ['findUser'],
    queryFn: () => findUser(),
    enabled: user.user_roles.role === 'INFORMATICA'
  })

const { data: listCountCode, isLoading: isCodeLoading } = useQuery({
  queryKey: ["countCode", codSelecionado, usuarioSelecionado],
  queryFn: () => contagemCodigo(usuarioSelecionado, codSelecionado),
})

const { data: listCountDepartment, isLoading: isDepartmentLoading } = useQuery({
  queryKey: ["countDepartment", setorSelecionado, usuarioSelecionado],
  queryFn: () => contagemSetor(usuarioSelecionado, setorSelecionado),
})

const { data: countTotal, isLoading: countTotalIsLoading } = useQuery({
  queryKey: ["countAll", usuarioSelecionado],
  queryFn: () => contagem(usuarioSelecionado),
})
const { data: average, isLoading: averageIsLoading } = useQuery({
  queryKey: ["averageTime", usuarioSelecionado],
  queryFn: () => averageTime(usuarioSelecionado),
})

const { data: topFiveActivet, isLoading: topActivetIsLoading } = useQuery({
  queryKey: ["topActive", usuarioSelecionado],
  queryFn: () => topAtividade(usuarioSelecionado),
})

const { data: totalMesAMes, isLoading: totalMesesIsLoading } = useQuery({
  queryKey: ["totalMeses", usuarioSelecionado],
  queryFn: () => totalMeses(usuarioSelecionado),
})

const { data: total, isLoading: totalIsLoadin } = useQuery({
  queryKey: ["totalTarefas"],
  queryFn: () => totalTarefas(),
})

const dadosMeses = totalMesAMes
  ? totalMesAMes.map(item => ({
      ...item,
      total: Number(item.total)
    }))
  : []

  if(!countTotal || !total) {
    return <Spinner />
  }

  const totalUsuario = countTotal.total
  const totalGeral = total.total
  
  const porcentagem = Math.round((totalUsuario / totalGeral) * 100)

  function getPrimeiroESegundoNome(nome: string) {
    if (!nome) return ""
    const partes = nome.trim().split(" ").filter(Boolean)
    return partes.slice(0, 2).join(" ")
  }

  return (
    <div className={`pl-[1.5rem] ${user.user_roles.role === "INFORMATICA" ? "ml-[13rem]" : ""} flex flex-col`}>
      {user.user_roles.role === "INFORMATICA" && (
        <div className="w-[13rem] rounded-r-2xl h-full fixed left-0 bg-slate-900 text-white p-4 flex flex-col gap-2">
          <ScrollArea className="h-[90vh]">
            <h2 className="text-xl font-semibold mb-4">Usuários</h2>

            {listUsuarios.map(u => (
              <button
                key={u.id}
                onClick={() => setUsuarioSelecionado(u.id)}
                className={` cursor-pointer p-2 rounded text-left hover:bg-slate-700 
                  ${usuarioSelecionado === u.id ? "bg-slate-700" : ""}`}
              >
                {getPrimeiroESegundoNome(u.name)}
              </button>
            ))}
          </ScrollArea>
        </div>
      )}

      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-2 items-center gap-4">
        <div className="grid grid-cols-2 justify-center items-center gap-4">

          <div className="w-full h-[10rem] bg-emerald-900 rounded-2xl text-muted flex flex-col justify-center items-center text-[1rem] shadow-xl/50">
            <span className="font-bold text-[1rem]">Total geral de atividades</span>
            <span className="text-6xl font-bold flex justify-center items-center gap-2">{totalIsLoadin ? <Spinner /> : total.total} <FileCheck height={50}  width={50}/> </span>
          </div>
          <div className="w-full h-[10rem] bg-emerald-900 rounded-2xl text-muted flex flex-col justify-center items-center text-[1rem] shadow-xl/50">
            <span className="font-semibold text-2xl">Você tem</span>
            <span className="text-6xl font-bold">{totalIsLoadin ? <Spinner /> : porcentagem}%</span>
            <span className="font-semibold text-[1rem]">das atividades do programa</span>
          </div>

        </div>

        <div className="grid grid-cols-2 gap-4">

          <div className="w-[15rem] h-[6rem] bg-cyan-900 rounded-2xl text-muted flex flex-col justify-center items-center text-[1rem] shadow-xl/50">
            <span className="font-semibold">Total de Atividades</span>
            <span className="text-3xl font-bold flex justify-center items-center gap-2">{countTotalIsLoading ? <Spinner /> : countTotal.total} <FileCheck /> </span>
          </div>
          <div className="w-[15rem] h-[6rem] bg-cyan-900 rounded-2xl text-muted flex flex-col justify-center items-center text-[1rem] shadow-xl/50">
            <span className="font-semibold">Tempo Médio</span>
            <span className="text-3xl font-bold flex justify-center items-center gap-2">{averageIsLoading ? <Spinner/> : average.average } <Clock /></span>
          </div>   
          <div className="w-[15rem] h-[6rem] bg-cyan-900 rounded-2xl text-muted flex flex-col justify-center items-center text-[1rem] shadow-xl/50">
            <span className="font-semibold">Total por Código: <span className="text-2xl font-bold">{isCodeLoading ? <Spinner/> : listCountCode.codigo}</span></span>
            <div className="flex items-center gap-4">
              {isCodeLoading ? ( < Spinner/> ) : (
                <>
                  <span className="text-3xl font-bold flex justify-center items-center gap-2">{listCountCode.total ?? <Spinner/>}</span>
                  <Select
                    value={String(codSelecionado)}
                    onValueChange={(value) => setCodSelecionado(Number(value))}
                  >
                    <SelectTrigger className="w-[6rem] text-white border">
                      <SelectValue placeholder="Selecione um código" />
                    </SelectTrigger>

                    <SelectContent className="max-h-[20rem] ">
                      {codigosUnicos.map((cod) => (
                        <SelectItem key={cod} value={String(cod)}>
                          {cod}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </>
              )}
            </div>
          </div>
          <div className="w-[15rem] h-[6rem] bg-cyan-900 rounded-2xl text-muted flex flex-col justify-center items-center text-[1rem] shadow-xl/50">
            <span className="font-semibold">Total por setor: <span className="font-bold">{isDepartmentLoading ? <Spinner/> : listCountDepartment.setor}</span></span>
            <div className="flex items-center gap-4">
              {isDepartmentLoading ? ( < Spinner/> ) : (
                <>
                  <span className="text-3xl font-bold flex justify-center items-center gap-2">{listCountDepartment.total ?? <Spinner />}</span>
                  <Select
                    value={setorSelecionado}
                    onValueChange={(value) => setSetorSelecionado(value)}
                  >
                    <SelectTrigger className="w-[6rem] text-white border mt-2">
                      <SelectValue placeholder="Setor" />
                    </SelectTrigger>

                    <SelectContent className="max-h-[20rem] ">
                      {setoresUnicos.map((set) => (
                        <SelectItem key={set} value={set}>
                          {set}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-8">
          {topActivetIsLoading ? <Spinner /> : <ChartBar topFiveActivet={topFiveActivet} />}
          {totalMesesIsLoading ? <Spinner /> : <ChartLin totalMesAMes={dadosMeses} />}
      </div>
    </div>
  )
}