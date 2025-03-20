"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { PortalHeader } from "@/components/portal-header"
import { TeacherSidebar } from "@/components/teacher-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Progress } from "@/components/ui/progress"
import { BarChart, LineChart } from "@/components/ui/charts"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { icons } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// Reusable components
const MetricCard = ({ title, value, icon: Icon, progress, buttonText, onButtonClick, borderColor }) => (
  <Card className={`border-l-4 ${borderColor} transition-all hover:shadow-md`}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {progress ? <Progress value={progress} className="mt-2" /> : null}
    </CardContent>
    <CardFooter className="p-2">
      <Button variant="ghost" size="sm" className="w-full text-xs" onClick={onButtonClick}>
        {buttonText}
      </Button>
    </CardFooter>
  </Card>
)

const LessonItem = ({ lesson, onView }) => (
  <div className="flex items-center justify-between border-b pb-4">
    <div className="flex items-center space-x-4">
      <div className="rounded-full bg-primary/10 p-2">
        <icons.BookOpen className="h-4 w-4 text-primary" />
      </div>
      <div>
        <p className="font-medium">{lesson.subject}</p>
        <p className="text-sm text-muted-foreground">
          {lesson.class} • {lesson.room}
        </p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <Badge variant="outline">{lesson.time}</Badge>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={() => onView(lesson.id)}>
              <icons.ArrowUpRight className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>View lesson details</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </div>
)

// Constants
const METRICS = [
  {
    title: "Total Students",
    value: "125",
    icon: icons.Users,
    buttonText: "View all students",
    borderColor: "border-l-blue-500",
    route: "/teacher-portal/students"
  },
  {
    title: "Average Attendance",
    value: "92%",
    icon: icons.CheckCircle,
    progress: 92,
    buttonText: "View attendance records",
    borderColor: "border-l-green-500",
    route: "/teacher-portal/attendance"
  },
  {
    title: "Average Grade",
    value: "75%",
    icon: icons.BookOpen,
    progress: 75,
    buttonText: "View grade analytics",
    borderColor: "border-l-purple-500",
    route: "/teacher-portal/grades"
  },
  {
    title: "Next Class",
    value: "08:00 AM",
    icon: icons.Clock,
    buttonText: "View full schedule",
    borderColor: "border-l-amber-500",
    route: "/teacher-portal/schedule"
  }
]

export default function TeacherPortalPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  // Mock data remains the same...

  // Unified navigation handler
  const handleNavigation = (route: string, toastConfig: { title: string; description: string }) => {
    router.push(route)
    toast(toastConfig)
  }

  // Animation variants remain the same...

  return (
    <div className="flex min-h-screen flex-col">
      <PortalHeader
        portalName="Teacher Portal"
        userRole="Science Teacher"
        userName="Dr. Kwame Mensah"
        sidebarContent={<TeacherSidebar />}
        notificationCount={3}
      />

      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-6">
          {/* Header section remains the same */}

          <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {METRICS.map((metric) => (
              <MetricCard
                key={metric.title}
                {...metric}
                onButtonClick={() => handleNavigation(metric.route, {
                  title: `Viewing ${metric.title.toLowerCase()}`,
                  description: `Navigating to ${metric.title.toLowerCase()} page.`
                })}
              />
            ))}
          </motion.div>

          <motion.div variants={itemVariants}>
            <Tabs defaultValue="overview" className="space-y-4">
              {/* Tabs remain the same */}

              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="lg:col-span-4">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Today's Schedule</CardTitle>
                          <CardDescription>Your upcoming classes for today</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => router.push("/teacher-portal/schedule")}>
                          <icons.ArrowUpRight className="mr-2 h-4 w-4" />
                          Full Schedule
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {upcomingLessons.map((lesson) => (
                          <LessonItem
                            key={lesson.id}
                            lesson={lesson}
                            onView={(id) => handleNavigation(`/teacher-portal/lessons/${id}`, {
                              title: "Viewing lesson details",
                              description: `Navigating to lesson details page.`
                            })}
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Other cards remain the same */}
                </div>
              </TabsContent>

              {/* Other tabs remain similar with extracted components */}
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

