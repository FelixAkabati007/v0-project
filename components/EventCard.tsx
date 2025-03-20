import { Calendar, MapPin } from "lucide-react"

interface EventCardProps {
  title: string
  date: string
  location: string
  className?: string
}

export default function EventCard({ title, date, location, className = "" }: EventCardProps) {
  return (
    <div className={`p-6 rounded-lg shadow-lg ${className}`}>
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      <div className="text-sm text-gray-700">
        <div className="flex items-center text-gray-500 mb-1">
          <Calendar className="h-4 w-4 mr-1" aria-hidden="true" />
          <span>{date}</span>
        </div>
        <div className="flex items-center text-gray-500">
          <MapPin className="h-4 w-4 mr-1" aria-hidden="true" />
          <span>{location}</span>
        </div>
      </div>
    </div>
  )
}

