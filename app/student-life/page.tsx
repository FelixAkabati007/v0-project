import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const activities = [
  {
    name: "Sports",
    description: "Participate in various sports including football, basketball, and athletics.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/449679956_527620749623606_3286520815248241865_n.jpg-HNLWAd36PG3Zio51ScWW7o8cyWlw5d.jpeg",
  },
  {
    name: "Clubs & Societies",
    description: "Join academic clubs, debate society, or cultural groups.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/305752815_488264239975475_6265696827532764525_n.jpg-9ehqXe7zjcNU3XGup7foej20X9wXJ3.jpeg",
  },
  {
    name: "Community Service",
    description: "Engage in local community projects and volunteer work.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/417396470_929068291928012_3435120046188306092_n.jpg-Lq61HiiZ2qssINwLkibKFnL2yAMzDs.jpeg",
  },
  {
    name: "Arts & Culture",
    description: "Express yourself through drama, music, and cultural festivals.",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function StudentLifePage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Student Life at Ejisuman SHS</h1>

        <section className="mb-12">
          <p className="text-lg mb-4">
            At Ejisuman Senior High School, we believe in nurturing well-rounded individuals. Our vibrant campus life
            offers numerous opportunities for students to explore their interests, develop new skills, and create
            lasting memories.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Extracurricular Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activities.map((activity, index) => (
              <Card key={index} className="overflow-hidden">
                <Image
                  src={activity.image || "/placeholder.svg"}
                  alt={activity.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <CardTitle>{activity.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{activity.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Campus Facilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Modern Dormitories", description: "Comfortable living spaces fostering a sense of community." },
              { name: "Dining Hall", description: "Nutritious meals served in our spacious dining facility." },
              { name: "Recreation Areas", description: "Spaces for relaxation and socializing during free time." },
              { name: "Sports Facilities", description: "Well-maintained fields and courts for various sports." },
              { name: "Health Center", description: "On-campus clinic providing basic healthcare services." },
              { name: "Student Center", description: "A hub for student activities and gatherings." },
            ].map((facility, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl">{facility.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{facility.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6">Student Support Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Academic Advising</h3>
              <p>
                Our dedicated faculty provides personalized academic guidance to help students excel in their studies
                and prepare for future careers.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Counseling Services</h3>
              <p>
                Professional counselors are available to support students' mental health and personal development
                throughout their academic journey.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Career Services</h3>
              <p>
                Our career center offers guidance on internships, job opportunities, and further education to help
                students plan for their future after graduation.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Tutoring Programs</h3>
              <p>
                Peer tutoring and extra help sessions are available to support students in challenging subjects and
                promote collaborative learning.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

