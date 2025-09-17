"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { CheckCircle, Clock, Target, TrendingUp } from "lucide-react"

interface ProgressItem {
  id: string
  title: string
  progress: number
  status: "completed" | "in-progress" | "pending"
  dueDate?: string
  description?: string
}

interface ProgressTrackerProps {
  title: string
  items: ProgressItem[]
  className?: string
}

export function ProgressTracker({ title, items, className = "" }: ProgressTrackerProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "pending":
        return <Target className="h-4 w-4 text-gray-400" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "in-progress":
        return "bg-blue-500"
      case "pending":
        return "bg-gray-300"
      default:
        return "bg-gray-300"
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
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            {title}
          </CardTitle>
          <CardDescription>Track your progress across different activities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(item.status)}
                  <span className="font-medium text-sm">{item.title}</span>
                </div>
                <span className="text-sm text-muted-foreground">{item.progress}%</span>
              </div>

              <Progress
                value={item.progress}
                className="h-2"
                // @ts-ignore
                indicatorClassName={getStatusColor(item.status)}
              />

              {item.description && <p className="text-xs text-muted-foreground">{item.description}</p>}

              {item.dueDate && (
                <p className="text-xs text-muted-foreground">Due: {new Date(item.dueDate).toLocaleDateString()}</p>
              )}
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  )
}
