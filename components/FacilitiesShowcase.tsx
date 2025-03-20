"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

type Facility = {
  id: string
  name: string
  description: string
  image: string
  features: string[]
}

const facilities: Facility[] = [
  {
    id: "science-labs",
    name: "Science Laboratories",
    description:
      "Our well-equipped science laboratories provide hands-on learning experiences in physics, chemistry, and biology, fostering practical skills and scientific inquiry.",
    image: "/placeholder.svg?height=600&width=800",
    features: [
      "Modern equipment for experiments",
      "Separate labs for Physics, Chemistry, and Biology",
      "Safety equipment and protocols",
      "Digital data collection tools",
    ],
  },
  {
    id: "computer-labs",
    name: "Computer Labs",
    description:
      "Modern computer labs with high-speed internet access support our ICT curriculum and digital literacy initiatives across all programs.",
    image: "/placeholder.svg?height=600&width=800",
    features: [
      "High-performance computers",
      "Coding and programming software",
      "Multimedia production tools",
      "High-speed internet connectivity",
    ],
  },
  {
    id: "library",
    name: "Library",
    description:
      "Our extensive library houses a vast collection of books, journals, and digital resources, providing a quiet space for study and research.",
    image: "/placeholder.svg?height=600&width=800",
    features: [
      "Extensive book collection",
      "Digital research databases",
      "Quiet study areas",
      "Group collaboration spaces",
    ],
  },
  {
    id: "arts-studio",
    name: "Arts Studio",
    description:
      "A dedicated arts studio equipped with materials and tools to support visual arts education and creative expression.",
    image: "/placeholder.svg?height=600&width=800",
    features: [
      "Painting and drawing supplies",
      "Sculpture and ceramics equipment",
      "Digital design workstations",
      "Exhibition space for student work",
    ],
  },
]

export function FacilitiesShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const currentFacility = facilities[currentIndex]

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % facilities.length)
  }

  const handlePrevious = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + facilities.length) % facilities.length)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-8 text-center"
        >
          Our Facilities
        </motion.h2>

        <div className="relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
          <div className="absolute top-1/2 left-4 z-10 -translate-y-1/2">
            <button
              onClick={handlePrevious}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
              aria-label="Previous facility"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
            <button
              onClick={handleNext}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
              aria-label="Next facility"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentFacility.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="grid grid-cols-1 md:grid-cols-2"
            >
              <div className="relative h-[300px] md:h-[400px]">
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="absolute top-4 right-4 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors">
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl p-0 overflow-hidden">
                    <div className="relative h-[600px]">
                      <Image
                        src={currentFacility.image || "/placeholder.svg"}
                        alt={currentFacility.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </DialogContent>
                </Dialog>

                <Image
                  src={currentFacility.image || "/placeholder.svg"}
                  alt={currentFacility.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">{currentFacility.name}</h3>
                <p className="mb-6 text-gray-600 dark:text-gray-300">{currentFacility.description}</p>

                <h4 className="font-semibold mb-3">Key Features:</h4>
                <ul className="space-y-2">
                  {currentFacility.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center text-gray-600 dark:text-gray-300"
                    >
                      <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {facilities.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "w-6 bg-primary"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500",
                )}
                aria-label={`Go to facility ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

