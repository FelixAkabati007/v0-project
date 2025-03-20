"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, ArrowLeft, Share2, Download, Bookmark, ChevronRight } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Import the EventActionButton component
import { EventActionButton } from "@/components/EventActionButton"
// Import the RelatedEventCard component
import { RelatedEventCard } from "@/components/RelatedEventCard"
// Import the EventSchedule component
import { EventSchedule } from "@/components/EventSchedule"
// Import the EventDetailCard component
import { EventDetailCard } from "@/components/EventDetailCard"

// Mock events data - in a real app, this would come from an API or database
const eventsData = {
  e1: {
    id: "e1",
    title: "Annual Speech and Prize-Giving Day",
    description:
      "Join us for our annual Speech and Prize-Giving Day ceremony where we celebrate academic excellence and student achievements. This prestigious event brings together students, parents, teachers, and distinguished guests to recognize outstanding academic performance and extracurricular accomplishments throughout the academic year.\n\nThe ceremony will feature keynote speeches from notable alumni, presentation of awards across various academic and non-academic categories, cultural performances by our talented students, and an exhibition of student projects and achievements.",
    image: "/placeholder.svg?height=400&width=800",
    date: "March 30, 2025",
    time: "9:00 AM - 2:00 PM",
    location: "School Assembly Hall",
    status: "Upcoming",
    organizer: "School Administration",
    attendees: 350,
    additionalImages: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    agenda: [
      { time: "9:00 AM - 9:30 AM", activity: "Arrival and Seating of Guests" },
      { time: "9:30 AM - 10:00 AM", activity: "Opening Ceremony and Welcome Address" },
      { time: "10:00 AM - 11:00 AM", activity: "Keynote Speech" },
      { time: "11:00 AM - 12:30 PM", activity: "Award Presentation" },
      { time: "12:30 PM - 1:30 PM", activity: "Cultural Performances" },
      { time: "1:30 PM - 2:00 PM", activity: "Closing Remarks and Refreshments" },
    ],
    relatedEvents: ["e2", "e5", "e6"],
  },
  e2: {
    id: "e2",
    title: "Science and Technology Exhibition",
    description:
      "Students showcase innovative science and technology projects developed throughout the academic year. The exhibition will feature projects across various scientific disciplines including physics, chemistry, biology, computer science, and engineering. Visitors will have the opportunity to interact with student inventors, learn about their research methodologies, and see practical applications of classroom concepts.\n\nThe event aims to foster scientific curiosity, promote STEM education, and showcase the creative problem-solving abilities of our students. Industry professionals and university representatives will be in attendance to provide feedback and guidance to aspiring scientists and engineers.",
    image: "/placeholder.svg?height=300&width=500",
    date: "April 10, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Science Complex",
    status: "Upcoming",
    organizer: "Science Department",
    attendees: 200,
    additionalImages: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
    agenda: [
      { time: "10:00 AM - 10:30 AM", activity: "Opening Ceremony" },
      { time: "10:30 AM - 1:00 PM", activity: "Project Exhibition - Morning Session" },
      { time: "1:00 PM - 2:00 PM", activity: "Lunch Break" },
      { time: "2:00 PM - 3:30 PM", activity: "Project Exhibition - Afternoon Session" },
      { time: "3:30 PM - 4:00 PM", activity: "Awards Ceremony and Closing" },
    ],
    relatedEvents: ["e1", "e4", "e3"],
  },
  e3: {
    id: "e3",
    title: "Inter-School Debate Competition",
    description:
      "Our debate team competes against other schools in the regional debate championship. This prestigious competition brings together the best debaters from schools across the region to engage in intellectual discourse on contemporary issues. The event promotes critical thinking, public speaking, research skills, and logical argumentation among students.\n\nThe competition will follow a parliamentary debate format with teams presenting arguments for and against various motions. A panel of experienced judges from academia and professional fields will evaluate performances based on content, strategy, style, and adherence to debate protocols.",
    image: "/placeholder.svg?height=300&width=500",
    date: "April 15, 2025",
    time: "1:00 PM - 5:00 PM",
    location: "Main Auditorium",
    status: "Upcoming",
    organizer: "Literary and Debating Society",
    attendees: 150,
    additionalImages: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
    agenda: [
      { time: "1:00 PM - 1:30 PM", activity: "Registration and Opening Ceremony" },
      { time: "1:30 PM - 2:30 PM", activity: "Preliminary Rounds" },
      { time: "2:30 PM - 3:00 PM", activity: "Break" },
      { time: "3:00 PM - 4:00 PM", activity: "Semi-Finals and Finals" },
      { time: "4:00 PM - 5:00 PM", activity: "Awards Presentation and Closing" },
    ],
    relatedEvents: ["e1", "e4", "e6"],
  },
  e4: {
    id: "e4",
    title: "Career Guidance Workshop",
    description:
      "Professional career counselors guide final year students on career paths and university applications. This comprehensive workshop is designed to help students make informed decisions about their future academic and professional journeys. Experienced career counselors, industry professionals, and university representatives will provide valuable insights and practical advice.\n\nThe workshop will cover topics such as career exploration, university application processes, scholarship opportunities, interview preparation, resume building, and professional development. Students will also have the opportunity for one-on-one consultations with career advisors to discuss their specific interests and aspirations.",
    image: "/placeholder.svg?height=300&width=500",
    date: "April 20, 2025",
    time: "9:00 AM - 12:00 PM",
    location: "Conference Room",
    status: "Upcoming",
    organizer: "Guidance and Counseling Department",
    attendees: 100,
    additionalImages: ["/placeholder.svg?height=300&width=400"],
    agenda: [
      { time: "9:00 AM - 9:30 AM", activity: "Introduction to Career Planning" },
      { time: "9:30 AM - 10:15 AM", activity: "University Application Process" },
      { time: "10:15 AM - 10:30 AM", activity: "Break" },
      { time: "10:30 AM - 11:15 AM", activity: "Industry Insights and Future Trends" },
      { time: "11:15 AM - 12:00 PM", activity: "Q&A and Individual Consultations" },
    ],
    relatedEvents: ["e2", "e3", "e5"],
  },
  e5: {
    id: "e5",
    title: "Alumni Homecoming",
    description:
      "Annual gathering of school alumni to reconnect and contribute to school development initiatives. This cherished tradition brings together graduates from various years to celebrate their shared educational heritage, reconnect with classmates and teachers, and contribute to the continued growth of their alma mater.\n\nThe event will feature campus tours highlighting new developments, networking sessions, panel discussions on various topics, recognition of distinguished alumni, and fundraising for school improvement projects. It's an opportunity for alumni to give back to the institution that shaped their formative years and to inspire current students with their achievements and experiences.",
    image: "/placeholder.svg?height=300&width=500",
    date: "May 5, 2025",
    time: "2:00 PM - 6:00 PM",
    location: "School Grounds",
    status: "Upcoming",
    organizer: "Alumni Association",
    attendees: 250,
    additionalImages: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    agenda: [
      { time: "2:00 PM - 2:30 PM", activity: "Registration and Welcome" },
      { time: "2:30 PM - 3:30 PM", activity: "Campus Tour" },
      { time: "3:30 PM - 4:30 PM", activity: "Alumni Panel Discussion" },
      { time: "4:30 PM - 5:30 PM", activity: "Recognition Ceremony" },
      { time: "5:30 PM - 6:00 PM", activity: "Networking Reception" },
    ],
    relatedEvents: ["e1", "e6", "e4"],
  },
  e6: {
    id: "e6",
    title: "Cultural Festival",
    description:
      "Celebration of Ghana's diverse cultural heritage through music, dance, food, and traditional displays. This vibrant festival showcases the rich cultural tapestry of Ghana and promotes cultural awareness, appreciation, and preservation among students and the wider community.\n\nThe festival will feature traditional and contemporary performances from various ethnic groups, cultural exhibitions displaying artifacts and traditional crafts, food stalls offering diverse Ghanaian cuisines, traditional games and activities, and educational presentations on cultural practices and their significance. It's a colorful celebration of identity, heritage, and national unity.",
    image: "/placeholder.svg?height=300&width=500",
    date: "May 15, 2025",
    time: "10:00 AM - 5:00 PM",
    location: "School Field",
    status: "Upcoming",
    organizer: "Cultural Affairs Committee",
    attendees: 400,
    additionalImages: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
    agenda: [
      { time: "10:00 AM - 10:30 AM", activity: "Opening Ceremony" },
      { time: "10:30 AM - 12:30 PM", activity: "Cultural Performances - Morning Session" },
      { time: "12:30 PM - 1:30 PM", activity: "Lunch and Food Festival" },
      { time: "1:30 PM - 3:30 PM", activity: "Cultural Performances - Afternoon Session" },
      { time: "3:30 PM - 4:30 PM", activity: "Traditional Games and Activities" },
      { time: "4:30 PM - 5:00 PM", activity: "Closing Ceremony" },
    ],
    relatedEvents: ["e1", "e3", "e5"],
  },
}

