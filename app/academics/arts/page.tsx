import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const artsSubjects = [
  { name: "Literature", description: "Study of classic and contemporary literary works" },
  { name: "History", description: "Exploration of world and Ghanaian history" },
  { name: "Government", description: "Understanding political systems and governance" },
  { name: "Visual Arts", description: "Practical and theoretical study of various art forms" },
]

export default function ArtsProgramPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Arts Program</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
        <div>
          <p className="mb-4">
            Our arts program cultivates creativity, critical thinking, and cultural awareness. Students explore a wide
            range of subjects in the humanities and creative arts, developing their analytical and expressive skills.
          </p>
          <p>
            With a focus on both traditional and contemporary forms of expression, the program prepares students for
            diverse career paths in fields such as law, journalism, education, and the creative industries.
          </p>
        </div>
        <Image
          src="/placeholder.svg?height=400&width=600"
          alt="Arts Classroom"
          width={600}
          height={400}
          className="rounded-lg shadow-lg"
        />
      </div>
      <h2 className="text-2xl font-bold mb-4">Core Subjects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {artsSubjects.map((subject, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{subject.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{subject.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

