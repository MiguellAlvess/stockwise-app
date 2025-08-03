'use client'

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/app/_components/ui/chart'
import { DayTotalRevenueDto } from '@/app/_data_access/dashboard/get-last-14-days-revenue'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

const chartConfig = {
  totalRevenue: {
    label: 'Receita',
    color: 'bg-primary',
  },
} satisfies ChartConfig

interface RevenueChartProps {
  data: DayTotalRevenueDto[]
}

const RevenueChart = ({ data }: RevenueChartProps) => {
  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-0 w-full [&_.recharts-rectangle]:fill-[hsl(168,100%,32%)]"
    >
      <BarChart data={data}>
        <CartesianGrid vertical={false} stroke="#f0f0f0" />
        <XAxis
          dataKey="day"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip
          content={<ChartTooltipContent />}
          cursor={{ fill: 'rgba(0, 168, 132, 0.1)' }}
        />
        <Bar
          dataKey="totalRevenue"
          radius={[4, 4, 0, 0]}
          fill="var(--color-totalRevenue)"
        />
      </BarChart>
    </ChartContainer>
  )
}

export default RevenueChart
