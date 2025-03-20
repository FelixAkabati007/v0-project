"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Ejisuman Senior High School
        </motion.h1>

        <Tabs defaultValue="overview" className="mb-12">
          <TabsList className="grid w-full grid-cols-4 lg:max-w-[600px] mx-auto mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="mission">Mission & Vision</TabsTrigger>
            <TabsTrigger value="leadership">Leadership</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="mb-4">
                  Ejisuman Senior High School, established in 1970, has been a beacon of academic excellence in the
                  Ashanti Region of Ghana for over five decades. Our institution is committed to nurturing well-rounded
                  individuals who excel not only in academics but also in character and leadership.
                </p>
                <p>
                  Located in Ejisu, our school benefits from a rich cultural heritage and a supportive community that
                  values education. We pride ourselves on our state-of-the-art facilities, dedicated teaching staff, and
                  a curriculum that prepares students for the challenges of the 21st century.
                </p>
              </div>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/417396470_929068291928012_3435120046188306092_n.jpg-Lq61HiiZ2qssINwLkibKFnL2yAMzDs.jpeg"
                alt="Ejisuman Senior High School Campus"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </TabsContent>

          <TabsContent value="history">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Our Rich History</h2>
              <p>
                Ejisuman Senior High School was founded in 1970 with a vision to provide quality education to the youth
                of Ejisu and its surrounding communities. Over the past five decades, our institution has grown from a
                small local school to one of the most respected educational establishments in the Ashanti Region.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>1970s</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Founding of Ejisuman SHS with a small cohort of students and dedicated teachers.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>1980s</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Expansion of facilities and introduction of new academic programs.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>1990s</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Recognition as one of the top-performing schools in the Ashanti Region.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>2000s - Present</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Continued growth, modernization of facilities, and adaptation to 21st-century education needs.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="mission">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    To provide quality education that empowers students to become critical thinkers, responsible
                    citizens, and future leaders in their communities and beyond.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    To be the leading secondary educational institution in Ghana, recognized for academic excellence,
                    character development, and innovation in teaching and learning.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Our Core Values</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Excellence in all endeavors</li>
                <li>Integrity and ethical conduct</li>
                <li>Respect for diversity and inclusion</li>
                <li>Community service and social responsibility</li>
                <li>Continuous learning and innovation</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="leadership">
            <h2 className="text-2xl font-bold mb-8">School Leadership</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Dr. Kwame Agyeman", role: "Headmaster", image: "/placeholder.svg?height=200&width=200" },
                {
                  name: "Mrs. Abena Osei",
                  role: "Deputy Headmistress (Academics)",
                  image: "/placeholder.svg?height=200&width=200",
                },
                {
                  name: "Mr. Kofi Mensah",
                  role: "Deputy Headmaster (Administration)",
                  image: "/placeholder.svg?height=200&width=200",
                },
              ].map((leader, index) => (
                <Card key={index}>
                  <CardContent className="text-center p-6">
                    <Image
                      src={leader.image || "/placeholder.svg"}
                      alt={leader.name}
                      width={200}
                      height={200}
                      className="rounded-full mx-auto mb-4"
                    />
                    <h3 className="text-xl font-semibold">{leader.name}</h3>
                    <p className="text-muted-foreground">{leader.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

