import Image from "next/image"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

const sports = [
  { name: "Football", image: "/placeholder.svg?height=200&width=300" },
  { name: "Basketball", image: "/placeholder.svg?height=200&width=300" },
  { name: "Athletics", image: "/placeholder.svg?height=200&width=300" },
  { name: "Volleyball", image: "/placeholder.svg?height=200&width=300" },
  { name: "Table Tennis", image: "/placeholder.svg?height=200&width=300" },
  { name: "Badminton", image: "/placeholder.svg?height=200&width=300" },
]

export default function SportsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Sports & Athletics</h1>
      <p className="text-center mb-12 max-w-2xl mx-auto">
        Ejisuman Senior High School is committed to promoting physical fitness and sportsmanship. Our sports program
        offers various opportunities for students to excel in athletics and develop teamwork skills.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sports.map((sport, index) => (
          <Card key={index}>
            <Image
              src={sport.image || "/placeholder.svg"}
              alt={sport.name}
              width={300}
              height={200}
              className="w-full h-48 object-cover"
            />
            <CardHeader>
              <CardTitle className="text-center">{sport.name}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}

