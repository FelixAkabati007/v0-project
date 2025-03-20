import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Clock, Tag, Share2, Bookmark, MessageSquare, Eye, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock news data - in a real app, this would come from a database or API
const newsData = {
  n1: {
    id: "n1",
    title: "Ejisuman SHS Wins Regional Science Competition",
    content: `
      <p>Our science team has won the regional science competition for the third consecutive year, showcasing exceptional talent in physics and chemistry projects.</p>
      
      <p>The competition, held at the Regional Education Office, saw participation from 15 schools across the region. Ejisuman SHS's team, led by science department head Mr. Kwame Asante, presented innovative projects including a solar-powered water purification system and a biodegradable plastic alternative.</p>
      
      <h3>Winning Projects</h3>
      
      <p>The team's standout project was the solar-powered water purification system designed by final year students Abena Mensah and Kofi Owusu. The system uses locally available materials and can purify up to 20 liters of water per day using only solar energy.</p>
      
      <p>"We're incredibly proud of our students," said Mr. Asante. "They've worked tirelessly for months, often staying late after school to perfect their projects. This victory is well-deserved."</p>
      
      <p>The school will now represent the region at the national science competition scheduled for next month in Accra.</p>
      
      <h3>Recognition</h3>
      
      <p>The Headmistress, Mrs. Akosua Boateng, commended the team during morning assembly and announced that the school board has approved additional funding for the science department to support their preparation for the national competition.</p>
      
      <p>"This achievement reflects our school's commitment to excellence in STEM education," said Mrs. Boateng. "We're investing in our science facilities to ensure our students continue to excel in these fields."</p>
    `,
    excerpt:
      "Our science team has won the regional science competition for the third consecutive year, showcasing exceptional talent in physics and chemistry projects.",
    image: "/placeholder.svg?height=400&width=800",
    date: "2025-03-15T10:00:00Z",
    author: "School Media Team",
    authorImage: "/placeholder.svg?height=50&width=50",
    authorRole: "Communications Department",
    readTime: "4 min read",
    category: "Achievements",
    tags: ["Science", "Competition", "Awards", "STEM"],
    views: 342,
    comments: 15,
    relatedNews: ["n2", "n4", "n6"],
  },
  n2: {
    id: "n2",
    title: "New Computer Lab Inaugurated",
    content: `
      <p>State-of-the-art computer laboratory with 50 workstations inaugurated to enhance ICT education at Ejisuman SHS.</p>
      
      <p>The new facility, funded through a partnership with Tech Ghana Initiative, features the latest hardware and software to support the school's expanding ICT curriculum.</p>
      
      <h3>Modern Facilities</h3>
      
      <p>Each workstation is equipped with high-performance computers, ergonomic furniture, and high-speed internet connectivity. The lab also includes a dedicated server room, interactive smartboards, and a 3D printing station.</p>
      
      <p>"This lab represents a significant upgrade to our ICT infrastructure," said Mr. Daniel Osei, the ICT coordinator. "Our students now have access to industry-standard technology that will prepare them for higher education and future careers in technology."</p>
      
      <h3>Expanded Curriculum</h3>
      
      <p>With the new lab, the school is introducing additional ICT courses including basic programming, web development, and digital media production. These courses will be available to all students as electives starting next term.</p>
      
      <p>The inauguration ceremony was attended by representatives from the Ghana Education Service, local government officials, and executives from Tech Ghana Initiative.</p>
    `,
    excerpt: "State-of-the-art computer laboratory with 50 workstations inaugurated to enhance ICT education.",
    image: "/placeholder.svg?height=300&width=500",
    date: "2025-03-10T14:30:00Z",
    author: "Admin",
    authorImage: "/placeholder.svg?height=50&width=50",
    authorRole: "School Administration",
    readTime: "3 min read",
    category: "Facilities",
    tags: ["Technology", "ICT", "Infrastructure", "Education"],
    views: 287,
    comments: 8,
    relatedNews: ["n1", "n3", "n5"],
  },
  n3: {
    id: "n3",
    title: "Annual Inter-House Sports Competition Results",
    content: `
      <p>Results from the recently concluded inter-house sports competition. Blue House emerges as overall champion with impressive performances across track and field events.</p>
      
      <p>The three-day competition featured events in athletics, swimming, football, volleyball, and basketball, with over 500 students participating.</p>
      
      <h3>Final Standings</h3>
      
      <ol>
        <li>Blue House - 287 points</li>
        <li>Red House - 264 points</li>
        <li>Green House - 251 points</li>
        <li>Yellow House - 238 points</li>
      </ol>
      
      <h3>Notable Performances</h3>
      
      <p>Kwame Mensah of Blue House broke the school record in the 100m sprint with a time of 10.85 seconds. Abena Owusu of Red House dominated the swimming events, winning gold in all three of her races.</p>
      
      <p>"The level of competition this year was exceptional," said Mr. Joseph Adu, the Physical Education coordinator. "We've identified several talented athletes who will represent the school at the upcoming regional championships."</p>
      
      <p>The closing ceremony included a parade of all houses and presentation of trophies by the Headmistress, Mrs. Akosua Boateng.</p>
    `,
    excerpt:
      "Results from the recently concluded inter-house sports competition. Blue House emerges as overall champion.",
    image: "/placeholder.svg?height=300&width=500",
    date: "2025-03-05T16:00:00Z",
    author: "Sports Department",
    authorImage: "/placeholder.svg?height=50&width=50",
    authorRole: "Physical Education",
    readTime: "5 min read",
    category: "Sports",
    tags: ["Sports", "Competition", "Athletics", "Inter-House"],
    views: 412,
    comments: 23,
    relatedNews: ["n2", "n4", "n6"],
  },
  n4: {
    id: "n4",
    title: "WASSCE Preparation Workshop for Final Year Students",
    content: `
      <p>Special workshop organized to help final year students prepare for upcoming WASSCE examinations. The intensive program covers exam strategies, time management, and subject-specific review sessions.</p>
      
      <p>The two-week workshop, led by experienced teachers and past examiners, aims to boost students' confidence and performance in the critical examinations.</p>
      
      <h3>Comprehensive Approach</h3>
      
      <p>The workshop includes morning review sessions focusing on core subjects (English, Mathematics, Integrated Science, and Social Studies) and afternoon sessions dedicated to elective subjects. Evening sessions cover exam techniques, stress management, and practice tests.</p>
      
      <p>"We've analyzed past questions and identified key areas where students typically struggle," explained Mrs. Beatrice Mensah, the Academic Coordinator. "Our approach is to address these areas while reinforcing fundamental concepts."</p>
      
      <h3>Additional Resources</h3>
      
      <p>Each participant receives a comprehensive study pack containing summary notes, practice questions, and model answers. The school has also extended library hours to provide students with additional study time.</p>
      
      <p>Parents are encouraged to support their wards by ensuring they have adequate rest and nutrition during this critical period.</p>
    `,
    excerpt: "Special workshop organized to help final year students prepare for upcoming WASSCE examinations.",
    image: "/placeholder.svg?height=300&width=500",
    date: "2025-02-28T09:15:00Z",
    author: "Academic Board",
    authorImage: "/placeholder.svg?height=50&width=50",
    authorRole: "Academic Affairs",
    readTime: "2 min read",
    category: "Academics",
    tags: ["WASSCE", "Examinations", "Academic", "Preparation"],
    views: 356,
    comments: 12,
    relatedNews: ["n1", "n3", "n5"],
  },
  n5: {
    id: "n5",
    title: "Alumni Donation Boosts School Library",
    content: `
      <p>Alumni association donates 500 new books and digital resources to enhance the school library. The donation includes textbooks, reference materials, fiction, and access to online educational platforms.</p>
      
      <p>The contribution, valued at approximately GHS 50,000, significantly expands the library's collection and digital capabilities.</p>
      
      <h3>Enhanced Resources</h3>
      
      <p>The donated materials cover a wide range of subjects including literature, science, mathematics, history, and technology. The digital resources include subscriptions to educational databases and e-book platforms that can be accessed by students and teachers.</p>
      
      <p>"This donation transforms our library into a modern learning hub," said Ms. Grace Appiah, the school librarian. "Students now have access to up-to-date information and resources that will enrich their learning experience."</p>
      
      <h3>Alumni Commitment</h3>
      
      <p>The donation was organized by the Ejisuman SHS Alumni Association as part of their ongoing commitment to supporting their alma mater.</p>
      
      <p>"We believe in giving back to the institution that shaped us," said Mr. Emmanuel Osei, President of the Alumni Association. "Education is the greatest gift we can offer to the next generation, and we're proud to contribute to the academic excellence of Ejisuman SHS."</p>
      
      <p>The school administration has expressed gratitude for the generous contribution and encourages other alumni to support various development projects.</p>
    `,
    excerpt: "Alumni association donates 500 new books and digital resources to enhance the school library.",
    image: "/placeholder.svg?height=300&width=500",
    date: "2025-02-20T11:45:00Z",
    author: "Library Committee",
    authorImage: "/placeholder.svg?height=50&width=50",
    authorRole: "Library Services",
    readTime: "3 min read",
    category: "Development",
    tags: ["Library", "Alumni", "Donation", "Resources"],
    views: 198,
    comments: 7,
    relatedNews: ["n2", "n4", "n6"],
  },
  n6: {
    id: "n6",
    title: "Cultural Day Celebration Announced",
    content: `
      <p>Annual cultural day celebration scheduled for next month. Students to showcase Ghana's rich cultural heritage through performances, exhibitions, and traditional cuisine.</p>
      
      <p>The event, a highlight of the school calendar, aims to promote cultural awareness and appreciation among students.</p>
      
      <h3>Event Schedule</h3>
      
      <p>The celebration will begin with a grand durbar featuring traditional drumming and dancing. This will be followed by cultural exhibitions where each house will showcase artifacts, attire, and customs from different Ghanaian ethnic groups.</p>
      
      <p>The afternoon program includes a fashion show of traditional attire, cultural performances, and a food fair featuring dishes from various regions of Ghana.</p>
      
      <h3>Educational Value</h3>
      
      <p>"Cultural day is more than just entertainment," explained Mrs. Adwoa Nyarko, the Cultural Coordinator. "It's an educational experience that helps students connect with their heritage and understand the diversity that makes Ghana unique."</p>
      
      <p>Parents and community members are invited to attend the celebration, which will be held on the school grounds from 9:00 AM to 4:00 PM.</p>
      
      <p>Students are encouraged to participate by wearing traditional attire, contributing to exhibitions, or performing in cultural displays.</p>
    `,
    excerpt:
      "Annual cultural day celebration scheduled for next month. Students to showcase Ghana's rich cultural heritage.",
    image: "/placeholder.svg?height=300&width=500",
    date: "2025-02-15T13:20:00Z",
    author: "Cultural Committee",
    authorImage: "/placeholder.svg?height=50&width=50",
    authorRole: "Cultural Affairs",
    readTime: "2 min read",
    category: "Events",
    tags: ["Culture", "Celebration", "Tradition", "Heritage"],
    views: 245,
    comments: 9,
    relatedNews: ["n1", "n3", "n5"],
  },
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { newsId: string } }): Promise<Metadata> {
  const newsId = params.newsId
  const news = newsData[newsId as keyof typeof newsData]

  if (!news) {
    return {
      title: "News Not Found | Ejisuman SHS",
      description: "The requested news article could not be found.",
    }
  }

  return {
    title: `${news.title} | Ejisuman SHS News`,
    description: news.excerpt,
  }
}

