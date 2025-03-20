"use client"
import { ProgramCard3D } from "@/components/ProgramCard3D"
import { motion } from "framer-motion"
import { AcademicExcellence3D } from "@/components/AcademicExcellence3D"
import { FacilitiesShowcase } from "@/components/FacilitiesShowcase"

const programs = [
  {
    name: "Science",
    description:
      "Our science program offers a rigorous curriculum in physics, chemistry, biology, and mathematics, preparing students for careers in STEM fields.",
    subjects: ["Physics", "Chemistry", "Biology", "Mathematics", "ICT"],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/305752815_488264239975475_6265696827532764525_n.jpg-9ehqXe7zjcNU3XGup7foej20X9wXJ3.jpeg",
    color: "from-blue-600/80 to-cyan-500/80",
    link: "/academics/science",
  },
  {
    name: "Business",
    description:
      "The business program equips students with knowledge in economics, accounting, and business management, fostering entrepreneurial skills.",
    subjects: ["Economics", "Accounting", "Business Management", "Mathematics", "ICT"],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/417396470_929068291928012_3435120046188306092_n.jpg-Lq61HiiZ2qssINwLkibKFnL2yAMzDs.jpeg",
    color: "from-amber-600/80 to-orange-500/80",
    link: "/academics/business",
  },
  {
    name: "Arts",
    description:
      "Our arts program cultivates creativity and critical thinking through literature, history, and visual arts studies.",
    subjects: ["Literature", "History", "Government", "French", "Visual Arts"],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/449679956_527620749623606_3286520815248241865_n.jpg-HNLWAd36PG3Zio51ScWW7o8cyWlw5d.jpeg",
    color: "from-pink-600/80 to-rose-500/80",
    link: "/academics/arts",
  },
  {
    name: "Languages",
    description:
      "Master communication across cultures with diverse language studies and develop strong linguistic skills.",
    subjects: ["English", "French", "Spanish", "Indigenous Languages", "Linguistics"],
    image: "/placeholder.svg?height=400&width=600",
    color: "from-green-600/80 to-emerald-500/80",
    link: "/academics/languages",
  },
  {
    name: "Technology",
    description:
      "Develop digital skills for the rapidly evolving technological landscape with hands-on programming and design.",
    subjects: ["Computer Science", "Information Technology", "Digital Media", "Robotics"],
    image: "/placeholder.svg?height=400&width=600",
    color: "from-indigo-600/80 to-blue-500/80",
    link: "/academics/technology",
  },
  {
    name: "Mathematics",
    description: "Develop analytical thinking through advanced mathematical concepts and problem-solving techniques.",
    subjects: ["Algebra", "Calculus", "Statistics", "Geometry", "Trigonometry"],
    image: "/placeholder.svg?height=400&width=600",
    color: "from-purple-600/80 to-violet-500/80",
    link: "/academics/mathematics",
  },
]

export default function AcademicsPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Academic Programs</h1>

        <div className="py-16 bg-gradient-to-b from-black to-gray-900 text-white rounded-xl mb-12">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-8 text-center"
            >
              Our Academic Programs
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.map((program, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <ProgramCard3D
                    title={program.name}
                    description={program.description}
                    image={program.image}
                    link={program.link}
                    color={program.color}
                    subjects={program.subjects}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <section className="mb-12">
          <AcademicExcellence3D />
        </section>

        <FacilitiesShowcase />
      </div>
    </div>
  )
}

