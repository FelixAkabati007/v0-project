import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const events = [
  { name: "Parent-Teacher Conference", date: new Date(2025, 5, 10) },
  { name: "Inter-House Sports Competition", date: new Date(2025, 6, 5) },
  { name: "Career Day", date: new Date(2025, 7, 15) },
  { name: "Alumni Homecoming", date: new Date(2025, 8, 2) },
  // Add more events as needed
]

export default function CalendarPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">School Calendar</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" selected={new Date()} className="rounded-md border" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {events.map((event, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{event.name}</span>
                  <span className="text-sm text-muted-foreground">{event.date.toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      {/* Link to Events */}
      <div className="text-center mt-12">
        <p className="text-muted-foreground mb-4">Looking for specific events?</p>
        <Button asChild>
          <Link href="/events">View All Events</Link>
        </Button>
      </div>
    </div>
  )
}

