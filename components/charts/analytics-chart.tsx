"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import { motion } from "framer-motion"

interface ChartData {
  [key: string]: any
}

interface AnalyticsChartProps {
  title: string
  description?: string
  data: ChartData[]
  type: "line" | "area" | "bar" | "pie"
  dataKey: string
  xAxisKey?: string
  colors?: string[]
  height?: number
  className?: string
}

const defaultColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

export function AnalyticsChart({
  title,
  description,
  data,
  type,
  dataKey,
  xAxisKey = "name",
  colors = defaultColors,
  height = 300,
  className = "",
}: AnalyticsChartProps) {
  const renderChart = () => {
    const commonProps = {
      data,
      height,
      margin: { top: 5, right: 30, left: 20, bottom: 5 },
    }

    switch (type) {
      case "line":
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey={xAxisKey} className="text-xs fill-muted-foreground" />
            <YAxis className="text-xs fill-muted-foreground" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={colors[0]}
              strokeWidth={2}
              dot={{ fill: colors[0], strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: colors[0], strokeWidth: 2 }}
            />
          </LineChart>
        )

      case "area":
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey={xAxisKey} className="text-xs fill-muted-foreground" />
            <YAxis className="text-xs fill-muted-foreground" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={colors[0]}
              fill={colors[0]}
              fillOpacity={0.3}
              strokeWidth={2}
            />
          </AreaChart>
        )

      case "bar":
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey={xAxisKey} className="text-xs fill-muted-foreground" />
            <YAxis className="text-xs fill-muted-foreground" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey={dataKey} fill={colors[0]} radius={[4, 4, 0, 0]} />
          </BarChart>
        )

      case "pie":
        return (
          <PieChart {...commonProps}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey={dataKey}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
          </PieChart>
        )

      default:
        return null
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          {description && <CardDescription className="text-sm text-muted-foreground">{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              [dataKey]: {
                label: dataKey,
                color: colors[0],
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              {renderChart()}
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  )
}
