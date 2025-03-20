import type { ReactNode } from "react"
import { Card } from "@/components/ui/card"

interface EventDetailCardProps {
  icon: ReactNode
  label: string
  value: string
}

export function EventDetailCard({ icon, label, value }: EventDetailCardProps) {
  return (
    <Card className="p-4 flex items-center space-x-4 hover:shadow-md transition-shadow">
      <div className="text-primary">{icon}</div>
      <div>
        <h3 className="font-medium text-sm text-muted-foreground">{label}</h3>
        <p>{value}</p>
      </div>
    </Card>
  )
}

