"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const mapAreas = [
  { name: "Main Building", coords: "50,50,100,100", description: "Houses administrative offices and main classrooms" },
  {
    name: "Science Block",
    coords: "150,150,200,200",
    description: "Modern laboratories for Physics, Chemistry, and Biology",
  },
  { name: "Library", coords: "250,250,300,300", description: "Extensive collection of books and digital resources" },
  {
    name: "Sports Complex",
    coords: "350,350,400,400",
    description: "Includes football field, basketball court, and athletics track",
  },
]

export default function CampusMap() {
  const [selectedArea, setSelectedArea] = useState(null)

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Interactive Campus Map</h1>
        <p className="text-center mb-12 max-w-2xl mx-auto">
          Explore our campus facilities by clicking on different areas of the map.
        </p>

        <div className="relative w-full max-w-3xl mx-auto">
          <Image
            src="https://scontent.facc5-1.fna.fbcdn.net/v/t39.30808-6/417396470_929068291928012_3435120046188306092_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=KKc-Aq-JTXEAX_Hy_Hy&_nc_ht=scontent.facc5-1.fna&oh=00_AfBXXZXMZVQIVQCBXKXwHDtXXJQZxLJMUWJCBXXXXXXXXX&oe=65C7F1C4"
            alt="Ejisuman SHS Campus Map"
            width={800}
            height={600}
            className="w-full h-auto"
            useMap="#campus-map"
          />
          <map name="campus-map">
            {mapAreas.map((area, index) => (
              <area
                key={index}
                shape="rect"
                coords={area.coords}
                alt={area.name}
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setSelectedArea(area)
                }}
              />
            ))}
          </map>
        </div>

        <Dialog open={!!selectedArea} onOpenChange={() => setSelectedArea(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedArea?.name}</DialogTitle>
            </DialogHeader>
            <p>{selectedArea?.description}</p>
          </DialogContent>
        </Dialog>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mapAreas.map((area, index) => (
            <Card
              key={index}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedArea(area)}
            >
              <CardHeader>
                <CardTitle>{area.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{area.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

