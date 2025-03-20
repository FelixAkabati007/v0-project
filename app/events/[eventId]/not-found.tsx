import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

export default function EventNotFound() {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
      <p className="text-xl text-muted-foreground mb-8">
        The event you're looking for doesn't exist or has been removed.
      </p>
      <Button asChild>
        <Link href="/events">
          <Calendar className="mr-2 h-4 w-4" />
          View All Events
        </Link>
      </Button>
    </div>
  )
}