export default function EventDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [event, setEvent] = useState<any>(null)
  const [relatedEvents, setRelatedEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [registering, setRegistering] = useState(false)
  const [activeTab, setActiveTab] = useState("details")
  const [shareTooltip, setShareTooltip] = useState(false)

  useEffect(() => {
    // Simulate API fetch with a timeout
    const fetchEvent = async () => {
      try {
        setLoading(true)
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 800))

        const eventId = params.eventId as string
        const eventData = eventsData[eventId as keyof typeof eventsData]

        if (!eventData) {
          setError("Event not found")
          return
        }

        setEvent(eventData)

        // Fetch related events
        if (eventData.relatedEvents && eventData.relatedEvents.length > 0) {
          const related = eventData.relatedEvents.map((id) => eventsData[id as keyof typeof eventsData])
          setRelatedEvents(related)
        }
      } catch (err) {
        setError("Failed to load event details")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [params])

  const handleRegister = async () => {
    try {
      setRegistering(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      alert("Registration successful! You will receive a confirmation email shortly.")
    } catch (error) {
      alert("Registration failed. Please try again later.")
    } finally {
      setRegistering(false)
    }
  }

  const handleGoBack = () => {
    router.back()
  }

  const handleShare = () => {
    // In a real app, this would use the Web Share API if available
    setShareTooltip(true)
    setTimeout(() => setShareTooltip(false), 2000)
  }

  const handleAddToCalendar = () => {
    // In a real app, this would generate an iCal file or Google Calendar link
    alert("Calendar event created! Check your downloads.")
  }

  const handleSaveEvent = () => {
    // In a real app, this would save to user's profile or local storage
    alert("Event saved to your favorites!")
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24">
        <Button
          variant="ghost"
          onClick={handleGoBack}
          className="mb-8 flex items-center hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Button>

        <div className="space-y-4">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-[400px] w-full rounded-lg" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-60 w-full" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-24">
        <Button
          variant="ghost"
          onClick={handleGoBack}
          className="mb-8 flex items-center hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Button>

        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <Button onClick={handleGoBack}>Return to Events</Button>
        </div>
      </div>
    )
  }

  if (!event) return null

  return (
    <main className="container mx-auto px-4 py-24 animate-fadeIn">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={handleGoBack}
        className="mb-8 flex items-center hover:bg-gray-100 transition-colors group"
        aria-label="Back to events"
      >
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Events
      </Button>

      {/* Event Status */}
      <div className="mb-4">
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          {event.status}
        </Badge>
      </div>

      {/* Event Title */}
      <h1 className="text-4xl font-bold tracking-tight mb-2">{event.title}</h1>

      {/* Event Organizer */}
      <p className="text-muted-foreground mb-8">Organized by: {event.organizer}</p>

      {/* Main Image */}
      <div className="relative h-[400px] w-full mb-8 rounded-lg overflow-hidden shadow-md">
        <Image
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          fill
          className="object-cover transition-transform hover:scale-105 duration-700"
          priority
        />
      </div>

      {/* Event Details Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <EventDetailCard icon={<Calendar className="h-6 w-6" />} label="Date" value={event.date} />

        <EventDetailCard icon={<Clock className="h-6 w-6" />} label="Time" value={event.time} />

        <EventDetailCard icon={<MapPin className="h-6 w-6" />} label="Location" value={event.location} />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-8">
        <Button
          onClick={handleRegister}
          disabled={registering}
          className="min-w-[150px] relative overflow-hidden group"
        >
          <span className="relative z-10 flex items-center">
            {registering ? "Registering..." : "Register to Attend"}
            <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          <span className="absolute bottom-0 left-0 w-0 h-full bg-black/10 transition-all duration-300 group-hover:w-full"></span>
        </Button>

        <div className="relative">
          <EventActionButton
            icon={<Share2 className="h-4 w-4" />}
            onClick={handleShare}
            variant="outline"
            ariaLabel="Share event"
          >
            Share Event
          </EventActionButton>
          {shareTooltip && (
            <div className="absolute top-full left-0 mt-2 p-2 bg-black text-white text-xs rounded shadow-lg">
              Link copied to clipboard!
            </div>
          )}
        </div>

        <EventActionButton
          icon={<Download className="h-4 w-4" />}
          onClick={handleAddToCalendar}
          variant="outline"
          ariaLabel="Add to calendar"
        >
          Add to Calendar
        </EventActionButton>

        <EventActionButton
          icon={<Bookmark className="h-4 w-4" />}
          onClick={handleSaveEvent}
          variant="outline"
          ariaLabel="Save event"
        >
          Save Event
        </EventActionButton>
      </div>

      {/* Tabs for Event Information */}
      <Tabs defaultValue="details" className="mb-12" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="details">Event Details</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="animate-fadeIn">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold mb-4">About This Event</h2>
            {event.description.split("\n\n").map((paragraph: string, i: number) => (
              <p key={i} className="mb-4 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Attendee Count */}
          <div className="flex items-center mt-6 text-muted-foreground">
            <Users className="h-5 w-5 mr-2" />
            <span>{event.attendees} people attending</span>
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="animate-fadeIn">
          <h2 className="text-2xl font-semibold mb-4">Event Schedule</h2>
          <EventSchedule items={event.agenda} />
        </TabsContent>

        <TabsContent value="gallery" className="animate-fadeIn">
          <h2 className="text-2xl font-semibold mb-4">Event Gallery</h2>
          {event.additionalImages && event.additionalImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {event.additionalImages.map((img: string, index: number) => (
                <div
                  key={index}
                  className="relative h-60 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`${event.title} - Image ${index + 1}`}
                    fill
                    className="object-cover transition-transform hover:scale-105 duration-500"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No gallery images available for this event.</p>
          )}
        </TabsContent>
      </Tabs>

      {/* Related Events */}
      {relatedEvents.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Related Events You Might Like</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedEvents.map((relatedEvent) => (
              <RelatedEventCard
                key={relatedEvent.id}
                id={relatedEvent.id}
                title={relatedEvent.title}
                date={relatedEvent.date}
                time={relatedEvent.time}
                image={relatedEvent.image}
                status={relatedEvent.status}
              />
            ))}
          </div>
        </div>
      )}

      {/* Back to Events Button */}
      <div className="text-center mt-12">
        <Button onClick={handleGoBack} className="flex items-center mx-auto group">
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to All Events
        </Button>
      </div>
    </main>
  )
}

