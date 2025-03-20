import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  image: string
}

export default function TestimonialCard({ quote, author, role, image }: TestimonialCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center">
          <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4">
            <Image
              src={image || "/placeholder.svg"}
              alt={author}
              width={60}
              height={60}
              className="rounded-full object-cover"
              loading="lazy"
            />
          </div>
          <blockquote className="mb-4 text-lg italic">"{quote}"</blockquote>
          <div>
            <p className="font-semibold">{author}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

