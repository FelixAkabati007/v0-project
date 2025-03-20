import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const clubs = [
  { name: "Science Club", description: "Explore scientific concepts through experiments and projects" },
  { name: "Debate Society", description: "Develop critical thinking and public speaking skills" },
  { name: "Art Club", description: "Express creativity through various art forms" },
  { name: "Environmental Club", description: "Promote environmental awareness and sustainability" },
  { name: "Chess Club", description: "Enhance strategic thinking and problem-solving skills" },
  { name: "Drama Club", description: "Explore theatrical arts and stage performances" },
]

export default function ClubsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Clubs & Societies</h1>
      <p className="text-center mb-12 max-w-2xl mx-auto">
        At Ejisuman Senior High School, we offer a wide range of clubs and societies to enrich our students' educational
        experience and help them develop their interests and skills outside the classroom.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map((club, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{club.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{club.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

