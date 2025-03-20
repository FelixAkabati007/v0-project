import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MissionVisionPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Mission and Vision</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              To provide quality education that empowers students to become critical thinkers, responsible citizens, and
              future leaders in their communities and beyond.
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
      <div>
        <h2 className="text-2xl font-bold mb-4">Our Core Values</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Excellence in all endeavors</li>
          <li>Integrity and ethical conduct</li>
          <li>Respect for diversity and inclusion</li>
          <li>Community service and social responsibility</li>
          <li>Continuous learning and innovation</li>
        </ul>
      </div>
    </div>
  )
}

