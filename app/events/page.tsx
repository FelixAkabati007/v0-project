import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, ChevronRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Events | Ejisuman SHS",
  description: "Upcoming events and activities at Ejisuman Senior High School",
}

// Mock events data
const featuredEvent = {
  id: "e1",
  title: "Annual Speech and Prize-Giving Day",
  description:
    "Join us for our annual Speech and Prize-Giving Day ceremony where we celebrate academic excellence and student achievements.",
  image: "/placeholder.svg?height=400&width=800",
  date: "March 30, 2025",
  time: "9:00 AM - 2:00 PM",
  location: "School Assembly Hall",
  status: "Upcoming",
}

const events = [
  {
    id: "e2",
    title: "Science and Technology Exhibition",
    description: "Students showcase innovative science and technology projects developed throughout the academic year.",
    image: "/placeholder.svg?height=300&width=500",
    date: "April 10, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Science Complex",
    status: "Upcoming",
  },
  {
    id: "e3",
    title: "Inter-School Debate Competition",
    description: "Our debate team competes against other schools in the regional debate championship.",
    image: "/placeholder.svg?height=300&width=500",
    date: "April 15, 2025",
    time: "1:00 PM - 5:00 PM",
    location: "Main Auditorium",
    status: "Upcoming",
  },
  {
    id: "e4",
    title: "Career Guidance Workshop",
    description:
      "Professional career counselors guide final year students on career paths and university applications.",
    image: "/placeholder.svg?height=300&width=500",
    date: "April 20, 2025",
    time: "9:00 AM - 12:00 PM",
    location: "Conference Room",
    status: "Upcoming",
  },
  {
    id: "e5",
    title: "Alumni Homecoming",
    description: "Annual gathering of school alumni to reconnect and contribute to school development initiatives.",
    image: "/placeholder.svg?height=300&width=500",
    date: "May 5, 2025",
    time: "2:00 PM - 6:00 PM",
    location: "School Grounds",
    status: "Upcoming",
  },
  {
    id: "e6",
    title: "Cultural Festival",
    description:
      "Celebration of Ghana's diverse cultural heritage through music, dance, food, and traditional displays.",
    image: "/placeholder.svg?height=300&width=500",
    date: "May 15, 2025",
    time: "10:00 AM - 5:00 PM",
    location: "School Field",
    status: "Upcoming",
  },
]

export default function EventsPage() {
  return (
    <main className="container mx-auto px-4 py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">School Events</h1>
        <p className="text-xl text-muted-foreground mt-2">Upcoming activities and celebrations</p>
      </div>

      {/* Featured Event */}
      <div className="mb-16">
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative h-64 md:h-full">
              <Image
                src={featuredEvent.image || "/placeholder.svg"}
                alt={featuredEvent.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                Featured Event
              </div>
            </div>
            <div className="p-6 flex flex-col justify-between">
              <div>
                <Badge variant="outline" className="mb-2 bg-green-50 text-green-700 border-green-200">
                  {featuredEvent.status}
                </Badge>
                <CardTitle className="text-2xl md:text-3xl mb-4">{featuredEvent.title}</CardTitle>
                <CardDescription className="text-base">{featuredEvent.description}</CardDescription>

                <div className="mt-6 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{featuredEvent.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{featuredEvent.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{featuredEvent.location}</span>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Button className="group transition-all duration-300 relative overflow-hidden">
                  <Link href={`/events/${featuredEvent.id}`} className="flex items-center relative z-10">
                    Register to Attend
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <span className="absolute bottom-0 left-0 w-0 h-full bg-black/10 transition-all duration-300 group-hover:w-full"></span>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Events Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden flex flex-col h-full">
            <div className="relative h-48">
              <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
              <Badge variant="outline" className="absolute top-4 left-4 bg-green-50 text-green-700 border-green-200">
                {event.status}
              </Badge>
            </div>
            <CardHeader>
              <CardTitle className="line-clamp-2">{event.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="line-clamp-3 mb-4">{event.description}</CardDescription>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{event.location}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="mt-auto">
              <Button
                variant="outline"
                className="w-full group transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
              >
                <Link href={`/events/${event.id}`} className="flex items-center w-full justify-center">
                  View Details
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Calendar Link */}
      <div className="text-center mt-12">
        <p className="text-muted-foreground mb-4">Want to see all upcoming events?</p>
        <Button asChild>
          <Link href="/calendar">
            <Calendar className="mr-2 h-4 w-4" />
            View School Calendar
          </Link>
        </Button>
      </div>
    </main>
  )
}

