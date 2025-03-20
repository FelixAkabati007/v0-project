import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const scienceSubjects = [
  { name: "Physics", description: "Study of matter, energy, and their interactions" },
  { name: "Chemistry", description: "Exploration of substances, their properties, and reactions" },
  { name: "Biology", description: "Study of living organisms and their processes" },
  { name: "Mathematics", description: "Advanced mathematical concepts and problem-solving" },
]

export default function ScienceProgramPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Science Program</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
        <div>
          <p className="mb-4">
            Our science program offers a rigorous curriculum designed to prepare students for careers in STEM fields.
            With state-of-the-art laboratories and experienced faculty, students engage in hands-on experiments and
            cutting-edge research.
          </p>
          <p>
            The program emphasizes critical thinking, problem-solving, and scientific inquiry, equipping students with
            the skills needed for success in university and beyond.
          </p>
        </div>
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/305752815_488264239975475_6265696827532764525_n.jpg-9ehqXe7zjcNU3XGup7foej20X9wXJ3.jpeg"
          alt="Science Laboratory"
          width={600}
          height={400}
          className="rounded-lg shadow-lg"
        />
      </div>
      <h2 className="text-2xl font-bold mb-4">Core Subjects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scienceSubjects.map((subject, index) => (
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

