import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, Users, Shield, Phone } from "lucide-react"

export default function HousingPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Student Housing</h1>

        {/* Overview */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Comfortable Living Spaces</h2>
              <p className="mb-4">
                Our student housing facilities provide a comfortable and conducive environment for learning and personal
                growth. Each dormitory is equipped with modern amenities and supervised by experienced house staff.
              </p>
              <Button>Apply for Housing</Button>
            </div>
            <Image
              src="/placeholder.svg?height=300&width=500"
              alt="Student Dormitory"
              width={500}
              height={300}
              className="rounded-lg"
            />
          </div>
        </section>

        {/* Dormitories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Our Dormitories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Unity House",
                type: "Boys' Dormitory",
                capacity: "200 students",
                features: ["Study area", "Common room", "Prayer room", "Laundry facilities"],
              },
              {
                name: "Peace House",
                type: "Girls' Dormitory",
                capacity: "200 students",
                features: ["Study area", "Common room", "Prayer room", "Laundry facilities"],
              },
              {
                name: "Excellence House",
                type: "Girls' Dormitory",
                capacity: "150 students",
                features: ["Study area", "Common room", "Prayer room", "Laundry facilities"],
              },
              {
                name: "Victory House",
                type: "Boys' Dormitory",
                capacity: "150 students",
                features: ["Study area", "Common room", "Prayer room", "Laundry facilities"],
              },
              {
                name: "Faith House",
                type: "Girls' Dormitory",
                capacity: "180 students",
                features: ["Study area", "Common room", "Prayer room", "Laundry facilities"],
              },
              {
                name: "Hope House",
                type: "Boys' Dormitory",
                capacity: "180 students",
                features: ["Study area", "Common room", "Prayer room", "Laundry facilities"],
              },
            ].map((dorm, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{dorm.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{dorm.type}</p>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">
                    <strong>Capacity:</strong> {dorm.capacity}
                  </p>
                  <h4 className="font-semibold mb-2">Features:</h4>
                  <ul className="list-disc list-inside">
                    {dorm.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Facilities & Services */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Facilities & Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                icon: Home,
                title: "Accommodation",
                description: "Modern dormitory facilities with essential amenities",
              },
              {
                icon: Users,
                title: "House Staff",
                description: "24/7 supervision and support from experienced house parents",
              },
              {
                icon: Shield,
                title: "Security",
                description: "Round-the-clock security personnel and CCTV surveillance",
              },
              {
                icon: Phone,
                title: "Support",
                description: "Immediate assistance for any concerns or emergencies",
              },
            ].map((facility, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="mb-4 flex justify-center">
                    <facility.icon className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle className="text-center">{facility.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center">{facility.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Rules & Guidelines */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Dormitory Rules & Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-2">General Rules</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Maintain cleanliness and orderliness</li>
                    <li>Respect quiet hours (9:00 PM - 5:00 AM)</li>
                    <li>No unauthorized visitors allowed</li>
                    <li>Proper dress code must be observed</li>
                    <li>Report maintenance issues promptly</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Daily Schedule</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>5:00 AM - Wake up</li>
                    <li>6:00 AM - Morning assembly</li>
                    <li>7:00 AM - Breakfast</li>
                    <li>7:30 AM - Classes begin</li>
                    <li>9:00 PM - Lights out</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact Information */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Housing Office</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>Location: Administrative Block, Ground Floor</li>
                  <li>Phone: +233 244 027477</li>
                  <li>Email: housing@ejisumanshs.edu.gh</li>
                  <li>Hours: Monday - Friday, 8:00 AM - 4:00 PM</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Emergency Contacts</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>Security Office: +233 244 027478</li>
                  <li>House Parents: +233 244 027479</li>
                  <li>Health Services: +233 244 027480</li>
                  <li>School Emergency: +233 244 027481</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}

