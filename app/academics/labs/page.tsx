import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FlaskRoundIcon as Flask, Microscope, Calculator } from "lucide-react"

export default function LabsPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Science Laboratories</h1>

        {/* Hero Section */}
        <div className="relative h-[300px] mb-12 rounded-lg overflow-hidden">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/305752815_488264239975475_6265696827532764525_n.jpg-9ehqXe7zjcNU3XGup7foej20X9wXJ3.jpeg"
            alt="Science Laboratory"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-3xl font-bold mb-4">State-of-the-Art Facilities</h2>
              <p className="max-w-2xl mx-auto">
                Our laboratories are equipped with modern equipment to support hands-on learning and scientific
                discovery
              </p>
            </div>
          </div>
        </div>

        {/* Lab Types */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Our Laboratories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Physics Lab",
                icon: Calculator,
                description: "Equipped for mechanics, electricity, and modern physics experiments",
                equipment: ["Oscilloscopes", "Wave Generators", "Optical Benches", "Electric Circuits"],
              },
              {
                title: "Chemistry Lab",
                icon: Flask,
                description: "Facilities for organic and inorganic chemistry experiments",
                equipment: ["Fume Hoods", "Spectrophotometers", "Analytical Balances", "Glassware"],
              },
              {
                title: "Biology Lab",
                icon: Microscope,
                description: "Setup for microscopy and life science experiments",
                equipment: ["Microscopes", "Dissection Kits", "Specimen Collections", "Culture Equipment"],
              },
            ].map((lab, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="mb-4 flex justify-center">
                    <lab.icon className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle className="text-center">{lab.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-center">{lab.description}</p>
                  <h4 className="font-semibold mb-2">Key Equipment:</h4>
                  <ul className="list-disc list-inside">
                    {lab.equipment.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Lab Safety */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Laboratory Safety Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>General Safety Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  <li>Always wear appropriate safety gear</li>
                  <li>No food or drinks in the laboratory</li>
                  <li>Follow all instructions carefully</li>
                  <li>Report any accidents immediately</li>
                  <li>Know the location of safety equipment</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Emergency Procedures</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  <li>Know the emergency exits</li>
                  <li>Familiarize with fire extinguisher locations</li>
                  <li>Learn proper chemical spill procedures</li>
                  <li>Keep emergency contact numbers handy</li>
                  <li>Practice evacuation procedures</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Lab Schedule */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Laboratory Schedule</h2>
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    day: "Monday - Wednesday",
                    schedule: [
                      "8:00 AM - 10:00 AM: Form 1 Science",
                      "10:30 AM - 12:30 PM: Form 2 Science",
                      "2:00 PM - 4:00 PM: Form 3 Science",
                    ],
                  },
                  {
                    day: "Thursday - Friday",
                    schedule: [
                      "8:00 AM - 10:00 AM: Physics Practicals",
                      "10:30 AM - 12:30 PM: Chemistry Practicals",
                      "2:00 PM - 4:00 PM: Biology Practicals",
                    ],
                  },
                  {
                    day: "Saturday",
                    schedule: [
                      "9:00 AM - 11:00 AM: Science Club",
                      "11:30 AM - 1:30 PM: Special Projects",
                      "2:00 PM - 4:00 PM: Lab Maintenance",
                    ],
                  },
                ].map((timeSlot, index) => (
                  <div key={index}>
                    <h3 className="font-semibold mb-2">{timeSlot.day}</h3>
                    <ul className="space-y-1 text-sm">
                      {timeSlot.schedule.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}

