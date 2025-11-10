import type React from "react"

import { ArrowUp, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/src/shared/components/ui/card"

interface StatCardProps {
  title: string
  value: string
  icon: React.ElementType
  change: string
  trend: "up" | "down" | "warning"
}

export default function StatCard({ title, value, icon: Icon, change, trend }: StatCardProps) {
  const trendColor = trend === "up" ? "text-accent" : trend === "warning" ? "text-yellow-500" : "text-red-500"

  return (
    <Card className="border-border hover:border-primary/50 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon size={24} className="text-primary" />
          </div>
          {trend === "up" && <ArrowUp size={18} className="text-accent" />}
          {trend === "warning" && <AlertCircle size={18} className="text-yellow-500" />}
        </div>
        <p className="text-sm text-muted-foreground mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-foreground mb-2">{value}</h3>
        <p className={`text-xs ${trendColor}`}>{change}</p>
      </CardContent>
    </Card>
  )
}
