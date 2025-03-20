import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const leaders = [
  {
    name: "Dr. Kwame Agyeman",
    role: "Headmaster",
    bio: "Dr. Agyeman brings over 20 years of experience in education leadership to Ejisuman SHS.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Mrs. Abena Osei",
    role: "Deputy Headmistress (Academics)",
    bio: "Mrs. Osei oversees the school's academic programs and curriculum development.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Mr. Kofi Mensah",
    role: "Deputy Headmaster (Administration)",
    bio: "Mr. Mensah manages the school's administrative functions and facilities.",
    image: "/placeholder.svg?height=200&width=200",
  },
]

export default function LeadershipPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">School Leadership</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {leaders.map((leader, index) => (
          <Card key={index}>
            <CardHeader>
              <Image
                src={leader.image || "/placeholder.svg"}
                alt={leader.name}
                width={200}
                height={200}
                className="rounded-full mx-auto mb-4"
              />
              <CardTitle className="text-center">{leader.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center font-semibold mb-2">{leader.role}</p>
              <p className="text-center">{leader.bio}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

