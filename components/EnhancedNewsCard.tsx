"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight, Eye, Bookmark, BookmarkCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface EnhancedNewsCardProps {
  id: string
  title: string
  excerpt: string
  date: string
  readTime?: string
  category: string
  image: string
  featured?: boolean
  className?: string
  views?: number
}

export default function EnhancedNewsCard({
  id,
  title,
  excerpt,
  date,
  readTime = "3 min read",
  category,
  image,
  featured = false,
  className,
  views = 0,
}: EnhancedNewsCardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const getCategoryColor = (category: string): string => {
    const categories: Record<string, string> = {
      Academic: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      Sports: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      Arts: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      Events: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
      Announcement: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      Achievements: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
      Facilities: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300",
      Development: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
    }

    return categories[category] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
  }

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  const handleImageError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsBookmarked(!isBookmarked)
  }

  return (
    <motion.div
      className={cn(
        "group rounded-lg overflow-hidden border bg-card text-card-foreground shadow transition-all duration-300",
        featured ? "md:col-span-2" : "",
        isHovered ? "shadow-lg translate-y-[-5px]" : "hover:shadow-md",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/news/${id}`} className="block h-full">
        <div className={cn("relative overflow-hidden", featured ? "h-64" : "h-48")}>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 animate-pulse">
              <span className="sr-only">Loading image...</span>
            </div>
          )}

          {hasError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Image not available</p>
            </div>
          ) : (
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className={cn("object-cover transition-transform duration-700", isHovered ? "scale-110" : "scale-100")}
              onLoad={handleImageLoad}
              onError={handleImageError}
              priority={featured}
            />
          )}

          <div className="absolute top-3 left-3 z-10">
            <Badge className={cn("px-2 py-1", getCategoryColor(category))}>{category}</Badge>
          </div>

          {featured && (
            <div className="absolute top-3 right-3 z-10">
              <Badge variant="secondary" className="bg-black/70 text-white dark:bg-white/90 dark:text-black">
                Featured
              </Badge>
            </div>
          )}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full h-8 w-8 p-1.5"
                  onClick={toggleBookmark}
                  aria-label={isBookmarked ? "Remove bookmark" : "Bookmark this news"}
                >
                  {isBookmarked ? <BookmarkCheck className="h-full w-full" /> : <Bookmark className="h-full w-full" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isBookmarked ? "Remove bookmark" : "Bookmark this news"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-center text-sm text-muted-foreground space-x-3">
            <span className="flex items-center">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              {formattedDate}
            </span>
            <span className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1" />
              {readTime}
            </span>
            {views > 0 && (
              <span className="flex items-center">
                <Eye className="h-3.5 w-3.5 mr-1" />
                {views} views
              </span>
            )}
          </div>

          <h3
            className={cn(
              "font-bold transition-colors duration-300",
              featured ? "text-xl" : "text-lg",
              isHovered ? "text-primary" : "",
            )}
          >
            {title}
          </h3>

          <p className="text-muted-foreground line-clamp-2">{excerpt}</p>

          <div className="pt-2 flex justify-end items-center">
            <Button
              variant="ghost"
              size="sm"
              className="group/button px-0 hover:bg-transparent text-primary"
              aria-label={`Read more about ${title}`}
            >
              <span className="mr-1 transition-colors">Read More</span>
              <ArrowRight
                className={cn("h-4 w-4 transition-all duration-300", isHovered ? "transform translate-x-1" : "")}
              />
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

