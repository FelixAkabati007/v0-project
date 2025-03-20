"use client"

import type React from "react"

import { useEffect, useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Search, BookOpen, Newspaper, Users, GraduationCap, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// At the top of the file, after other imports
import { useDebounce } from "@/hooks/use-debounce"

// Mock search data - in a real app, this would come from an API
const searchData = [
  {
    category: "Pages",
    icon: <BookOpen className="h-5 w-5" />,
    items: [
      { id: "page-1", title: "Home", url: "/", description: "Welcome to Ejisuman Senior High School" },
      { id: "page-2", title: "About Us", url: "/about", description: "Learn about our history, mission, and values" },
      { id: "page-3", title: "Admissions", url: "/admissions", description: "Information about the admission process" },
      { id: "page-4", title: "Academic Programs", url: "/academics", description: "Explore our academic offerings" },
      {
        id: "page-5",
        title: "Student Life",
        url: "/student-life",
        description: "Discover student activities and resources",
      },
      { id: "page-6", title: "Contact", url: "/contact", description: "Get in touch with us" },
    ],
  },
  {
    category: "News",
    icon: <Newspaper className="h-5 w-5" />,
    items: [
      {
        id: "news-1",
        title: "Science Quiz Competition Win",
        url: "/news-events/science-quiz",
        description: "Our students won the regional science quiz competition",
      },
      {
        id: "news-2",
        title: "New Computer Lab Opening",
        url: "/news-events/computer-lab",
        description: "State-of-the-art computer lab now available for students",
      },
      {
        id: "news-3",
        title: "Sports Day Announcement",
        url: "/news-events/sports-day",
        description: "Annual sports day scheduled for next month",
      },
      {
        id: "news-4",
        title: "Academic Excellence Awards",
        url: "/news-events/excellence-awards",
        description: "Recognizing outstanding academic achievements",
      },
    ],
  },
  {
    category: "Programs",
    icon: <GraduationCap className="h-5 w-5" />,
    items: [
      {
        id: "program-1",
        title: "Science Program",
        url: "/academics/science",
        description: "Comprehensive science curriculum with laboratory experience",
      },
      {
        id: "program-2",
        title: "General Arts",
        url: "/academics/arts",
        description: "Broad-based arts education with various electives",
      },
      {
        id: "program-3",
        title: "Business Studies",
        url: "/academics/business",
        description: "Preparation for careers in business and commerce",
      },
      {
        id: "program-4",
        title: "Visual Arts",
        url: "/academics/visual-arts",
        description: "Develop artistic skills and creative expression",
      },
      {
        id: "program-5",
        title: "Home Economics",
        url: "/academics/home-economics",
        description: "Practical skills for home and family management",
      },
    ],
  },
  {
    category: "Staff",
    icon: <Users className="h-5 w-5" />,
    items: [
      {
        id: "staff-1",
        title: "Headmaster's Office",
        url: "/about/staff#headmaster",
        description: "School leadership and administration",
      },
      {
        id: "staff-2",
        title: "Academic Department",
        url: "/about/staff#academic",
        description: "Faculty and academic staff directory",
      },
      {
        id: "staff-3",
        title: "Administration",
        url: "/about/staff#administration",
        description: "Administrative personnel and support staff",
      },
      {
        id: "staff-4",
        title: "Guidance & Counseling",
        url: "/about/staff#counseling",
        description: "Student support and counseling services",
      },
    ],
  },
]

type SearchResult = {
  category: string
  icon: React.ReactNode
  items: Array<{
    id: string
    title: string
    url: string
    description?: string
  }>
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  // Inside the component, add debounced search query
  const [searchQuery, setSearchQuery] = useState(query)
  const debouncedSearchQuery = useDebounce(searchQuery, 300)
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [totalResults, setTotalResults] = useState(0)
  const [activeTab, setActiveTab] = useState("all")

  // Update the useEffect to use the debounced query
  useEffect(() => {
    if (!debouncedSearchQuery) return

    setIsSearching(true)
    // Simulate API call with delay
    const timer = setTimeout(() => {
      const filteredResults = searchData
        .map((category) => ({
          category: category.category,
          icon: category.icon,
          items: category.items.filter(
            (item) =>
              item.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
              (item.description && item.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase())),
          ),
        }))
        .filter((category) => category.items.length > 0)

      setResults(filteredResults)
      setTotalResults(filteredResults.reduce((acc, category) => acc + category.items.length, 0))
      setIsSearching(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [debouncedSearchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    // Update URL with search query without page reload
    const url = new URL(window.location.href)
    url.searchParams.set("q", searchQuery)
    window.history.pushState({}, "", url.toString())

    setIsSearching(true)
    // Simulate API call with delay
    setTimeout(() => {
      const filteredResults = searchData
        .map((category) => ({
          category: category.category,
          icon: category.icon,
          items: category.items.filter(
            (item) =>
              item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())),
          ),
        }))
        .filter((category) => category.items.length > 0)

      setResults(filteredResults)
      setTotalResults(filteredResults.reduce((acc, category) => acc + category.items.length, 0))
      setIsSearching(false)
    }, 500)
  }

  const filteredResults = useMemo(
    () =>
      activeTab === "all"
        ? results
        : results.filter((category) => category.category.toLowerCase() === activeTab.toLowerCase()),
    [activeTab, results],
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 dark:text-white">Search Results</h1>

          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search for anything..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
              <Button type="submit" size="lg" className="bg-[#011424] hover:bg-[#011424]/90 text-white">
                Search
              </Button>
            </div>
          </form>

          {isSearching ? (
            <div className="flex items-center justify-center py-12">
              <div className="relative h-8 w-8">
                <div className="absolute animate-ping h-8 w-8 rounded-full bg-blue-600 opacity-75"></div>
                <div className="relative animate-spin h-8 w-8 rounded-full border-4 border-transparent border-t-blue-600"></div>
              </div>
              <span className="ml-3 text-gray-600 dark:text-gray-400">Searching...</span>
            </div>
          ) : (
            <>
              {query && (
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-gray-600 dark:text-gray-400">
                    {totalResults > 0
                      ? `Found ${totalResults} results for "${query}"`
                      : `No results found for "${query}"`}
                  </p>

                  {totalResults > 0 && (
                    <div className="flex items-center">
                      <Filter className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">Filter by:</span>
                    </div>
                  )}
                </div>
              )}

              {results.length > 0 ? (
                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                  <div className="overflow-x-auto pb-2">
                    <TabsList className="bg-gray-100 dark:bg-gray-800 p-1">
                      <TabsTrigger
                        value="all"
                        className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                      >
                        All Results
                        <Badge variant="outline" className="ml-2 bg-gray-200 dark:bg-gray-600">
                          {totalResults}
                        </Badge>
                      </TabsTrigger>
                      {results.map((category) => (
                        <TabsTrigger
                          key={category.category}
                          value={category.category.toLowerCase()}
                          className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                        >
                          {category.category}
                          <Badge variant="outline" className="ml-2 bg-gray-200 dark:bg-gray-600">
                            {category.items.length}
                          </Badge>
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>

                  <TabsContent value="all" className="space-y-8 mt-6">
                    {filteredResults.map((category) => (
                      <div key={category.category}>
                        <div className="flex items-center mb-4">
                          <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 mr-3">
                            <div className="text-blue-600 dark:text-blue-300">{category.icon}</div>
                          </div>
                          <h2 className="text-xl font-semibold dark:text-white">{category.category}</h2>
                        </div>
                        <div className="space-y-4">
                          {category.items.map((item) => (
                            <div
                              key={item.id}
                              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
                            >
                              <Link href={item.url} className="block">
                                <h3 className="text-lg font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                                  {item.title}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.url}</p>
                                {item.description && (
                                  <p className="mt-2 text-gray-700 dark:text-gray-300">{item.description}</p>
                                )}
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  {results.map((category) => (
                    <TabsContent
                      key={category.category}
                      value={category.category.toLowerCase()}
                      className="space-y-4 mt-6"
                    >
                      <div className="space-y-4">
                        {category.items.map((item) => (
                          <div
                            key={item.id}
                            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
                          >
                            <Link href={item.url} className="block">
                              <h3 className="text-lg font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                                {item.title}
                              </h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.url}</p>
                              {item.description && (
                                <p className="mt-2 text-gray-700 dark:text-gray-300">{item.description}</p>
                              )}
                            </Link>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              ) : (
                query && (
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow text-center border border-gray-100 dark:border-gray-700">
                    <h2 className="text-xl font-medium mb-2 dark:text-white">No results found</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      We couldn't find any results for "{query}". Please try another search term.
                    </p>
                    <div className="space-y-2">
                      <p className="font-medium dark:text-white">Suggestions:</p>
                      <ul className="text-gray-600 dark:text-gray-400 list-disc list-inside">
                        <li>Check your spelling</li>
                        <li>Try more general keywords</li>
                        <li>Try different keywords</li>
                      </ul>
                    </div>
                  </div>
                )
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

