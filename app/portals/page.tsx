"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, Users, Calculator, BookOpen, ShieldCheck } from "lucide-react"

export default function PortalSelectionPage() {
  const router = useRouter()
  const [hoveredPortal, setHoveredPortal] = useState<string | null>(null)

  const portals = [
    {
      id: "student",
      title: "Student Portal",
      description: "Access your courses, grades, and academic resources",
      icon: <GraduationCap className="h-10 w-10" />,
      path: "/student-portal",
      color: "from-blue-500 to-blue-700",
    },
    {
      id: "teacher",
      title: "Teacher Portal",
      description: "Manage classes, grades, and student information",
      icon: <Users className="h-10 w-10" />,
      path: "/teacher-portal",
      color: "from-green-500 to-green-700",
    },
    {
      id: "accountant",
      title: "Accountant Portal",
      description: "Handle financial records and transactions",
      icon: <Calculator className="h-10 w-10" />,
      path: "/accountant-portal",
      color: "from-yellow-500 to-yellow-700",
    },
    {
      id: "academic",
      title: "Academic Board",
      description: "Review curriculum and academic policies",
      icon: <BookOpen className="h-10 w-10" />,
      path: "/academic-board",
      color: "from-purple-500 to-purple-700",
    },
    {
      id: "admin",
      title: "Admin Portal",
      description: "Complete school management system",
      icon: <ShieldCheck className="h-10 w-10" />,
      path: "/admin-portal",
      color: "from-red-500 to-red-700",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Link href="/" className="inline-block mb-6">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ejisuman%20logo-fotor-bg-remover-2024111252452-PdjjFdQdmWdtGULMkf70SUH6pdiATB.png"
              alt="School Logo"
              width={100}
              height={100}
              className="mx-auto"
            />
          </Link>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">Portal Access</h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300 sm:mt-4">
            Select your portal to access school resources and information
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mt-12">
          {portals.map((portal) => (
            <motion.div
              key={portal.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={() => setHoveredPortal(portal.id)}
              onMouseLeave={() => setHoveredPortal(null)}
            >
              <Card className="h-full overflow-hidden border-2 transition-all duration-200 hover:shadow-lg">
                <CardHeader className={`bg-gradient-to-r ${portal.color} text-white`}>
                  <div className="flex justify-center">{portal.icon}</div>
                  <CardTitle className="text-center">{portal.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <CardDescription className="text-center text-base">{portal.description}</CardDescription>
                </CardContent>
                <CardFooter className="flex justify-center p-6 pt-0">
                  <Button onClick={() => router.push(portal.path)} className="w-full" variant="outline">
                    Access Portal
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Need help accessing your portal? Contact IT support at{" "}
            <a href="mailto:support@school.edu.gh" className="text-primary hover:underline">
              support@school.edu.gh
            </a>
          </p>
          <Link href="/" className="mt-4 inline-block text-primary hover:underline">
            ← Back to School Website
          </Link>
        </div>
      </div>
    </div>
  )
}

