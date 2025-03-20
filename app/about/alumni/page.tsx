import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const alumniProfiles = [
  {
    name: "Dr. Kwabena Owusu",
    graduationYear: 2005,
    achievement: "Renowned Cardiologist at Korle-Bu Teaching Hospital",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    name: "Ms. Adwoa Amoako",
    graduationYear: 2010,
    achievement: "Award-winning Journalist at Ghana Broadcasting Corporation",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    name: "Mr. Kofi Adu",
    graduationYear: 2008,
    achievement: "CEO of a successful tech startup in Accra",
    image: "/placeholder.svg?height=150&width=150",
  },
  // Add more alumni profiles as needed
]

export default function AlumniPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Distinguished Alumni</h1>
      <p className="text-center mb-12 max-w-2xl mx-auto">
        Ejisuman Senior High School takes pride in the accomplishments of our alumni. Here are some of our graduates who
        have made significant contributions in their fields.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {alumniProfiles.map((alumni, index) => (
          <Card key={index}>
            <CardHeader>
              <Image
                src={alumni.image || "/placeholder.svg"}
                alt={alumni.name}
                width={150}
                height={150}
                className="rounded-full mx-auto"
              />
              <CardTitle className="text-center mt-4">{alumni.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center font-semibold">Class of {alumni.graduationYear}</p>
              <p className="text-center mt-2">{alumni.achievement}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

