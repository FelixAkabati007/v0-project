"use client"

import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useMemo } from "react"

const socialLinksData = [
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://facebook.com",
    color: "bg-blue-600 hover:bg-blue-500",
    hoverColor: "text-blue-200",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://instagram.com",
    color:
      "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600",
    hoverColor: "text-pink-200",
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "https://twitter.com",
    color: "bg-blue-400 hover:bg-blue-300",
    hoverColor: "text-blue-100",
  },
  {
    name: "Youtube",
    icon: Youtube,
    url: "https://youtube.com",
    color: "bg-red-600 hover:bg-red-500",
    hoverColor: "text-red-200",
  },
]

export default function SocialMediaIcons() {
  const socialLinks = useMemo(() => socialLinksData, [])

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col gap-3">
      {socialLinks.map((social) => (
        <motion.div
          key={social.name}
          whileHover={{ scale: 1.15, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          className="relative group"
        >
          <Link
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit our ${social.name} page`}
          >
            <div
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300",
                social.color,
              )}
            >
              <social.icon
                className="w-6 h-6 text-white transition-all duration-300 group-hover:scale-110"
                aria-hidden="true"
              />
            </div>
            <span className="absolute left-0 transform -translate-x-full -translate-y-1/2 top-1/2 bg-gray-900 text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
              {social.name}
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

