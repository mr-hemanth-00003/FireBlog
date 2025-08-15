
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
import type { Post } from "@/lib/data"

interface PostsChartProps {
  posts: Post[];
}

export function PostsChart({ posts }: PostsChartProps) {
  const data = posts.reduce((acc, post) => {
    const month = new Date(post.publishDate).toLocaleString('default', { month: 'short' });
    const year = new Date(post.publishDate).getFullYear();
    const key = `${month} ${year}`;
    
    const existing = acc.find(item => item.month === key);
    if (existing) {
      existing.total++;
    } else {
      acc.push({ month: key, total: 1 });
    }
    return acc;
  }, [] as { month: string; total: number }[]);
  
  // Ensure we have data for the last 6 months, even if it's 0
  const last6Months = [];
    const today = new Date();
    for (let i = 5; i >= 0; i--) {
        const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
        const month = d.toLocaleString('default', { month: 'short' });
        const year = d.getFullYear();
        const key = `${month} ${year}`;
        last6Months.push(key);
    }
    
  const chartData = last6Months.map(month => {
      const found = data.find(d => d.month === month);
      return { month: month.split(' ')[0], total: found ? found.total : 0 };
  })


  const chartConfig = {
    total: {
      label: "Posts",
      color: "hsl(var(--primary))",
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Posts Over Time</CardTitle>
        <CardDescription>Number of articles published in the last 6 months.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
             <YAxis allowDecimals={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="total" fill="var(--color-total)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
