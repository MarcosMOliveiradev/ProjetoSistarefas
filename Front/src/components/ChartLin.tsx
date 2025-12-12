import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartContainer } from "./ui/chart";

const chartConfig = {
  mes: {
    label: "Atividades",
    color: "#239151",
  }
}


export function ChartLin({ totalMesAMes }: any) {
  if (!totalMesAMes || totalMesAMes.length === 0) {
    return (
      <div className="w-full h-[15rem] bg-slate-800 rounded-xl flex items-center justify-center text-white">
        Nenhuma atividade registrada ainda.
      </div>
    )
  }
  return (
    <div className="w-[95%] h-[35rem] shadow-xl/50 ">
      <h2 className="text-2xl ml-4 font-semibold mb-2 text-muted-foreground">
        Evolução Mensal de Atividades
      </h2>

      <ChartContainer className="w-full h-full" config={chartConfig}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={totalMesAMes}
            margin={{ top: 20, right: 20, left: 10, bottom: 40 }}
          >
            {/* grade */}
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            {/* tooltip */}
            <Tooltip
              formatter={(value) => [`${value} atividades`, "Total"]}
              labelFormatter={(label) => `Mês: ${label}`}
              contentStyle={{ backgroundColor: "#0f172a", borderRadius: "8px" }}
              labelStyle={{ color: "white" }}
            />

            {/* eixo Y */}
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "black" }}
              allowDecimals={false}
            />

            {/* eixo X */}
            <XAxis
              dataKey="mes"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fill: "white" }}
              angle={-20}
              height={60}
              textAnchor="end"
            />

            {/* linha */}
            <Line
              type="monotone"
              dataKey="total"
              stroke="#239151"
              strokeWidth={3}
              dot={{ r: 4, fill: "white" }}
              activeDot={{ r: 6 }}
            />

          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}