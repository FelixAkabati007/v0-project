"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Text, Environment } from "@react-three/drei"
import { Suspense } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { X } from "lucide-react"

// Building component that represents a school building
function Building({ position, size, color, name, onClick, isHighlighted }) {
  const meshRef = useRef()

  useFrame(() => {
    if (meshRef.current && isHighlighted) {
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <group position={position} onClick={onClick}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Text position={[0, size[1] / 2 + 0.5, 0]} fontSize={0.5} color="white" anchorX="center" anchorY="middle">
        {name}
      </Text>
    </group>
  )
}

// Ground component
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#3a7e4c" />
    </mesh>
  )
}

// Trees for decoration
function Trees() {
  const positions = [
    [-8, 0, -5],
    [-10, 0, 8],
    [12, 0, -7],
    [15, 0, 10],
    [-15, 0, -10],
    [8, 0, 15],
  ]

  return (
    <group>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <cylinderGeometry args={[0, 1, 3, 6]} />
          <meshStandardMaterial color="#2d4c39" />
          <mesh position={[0, -1.5, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 1]} />
            <meshStandardMaterial color="#5c3f22" />
          </mesh>
        </mesh>
      ))}
    </group>
  )
}

// Main campus visualization component
export default function CampusVisualization() {
  const [selectedBuilding, setSelectedBuilding] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [buildingData, setBuildingData] = useState([
    {
      id: 1,
      name: "Main Building",
      position: [0, 0, 0],
      size: [5, 3, 8],
      color: "#1e88e5",
      occupancy: 85,
      temperature: 23,
      events: 2,
    },
    {
      id: 2,
      name: "Science Block",
      position: [-8, 0, 0],
      size: [4, 2, 4],
      color: "#43a047",
      occupancy: 65,
      temperature: 22,
      events: 1,
    },
    {
      id: 3,
      name: "Library",
      position: [8, 0, 0],
      size: [4, 2, 4],
      color: "#e53935",
      occupancy: 45,
      temperature: 24,
      events: 0,
    },
    {
      id: 4,
      name: "Cafeteria",
      position: [0, 0, -8],
      size: [6, 1.5, 4],
      color: "#fb8c00",
      occupancy: 30,
      temperature: 25,
      events: 1,
    },
    {
      id: 5,
      name: "Auditorium",
      position: [0, 0, 8],
      size: [7, 2, 5],
      color: "#8e24aa",
      occupancy: 90,
      temperature: 21,
      events: 3,
    },
  ])

  useEffect(() => {
    // Simulate loading the 3D assets
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Simulate real-time updates to building data
  useEffect(() => {
    const interval = setInterval(() => {
      setBuildingData((prev) =>
        prev.map((building) => ({
          ...building,
          occupancy: Math.min(100, Math.max(10, building.occupancy + (Math.random() * 10 - 5))),
          temperature: Math.min(26, Math.max(20, building.temperature + (Math.random() * 0.6 - 0.3))),
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <Card className="w-full h-[500px] flex items-center justify-center">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-lg font-medium">Loading 3D Campus...</p>
          <p className="text-sm text-muted-foreground">Preparing visualization</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden border">
      <Canvas shadows camera={{ position: [15, 15, 15], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />

          <Ground />
          <Trees />

          {buildingData.map((building) => (
            <Building
              key={building.id}
              position={building.position}
              size={building.size}
              color={building.color}
              name={building.name}
              isHighlighted={selectedBuilding?.id === building.id}
              onClick={() => setSelectedBuilding(building)}
            />
          ))}

          <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>

      {selectedBuilding && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-lg">{selectedBuilding.name}</h3>
            <Button variant="ghost" size="sm" onClick={() => setSelectedBuilding(null)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <p className="text-sm text-muted-foreground">Occupancy</p>
              <div className="flex items-center">
                <span className="font-medium">{Math.round(selectedBuilding.occupancy)}%</span>
                <div className="w-full h-2 bg-gray-200 rounded-full ml-2">
                  <div className="h-2 bg-blue-500 rounded-full" style={{ width: `${selectedBuilding.occupancy}%` }} />
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Temperature</p>
              <p className="font-medium">{selectedBuilding.temperature.toFixed(1)}°C</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Events</p>
              <p className="font-medium">
                {selectedBuilding.events}
                {selectedBuilding.events > 0 && (
                  <Badge variant="outline" className="ml-2">
                    Now
                  </Badge>
                )}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="absolute top-4 right-4">
        <Button variant="secondary" size="sm">
          Reset View
        </Button>
      </div>
    </div>
  )
}

