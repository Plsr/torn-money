"use client";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  moneyGain: {
    label: "Money Gain",
    color: "#888888",
  },
} satisfies ChartConfig;

export const MoneyGainedChart = ({
  crimesByWeek,
}: {
  crimesByWeek: { [key: string]: number };
}) => {
  const crimesByWeekArray = Object.entries(crimesByWeek).map(
    ([week, value]) => ({
      week,
      moneyGain: value,
    })
  );

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart data={crimesByWeekArray}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="week"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis
          tickLine={false}
          dataKey="moneyGain"
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar
          dataKey="moneyGain"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ChartContainer>
  );
};
