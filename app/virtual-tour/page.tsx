"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { X } from "lucide-react"

const tourSpots = [
  {
    name: "Main Entrance",
    image:
      "https://scontent.facc5-1.fna.fbcdn.net/v/t39.30808-6/417396470_929068291928012_3435120046188306092_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=KKc-Aq-JTXEAX_Hy_Hy&_nc_ht=scontent.facc5-1.fna&oh=00_AfBXXZXMZVQIVQCBXKXwHDtXXJQZxLJMUWJCBXXXXXXXXX&oe=65C7F1C4",
  },
  {
    name: "Science Laboratory",
    image:
      "https://scontent.facc5-1.fna.fbcdn.net/v/t39.30808-6/305752815_488264239975475_6265696827532764525_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=8DAQjvGPC0EAX-Zqm7j&_nc_ht=scontent.facc5-1.fna&oh=00_AfCZrF_NNrxAJoke5TDjxNHgJoVtYpOr-Pu6eLLNHfQwXQ&oe=65C7C1C4",
  },
  {
    name: "Library",
    image:
      "https://scontent.facc5-1.fna.fbcdn.net/v/t39.30808-6/420941483_935346814633493_8443070219098263402_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=q3Z3Z3Z3Z3Z3AX_Hy_Hy&_nc_ht=scontent.facc5-1.fna&oh=00_AfBXXZXMZVQIVQCBXKXwHDtXXJQZxLJMUWJCBXXXXXXXXX&oe=65C7F1C4",
  },
  {
    name: "Sports Field",
    image:
      "https://scontent.facc5-1.fna.fbcdn.net/v/t39.30808-6/420925314_935346834633491_1913260793276666856_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=q3Z3Z3Z3Z3Z3AX_Hy_Hy&_nc_ht=scontent.facc5-1.fna&oh=00_AfBXXZXMZVQIVQCBXKXwHDtXXJQZxLJMUWJCBXXXXXXXXX&oe=65C7F1C4",
  },
]

export default function VirtualTourPage() {
  const [selectedSpot, setSelectedSpot] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Virtual Tour</h1>
        <p className="text-center mb-12 max-w-2xl mx-auto">
          Experience Ejisuman Senior High School from anywhere in the world. Click on the locations below to start your
          virtual tour.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tourSpots.map((spot, index) => (
            <Card key={index} className="overflow-hidden">
              <Image
                src={spot.image || "/placeholder.svg"}
                alt={spot.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <h3 className="text-xl font-bold mb-2">{spot.name}</h3>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => setSelectedSpot(spot)}>View 360°</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>{selectedSpot?.name}</DialogTitle>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-4"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </DialogHeader>
                    <div className="aspect-video">
                      {/* Here you would integrate a 360-degree viewer */}
                      <Image
                        src={selectedSpot?.image || ""}
                        alt={selectedSpot?.name || ""}
                        width={800}
                        height={600}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="mb-4">Want to see more? Schedule an in-person tour!</p>
          <Button asChild>
            <a href="/contact">Schedule a Visit</a>
          </Button>
        </div>
      </div>
    </div>
  )
}

