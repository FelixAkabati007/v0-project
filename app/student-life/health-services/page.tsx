import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AmbulanceIcon as FirstAid, Phone, Clock, AlertCircle } from "lucide-react"

export default function HealthServicesPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Health Services</h1>

        {/* Emergency Contact */}
        <section className="mb-12">
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <AlertCircle className="h-8 w-8 text-red-500" />
                <div>
                  <h2 className="text-xl font-bold text-red-700">Emergency Contact</h2>
                  <p className="text-red-600">Call: +233 244 027477 (24/7 Emergency Line)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Services */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Primary Care",
                services: ["General check-ups", "Minor illness treatment", "First aid", "Health monitoring"],
              },
              {
                title: "Preventive Care",
                services: ["Vaccinations", "Health screenings", "Nutrition counseling", "Wellness programs"],
              },
              {
                title: "Mental Health",
                services: ["Counseling services", "Stress management", "Mental health support", "Crisis intervention"],
              },
            ].map((service, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2">
                    {service.services.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Staff */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Medical Staff</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Dr. Sarah Owusu",
                role: "School Physician",
                schedule: "Monday - Friday",
                specialization: "General Medicine",
              },
              {
                name: "Nurse Grace Addo",
                role: "Head Nurse",
                schedule: "Monday - Friday",
                specialization: "Emergency Care",
              },
              {
                name: "Nurse John Mensah",
                role: "School Nurse",
                schedule: "Monday - Saturday",
                specialization: "Pediatric Care",
              },
            ].map((staff, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{staff.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{staff.role}</p>
                </CardHeader>
                <CardContent>
                  <p>
                    <strong>Schedule:</strong> {staff.schedule}
                  </p>
                  <p>
                    <strong>Specialization:</strong> {staff.specialization}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Clinic Hours & Location */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Clinic Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>Monday - Friday: 7:30 AM - 5:00 PM</li>
                  <li>Saturday: 8:00 AM - 12:00 PM</li>
                  <li>Sunday: Closed (Emergency services only)</li>
                  <li>24/7 Emergency Response Available</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FirstAid className="h-5 w-5" />
                  Location & Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Located next to the Administrative Block</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Main Line: +233 244 027477
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Emergency: +233 244 027478
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Health Programs */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Health Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Wellness Initiatives</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  <li>Annual health screenings</li>
                  <li>Nutrition education programs</li>
                  <li>Physical fitness activities</li>
                  <li>Mental health awareness workshops</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Health Education</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  <li>First aid training</li>
                  <li>Personal hygiene workshops</li>
                  <li>Sexual health education</li>
                  <li>Substance abuse prevention</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}

