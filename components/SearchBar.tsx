"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { useDebounce } from "@/hooks/use-debounce"

interface SearchResult {
  id: string
  title: string
  type: "page" | "news" | "event" | "program"
  url: string
}

// Mock search results for demonstration
const mockSearchResults = [
  { id: "1", title: "Science Program", type: "program", url: "/academics/science" },
  { id: "2", title: "Admission Requirements", type: "page", url: "/admissions" },
  { id: "3", title: "School Calendar 2023-2024", type: "page", url: "/calendar" },
  { id: "4", title: "Annual Sports Festival", type: "event", url: "/events/sports-festival" },
  { id: "5", title: "New Science Lab Opening", type: "news", url: "/news/science-lab-opening" },
  { id: "6", title: "Student Handbook", type: "page", url: "/student-life" },
  { id: "7", title: "Arts Exhibition", type: "event", url: "/events/arts-exhibition" },
  { id: "8", title: "Business Program", type: "program", url: "/academics/business" },
]

export function SearchBar({ className }: { className?: string }) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (debouncedQuery.length >= 2) {
      performSearch(debouncedQuery)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }, [debouncedQuery])

  const performSearch = async (searchQuery: string) => {
    setIsSearching(true)
    setError(null)

    try {
      // In a real application, this would be an API call
      // const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
      // if (!response.ok) throw new Error('Search failed')
      // const data = await response.json()

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Filter mock results based on query
      const filteredResults = mockSearchResults.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )

      setResults(filteredResults)
      setIsOpen(filteredResults.length > 0)
    } catch (err) {
      console.error("Search error:", err)
      setError("An error occurred while searching. Please try again.")
      setResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (query.trim().length >= 2) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
      setIsOpen(false)
      setQuery("")
    }
  }

  const handleResultClick = (url: string) => {
    router.push(url)
    setIsOpen(false)
    setQuery("")
  }

  const clearSearch = () => {
    setQuery("")
    setResults([])
    setIsOpen(false)
    inputRef.current?.focus()
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "page":
        return <div className="w-2 h-2 rounded-full bg-blue-500"></div>
      case "news":
        return <div className="w-2 h-2 rounded-full bg-green-500"></div>
      case "event":
        return <div className="w-2 h-2 rounded-full bg-amber-500"></div>
      case "program":
        return <div className="w-2 h-2 rounded-full bg-purple-500"></div>
      default:
        return <div className="w-2 h-2 rounded-full bg-gray-500"></div>
    }
  }

  return (
    <div className="relative" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            ref={inputRef}
            type="search"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length >= 2 && setIsOpen(true)}
            className="pl-10 pr-10 w-full bg-black/80 text-white placeholder:text-gray-400 border-gray-700 focus:border-primary"
            aria-label="Search the website"
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={clearSearch}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 text-gray-400 hover:text-white"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </form>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 mt-2 w-full bg-white dark:bg-gray-900 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div className="max-h-80 overflow-y-auto p-2">
              {isSearching ? (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  <span className="ml-2 text-sm">Searching...</span>
                </div>
              ) : error ? (
                <div className="p-4 text-center text-red-500">
                  <p>{error}</p>
                </div>
              ) : results.length === 0 ? (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  <p>No results found for "{query}"</p>
                </div>
              ) : (
                <>
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
                    {results.length} result{results.length !== 1 ? "s" : ""}
                  </div>
                  <ul>
                    {results.map((result) => (
                      <li key={result.id}>
                        <button
                          onClick={() => handleResultClick(result.url)}
                          className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md flex items-center"
                        >
                          {getTypeIcon(result.type)}
                          <span className="ml-2">{result.title}</span>
                          <span className="ml-auto text-xs text-gray-500 capitalize">{result.type}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-primary text-sm"
                      onClick={() => router.push(`/search?q=${encodeURIComponent(query)}`)}
                    >
                      View all results
                    </Button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

