"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, ShieldCheck, Calculator, BookOpen, ArrowLeft, UserCircle } from "lucide-react"

export default function AccountPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const portalOptions = [
    {
      id: "student",
      title: "Student Portal",
      description: "Access your academic records, assignments, and more",
      icon: GraduationCap,
      href: "/student-portal",
      color: "bg-blue-500",
    },
    {
      id: "teacher",
      title: "Teacher Portal",
      description: "Manage classes, grades, and student information",
      icon: BookOpen,
      href: "/teacher-portal",
      color: "bg-green-500",
    },
    {
      id: "admin",
      title: "Admin Portal",
      description: "School administration and management system",
      icon: ShieldCheck,
      href: "/admin-portal",
      color: "bg-purple-500",
    },
    {
      id: "accountant",
      title: "Accountant Portal",
      description: "Financial management and reporting",
      icon: Calculator,
      href: "/accountant-portal",
      color: "bg-amber-500",
    },
    {
      id: "academic",
      title: "Academic Board",
      description: "Curriculum oversight and academic policy",
      icon: UserCircle,
      href: "/academic-board",
      color: "bg-indigo-500",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Link href="/" className="absolute top-4 left-4 text-primary hover:text-primary/80 transition-colors">
        <div className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Homepage</span>
        </div>
      </Link>

      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ejisuman%20logo-fotor-bg-remover-2024111252452-PdjjFdQdmWdtGULMkf70SUH6pdiATB.png"
            alt="Ejisuman SHS Logo"
            width={80}
            height={80}
            className="mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold tracking-tight">Ejisuman SHS Portal Access</h1>
          <p className="text-muted-foreground mt-2">Select the portal you wish to access</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {portalOptions.map((option) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: portalOptions.indexOf(option) * 0.1 }}
              onHoverStart={() => setHoveredCard(option.id)}
              onHoverEnd={() => setHoveredCard(null)}
              className="relative"
            >
              <Link href={option.href} className="block h-full">
                <Card
                  className={cn(
                    "h-full border-2 transition-all duration-300 overflow-hidden",
                    hoveredCard === option.id ? "shadow-lg scale-[1.02] border-primary" : "shadow hover:shadow-md",
                  )}
                >
                  <div className={cn("absolute top-0 left-0 w-full h-1", option.color)} />
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={cn("p-2 rounded-full", option.color.replace("bg-", "bg-opacity-20 text-"))}>
                        <option.icon className="h-6 w-6" />
                      </div>
                      <CardTitle>{option.title}</CardTitle>
                    </div>
                    <CardDescription>{option.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      {option.id === "student" && (
                        <>
                          <li>View your academic records</li>
                          <li>Access course materials</li>
                          <li>Check exam schedules</li>
                        </>
                      )}
                      {option.id === "teacher" && (
                        <>
                          <li>Manage class attendance</li>
                          <li>Record and submit grades</li>
                          <li>Access teaching resources</li>
                        </>
                      )}
                      {option.id === "admin" && (
                        <>
                          <li>Manage school operations</li>
                          <li>Access administrative tools</li>
                          <li>Generate reports</li>
                        </>
                      )}
                      {option.id === "accountant" && (
                        <>
                          <li>Manage financial records</li>
                          <li>Process fee payments</li>
                          <li>Generate financial reports</li>
                        </>
                      )}
                      {option.id === "academic" && (
                        <>
                          <li>Review curriculum changes</li>
                          <li>Approve academic policies</li>
                          <li>Monitor educational standards</li>
                        </>
                      )}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Access {option.title}</Button>
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Ejisuman Senior High School. All rights reserved.</p>
      </div>
    </div>
  )
}

// Helper function for conditional class names
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

