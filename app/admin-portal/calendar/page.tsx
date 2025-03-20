"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [events, setEvents] = useState([
    { id: 1, title: "Staff Meeting", date: new Date(2023, 5, 15) },
    { id: 2, title: "Parent-Teacher Conference", date: new Date(2023, 5, 20) },
    { id: 3, title: "End of Term Exams", date: new Date(2023, 5, 25) },
  ])

  const handleAddEvent = (newEvent) => {
    setEvents([...events, { id: events.length + 1, ...newEvent }])
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8"
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">School Calendar</CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-green-600 to-green-400 text-white">
                <Plus className="mr-2 h-4 w-4" /> Add Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
              </DialogHeader>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.target as HTMLFormElement)
                  handleAddEvent({
                    title: formData.get("title") as string,
                    date: new Date(formData.get("date") as string),
                  })
                }}
              >
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input id="title" name="title" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                      Date
                    </Label>
                    <Input id="date" name="date" type="date" className="col-span-3" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit">Save Event</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="flex justify-between">
          <div className="w-1/2">
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
          </div>
          <div className="w-1/2 ml-8">
            <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
            <ul className="space-y-2">
              {events.map((event) => (
                <li key={event.id} className="flex justify-between items-center">
                  <span>{event.title}</span>
                  <span className="text-sm text-gray-500">{event.date.toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