export default function NewsDetailPage({ params }: { params: { newsId: string } }) {
  const newsId = params.newsId
  const news = newsData[newsId as keyof typeof newsData]

  if (!news) {
    notFound()
  }

  // Format the date
  const formattedDate = new Date(news.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Get related news
  const relatedNewsItems = news.relatedNews.map((id) => newsData[id as keyof typeof newsData]).filter(Boolean)

  return (
    <main className="container mx-auto px-4 py-12 animate-fadeIn">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href="/news" className="hover:text-primary transition-colors">
          News
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground font-medium truncate max-w-[200px]">{news.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Back button */}
          <Link href="/news">
            <Button variant="ghost" size="sm" className="group mb-4">
              <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to News
            </Button>
          </Link>

          {/* News Header */}
          <div className="space-y-4">
            <Badge className="bg-primary/10 text-primary px-3 py-1 text-sm">{news.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{news.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{news.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>{news.views} views</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>{news.comments} comments</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            <Image src={news.image || "/placeholder.svg"} alt={news.title} fill className="object-cover" priority />
          </div>

          {/* Author Info */}
          <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
            <Avatar className="h-12 w-12">
              <AvatarImage src={news.authorImage} alt={news.author} />
              <AvatarFallback>{news.author[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{news.author}</div>
              <div className="text-sm text-muted-foreground">{news.authorRole}</div>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: news.content }} />
          </div>

          {/* Tags */}
          <div className="pt-4">
            <h3 className="text-sm font-medium mb-2">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {news.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Share and Bookmark */}
          <div className="flex justify-between items-center pt-4">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Bookmark className="h-4 w-4 mr-2" />
              Bookmark
            </Button>
          </div>

          <Separator />

          {/* Comments Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Comments ({news.comments})</h2>
            <div className="space-y-4">
              {/* Comment form */}
              <div className="space-y-2">
                <textarea className="w-full min-h-[100px] p-3 border rounded-md" placeholder="Leave a comment..." />
                <Button>Post Comment</Button>
              </div>

              {/* Sample comments */}
              <div className="space-y-4 mt-6">
                <div className="flex gap-4 p-4 bg-muted/50 rounded-lg">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">John Doe</span>
                      <span className="text-xs text-muted-foreground">2 days ago</span>
                    </div>
                    <p className="mt-1">Congratulations to the science team! This is a remarkable achievement.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-muted/50 rounded-lg">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Ama Serwaa</span>
                      <span className="text-xs text-muted-foreground">1 day ago</span>
                    </div>
                    <p className="mt-1">
                      I'm proud of our school's achievements in STEM. The solar-powered water purification system sounds
                      innovative!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Related News */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Related News</h2>
              <div className="space-y-4">
                {relatedNewsItems.map((item) => (
                  <Link href={`/news/${item.id}`} key={item.id} className="block group">
                    <div className="flex gap-3">
                      <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                        <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                      </div>
                      <div>
                        <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">{new Date(item.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Categories</h2>
              <div className="space-y-2">
                {["Achievements", "Academics", "Sports", "Events", "Development", "Facilities"].map((category) => (
                  <Link
                    href={`/news?category=${category.toLowerCase()}`}
                    key={category}
                    className="flex justify-between items-center p-2 rounded-md hover:bg-muted transition-colors"
                  >
                    <span>{category}</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Popular Tags */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Popular Tags</h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "Science",
                  "Sports",
                  "Academic",
                  "Culture",
                  "Technology",
                  "Competition",
                  "Awards",
                  "STEM",
                  "Alumni",
                ].map((tag) => (
                  <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

