"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Youtube, Menu, Star } from "lucide-react"

export default function SchoolWebsite() {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="bg-[#02162b] text-white sticky top-0 z-50 border-b border-border/40">
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/favicon.ico-FLH9UaL4SthyMPodGqsyZY6GYxApWZ.png"
              alt="School Logo"
              width={50}
              height={50}
              className="w-12 h-12"
            />
            <h1 className="text-xl font-serif hidden md:block">EJISUMAN SENIOR HIGH SCHOOL</h1>
          </div>
          <div className="hidden lg:flex items-center gap-6">
            <Link href="#home" className="hover:text-primary-foreground transition-colors">
              HOME
            </Link>
            <Link href="#admissions" className="hover:text-primary-foreground transition-colors">
              ADMISSIONS
            </Link>
            <Link href="#academics" className="hover:text-primary-foreground transition-colors">
              ACADEMICS
            </Link>
            <Link href="#facilities" className="hover:text-primary-foreground transition-colors">
              FACILITIES
            </Link>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary">Check CSSPS</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Check Your CSSPS Placement</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/276325051_2101406356702181_5387610399561603644_n.jpg-L2ZUJFc4rdz5rRdl5745Gbub2TlKth.jpeg"
                    alt="CSSPS Instructions"
                    width={500}
                    height={300}
                    className="rounded-lg"
                  />
                  <div className="space-y-2">
                    <h3 className="font-semibold">Follow these steps:</h3>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Dial *920*44#</li>
                      <li>Select option (2)</li>
                      <li>Enter your index number</li>
                      <li>Confirm your details</li>
                    </ol>
                  </div>
                  <Button onClick={() => (window.location.href = "https://cssps.gov.gh")}>Visit CSSPS Portal</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <Button variant="ghost" className="lg:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[600px]">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/entrance.jpg-ObyaPSDHPCX2UCdsFAe4Hwtw26N3TW.jpeg"
          alt="School Entrance"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto text-center text-white space-y-6">
            <Badge variant="secondary" className="animate-bounce">
              2025 Admissions Open
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold">Excellence Through Knowledge</h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Join one of Ghana's premier educational institutions
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Apply Now
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                    Virtual Tour
                  </Button>
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
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </section>

      {/* News Ticker */}
      <div className="bg-blue-600 text-white py-3">
        <div className="container mx-auto flex items-center gap-4 overflow-hidden">
          <Badge variant="secondary" className="shrink-0">
            ANNOUNCEMENTS
          </Badge>
          <p className="animate-marquee whitespace-nowrap">
            WASSCE Registration Ends: June 25, 2025 | STEM Innovation Fair: March 15, 2025 | School Reopens: April 2,
            2025
          </p>
        </div>
      </div>

      {/* Programs Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Academic Programs</h2>
          <Tabs defaultValue="science" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:max-w-[400px] mx-auto mb-8">
              <TabsTrigger value="science">Science</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
              <TabsTrigger value="arts">Arts</TabsTrigger>
            </TabsList>
            <TabsContent value="science" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Pure Science",
                    description: "Core science subjects with advanced laboratory work",
                    image:
                      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/305752815_488264239975475_6265696827532764525_n.jpg-9ehqXe7zjcNU3XGup7foej20X9wXJ3.jpeg",
                  },
                  {
                    title: "Agricultural Science",
                    description: "Modern farming techniques and agricultural studies",
                    image: "/placeholder.svg?height=200&width=300",
                  },
                  {
                    title: "Technical Drawing",
                    description: "Engineering graphics and technical design",
                    image: "/placeholder.svg?height=200&width=300",
                  },
                ].map((program, i) => (
                  <Card key={i} className="overflow-hidden">
                    <Image
                      src={program.image || "/placeholder.svg"}
                      alt={program.title}
                      width={300}
                      height={200}
                      className="w-full object-cover h-48"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-bold mb-2">{program.title}</h3>
                      <p className="text-gray-600">{program.description}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            {/* Similar TabsContent for Business and Arts */}
          </Tabs>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Recent Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/449679956_527620749623606_3286520815248241865_n.jpg-HNLWAd36PG3Zio51ScWW7o8cyWlw5d.jpeg"
                alt="Quiz Competition"
                width={500}
                height={300}
                className="rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Regional Quiz Champions</h3>
              <p className="text-gray-600">
                Our students emerged victorious in the 2024 Regional Science and Maths Quiz Competition
              </p>
            </Card>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-lg font-semibold">Top WASSCE Performance</span>
              </div>
              <p className="text-gray-600">
                Consistently ranked among the top schools in the Ashanti Region for WASSCE results
              </p>
              <Button variant="outline" className="w-full">
                View All Achievements
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-[#02162b] text-white py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Mail className="h-5 w-5" />
                  <p>info@ejisumanshs.edu.gh</p>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="h-5 w-5" />
                  <p>+233 244 027477</p>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="h-5 w-5" />
                  <p>Ejisu-Ashanti, Ghana</p>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Link href="https://facebook.com" className="hover:text-blue-400 transition-colors">
                  <Facebook className="h-6 w-6" />
                </Link>
                <Link href="https://twitter.com" className="hover:text-blue-400 transition-colors">
                  <Twitter className="h-6 w-6" />
                </Link>
                <Link href="https://instagram.com" className="hover:text-pink-400 transition-colors">
                  <Instagram className="h-6 w-6" />
                </Link>
                <Link href="https://youtube.com" className="hover:text-red-400 transition-colors">
                  <Youtube className="h-6 w-6" />
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <Input type="text" placeholder="Name" className="bg-white/10 border-white/20" />
              <Input type="email" placeholder="Email" className="bg-white/10 border-white/20" />
              <textarea
                className="w-full h-32 bg-white/10 border-white/20 rounded-md p-3 text-white placeholder:text-white/60"
                placeholder="Message"
              />
              <Button className="w-full">Send Message</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#011424] text-white py-8">
        <div className="container mx-auto text-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ghana_Education_Service_logo_white-e088UhSFkspP2yAtkJZ2a7PLFWAFDT.png"
            alt="Ghana Education Service"
            width={100}
            height={100}
            className="mx-auto mb-4 opacity-80"
          />
          <p className="text-sm text-gray-400">&copy; 2024 Ejisuman Senior High School. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

