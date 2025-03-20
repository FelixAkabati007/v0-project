import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Award, Users } from "lucide-react"

export default function ResearchPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Research & Projects</h1>

        {/* Hero Section */}
        <div className="relative h-[300px] mb-12 rounded-lg overflow-hidden">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/305752815_488264239975475_6265696827532764525_n.jpg-9ehqXe7zjcNU3XGup7foej20X9wXJ3.jpeg"
            alt="Research Activities"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Fostering Innovation</h2>
              <p className="max-w-2xl mx-auto">
                Encouraging students to explore, discover, and contribute to scientific knowledge
              </p>
            </div>
          </div>
        </div>

        {/* Research Areas */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Research Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Science & Technology",
                icon: BookOpen,
                projects: [
                  "Renewable Energy Solutions",
                  "Environmental Conservation",
                  "Agricultural Innovation",
                  "Technology Integration",
                ],
              },
              {
                title: "Social Sciences",
                icon: Users,
                projects: ["Community Development", "Youth Empowerment", "Cultural Studies", "Educational Research"],
              },
              {
                title: "Innovation & Enterprise",
                icon: Award,
                projects: ["Student Startups", "Business Solutions", "Social Enterprise", "Tech Innovation"],
              },
            ].map((area, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="mb-4 flex justify-center">
                    <area.icon className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle className="text-center">{area.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2">
                    {area.projects.map((project, i) => (
                      <li key={i}>{project}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Projects */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Recent Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Solar-Powered Water Purification System",
                students: "Form 3 Science Students",
                description:
                  "Development of a cost-effective solar-powered water purification system for rural communities.",
                achievement: "Regional Science Fair Winner 2024",
              },
              {
                title: "Local Market Digital Platform",
                students: "Form 2 Business Students",
                description: "Creation of a mobile app connecting local farmers with urban markets.",
                achievement: "Best Innovation Project 2024",
              },
              {
                title: "Traditional Medicine Documentation",
                students: "Form 3 Biology Students",
                description: "Research and documentation of traditional medicinal plants in the Ejisu region.",
                achievement: "National Research Competition Finalist",
              },
              {
                title: "Waste Management Solution",
                students: "Environmental Club",
                description: "Implementation of an efficient waste segregation and recycling system in school.",
                achievement: "Environmental Innovation Award",
              },
            ].map((project, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{project.students}</p>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{project.description}</p>
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <Award className="h-4 w-4" />
                    {project.achievement}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Research Support */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Research Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Mentorship</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Get guidance from experienced teachers and industry experts.</p>
                <Button variant="outline" className="w-full">
                  Find a Mentor
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Access research materials, equipment, and funding opportunities.</p>
                <Button variant="outline" className="w-full">
                  View Resources
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Publications</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Share your research findings in our school journal.</p>
                <Button variant="outline" className="w-full">
                  Submit Research
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}

