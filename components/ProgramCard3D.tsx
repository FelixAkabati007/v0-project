"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProgramCard3DProps {
  title: string
  description: string
  image: string
  link: string
  color: string
  subjects: string[]
}

export function ProgramCard3D({ title, description, image, link, color, subjects }: ProgramCard3DProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Mouse position values
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring physics for rotation
  const springConfig = { damping: 15, stiffness: 150 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig)

  // Parallax effect for card content
  const contentY = useSpring(useTransform(mouseY, [-0.5, 0.5], ["-5%", "5%"]), springConfig)
  const contentX = useSpring(useTransform(mouseX, [-0.5, 0.5], ["-5%", "5%"]), springConfig)

  // Shine effect
  const shineX = useSpring(useTransform(mouseX, [-0.5, 0.5], ["150%", "-50%"]), springConfig)
  const shineY = useSpring(useTransform(mouseY, [-0.5, 0.5], ["150%", "-50%"]), springConfig)

  // Handle mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate normalized mouse position (-0.5 to 0.5)
    const normalizedX = (e.clientX - centerX) / rect.width
    const normalizedY = (e.clientY - centerY) / rect.height

    mouseX.set(normalizedX)
    mouseY.set(normalizedY)
  }

  // Reset on mouse leave
  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      className="relative h-[450px] w-full max-w-[350px] rounded-xl perspective-1000 cursor-pointer group"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Card background with gradient overlay */}
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className={cn("absolute inset-0 bg-gradient-to-b opacity-80", color)} />

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 w-full h-full bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            backgroundPosition: `${shineX}% ${shineY}%`,
          }}
        />
      </div>

      {/* Card content */}
      <motion.div
        className="relative h-full w-full p-6 flex flex-col justify-between text-white z-10"
        style={{
          transform: isHovered
            ? `translateZ(40px) translateX(${contentX}px) translateY(${contentY}px)`
            : "translateZ(0)",
          transition: "transform 0.2s ease-out",
        }}
      >
        <div>
          <h3 className="text-2xl font-bold mb-2 drop-shadow-md">{title}</h3>
          <p className="text-white/90 text-sm mb-4 drop-shadow-md">{description}</p>

          <div className="mt-4">
            <h4 className="text-sm font-semibold mb-2 drop-shadow-md">Key Subjects:</h4>
            <div className="flex flex-wrap gap-2">
              {subjects.map((subject, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium"
                >
                  {subject}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        <Link
          href={link}
          className="self-start mt-4 flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 group-hover:pl-5"
        >
          Learn More
          <motion.span animate={{ x: isHovered ? 5 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
            <ArrowRight className="w-4 h-4" />
          </motion.span>
        </Link>
      </motion.div>
    </motion.div>
  )
}

