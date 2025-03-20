"use client"

import type React from "react"

import { useState, useRef, useEffect, useMemo, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronRight,
  BookOpen,
  Beaker,
  Calculator,
  Briefcase,
  Palette,
  Languages,
  Code,
  GraduationCap,
} from "lucide-react"
import { cn } from "@/lib/utils"

type Program = {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  color: string
  path: string
  features: string[]
  image: string
}

const programsList = [
  {
    id: "science",
    name: "Science",
    description: "Explore the natural world through rigorous scientific inquiry and experimentation",
    icon: <Beaker className="h-6 w-6" />,
    color: "from-blue-500 to-cyan-400",
    path: "/academics/science",
    features: ["Physics", "Chemistry", "Biology", "Advanced Mathematics"],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/305752815_488264239975475_6265696827532764525_n.jpg-9ehqXe7zjcNU3XGup7foej20X9wXJ3.jpeg",
  },
  {
    id: "mathematics",
    name: "Mathematics",
    description: "Develop analytical thinking through advanced mathematical concepts",
    icon: <Calculator className="h-6 w-6" />,
    color: "from-purple-500 to-indigo-500",
    path: "/academics/mathematics",
    features: ["Algebra", "Calculus", "Statistics", "Geometry"],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "business",
    name: "Business",
    description: "Prepare for the world of commerce with practical business knowledge",
    icon: <Briefcase className="h-6 w-6" />,
    color: "from-amber-500 to-orange-400",
    path: "/academics/business",
    features: ["Accounting", "Economics", "Management", "Entrepreneurship"],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/417396470_929068291928012_3435120046188306092_n.jpg-Lq61HiiZ2qssINwLkibKFnL2yAMzDs.jpeg",
  },
  {
    id: "arts",
    name: "Arts",
    description: "Express creativity and cultural understanding through various art forms",
    icon: <Palette className="h-6 w-6" />,
    color: "from-pink-500 to-rose-400",
    path: "/academics/arts",
    features: ["Literature", "Visual Arts", "Music", "Drama"],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/449679956_527620749623606_3286520815248241865_n.jpg-HNLWAd36PG3Zio51ScWW7o8cyWlw5d.jpeg",
  },
  {
    id: "languages",
    name: "Languages",
    description: "Master communication across cultures with diverse language studies",
    icon: <Languages className="h-6 w-6" />,
    color: "from-green-500 to-emerald-400",
    path: "/academics/languages",
    features: ["English", "French", "Spanish", "Indigenous Languages"],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "technology",
    name: "Technology",
    description: "Develop digital skills for the rapidly evolving technological landscape",
    icon: <Code className="h-6 w-6" />,
    color: "from-blue-600 to-indigo-600",
    path: "/academics/technology",
    features: ["Computer Science", "Information Technology", "Digital Media", "Robotics"],
    image: "/placeholder.svg?height=400&width=600",
  },
]

export function AcademicProgramsMenu({ className }: { className?: string }) {
  const [activeProgram, setActiveProgram] = useState<Program | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const programs = useMemo(() => programsList, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleMouseEnter = useCallback((program: Program) => {
    setActiveProgram(program)
  }, [])

  return (
    <div className={cn("relative", className)} ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-black/20 transition-colors duration-300"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <BookOpen className="w-4 h-4 mr-1" />
        Academic Programs
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-2 w-[90vw] md:w-[800px] max-h-[80vh] rounded-xl overflow-hidden bg-white shadow-2xl ring-1 ring-black/5 dark:bg-gray-900 dark:ring-white/10 z-50"
          >
            <div className="flex flex-col md:flex-row">
              {/* Programs List */}
              <div className="w-full md:w-1/3 bg-gray-50 dark:bg-gray-800/50 p-4 overflow-y-auto max-h-[70vh]">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Our Programs
                </h3>
                <ul className="space-y-2">
                  {programs.map((program) => (
                    <motion.li key={program.id} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                      <button
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-lg flex items-center justify-between text-sm",
                          activeProgram?.id === program.id
                            ? "bg-gradient-to-r from-primary to-primary/80 text-white"
                            : "hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-200",
                        )}
                        onMouseEnter={() => handleMouseEnter(program)}
                        onClick={() => setActiveProgram(program)}
                      >
                        <span className="flex items-center">
                          <span
                            className={cn(
                              "flex items-center justify-center w-8 h-8 rounded-full mr-3 bg-gradient-to-br",
                              program.color,
                            )}
                          >
                            {program.icon}
                          </span>
                          {program.name}
                        </span>
                        <ChevronRight className="w-4 h-4 opacity-50" />
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Program Details */}
              <div className="w-full md:w-2/3 p-6 overflow-y-auto max-h-[70vh]">
                <AnimatePresence mode="wait">
                  {activeProgram && (
                    <motion.div
                      key={activeProgram.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="h-full"
                    >
                      <div className="flex flex-col h-full">
                        <div className="relative h-40 rounded-xl overflow-hidden mb-4">
                          <Image
                            src={activeProgram.image || "/placeholder.svg"}
                            alt={activeProgram.name}
                            fill
                            className="object-cover"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                            <h3 className="text-white text-xl font-bold p-4">{activeProgram.name}</h3>
                          </div>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 mb-4">{activeProgram.description}</p>

                        <div className="mb-4">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Key Features:</h4>
                          <ul className="grid grid-cols-2 gap-2">
                            {activeProgram.features.map((feature, index) => (
                              <motion.li
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                              >
                                <span
                                  className={cn("w-2 h-2 rounded-full mr-2 bg-gradient-to-r", activeProgram.color)}
                                ></span>
                                {feature}
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-auto">
                          <Link
                            href={activeProgram.path}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "inline-flex items-center px-4 py-2 rounded-lg text-white font-medium text-sm bg-gradient-to-r transition-all duration-300 hover:shadow-lg",
                              activeProgram.color,
                            )}
                          >
                            Explore {activeProgram.name}
                            <ChevronRight className="ml-2 w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 border-t border-gray-100 dark:border-gray-700">
              <Link
                href="/academics"
                onClick={() => setIsOpen(false)}
                className="text-sm text-primary hover:underline flex items-center"
              >
                View all academic programs
                <ChevronRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

