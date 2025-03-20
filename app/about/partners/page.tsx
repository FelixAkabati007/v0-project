import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const partners = [
  {
    name: "Ghana Education Service",
    description: "Overseeing body for pre-tertiary education in Ghana",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ghana_Education_Service_logo_white-e088UhSFkspP2yAtkJZ2a7PLFWAFDT.png",
  },
  {
    name: "Ashanti Regional Coordinating Council",
    description: "Local government partner for educational initiatives",
    logo: "/placeholder.svg?height=100&width=200",
  },
  {
    name: "University of Ghana",
    description: "Academic partner for advanced learning opportunities",
    logo: "/placeholder.svg?height=100&width=200",
  },
  // Add more partners as needed
]

export default function PartnersPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Partners</h1>
      <p className="text-center mb-12 max-w-2xl mx-auto">
        Ejisuman Senior High School collaborates with various organizations to enhance the educational experience of our
        students and contribute to the broader community.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {partners.map((partner, index) => (
          <Card key={index}>
            <CardHeader>
              <Image
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                width={200}
                height={100}
                className="mx-auto object-contain h-24"
              />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-center mb-2">{partner.name}</CardTitle>
              <p className="text-center text-muted-foreground">{partner.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

