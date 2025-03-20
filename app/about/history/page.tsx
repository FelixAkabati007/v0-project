import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HistoryPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Our History</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
        <div>
          <p className="mb-4">
            Ejisuman Senior High School, established in 1970, has been a beacon of academic excellence in the Ashanti
            Region of Ghana for over five decades. Our institution was founded with the vision of providing quality
            education to the youth of Ejisu and its surrounding communities.
          </p>
          <p>
            Over the years, Ejisuman SHS has grown from a small local school to one of the most respected educational
            establishments in the region, consistently producing leaders in various fields.
          </p>
        </div>
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/417396470_929068291928012_3435120046188306092_n.jpg-Lq61HiiZ2qssINwLkibKFnL2yAMzDs.jpeg"
          alt="Ejisuman SHS in early years"
          width={600}
          height={400}
          className="rounded-lg shadow-lg"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            decade: "1970s",
            events: "Founding of Ejisuman SHS with a small cohort of students and dedicated teachers.",
          },
          {
            decade: "1980s",
            events: "Expansion of facilities and introduction of new academic programs.",
          },
          {
            decade: "1990s",
            events: "Recognition as one of the top-performing schools in the Ashanti Region.",
          },
          {
            decade: "2000s - Present",
            events: "Continued growth, modernization of facilities, and adaptation to 21st-century education needs.",
          },
        ].map((era, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{era.decade}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{era.events}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

