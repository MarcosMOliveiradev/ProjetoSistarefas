import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartContainer } from "./ui/chart";

const chartConfig = {
  atividades: {
    label: "Atividades",
    color: "#239151",
  }
}

export function ChartBar({ topFiveActivet }: any) {
  if (!topFiveActivet || topFiveActivet.length === 0) {
  return (
    <div className="w-full h-[15rem] bg-slate-800 rounded-xl flex items-center justify-center text-white">
      Nenhuma atividade registrada ainda.
    </div>
    )
  }

  return (
    <ChartContainer className="w-[95%] h-[35rem] shadow-xl/30" config={chartConfig}>
      <h2 className="text-2xl font-semibold ml-4 text-muted-foreground">
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
              className="fill-muted-foreground font-bold text-[1rem]"
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}