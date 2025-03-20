import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Award, Users, FileText } from "lucide-react"

export default function ResearchPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Research at Ejisuman SHS</h1>

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
              <h2 className="text-3xl font-bold mb-4">Fostering Innovation and Discovery</h2>
              <p className="max-w-2xl mx-auto">
                Empowering students to explore, discover, and contribute to scientific knowledge
              </p>
            </div>
          </div>
        </div>

        {/* Research Areas */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Our Research Focus Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Environmental Science",
                icon: BookOpen,
                description: "Studying local ecosystems and climate change impacts",
              },
              {
                title: "Renewable Energy",
                icon: Award,
                description: "Developing sustainable energy solutions for rural communities",
              },
              {
                title: "Cultural Heritage",
                icon: Users,
                description: "Preserving and documenting local traditions and history",
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
                  <p className="text-center">{area.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Student Research Projects */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Student Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Biodiversity Survey of Local Forest",
                students: "Form 3 Biology Students",
                description: "Comprehensive study of plant and animal species in nearby forest reserve.",
              },
              {
                title: "Solar-Powered Water Purification System",
                students: "Form 2 Physics Students",
                description: "Design and implementation of a low-cost water purification system for rural areas.",
              },
            ].map((project, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{project.students}</p>
                </CardHeader>
                <CardContent>
                  <p>{project.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Research Resources */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Research Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Library Access</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Explore our extensive collection of research materials and journals.</p>
                <Button variant="outline" className="w-full">
                  <FileText className="mr-2 h-4 w-4" /> Access Library
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Research Mentorship</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Get guidance from experienced teachers and external experts.</p>
                <Button variant="outline" className="w-full">
                  <Users className="mr-2 h-4 w-4" /> Find a Mentor
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Research Symposium</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Annual event to showcase student research projects.</p>
                <Button variant="outline" className="w-full">
                  <Award className="mr-2 h-4 w-4" /> Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}

