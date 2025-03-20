import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Phone, Mail, Clock } from "lucide-react"

export default function CounselingPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Counseling Services</h1>

        {/* Services Overview */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Academic Counseling",
                description: "Get guidance on course selection, study strategies, and academic planning",
                icon: Calendar,
              },
              {
                title: "Personal Counseling",
                description: "Confidential support for personal, emotional, and social concerns",
                icon: Phone,
              },
              {
                title: "Career Guidance",
                description: "Explore career paths, universities, and future opportunities",
                icon: Mail,
              },
            ].map((service, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="mb-4 flex justify-center">
                    <service.icon className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle className="text-center">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Meet Our Counselors */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Our Counselors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Mr. Kwame Mensah",
                role: "Head Counselor",
                specialization: "Academic & Career Guidance",
                availability: "Monday - Friday",
              },
              {
                name: "Mrs. Abena Osei",
                role: "Student Counselor",
                specialization: "Personal & Social Development",
                availability: "Tuesday - Thursday",
              },
              {
                name: "Dr. Yaw Addo",
                role: "Career Advisor",
                specialization: "University Applications & Career Planning",
                availability: "Wednesday - Friday",
              },
            ].map((counselor, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{counselor.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{counselor.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">
                    <strong>Specialization:</strong> {counselor.specialization}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {counselor.availability}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Appointment Booking */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Book an Appointment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">How to Book</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Visit the counseling office
                    </li>
                    <li className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Call: +233 244 027477
                    </li>
                    <li className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email: counseling@ejisumanshs.edu.gh
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Office Hours</h3>
                  <ul className="space-y-2">
                    <li>Monday - Friday: 8:00 AM - 4:00 PM</li>
                    <li>Saturday: 9:00 AM - 12:00 PM</li>
                    <li>Emergency contact available 24/7</li>
                  </ul>
                </div>
              </div>
              <Button className="mt-6">Schedule Appointment</Button>
            </CardContent>
          </Card>
        </section>

        {/* Resources */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Self-Help Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>Study Skills Guides</li>
                  <li>Stress Management Tips</li>
                  <li>Time Management Strategies</li>
                  <li>Career Planning Tools</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Emergency Contacts</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>School Emergency: +233 244 027477</li>
                  <li>National Crisis Line: 112</li>
                  <li>Health Services: +233 244 027478</li>
                  <li>Security Office: +233 244 027479</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}

