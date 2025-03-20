"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useWebSocket } from "@/lib/socket-service"
import { motion, AnimatePresence } from "framer-motion"
import { Activity, User, Book, Clock, Calendar, LogIn } from "lucide-react"

export default function RealTimeActivityFeed() {
  const { status, messages } = useWebSocket()
  const [activities, setActivities] = useState([])

  // Process incoming WebSocket messages
  useEffect(() => {
    if (messages.length > 0) {
      const latestMessage = messages[messages.length - 1]

      // Convert WebSocket message to activity item
      const newActivity = formatActivity(latestMessage)
      if (newActivity) {
        setActivities((prev) => [newActivity, ...prev].slice(0, 20))
      }
    }
  }, [messages])

  // Format WebSocket message into activity item
  const formatActivity = (message) => {
    if (!message) return null

    const { type, data } = message
    const timestamp = new Date(data.timestamp)
    const timeString = timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

    switch (type) {
      case "attendance_update":
        return {
          id: `attendance-${Date.now()}`,
          icon: <Calendar className="h-4 w-4" />,
          color: "bg-green-500",
          title: `Attendance recorded for ${data.class_name}`,
          description: `${data.present_count} students present, ${data.absent_count} absent`,
          time: timeString,
        }
      case "grade_submission":
        return {
          id: `grade-${Date.now()}`,
          icon: <Book className="h-4 w-4" />,
          color: "bg-blue-500",
          title: `Grades submitted for ${data.course_name}`,
          description: `${data.students_graded} students graded, avg: ${data.average_score}%`,
          time: timeString,
        }
      case "system_login":
        return {
          id: `login-${Date.now()}`,
          icon: <LogIn className="h-4 w-4" />,
          color: "bg-purple-500",
          title: `New ${data.user_type} login`,
          description: `From ${data.device} device in ${data.location}`,
          time: timeString,
        }
      case "resource_access":
        return {
          id: `resource-${Date.now()}`,
          icon: <Book className="h-4 w-4" />,
          color: "bg-amber-500",
          title: `Resource accessed`,
          description: `Digital resource accessed by user #${data.user_id}`,
          time: timeString,
        }
      case "course_enrollment":
        return {
          id: `enrollment-${Date.now()}`,
          icon: <User className="h-4 w-4" />,
          color: "bg-indigo-500",
          title: `New course enrollment`,
          description: `Student enrolled in course #${data.course_id}`,
          time: timeString,
        }
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold flex items-center">
          <Activity className="mr-2 h-5 w-5 text-primary" />
          Live Activity Feed
          {status === "connected" && (
            <Badge variant="outline" className="ml-2 bg-green-500/10 text-green-500">
              <span className="relative flex h-2 w-2 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Live
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <AnimatePresence initial={false}>
            {activities.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[200px] text-center">
                <Activity className="h-10 w-10 text-muted-foreground mb-2 opacity-20" />
                <p className="text-muted-foreground">Waiting for activity data...</p>
              </div>
            ) : (
              activities.map((activity) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: "auto", marginBottom: 12 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start"
                >
                  <div className={`${activity.color} p-2 rounded-full mr-3 shrink-0`}>{activity.icon}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{activity.title}</h4>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 text-muted-foreground mr-1" />
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

