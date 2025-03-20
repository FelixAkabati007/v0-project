"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Loader2,
} from "lucide-react"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const currentYear = new Date().getFullYear()

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate email
    if (!email.trim()) {
      setEmailError("Email is required")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address")
      return
    }

    setEmailError("")
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real application, you would submit the email to your backend
      // const response = await fetch('/api/subscribe', {
      //   method: 'POST',
      //   body: JSON.stringify({ email }),
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // })

      // if (!response.ok) throw new Error('Subscription failed')

      setSubscribed(true)
      toast({
        title: "Subscription Successful",
        description: "Thank you for subscribing to our newsletter!",
      })
    } catch (error) {
      console.error("Subscription error:", error)
      toast({
        title: "Subscription Failed",
        description: "There was an error subscribing to the newsletter. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const footerLinks = [
    {
      title: "About",
      links: [
        { name: "Our History", href: "/about/history" },
        { name: "Mission & Vision", href: "/about/mission-vision" },
        { name: "Leadership", href: "/about/leadership" },
        { name: "Staff Directory", href: "/about/staff" },
        { name: "Alumni", href: "/about/alumni" },
      ],
    },
    {
      title: "Academics",
      links: [
        { name: "Programs", href: "/academics" },
        { name: "Science", href: "/academics/science" },
        { name: "Arts", href: "/academics/arts" },
        { name: "Business", href: "/academics/business" },
        { name: "Library", href: "/academics/library" },
      ],
    },
    {
      title: "Student Life",
      links: [
        { name: "Clubs & Activities", href: "/student-life/clubs" },
        { name: "Sports", href: "/student-life/sports" },
        { name: "Events", href: "/student-life/events" },
        { name: "Counseling", href: "/student-life/counseling" },
        { name: "Housing", href: "/student-life/housing" },
      ],
    },
    {
      title: "Admissions",
      links: [
        { name: "Apply Now", href: "/admissions" },
        { name: "Requirements", href: "/admissions#requirements" },
        { name: "Tuition & Fees", href: "/admissions#tuition" },
        { name: "Financial Aid", href: "/admissions#financial-aid" },
        { name: "Visit Campus", href: "/virtual-tour" },
      ],
    },
  ]

  const socialLinks = [
    { name: "Facebook", icon: <Facebook className="h-5 w-5" />, href: "https://facebook.com" },
    { name: "Twitter", icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com" },
    { name: "Instagram", icon: <Instagram className="h-5 w-5" />, href: "https://instagram.com" },
    { name: "YouTube", icon: <Youtube className="h-5 w-5" />, href: "https://youtube.com" },
  ]

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      text: "info@ejisumanshs.edu.gh",
      href: "mailto:info@ejisumanshs.edu.gh",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      text: "+233 244 027477",
      href: "tel:+233244027477",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      text: "Ejisu-Ashanti, Ghana",
      href: "https://maps.google.com/?q=Ejisuman+Senior+High+School",
    },
  ]

  return (
    <footer className="bg-gray-900 text-gray-200" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="container mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* School Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ejisuman%20logo-fotor-bg-remover-2024111252452-PdjjFdQdmWdtGULMkf70SUH6pdiATB.png"
                alt="Ejisuman SHS Logo"
                width={60}
                height={60}
                className="mr-3"
              />
              <div>
                <h3 className="text-xl font-bold">Ejisuman SHS</h3>
                <p className="text-sm text-gray-400">Excellence in Education</p>
              </div>
            </div>

            <p className="mb-6 text-gray-400">
              Ejisuman Senior High School is committed to providing quality education and fostering academic excellence,
              character development, and community service.
            </p>

            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <ul className="flex space-x-4 mb-6">
              {socialLinks.map((social, index) => (
                <motion.li key={index} whileHover={{ y: -3 }}>
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 hover:bg-primary text-white p-2 rounded-full inline-flex transition-colors duration-300"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
            <ul className="space-y-3">
              {contactInfo.map((contact, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-3 mt-1">{contact.icon}</span>
                  <Link
                    href={contact.href}
                    target={contact.href.startsWith("http") ? "_blank" : undefined}
                    rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="hover:text-primary transition-colors duration-300"
                  >
                    {contact.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {footerLinks.map((category, index) => (
              <div key={index}>
                <h4 className="text-lg font-semibold mb-4 text-white">{category.title}</h4>
                <ul className="space-y-2">
                  {category.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-primary transition-colors duration-300 flex items-center"
                      >
                        <span className="mr-1 text-xs">›</span> {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        {/* Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h4 className="text-lg font-semibold mb-2">Subscribe to Our Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Stay updated with the latest news, events, and announcements from Ejisuman SHS.
            </p>
          </div>

          <div>
            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-900/30 border border-green-800 rounded-lg p-4 flex items-center"
              >
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                <p>Thank you for subscribing to our newsletter!</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (emailError) setEmailError("")
                    }}
                    className={`bg-gray-800 border-gray-700 text-white ${
                      emailError ? "border-red-500 focus:ring-red-500" : ""
                    }`}
                    aria-label="Email for newsletter"
                    aria-invalid={!!emailError}
                    aria-describedby={emailError ? "email-error" : undefined}
                  />
                  {emailError && (
                    <p id="email-error" className="mt-1 text-sm text-red-500">
                      {emailError}
                    </p>
                  )}
                </div>
                <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary/90 text-white">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {currentYear} Ejisuman Senior High School. All rights reserved.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <Link href="/privacy-policy" className="hover:text-primary transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-primary transition-colors duration-300">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="hover:text-primary transition-colors duration-300">
                Sitemap
              </Link>
              <Link href="/accessibility" className="hover:text-primary transition-colors duration-300">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

