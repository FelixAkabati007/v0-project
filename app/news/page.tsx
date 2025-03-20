import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Calendar } from "lucide-react"
import EnhancedNewsCard from "@/components/EnhancedNewsCard"

export const metadata: Metadata = {
  title: "News | Ejisuman SHS",
  description: "Latest news and updates from Ejisuman Senior High School",
}

// Mock news data
const featuredNews = {
  id: "n1",
  title: "Ejisuman SHS Wins Regional Science Competition",
  excerpt:
    "Our science team has won the regional science competition for the third consecutive year, showcasing exceptional talent in physics and chemistry projects.",
  image: "/placeholder.svg?height=400&width=800",
  date: "2025-03-15T10:00:00Z",
  author: "School Media Team",
  readTime: "4 min read",
  category: "Achievements",
  views: 342,
}

const newsItems = [
  {
    id: "n2",
    title: "New Computer Lab Inaugurated",
    excerpt: "State-of-the-art computer laboratory with 50 workstations inaugurated to enhance ICT education.",
    image: "/placeholder.svg?height=300&width=500",
    date: "2025-03-10T14:30:00Z",
    author: "Admin",
    readTime: "3 min read",
    category: "Facilities",
    views: 287,
  },
  {
    id: "n3",
    title: "Annual Inter-House Sports Competition Results",
    excerpt:
      "Results from the recently concluded inter-house sports competition. Blue House emerges as overall champion.",
    image: "/placeholder.svg?height=300&width=500",
    date: "2025-03-05T16:00:00Z",
    author: "Sports Department",
    readTime: "5 min read",
    category: "Sports",
    views: 412,
  },
  {
    id: "n4",
    title: "WASSCE Preparation Workshop for Final Year Students",
    excerpt: "Special workshop organized to help final year students prepare for upcoming WASSCE examinations.",
    image: "/placeholder.svg?height=300&width=500",
    date: "2025-02-28T09:15:00Z",
    author: "Academic Board",
    readTime: "2 min read",
    category: "Academics",
    views: 356,
  },
  {
    id: "n5",
    title: "Alumni Donation Boosts School Library",
    excerpt: "Alumni association donates 500 new books and digital resources to enhance the school library.",
    image: "/placeholder.svg?height=300&width=500",
    date: "2025-02-20T11:45:00Z",
    author: "Library Committee",
    readTime: "3 min read",
    category: "Development",
    views: 198,
  },
  {
    id: "n6",
    title: "Cultural Day Celebration Announced",
    excerpt:
      "Annual cultural day celebration scheduled for next month. Students to showcase Ghana's rich cultural heritage.",
    image: "/placeholder.svg?height=300&width=500",
    date: "2025-02-15T13:20:00Z",
    author: "Cultural Committee",
    readTime: "2 min read",
    category: "Events",
    views: 245,
  },
]

export default function NewsPage() {
  return (
    <main className="container mx-auto px-4 py-24 animate-fadeIn">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">School News</h1>
        <p className="text-xl text-muted-foreground mt-2">Stay updated with the latest happenings</p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search news articles..." className="pl-9" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" className="flex-1">
                  <Calendar className="h-4 w-4 mr-2" />
                  Date
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Tabs */}
      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="w-full max-w-3xl mx-auto grid grid-cols-3 sm:grid-cols-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="academics">Academics</TabsTrigger>
          <TabsTrigger value="sports">Sports</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="facilities">Facilities</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {/* Featured News */}
          <div className="mb-8">
            <EnhancedNewsCard
              id={featuredNews.id}
              title={featuredNews.title}
              excerpt={featuredNews.excerpt}
              date={featuredNews.date}
              readTime={featuredNews.readTime}
              category={featuredNews.category}
              image={featuredNews.image}
              featured={true}
              views={featuredNews.views}
            />
          </div>

          {/* News Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.map((news) => (
              <EnhancedNewsCard
                key={news.id}
                id={news.id}
                title={news.title}
                excerpt={news.excerpt}
                date={news.date}
                readTime={news.readTime}
                category={news.category}
                image={news.image}
                views={news.views}
              />
            ))}
          </div>
        </TabsContent>

        {/* Other tab contents would filter by category */}
        <TabsContent value="achievements" className="mt-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[featuredNews, ...newsItems]
              .filter((news) => news.category === "Achievements")
              .map((news) => (
                <EnhancedNewsCard
                  key={news.id}
                  id={news.id}
                  title={news.title}
                  excerpt={news.excerpt}
                  date={news.date}
                  readTime={news.readTime}
                  category={news.category}
                  image={news.image}
                  views={news.views}
                />
              ))}
          </div>
        </TabsContent>

        {/* Similar TabsContent for other categories */}
      </Tabs>

      {/* Pagination */}
      <div className="flex justify-center mt-12">
        <div className="flex space-x-2">
          <Button variant="outline" disabled>
            Previous
          </Button>
          <Button variant="outline" className="bg-primary text-primary-foreground">
            1
          </Button>
          <Button variant="outline">2</Button>
          <Button variant="outline">3</Button>
          <Button variant="outline">Next</Button>
        </div>
      </div>
    </main>
  )
}

