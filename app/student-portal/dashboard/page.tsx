"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dashboard,
  DashboardCard,
  PortalLayout,
  type StatCardProps,
  studentNavItems,
  studentUtilityItems,
  studentPortalConfig,
} from "@/components/portal-system"
import { DataTable } from "@/components/ui/data-table"
import { BarChart, LineChart, PieChart } from "@/components/ui/charts"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  BookOpen,
  GraduationCap,
  Calendar,
  Clock,
  FileText,
  Download,
  ExternalLink,
  Eye,
  Bell,
  AlertCircle,
  Compass,
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function StudentDashboardPage() {
  const router = useRouter()
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Assignment Due", message: "Mathematics assignment due tomorrow", read: false },
    { id: 2, title: "Exam Schedule", message: "Final exam schedule has been published", read: false },
    { id: 3, title: "Fee Payment", message: "Reminder to complete your fee payment", read: true },
  ])

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
    toast({
      title: "Notification marked as read",
      description: "The notification has been marked as read.",
    })
  }

  const handleViewAll = (section: string) => {
    router.push(`/student-portal/${section}`)
    toast({
      title: `Viewing all ${section}`,
      description: `Navigating to the ${section} section.`,
    })
  }

  // Stats for the dashboard
  const stats: StatCardProps[] = [
    {
      title: "Current GPA",
      value: "3.8",
      icon: <GraduationCap className="h-4 w-4 text-muted-foreground" />,
      description: "Top 15% of your class",
      variant: "primary",
      onClick: () => router.push("/student-portal/grades"),
    },
    {
      title: "Courses Enrolled",
      value: "6",
      icon: <BookOpen className="h-4 w-4 text-muted-foreground" />,
      description: "4 core, 2 electives",
      variant: "success",
      onClick: () => router.push("/student-portal/courses"),
    },
    {
      title: "Attendance Rate",
      value: "95%",
      icon: <Calendar className="h-4 w-4 text-muted-foreground" />,
      description: "5 absences this semester",
      variant: "secondary",
      onClick: () => router.push("/student-portal/attendance"),
    },
    {
      title: "Next Exam",
      value: "3 days",
      icon: <Clock className="h-4 w-4 text-muted-foreground" />,
      description: "Mathematics - Mar 23",
      variant: "warning",
      onClick: () => router.push("/student-portal/exams"),
    },
  ]

  // Dashboard actions
  const dashboardActions = (
    <>
      <Button
        variant="outline"
        onClick={() => router.push("/student-portal/calendar")}
        className="flex items-center gap-2"
      >
        <Calendar className="h-4 w-4" />
        <span className="hidden sm:inline">Academic Calendar</span>
      </Button>
      <Button onClick={() => router.push("/student-portal/notifications")} className="relative">
        <Bell className="h-4 w-4 mr-2" />
        <span>Notifications</span>
        {notifications.filter((n) => !n.read).length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {notifications.filter((n) => !n.read).length}
          </span>
        )}
      </Button>
    </>
  )

  // Tab content
  const tabContent = [
    {
      id: "overview",
      label: "Overview",
      content: (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <DashboardCard
              title="Academic Progress"
              description="Your GPA trend over the past terms"
              className="lg:col-span-4"
              footer={
                <div className="flex justify-between w-full">
                  <Button variant="outline" onClick={() => router.push("/student-portal/progress-report")}>
                    <FileText className="mr-2 h-4 w-4" />
                    Progress Report
                  </Button>
                  <Button onClick={() => router.push("/student-portal/academic-advisor")}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Contact Academic Advisor
                  </Button>
                </div>
              }
            >
              <LineChart
                data={[
                  { term: "Term 1", gpa: 3.5 },
                  { term: "Term 2", gpa: 3.7 },
                  { term: "Term 3", gpa: 3.6 },
                  { term: "Term 4", gpa: 3.8 },
                ]}
                xAxis="term"
                yAxis={["gpa"]}
              />
            </DashboardCard>

            <DashboardCard
              title="Study Time Distribution"
              description="Hours spent per subject"
              className="lg:col-span-3"
              footer={
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => router.push("/student-portal/study-analytics")}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Detailed Analytics
                </Button>
              }
            >
              <PieChart
                data={[
                  { subject: "Math", hours: 12 },
                  { subject: "Science", hours: 10 },
                  { subject: "English", hours: 8 },
                  { subject: "History", hours: 6 },
                  { subject: "Arts", hours: 4 },
                ]}
                category="subject"
                value="hours"
              />
            </DashboardCard>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DashboardCard
              title="Upcoming Assignments"
              actions={
                <Button variant="ghost" size="sm" onClick={() => handleViewAll("assignments")}>
                  View all
                </Button>
              }
            >
              <div className="space-y-4">
                {[
                  {
                    id: 1,
                    title: "Physics Lab Report",
                    course: "Physics",
                    dueDate: "Tomorrow, 11:59 PM",
                    status: "Not Started",
                  },
                  {
                    id: 2,
                    title: "Literature Essay",
                    course: "English Literature",
                    dueDate: "Mar 25, 2025",
                    status: "In Progress",
                  },
                  {
                    id: 3,
                    title: "Math Problem Set",
                    course: "Mathematics",
                    dueDate: "Mar 27, 2025",
                    status: "Not Started",
                  },
                ].map((assignment) => (
                  <div
                    key={assignment.id}
                    className="flex items-center justify-between p-2 rounded-md border hover:bg-muted/50 transition-colors"
                  >
                    <div>
                      <p className="font-medium">{assignment.title}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span>{assignment.course}</span>
                        <span className="mx-2">•</span>
                        <span>{assignment.dueDate}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={assignment.status === "In Progress" ? "secondary" : "outline"}>
                        {assignment.status}
                      </Badge>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => router.push(`/student-portal/assignments/${assignment.id}`)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View assignment details</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                ))}
              </div>
            </DashboardCard>

            <DashboardCard
              title="Notifications"
              actions={
                <Button variant="ghost" size="sm" onClick={() => handleViewAll("notifications")}>
                  View all
                </Button>
              }
            >
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start justify-between p-2 rounded-md border ${notification.read ? "bg-muted/20" : "bg-blue-50 dark:bg-blue-900/20"} hover:bg-muted/50 transition-colors`}
                  >
                    <div className="flex gap-3">
                      <div className={`mt-1 ${notification.read ? "text-muted-foreground" : "text-blue-500"}`}>
                        <AlertCircle className="h-4 w-4" />
                      </div>
                      <div>
                        <p className={`font-medium ${notification.read ? "text-muted-foreground" : ""}`}>
                          {notification.title}
                        </p>
                        <p className="text-xs text-muted-foreground">{notification.message}</p>
                      </div>
                    </div>
                    {!notification.read && (
                      <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                        Mark as read
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </DashboardCard>
          </div>
        </>
      ),
    },
    {
      id: "courses",
      label: "Courses",
      content: (
        <DashboardCard title="Enrolled Courses" description="Your current semester courses">
          <DataTable
            columns={[
              { header: "Course Name", accessorKey: "name" },
              { header: "Instructor", accessorKey: "instructor" },
              { header: "Schedule", accessorKey: "schedule" },
              { header: "Progress", accessorKey: "progress" },
              {
                header: "Actions",
                cell: (info) => (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/student-portal/courses/${info.row.original.id}`)}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/student-portal/courses/${info.row.original.id}/materials`)}
                    >
                      Materials
                    </Button>
                  </div>
                ),
              },
            ]}
            data={[
              {
                id: "c1",
                name: "Mathematics",
                instructor: "Dr. Smith",
                schedule: "Mon, Wed 10:00 AM",
                progress: "75%",
              },
              { id: "c2", name: "Physics", instructor: "Prof. Johnson", schedule: "Tue, Thu 2:00 PM", progress: "60%" },
              { id: "c3", name: "Literature", instructor: "Ms. Davis", schedule: "Fri 1:00 PM", progress: "80%" },
              { id: "c4", name: "History", instructor: "Dr. Wilson", schedule: "Mon, Wed 1:00 PM", progress: "65%" },
              {
                id: "c5",
                name: "Chemistry",
                instructor: "Prof. Brown",
                schedule: "Tue, Thu 10:00 AM",
                progress: "70%",
              },
              {
                id: "c6",
                name: "Computer Science",
                instructor: "Mr. Taylor",
                schedule: "Wed, Fri 3:00 PM",
                progress: "85%",
              },
            ]}
          />
        </DashboardCard>
      ),
    },
    {
      id: "grades",
      label: "Grades",
      content: (
        <DashboardCard
          title="Current Grades"
          description="Your performance in each subject"
          footer={
            <Button variant="outline" className="w-full" onClick={() => router.push("/student-portal/transcript")}>
              <Download className="mr-2 h-4 w-4" />
              Download Transcript
            </Button>
          }
        >
          <BarChart
            data={[
              { subject: "Math", grade: 85 },
              { subject: "Physics", grade: 78 },
              { subject: "Literature", grade: 92 },
              { subject: "History", grade: 88 },
              { subject: "Chemistry", grade: 76 },
              { subject: "Computer Science", grade: 94 },
            ]}
            xAxis="subject"
            yAxis="grade"
          />
        </DashboardCard>
      ),
    },
    {
      id: "schedule",
      label: "Schedule",
      content: (
        <DashboardCard
          title="Weekly Schedule"
          description="Your class timetable for the week"
          footer={
            <div className="flex justify-between w-full">
              <Button variant="outline" onClick={() => router.push("/student-portal/schedule/print")}>
                <Download className="mr-2 h-4 w-4" />
                Print Schedule
              </Button>
              <Button onClick={() => router.push("/student-portal/schedule/conflicts")}>
                Report Schedule Conflict
              </Button>
            </div>
          }
        >
          <DataTable
            columns={[
              { header: "Time", accessorKey: "time" },
              { header: "Monday", accessorKey: "monday" },
              { header: "Tuesday", accessorKey: "tuesday" },
              { header: "Wednesday", accessorKey: "wednesday" },
              { header: "Thursday", accessorKey: "thursday" },
              { header: "Friday", accessorKey: "friday" },
            ]}
            data={[
              {
                time: "9:00 AM",
                monday: "Math",
                tuesday: "Physics",
                wednesday: "Math",
                thursday: "Physics",
                friday: "Literature",
              },
              {
                time: "11:00 AM",
                monday: "History",
                tuesday: "Chemistry",
                wednesday: "History",
                thursday: "Chemistry",
                friday: "PE",
              },
              {
                time: "2:00 PM",
                monday: "Literature",
                tuesday: "Math",
                wednesday: "Literature",
                thursday: "Math",
                friday: "Physics",
              },
            ]}
          />
        </DashboardCard>
      ),
    },
    {
      id: "assignments",
      label: "Assignments",
      content: (
        <DashboardCard title="All Assignments" description="Track your assignments and submissions">
          <DataTable
            columns={[
              { header: "Title", accessorKey: "title" },
              { header: "Course", accessorKey: "course" },
              { header: "Due Date", accessorKey: "dueDate" },
              {
                header: "Status",
                accessorKey: "status",
                cell: (info) => (
                  <Badge
                    variant={
                      info.getValue() === "Completed"
                        ? "success"
                        : info.getValue() === "In Progress"
                          ? "secondary"
                          : info.getValue() === "Not Started"
                            ? "outline"
                            : "destructive"
                    }
                  >
                    {info.getValue()}
                  </Badge>
                ),
              },
              {
                header: "Actions",
                cell: (info) => (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/student-portal/assignments/${info.row.original.id}`)}
                    >
                      View
                    </Button>
                    {info.row.original.status !== "Completed" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/student-portal/assignments/${info.row.original.id}/submit`)}
                      >
                        Submit
                      </Button>
                    )}
                  </div>
                ),
              },
            ]}
            data={[
              {
                id: 1,
                title: "Physics Lab Report",
                course: "Physics",
                dueDate: "Tomorrow, 11:59 PM",
                status: "Not Started",
              },
              {
                id: 2,
                title: "Literature Essay",
                course: "English Literature",
                dueDate: "Mar 25, 2025",
                status: "In Progress",
              },
              {
                id: 3,
                title: "Math Problem Set",
                course: "Mathematics",
                dueDate: "Mar 27, 2025",
                status: "Not Started",
              },
              {
                id: 4,
                title: "History Research Paper",
                course: "History",
                dueDate: "Mar 15, 2025",
                status: "Completed",
              },
              {
                id: 5,
                title: "Chemistry Lab Report",
                course: "Chemistry",
                dueDate: "Mar 10, 2025",
                status: "Completed",
              },
              {
                id: 6,
                title: "Programming Project",
                course: "Computer Science",
                dueDate: "Mar 5, 2025",
                status: "Completed",
              },
              { id: 7, title: "Group Presentation", course: "Literature", dueDate: "Mar 1, 2025", status: "Completed" },
            ]}
          />
        </DashboardCard>
      ),
    },
  ]

  // Sidebar footer
  const sidebarFooter = (
    <Button variant="default" size="sm" className="w-full text-xs" onClick={() => (window.location.href = "/")}>
      <Compass className="mr-2 h-4 w-4" />
      Back to Main Site
    </Button>
  )

  // User profile
  const userProfile = {
    id: "STD-1234",
    name: "John Doe",
    role: "Student",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "john.doe@example.com",
    department: "Science",
  }

  return (
    <PortalLayout
      user={userProfile}
      portalName={studentPortalConfig.name}
      navItems={studentNavItems}
      utilityItems={studentUtilityItems}
      notificationCount={notifications.filter((n) => !n.read).length}
      messageCount={2}
      sidebarFooter={sidebarFooter}
    >
      <Dashboard
        title="Student Dashboard"
        subtitle="Welcome back, John. Here's an overview of your academic progress."
        actions={dashboardActions}
        stats={stats}
        tabs={tabContent}
        defaultTab="overview"
      />
    </PortalLayout>
  )
}

