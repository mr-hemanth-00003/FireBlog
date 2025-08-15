"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", posts: 1 },
  { month: "February", posts: 2 },
  { month: "March", posts: 1 },
  { month: "April", posts: 3 },
  { month: "May", posts: 2 },
  { month: "June", posts: 4 },
]

const chartConfig = {
  posts: {
    label: "Posts",
    color: "hsl(var(--primary))",
  },
}

export function AnalyticsChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData} margin={{ top: 20 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis 
            allowDecimals={false}
            tickLine={false}
            axisLine={false}
            tickMargin={10}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Bar dataKey="posts" fill="var(--color-posts)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
