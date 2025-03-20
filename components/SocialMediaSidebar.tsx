"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Facebook, Instagram, Twitter, Youtube, Linkedin, Github, Mail } from "lucide-react"
import Link from "next/link"

export default function SocialMediaSidebar() {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  // Handle scroll events to add parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Hide sidebar when user scrolls past hero section
      if (window.scrollY > 800) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://facebook.com",
      color: "from-blue-600 to-blue-800",
      hoverColor: "from-blue-500 to-blue-700",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com",
      color: "from-pink-500 via-purple-500 to-indigo-500",
      hoverColor: "from-pink-400 via-purple-400 to-indigo-400",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://twitter.com",
      color: "from-blue-400 to-blue-600",
      hoverColor: "from-blue-300 to-blue-500",
    },
    {
      name: "Youtube",
      icon: Youtube,
      url: "https://youtube.com",
      color: "from-red-600 to-red-800",
      hoverColor: "from-red-500 to-red-700",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com",
      color: "from-blue-700 to-blue-900",
      hoverColor: "from-blue-600 to-blue-800",
    },
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com",
      color: "from-gray-700 to-gray-900",
      hoverColor: "from-gray-600 to-gray-800",
    },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:info@ejisumanshs.edu.gh",
      color: "from-green-600 to-green-800",
      hoverColor: "from-green-500 to-green-700",
    },
  ]

  return (
    <motion.div
      className="fixed left-0 top-1/2 transform -translate-y-1/2 z-50 hidden md:block"
      initial={{ opacity: 0, x: -100 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : -100,
        transition: { duration: 0.5 },
      }}
    >
      <div id="mySidenav" className="flex flex-col gap-2">
        {socialLinks.map((social, index) => (
          <motion.div
            key={social.name}
            initial={{ x: -80 }}
            whileHover={{ x: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{
              y: scrollY * (0.02 * (index + 1)), // Parallax effect based on scroll
            }}
          >
            <Link
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center bg-gradient-to-r ${social.color} hover:bg-gradient-to-r hover:${social.hoverColor} text-white py-3 px-4 rounded-r-lg shadow-lg hover:shadow-xl transition-all duration-300 w-[140px] group`}
            >
              <div className="flex items-center justify-between w-full">
                <social.icon className="w-6 h-6 mr-2 group-hover:animate-pulse" />
                <span className="font-medium">{social.name}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

