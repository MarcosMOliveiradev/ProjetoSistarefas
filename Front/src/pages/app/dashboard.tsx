import { averageTime } from "@/api/averageTime"
import { contagem } from "@/api/contagelTotal"
import { contagemCodigo } from "@/api/contagemCodigo"
import { contagemSetor } from "@/api/contaSetor"
import { topAtividade } from "@/api/topFiveAtividades"
import { totalMeses } from "@/api/totalMesAMes"
import { ChartContainer } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import type { atividadesDTO } from "@/dtos/atividadesDTOS"
import type { userDTO } from "@/dtos/userDto"
import { useAuth } from "@/hooks/useAuth"
import { api } from "@/lib/axios"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const chartConfig = {
  atividades: {
    label: "Atividades",
    color: "#239151",
  }
}


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

const { data: listCountCode, isLoading: isCodeLoading } = useQuery({
  queryKey: ["countCode", codSelecionado],
  queryFn: () => contagemCodigo(user.user.id, codSelecionado),
})

const { data: listCountDepartment, isLoading: isDepartmentLoading } = useQuery({
  queryKey: ["countDepartment", setorSelecionado],
  queryFn: () => contagemSetor(user.user.id, setorSelecionado),
})

const { data: countTotal } = useQuery({
  queryKey: ["countAll",],
  queryFn: () => contagem(user.user.id),
})
const { data: average } = useQuery({
  queryKey: ["averageTime",],
  queryFn: () => averageTime(user.user.id),
})

const { data: topFiveActivet } = useQuery({
  queryKey: ["topActive",],
  queryFn: () => topAtividade(user.user.id),
})

const { data: totalMesAMes } = useQuery({
  queryKey: ["totalMeses",],
  queryFn: () => totalMeses(user.user.id),
})

if(!countTotal || !average || !topFiveActivet || !totalMesAMes) {
  return <Spinner/>
}

  return (
    <div className="w-full pl-12">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="w-full flex  justify-around pt-8">

        <div className="w-[17rem] h-[6rem] bg-cyan-900 rounded-2xl text-muted flex flex-col justify-center items-center text-[1rem]">
          <span className="font-semibold">Total de Atividades</span>
          <span className="text-3xl font-bold">{countTotal.total}</span>
        </div>

        <div className="w-[17rem] h-[6rem] bg-cyan-900 rounded-2xl text-muted flex flex-col justify-center items-center text-[1rem]">
          <span className="font-semibold">Tempo Médio</span>
          <span className="text-3xl font-bold">{average.average}</span>
        </div>
        
        <div className="w-[17rem] h-[6rem] bg-cyan-900 rounded-2xl text-muted flex flex-col justify-center items-center text-[1rem]">
          <span className="font-semibold">Total por Código: <span className="text-2xl font-bold">{isCodeLoading ? <Spinner/> : listCountCode.codigo}</span></span>
          <div className="flex items-center gap-4">
            {isCodeLoading ? ( < Spinner/> ) : (
              <>
                <span className="text-3xl font-bold">{listCountCode.total ?? <Spinner/>}</span>
                <Select
                  value={String(codSelecionado)}
                  onValueChange={(value) => setCodSelecionado(Number(value))}
                >
                  <SelectTrigger className="w-[6rem] text-white border">
                    <SelectValue placeholder="Selecione um código" />
                  </SelectTrigger>

                  <SelectContent className="max-h-[40rem] ">
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

        <div className="w-[17rem] h-[6rem] bg-cyan-900 rounded-2xl text-muted flex flex-col justify-center items-center text-[1rem]">
          <span className="font-semibold">Total por setor: <span className="font-bold">{isDepartmentLoading ? <Spinner/> : listCountDepartment.setor}</span></span>
          <div className="flex items-center gap-4">
            {isDepartmentLoading ? ( < Spinner/> ) : (
              <>
                <span className="text-3xl font-bold">{listCountDepartment.total ?? <Spinner />}</span>
                <Select
                  value={setorSelecionado}
                  onValueChange={(value) => setSetorSelecionado(value)}
                >
                  <SelectTrigger className="w-[6rem] text-white border mt-2">
                    <SelectValue placeholder="Setor" />
                  </SelectTrigger>

                  <SelectContent className="max-h-[40rem] ">
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

      <div className="grid grid-cols-2 gap-4 pt-8">
        <ChartContainer className="w-full h-[35rem]" config={chartConfig}>
          <h2 className="text-xl font-semibold mb-2 text-muted-foreground">
            Top 5 atividades
          </h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topFiveActivet} margin={{ top: 20, right: 20, left: 10, bottom: 50 }}>
              
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <Tooltip
                cursor={{ opacity: 0.1 }}
                formatter={(value) => [`${value} execuções`, "Total"]}
                labelFormatter={(label) => `Atividade: ${label}`}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "white" }}
                allowDecimals={false}
              />

              <XAxis
                dataKey="nome"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                interval={0}
                angle={-20}
                textAnchor="end"
                height={80}
                tick={{ fill: "white" }}
              />

              <Bar
                dataKey="total"
                fill="var(--color-atividades)"
                radius={[4, 4, 0, 0]}
              >
                <LabelList
                  dataKey="total"
                  position="top"
                  className="fill-muted-foreground font-bold"
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  )
}