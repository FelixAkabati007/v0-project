"use client"
import NextImage from "next/image" // Renamed to avoid conflict with browser's Image constructor
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Palette, Utensils, Book, Microscope, ArrowRight } from "lucide-react"
import NewsCard from "@/components/NewsCard"
import EventCard from "@/components/EventCard"
import TestimonialCard from "@/components/TestimonialCard"
import StyledButton from "@/components/StyledButton"
import StyledVirtualTourButton from "@/components/StyledVirtualTourButton"
import SocialMediaIcons from "@/components/SocialMediaIcons"
import MobileSocialIcons from "@/components/MobileSocialIcons"

const programs = [
  {
    name: "Science",
    icon: Microscope,
    description: "Comprehensive science education covering Physics, Chemistry, and Biology.",
    subjects: ["Physics", "Chemistry", "Biology", "Mathematics", "ICT"],
  },
  {
    name: "General Arts",
    icon: Book,
    description: "A well-rounded program focusing on literature, history, and social sciences.",
    subjects: ["Literature", "History", "Government", "French", "Economics"],
  },
  {
    name: "Business",
    icon: GraduationCap,
    description: "Preparing future business leaders with a focus on commerce and economics.",
    subjects: ["Accounting", "Business Management", "Economics", "Mathematics", "ICT"],
  },
  {
    name: "Visual Arts",
    icon: Palette,
    description: "Nurturing creativity through various forms of visual expression and design.",
    subjects: ["Graphic Design", "Picture Making", "Sculpture", "Textiles", "Art History"],
  },
  {
    name: "Home Economics",
    icon: Utensils,
    description: "Developing skills in nutrition, food science, and family resource management.",
    subjects: ["Food and Nutrition", "Clothing and Textiles", "Management in Living", "General Knowledge in Art"],
  },
  {
    name: "Agricultural Science",
    icon: GraduationCap,
    description: "Exploring modern farming techniques and agricultural studies.",
    subjects: ["Crop Science", "Animal Science", "Agricultural Economics", "Soil Science", "ICT in Agriculture"],
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Social Media Icons - Desktop */}
      <SocialMediaIcons />

      {/* Social Media Icons - Mobile */}
      <MobileSocialIcons />

      {/* Hero Section - Adjusted for proper spacing with navbar */}
      <section className="relative h-[600px] mt-0">
        <NextImage
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/entrance.jpg-ObyaPSDHPCX2UCdsFAe4Hwtw26N3TW.jpeg"
          alt="School Entrance"
          fill
          className="object-cover brightness-50"
          priority
          sizes="100vw"
          quality={85}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto text-center text-white space-y-6 px-4">
            <div className="mb-4">
              <NextImage
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ejisuman%20logo-fotor-bg-remover-2024111252452-PdjjFdQdmWdtGULMkf70SUH6pdiATB.png"
                alt="Ejisuman SHS Logo"
                width={100}
                height={100}
                className="mx-auto"
              />
            </div>
            <Badge variant="secondary" className="animate-bounce">
              2025 Admissions Open
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold">Excellence Through Knowledge</h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Join one of Ghana's premier educational institutions
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <StyledButton onClick={() => window.open("https://cssps.gov.gh", "_blank", "noopener,noreferrer")}>
                Apply Now
              </StyledButton>
              <Dialog>
                <DialogTrigger asChild>
                  <StyledVirtualTourButton />
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>Virtual Campus Tour</DialogTitle>
                  </DialogHeader>
                  <div className="aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/ue4I7D7rCtQ"
                      title="Campus Tour"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      className="rounded-lg"
                      loading="lazy"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </section>

      {/* News Ticker */}
      <div className="bg-blue-600 text-white py-3 relative overflow-hidden w-full">
        <div className="container mx-auto flex items-center gap-4 px-4">
          <Badge variant="secondary" className="shrink-0 z-10">
            ANNOUNCEMENTS
          </Badge>
          <div className="overflow-hidden flex-1">
            <p className="animate-marquee whitespace-nowrap">
              WASSCE Registration Ends: June 25, 2025 | STEM Innovation Fair: March 15, 2025 | School Reopens: April 2,
              2025
            </p>
          </div>
        </div>
      </div>

      {/* Featured Programs */}
      <section className="py-16 relative">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <NextImage
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/277562395_2105614266281390_2540904585725087741_n.jpg-0zrLC9aGW42Yn7aardRJMH8PjCNYb2.jpeg"
            alt="Classroom Environment"
            fill
            className="object-cover"
            loading="lazy"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/80" /> {/* Darker overlay */}
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Our Programs</h2>
          <Tabs defaultValue="arts" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:max-w-[600px] mx-auto mb-8">
              <TabsTrigger value="science">Science</TabsTrigger>
              <TabsTrigger value="arts">Arts & Business</TabsTrigger>
              <TabsTrigger value="vocational">Vocational</TabsTrigger>
            </TabsList>
            {["science", "arts", "vocational"].map((tab) => (
              <TabsContent key={tab} value={tab} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {programs
                    .filter((p) => {
                      if (tab === "science") return ["Science", "Agricultural Science"].includes(p.name)
                      if (tab === "arts") return ["General Arts", "Business", "Visual Arts"].includes(p.name)
                      return ["Home Economics"].includes(p.name)
                    })
                    .map((program, i) => (
                      <Card
                        key={i}
                        className="bg-white/10 backdrop-blur-sm border-gray-500/30 hover:bg-white/20 transition-all duration-300"
                      >
                        <CardHeader>
                          <div className="mb-4 flex justify-center">
                            <program.icon className="h-12 w-12 text-blue-400" />
                          </div>
                          <CardTitle className="text-center text-white">{program.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="mb-4 text-gray-300">{program.description}</p>
                          <h4 className="font-semibold mb-2 text-white">Core Subjects:</h4>
                          <ul className="list-disc list-inside text-gray-300">
                            {program.subjects.map((subject, j) => (
                              <li key={j}>{subject}</li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* News & Events - Reverted background image */}
      <section className="py-16 relative">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <NextImage
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/275753436_2091088887733928_8279317261056812606_n.jpg-rwCKjZRMiKnhnUT2MK7OmS30A9sEXp.jpeg"
            alt="School Community"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/75" /> {/* Dark overlay */}
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-center mb-12 text-white animate-fade-in">
            Latest News & Upcoming Events
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-semibold mb-6 text-white relative overflow-hidden">
                <span className="inline-block animate-slide-in-right">School News</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 animate-expand-line"></span>
              </h3>
              <div className="space-y-6 perspective-1000">
                <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                  <NewsCard
                    title="Ejisuman SHS Wins Regional Science Quiz Competition"
                    date="May 15, 2025"
                    excerpt="Our school's science team emerged victorious in the annual regional science quiz competition..."
                    image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/449679956_527620749623606_3286520815248241865_n.jpg-HNLWAd36PG3Zio51ScWW7o8cyWlw5d.jpeg"
                    className="bg-white/95 backdrop-blur-sm"
                  />
                </div>
                <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                  <NewsCard
                    title="New Computer Lab Inaugurated"
                    date="April 3, 2025"
                    excerpt="State-of-the-art computer lab with 50 new workstations was inaugurated to enhance our ICT education..."
                    image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/305752815_488264239975475_6265696827532764525_n.jpg-9ehqXe7zjcNU3XGup7foej20X9wXJ3.jpeg"
                    className="bg-white/95 backdrop-blur-sm"
                  />
                </div>
              </div>
              <div className="mt-6 text-center animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                <Button
                  variant="secondary"
                  asChild
                  className="bg-white hover:bg-gray-100 transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  <Link href="/news">View All News</Link>
                </Button>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-white relative overflow-hidden">
                <span className="inline-block animate-slide-in-right" style={{ animationDelay: "0.2s" }}>
                  Upcoming Events
                </span>
                <span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 animate-expand-line"
                  style={{ animationDelay: "0.4s" }}
                ></span>
              </h3>
              <div className="space-y-4">
                <EventCard
                  title="Parent-Teacher Conference"
                  date="June 10, 2025"
                  location="School Auditorium"
                  className="bg-white/95 backdrop-blur-sm"
                />
                <EventCard
                  title="Inter-House Sports Competition"
                  date="July 5-7, 2025"
                  location="School Sports Complex"
                  className="bg-white/95 backdrop-blur-sm"
                />
                <EventCard
                  title="Career Day"
                  date="August 15, 2025"
                  location="School Hall"
                  className="bg-white/95 backdrop-blur-sm"
                />
              </div>
              <div className="mt-6 text-center">
                <Button variant="secondary" asChild className="bg-white hover:bg-gray-100">
                  <Link href="/events">View Full Calendar</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 relative">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <NextImage
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/275753436_2091088887733928_8279317261056812606_n.jpg-rwCKjZRMiKnhnUT2MK7OmS30A9sEXp.jpeg"
            alt="School Event"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/75" /> {/* Dark overlay */}
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">What Our Students Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Ejisuman SHS has provided me with incredible opportunities to grow both academically and personally."
              author="Kwame Agyei"
              role="Class of 2024"
              image="/placeholder.svg?height=100&width=100"
              className="bg-white/95 backdrop-blur-sm"
            />
            <TestimonialCard
              quote="The teachers here are dedicated and always willing to go the extra mile to ensure we understand the material."
              author="Ama Serwaa"
              role="Class of 2023"
              image="/placeholder.svg?height=100&width=100"
              className="bg-white/95 backdrop-blur-sm"
            />
            <TestimonialCard
              quote="I've made lifelong friends and unforgettable memories at Ejisuman. It's more than just a school; it's a community."
              author="Kofi Mensah"
              role="Class of 2025"
              image="/placeholder.svg?height=100&width=100"
              className="bg-white/95 backdrop-blur-sm"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-blue-700 via-indigo-600 to-blue-500 text-white shadow-lg">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Community?</h2>
          <p className="text-xl mb-8">Take the first step towards a bright future at Ejisuman Senior High School.</p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-blue-600 hover:bg-blue-50 transition-colors duration-300"
            asChild
          >
            <Link href="/admissions">
              Apply Now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

