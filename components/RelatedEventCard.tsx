"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface RelatedEventCardProps {
  id: string
  title: string
  date: string
  time: string
  image: string
  status: string
}

export function RelatedEventCard({ id, title, date, time, image, status }: RelatedEventCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col h-full group hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105 duration-500"
        />
        <Badge variant="outline" className="absolute top-4 left-4 bg-green-50 text-green-700 border-green-200">
          {status}
        </Badge>
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span>{time}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button
          variant="outline"
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
          asChild
        >
          <Link href={`/events/${id}`} className="flex items-center justify-center">
            View Event
            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

