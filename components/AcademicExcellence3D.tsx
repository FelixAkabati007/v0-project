"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Environment, PresentationControls, ContactShadows } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type * as THREE from "three"

// Custom book component using built-in geometries instead of loading external models
function Book({ position = [0, 0, 0], rotation = [0, 0, 0], color = "#1e40af", ...props }) {
  const bookRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!bookRef.current) return
    const t = state.clock.getElapsedTime()
    bookRef.current.rotation.y = Math.sin(t / 4) / 8
    bookRef.current.rotation.z = Math.sin(t / 4) / 20
    bookRef.current.position.y = (1 + Math.sin(t / 2)) / 10
  })

  return (
    <group ref={bookRef} position={position} rotation={rotation} {...props}>
      {/* Book body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1, 0.1, 1.5]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.2} />
      </mesh>

      {/* Book pages */}
      <mesh castShadow receiveShadow position={[0, 0.06, 0]}>
        <boxGeometry args={[0.95, 0.03, 1.45]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.2} />
      </mesh>

      {/* Book spine details */}
      <mesh castShadow position={[0, 0, -0.7]}>
        <boxGeometry args={[1, 0.12, 0.1]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.3} />
      </mesh>
    </group>
  )
}

// Stack of books component
function BookStack() {
  return (
    <group>
      <Book position={[0, 0, 0]} color="#1e40af" />
      <Book position={[0.2, 0.12, 0.1]} rotation={[0, Math.PI / 12, 0]} color="#0f766e" />
      <Book position={[-0.2, 0.24, -0.1]} rotation={[0, -Math.PI / 8, 0]} color="#b91c1c" />
      <Book position={[0.1, 0.36, 0.2]} rotation={[0, Math.PI / 16, 0]} color="#4338ca" />
      <Book position={[-0.1, 0.48, -0.05]} rotation={[0, -Math.PI / 20, 0]} color="#047857" />
    </group>
  )
}

export function AcademicExcellence3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  return (
    <motion.section ref={containerRef} className="relative py-24 overflow-hidden" style={{ y, opacity, scale }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-4"
            >
              Academic Excellence
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6"
            >
              At Ejisuman Senior High School, we pride ourselves on our commitment to academic excellence. Our dedicated
              faculty and state-of-the-art facilities provide students with the best possible learning environment to
              achieve their full potential.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              >
                <Link href="/admissions">Apply Now</Link>
              </Button>
            </motion.div>
          </div>

          <div className="h-[400px]">
            <Canvas camera={{ position: [0, 0, 8], fov: 25 }}>
              <ambientLight intensity={1} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
              <PresentationControls
                global
                rotation={[0.13, 0.1, 0]}
                polar={[-0.4, 0.2]}
                azimuth={[-1, 0.75]}
                config={{ mass: 2, tension: 400 }}
                snap={{ mass: 4, tension: 400 }}
              >
                <Float rotationIntensity={0.4}>
                  <BookStack />
                </Float>
              </PresentationControls>
              <ContactShadows position={[0, -1.4, 0]} opacity={0.75} scale={10} blur={2.5} far={4} />
              <Environment preset="city" />
            </Canvas>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/10 rounded-full filter blur-3xl translate-x-1/3 translate-y-1/3" />
    </motion.section>
  )
}

