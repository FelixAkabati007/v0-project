"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Facebook, Instagram, Twitter, Youtube, Share2 } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const socialLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://facebook.com",
    color: "bg-blue-600",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://instagram.com",
    color: "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500",
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "https://twitter.com",
    color: "bg-blue-400",
  },
  {
    name: "Youtube",
    icon: Youtube,
    url: "https://youtube.com",
    color: "bg-red-600",
  },
]

export default function MobileSocialIcons() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-50 md:hidden">
      <motion.button
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg"
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle social media links"
      >
        <Share2 className="w-6 h-6" aria-hidden="true" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-16 right-0 flex flex-col-reverse gap-3"
          >
            {socialLinks.map((social, index) => (
              <motion.div
                key={social.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${social.name} page`}
                >
                  <motion.div
                    className={cn(
                      "w-12 h-12 flex items-center justify-center text-white rounded-full shadow-lg",
                      social.color,
                    )}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

