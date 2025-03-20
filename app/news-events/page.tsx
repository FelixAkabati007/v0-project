import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays } from "lucide-react"

const newsItems = [
  {
    title: "Ejisuman SHS Wins Regional Science Quiz Competition",
    date: "May 15, 2025",
    excerpt: "Our school's science team emerged victorious in the annual regional science quiz competition...",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/449679956_527620749623606_3286520815248241865_n.jpg-HNLWAd36PG3Zio51ScWW7o8cyWlw5d.jpeg",
  },
  {
    title: "New Computer Lab Inaugurated",
    date: "April 3, 2025",
    excerpt: "State-of-the-art computer lab with 50 new workstations was inaugurated to enhance our ICT education...",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/305752815_488264239975475_6265696827532764525_n.jpg-9ehqXe7zjcNU3XGup7foej20X9wXJ3.jpeg",
  },
  {
    title: "Annual Cultural Festival Celebrates Diversity",
    date: "March 20, 2025",
    excerpt: "Students showcased their talents and cultural heritage in our vibrant annual cultural festival...",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/417396470_929068291928012_3435120046188306092_n.jpg-Lq61HiiZ2qssINwLkibKFnL2yAMzDs.jpeg",
  },
]

const upcomingEvents = [
  { name: "Parent-Teacher Conference", date: "June 10, 2025" },
  { name: "Inter-House Sports Competition", date: "July 5-7, 2025" },
  { name: "Career Day", date: "August 15, 2025" },
  { name: "Alumni Homecoming", date: "September 2, 2025" },
]

export default function NewsEventsPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">News & Events</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-6">Latest News</h2>
            <div className="space-y-8">
              {newsItems.map((item, index) => (
                <Card key={index}>
                  <div className="md:flex">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={300}
                      height={200}
                      className="w-full md:w-48 h-48 object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                    />
                    <div className="p-6">
                      <CardHeader>
                        <CardTitle>{item.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{item.date}</p>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4">{item.excerpt}</p>
                        <Button variant="outline" asChild>
                          <Link href={`/news/${item.title.toLowerCase().replace(/ /g, "-")}`}>Read More</Link>
                        </Button>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">Upcoming Events</h2>
            <Card>
              <CardContent className="p-6">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-center mb-4 last:mb-0">
                    <CalendarDays className="mr-2 h-5 w-5 text-muted-foreground" />
                    <div>
                      <h3 className="font-semibold">{event.name}</h3>
                      <p className="text-sm text-muted-foreground">{event.date}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            <div className="mt-6">
              <Button className="w-full" asChild>
                <Link href="/calendar">View Full Calendar</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

