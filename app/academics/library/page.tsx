import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Clock, Calendar } from "lucide-react"

export default function LibraryPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">School Library</h1>

        {/* Hero Section */}
        <div className="relative h-[300px] mb-12 rounded-lg overflow-hidden">
          <Image src="/placeholder.svg?height=300&width=1200" alt="School Library" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Welcome to Our Library</h2>
              <p className="max-w-2xl mx-auto">A center for learning, research, and academic excellence</p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Catalog Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Search our extensive collection of books, journals, and digital resources.</p>
              <Button>Search Catalog</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Opening Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>Monday - Friday: 8:00 AM - 5:00 PM</li>
                <li>Saturday: 9:00 AM - 2:00 PM</li>
                <li>Sunday: Closed</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Book Reservations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Reserve books online or extend your borrowing period.</p>
              <Button variant="outline">Manage Reservations</Button>
            </CardContent>
          </Card>
        </div>

        {/* Resources Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Available Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Books", count: "10,000+" },
              { title: "Journals", count: "50+" },
              { title: "Digital Resources", count: "1,000+" },
              { title: "Study Spaces", count: "30" },
            ].map((resource, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{resource.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-primary">{resource.count}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Library Rules */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Library Rules & Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">General Rules</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Maintain silence in the library</li>
                <li>No food or drinks allowed</li>
                <li>Handle books with care</li>
                <li>Return books on time</li>
                <li>Keep your library card with you</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Borrowing Policy</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Maximum 3 books at a time</li>
                <li>14 days borrowing period</li>
                <li>Renewal allowed twice</li>
                <li>Late fee: GH₵1 per day</li>
                <li>Lost books must be replaced</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

