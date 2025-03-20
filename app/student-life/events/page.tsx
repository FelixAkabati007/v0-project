import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays } from "lucide-react"

const events = [
  { name: "Annual Cultural Festival", date: "March 15-17, 2025" },
  { name: "Science and Technology Fair", date: "April 22, 2025" },
  { name: "Inter-House Sports Competition", date: "May 10-12, 2025" },
  { name: "Career Day", date: "June 5, 2025" },
  { name: "Literary Week", date: "July 1-5, 2025" },
  { name: "Founders' Day Celebration", date: "September 21, 2025" },
]

export default function EventsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Events & Activities</h1>
      <p className="text-center mb-12 max-w-2xl mx-auto">
        Ejisuman Senior High School hosts a variety of events and activities throughout the academic year to enrich our
        students' experiences and showcase their talents.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{event.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{event.date}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

