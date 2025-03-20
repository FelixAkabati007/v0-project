import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const businessSubjects = [
  { name: "Economics", description: "Study of production, distribution, and consumption of goods and services" },
  { name: "Accounting", description: "Principles of financial record-keeping and analysis" },
  { name: "Business Management", description: "Fundamentals of organizing and running a business" },
  { name: "Entrepreneurship", description: "Developing skills to start and manage new ventures" },
]

export default function BusinessProgramPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Business Program</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
        <div>
          <p className="mb-4">
            Our business program equips students with the knowledge and skills needed to succeed in the dynamic world of
            commerce. Through a combination of theoretical learning and practical applications, students gain a solid
            foundation in business principles and practices.
          </p>
          <p>
            The program emphasizes analytical thinking, financial literacy, and entrepreneurial skills, preparing
            students for higher education in business-related fields and future careers in the corporate world or as
            entrepreneurs.
          </p>
        </div>
        <Image
          src="/placeholder.svg?height=400&width=600"
          alt="Business Classroom"
          width={600}
          height={400}
          className="rounded-lg shadow-lg"
        />
      </div>
      <h2 className="text-2xl font-bold mb-4">Core Subjects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {businessSubjects.map((subject, index) => (
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

