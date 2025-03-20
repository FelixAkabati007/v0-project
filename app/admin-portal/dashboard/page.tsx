"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import AdminSidebar from "@/components/AdminSidebar"
import DashboardNavbar from "@/components/DashboardNavbar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { BarChart, LineChart, PieChart } from "@/components/ui/charts"
import { DataTable } from "@/components/ui/data-table"
import { AdvancedDataTable } from "@/components/ui/advanced-data-table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "@/components/ui/use-toast"
import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  FileText,
  Download,
  Filter,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  ArrowUpRight,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart2,
  PieChartIcon,
  LineChartIcon,
} from "lucide-react"

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleViewDetails = (section: string, id: string) => {
    router.push(`/admin-portal/${section}/${id}`)
    toast({
      title: `Viewing ${section} details`,
      description: `Navigating to ${section} details page.`,
    })
  }

  const handleEdit = (section: string, id: string) => {
    router.push(`/admin-portal/${section}/${id}/edit`)
    toast({
      title: `Editing ${section}`,
      description: `Navigating to ${section} edit page.`,
    })
  }

  const handleDelete = (section: string, id: string) => {
    toast({
      title: `Delete ${section}`,
      description: `Are you sure you want to delete this ${section}?`,
      action: (
        <div className="flex gap-2">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              toast({
                title: `${section} deleted`,
                description: `The ${section} has been deleted successfully.`,
              })
            }}
          >
            Delete
          </Button>
          <Button variant="outline" size="sm">
            Cancel
          </Button>
        </div>
      ),
    })
  }

  const handleCreateNew = (section: string) => {
    router.push(`/admin-portal/${section}/create`)
    toast({
      title: `Create new ${section}`,
      description: `Navigating to ${section} creation page.`,
    })
  }

  const handleDownloadReport = (reportType: string) => {
    toast({
      title: "Downloading report",
      description: `The ${reportType} report is being downloaded.`,
    })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar isOpen={isSidebarOpen} onToggle={handleToggleSidebar} />

      <div
        className={`flex-1 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? "ml-[280px]" : "ml-[80px]"}`}
      >
        <DashboardNavbar userType="admin" onToggleSidebar={handleToggleSidebar} userName="Admin User" />

        <main className="p-4 md:p-6 lg:p-8">
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-6">
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, Admin. Here's an overview of the school system.</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => router.push("/admin-portal/reports")}
                  className="flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">Reports</span>
                </Button>
                <Button onClick={() => router.push("/admin-portal/analytics")} className="flex items-center gap-2">
                  <BarChart2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Analytics</span>
                </Button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-l-4 border-l-blue-500 transition-all hover:shadow-md">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,248</div>
                    <div className="flex items-center text-xs text-green-600 mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      <span>+8% from last year</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-xs"
                      onClick={() => router.push("/admin-portal/users?type=student")}
                    >
                      View all students
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="border-l-4 border-l-green-500 transition-all hover:shadow-md">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">86</div>
                    <div className="flex gap-1 mt-1">
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                        52 teachers
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                        34 admin
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="p-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-xs"
                      onClick={() => router.push("/admin-portal/users?type=staff")}
                    >
                      View all staff
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="border-l-4 border-l-purple-500 transition-all hover:shadow-md">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">42</div>
                    <div className="flex gap-1 mt-1">
                      <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                        12 new
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="p-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-xs"
                      onClick={() => router.push("/admin-portal/courses")}
                    >
                      View all courses
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="border-l-4 border-l-amber-500 transition-all hover:shadow-md">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₵245,000</div>
                    <div className="flex items-center text-xs text-red-600 mt-1">
                      <TrendingDown className="h-3 w-3 mr-1" />
                      <span>-3% from last month</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-xs"
                      onClick={() => router.push("/admin-portal/finance")}
                    >
                      View financial reports
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="students">Students</TabsTrigger>
                  <TabsTrigger value="staff">Staff</TabsTrigger>
                  <TabsTrigger value="courses">Courses</TabsTrigger>
                  <TabsTrigger value="finance">Finance</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>Enrollment Trends</CardTitle>
                            <CardDescription>Student enrollment over the past 5 years</CardDescription>
                          </div>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => handleDownloadReport("enrollment")}
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Download enrollment report</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <LineChart
                          data={[
                            { year: "2020", students: 980 },
                            { year: "2021", students: 1050 },
                            { year: "2022", students: 1120 },
                            { year: "2023", students: 1180 },
                            { year: "2024", students: 1248 },
                          ]}
                          xAxis="year"
                          yAxis={["students"]}
                        />
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => router.push("/admin-portal/analytics/enrollment")}
                        >
                          <LineChartIcon className="mr-2 h-4 w-4" />
                          View Detailed Analysis
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>Revenue Breakdown</CardTitle>
                            <CardDescription>Revenue sources for current fiscal year</CardDescription>
                          </div>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="outline" size="icon" onClick={() => handleDownloadReport("revenue")}>
                                  <Download className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Download revenue report</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <PieChart
                          data={[
                            { source: "Tuition Fees", amount: 180000 },
                            { source: "Government Grants", amount: 45000 },
                            { source: "Donations", amount: 15000 },
                            { source: "Other Income", amount: 5000 },
                          ]}
                          category="source"
                          value="amount"
                        />
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => router.push("/admin-portal/finance/revenue")}
                        >
                          <PieChartIcon className="mr-2 h-4 w-4" />
                          View Revenue Details
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>Recent Activities</CardTitle>
                          <Button variant="ghost" size="sm" onClick={() => router.push("/admin-portal/activities")}>
                            View all
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            {
                              id: 1,
                              type: "user",
                              action: "New student registered",
                              time: "2 hours ago",
                              status: "success",
                            },
                            {
                              id: 2,
                              type: "course",
                              action: "Course schedule updated",
                              time: "5 hours ago",
                              status: "success",
                            },
                            {
                              id: 3,
                              type: "finance",
                              action: "Payment received",
                              time: "Yesterday",
                              status: "success",
                            },
                            {
                              id: 4,
                              type: "user",
                              action: "Staff account updated",
                              time: "2 days ago",
                              status: "warning",
                            },
                            {
                              id: 5,
                              type: "system",
                              action: "System maintenance",
                              time: "3 days ago",
                              status: "error",
                            },
                          ].map((activity) => (
                            <div
                              key={activity.id}
                              className="flex items-start justify-between p-2 rounded-md border hover:bg-muted/50 transition-colors"
                            >
                              <div className="flex gap-3">
                                <div
                                  className={`mt-1 ${
                                    activity.status === "success"
                                      ? "text-green-500"
                                      : activity.status === "warning"
                                        ? "text-amber-500"
                                        : "text-red-500"
                                  }`}
                                >
                                  {activity.status === "success" ? (
                                    <CheckCircle className="h-4 w-4" />
                                  ) : activity.status === "warning" ? (
                                    <AlertCircle className="h-4 w-4" />
                                  ) : (
                                    <XCircle className="h-4 w-4" />
                                  )}
                                </div>
                                <div>
                                  <p className="font-medium">{activity.action}</p>
                                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleViewDetails("activities", activity.id.toString())}
                              >
                                <ArrowUpRight className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="lg:col-span-2">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>Upcoming Events</CardTitle>
                            <CardDescription>School events in the next 30 days</CardDescription>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => router.push("/admin-portal/calendar")}>
                            <Calendar className="mr-2 h-4 w-4" />
                            Full Calendar
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            {
                              id: 1,
                              title: "Board Meeting",
                              date: "March 25, 2025",
                              time: "10:00 AM",
                              location: "Conference Room A",
                            },
                            {
                              id: 2,
                              title: "Parent-Teacher Conference",
                              date: "March 28, 2025",
                              time: "2:00 PM",
                              location: "Main Hall",
                            },
                            {
                              id: 3,
                              title: "Science Fair",
                              date: "April 5, 2025",
                              time: "9:00 AM",
                              location: "School Grounds",
                            },
                            {
                              id: 4,
                              title: "Staff Development Day",
                              date: "April 10, 2025",
                              time: "All Day",
                              location: "Training Center",
                            },
                          ].map((event) => (
                            <div key={event.id} className="flex items-center justify-between border-b pb-4">
                              <div className="flex items-center space-x-4">
                                <div className="rounded-full bg-primary/10 p-2">
                                  <Calendar className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                  <p className="font-medium">{event.title}</p>
                                  <div className="flex items-center text-xs text-muted-foreground">
                                    <span>{event.date}</span>
                                    <span className="mx-2">•</span>
                                    <span>{event.time}</span>
                                    <span className="mx-2">•</span>
                                    <span>{event.location}</span>
                                  </div>
                                </div>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => router.push(`/admin-portal/calendar/events/${event.id}`)}
                              >
                                Details
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="students" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <CardTitle>Student Management</CardTitle>
                          <CardDescription>View and manage all students</CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              type="search"
                              placeholder="Search students..."
                              className="pl-8 w-[200px]"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                          </div>
                          <Button variant="outline" size="icon">
                            <Filter className="h-4 w-4" />
                          </Button>
                          <Button onClick={() => handleCreateNew("students")}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Student
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <AdvancedDataTable
                        columns={[
                          { header: "ID", accessorKey: "id" },
                          { header: "Name", accessorKey: "name" },
                          { header: "Class", accessorKey: "class" },
                          { header: "Gender", accessorKey: "gender" },
                          { header: "Age", accessorKey: "age" },
                          {
                            header: "Status",
                            accessorKey: "status",
                            cell: (info) => (
                              <Badge
                                variant={
                                  info.getValue() === "Active"
                                    ? "success"
                                    : info.getValue() === "Suspended"
                                      ? "destructive"
                                      : "outline"
                                }
                              >
                                {info.getValue()}
                              </Badge>
                            ),
                          },
                          {
                            header: "Actions",
                            cell: (info) => (
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleViewDetails("students", info.row.original.id)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEdit("students", info.row.original.id)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDelete("students", info.row.original.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ),
                          },
                        ]}
                        data={[
                          {
                            id: "STD001",
                            name: "John Doe",
                            class: "Form 3A",
                            gender: "Male",
                            age: 17,
                            status: "Active",
                          },
                          {
                            id: "STD002",
                            name: "Jane Smith",
                            class: "Form 2B",
                            gender: "Female",
                            age: 16,
                            status: "Active",
                          },
                          {
                            id: "STD003",
                            name: "Michael Johnson",
                            class: "Form 3A",
                            gender: "Male",
                            age: 17,
                            status: "Active",
                          },
                          {
                            id: "STD004",
                            name: "Sarah Williams",
                            class: "Form 1C",
                            gender: "Female",
                            age: 15,
                            status: "Active",
                          },
                          {
                            id: "STD005",
                            name: "David Brown",
                            class: "Form 2A",
                            gender: "Male",
                            age: 16,
                            status: "Suspended",
                          },
                        ]}
                        searchable
                        pagination
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="staff" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <CardTitle>Staff Management</CardTitle>
                          <CardDescription>View and manage all staff members</CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              type="search"
                              placeholder="Search staff..."
                              className="pl-8 w-[200px]"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                          </div>
                          <Button variant="outline" size="icon">
                            <Filter className="h-4 w-4" />
                          </Button>
                          <Button onClick={() => handleCreateNew("staff")}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Staff
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <AdvancedDataTable
                        columns={[
                          { header: "ID", accessorKey: "id" },
                          { header: "Name", accessorKey: "name" },
                          { header: "Role", accessorKey: "role" },
                          { header: "Department", accessorKey: "department" },
                          { header: "Join Date", accessorKey: "joinDate" },
                          {
                            header: "Status",
                            accessorKey: "status",
                            cell: (info) => (
                              <Badge
                                variant={
                                  info.getValue() === "Active"
                                    ? "success"
                                    : info.getValue() === "On Leave"
                                      ? "warning"
                                      : "outline"
                                }
                              >
                                {info.getValue()}
                              </Badge>
                            ),
                          },
                          {
                            header: "Actions",
                            cell: (info) => (
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleViewDetails("staff", info.row.original.id)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEdit("staff", info.row.original.id)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDelete("staff", info.row.original.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ),
                          },
                        ]}
                        data={[
                          {
                            id: "STF001",
                            name: "Dr. James Wilson",
                            role: "Teacher",
                            department: "Science",
                            joinDate: "Jan 15, 2020",
                            status: "Active",
                          },
                          {
                            id: "STF002",
                            name: "Mrs. Emily Davis",
                            role: "Teacher",
                            department: "Mathematics",
                            joinDate: "Aug 10, 2019",
                            status: "Active",
                          },
                          {
                            id: "STF003",
                            name: "Mr. Robert Taylor",
                            role: "Teacher",
                            department: "English",
                            joinDate: "Sep 5, 2021",
                            status: "Active",
                          },
                          {
                            id: "STF004",
                            name: "Ms. Jennifer Adams",
                            role: "Administrator",
                            department: "Admin",
                            joinDate: "Mar 20, 2018",
                            status: "Active",
                          },
                          {
                            id: "STF005",
                            name: "Mr. Thomas Brown",
                            role: "Teacher",
                            department: "Physical Education",
                            joinDate: "Feb 12, 2022",
                            status: "On Leave",
                          },
                        ]}
                        searchable
                        pagination
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="courses" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <CardTitle>Course Management</CardTitle>
                          <CardDescription>View and manage all courses</CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              type="search"
                              placeholder="Search courses..."
                              className="pl-8 w-[200px]"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                          </div>
                          <Button variant="outline" size="icon">
                            <Filter className="h-4 w-4" />
                          </Button>
                          <Button onClick={() => handleCreateNew("courses")}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Course
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <AdvancedDataTable
                        columns={[
                          { header: "Code", accessorKey: "code" },
                          { header: "Title", accessorKey: "title" },
                          { header: "Department", accessorKey: "department" },
                          { header: "Instructor", accessorKey: "instructor" },
                          { header: "Students", accessorKey: "students" },
                          {
                            header: "Status",
                            accessorKey: "status",
                            cell: (info) => (
                              <Badge
                                variant={
                                  info.getValue() === "Active"
                                    ? "success"
                                    : info.getValue() === "Upcoming"
                                      ? "warning"
                                      : "outline"
                                }
                              >
                                {info.getValue()}
                              </Badge>
                            ),
                          },
                          {
                            header: "Actions",
                            cell: (info) => (
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleViewDetails("courses", info.row.original.code)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEdit("courses", info.row.original.code)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDelete("courses", info.row.original.code)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ),
                          },
                        ]}
                        data={[
                          {
                            code: "MATH101",
                            title: "Basic Mathematics",
                            department: "Mathematics",
                            instructor: "Mrs. Emily Davis",
                            students: 45,
                            status: "Active",
                          },
                          {
                            code: "SCI201",
                            title: "Physics",
                            department: "Science",
                            instructor: "Dr. James Wilson",
                            students: 38,
                            status: "Active",
                          },
                          {
                            code: "ENG101",
                            title: "English Language",
                            department: "English",
                            instructor: "Mr. Robert Taylor",
                            students: 50,
                            status: "Active",
                          },
                          {
                            code: "HIST101",
                            title: "World History",
                            department: "Social Studies",
                            instructor: "Ms. Patricia Moore",
                            students: 42,
                            status: "Active",
                          },
                          {
                            code: "COMP101",
                            title: "Introduction to Computing",
                            department: "ICT",
                            instructor: "Mr. Daniel Johnson",
                            students: 35,
                            status: "Upcoming",
                          },
                        ]}
                        searchable
                        pagination
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="finance" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <CardTitle>Financial Overview</CardTitle>
                          <CardDescription>School financial summary</CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" onClick={() => handleDownloadReport("financial")}>
                            <Download className="mr-2 h-4 w-4" />
                            Download Report
                          </Button>
                          <Button onClick={() => router.push("/admin-portal/finance/transactions")}>
                            <Plus className="mr-2 h-4 w-4" />
                            New Transaction
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Revenue vs Expenses</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <BarChart
                              data={[
                                { month: "Jan", revenue: 42000, expenses: 35000 },
                                { month: "Feb", revenue: 38000, expenses: 32000 },
                                { month: "Mar", revenue: 45000, expenses: 36000 },
                              ]}
                              xAxis="month"
                              yAxis={["revenue", "expenses"]}
                            />
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Expense Breakdown</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <PieChart
                              data={[
                                { category: "Salaries", amount: 25000 },
                                { category: "Facilities", amount: 8000 },
                                { category: "Materials", amount: 5000 },
                                { category: "Utilities", amount: 3000 },
                                { category: "Other", amount: 2000 },
                              ]}
                              category="category"
                              value="amount"
                            />
                          </CardContent>
                        </Card>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-4">Recent Transactions</h3>
                        <DataTable
                          columns={[
                            { header: "ID", accessorKey: "id" },
                            { header: "Description", accessorKey: "description" },
                            {
                              header: "Amount",
                              accessorKey: "amount",
                              cell: (info) => {
                                const amount = info.getValue() as number
                                const type = info.row.original.type
                                return (
                                  <span className={type === "Income" ? "text-green-600" : "text-red-600"}>
                                    {type === "Income" ? "+" : "-"}₵{amount.toLocaleString()}
                                  </span>
                                )
                              },
                            },
                            { header: "Type", accessorKey: "type" },
                            { header: "Date", accessorKey: "date" },
                            {
                              header: "Actions",
                              cell: (info) => (
                                <div className="flex space-x-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleViewDetails("finance/transactions", info.row.original.id)}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </div>
                              ),
                            },
                          ]}
                          data={[
                            {
                              id: "TRX001",
                              description: "School Fees - Form 3",
                              amount: 25000,
                              type: "Income",
                              date: "Mar 15, 2025",
                            },
                            {
                              id: "TRX002",
                              description: "Salary Payment",
                              amount: 18000,
                              type: "Expense",
                              date: "Mar 10, 2025",
                            },
                            {
                              id: "TRX003",
                              description: "Textbook Purchase",
                              amount: 5000,
                              type: "Expense",
                              date: "Mar 8, 2025",
                            },
                            {
                              id: "TRX004",
                              description: "School Fees - Form 2",
                              amount: 22000,
                              type: "Income",
                              date: "Mar 5, 2025",
                            },
                            {
                              id: "TRX005",
                              description: "Utility Bills",
                              amount: 3000,
                              type: "Expense",
                              date: "Mar 1, 2025",
                            },
                          ]}
                        />
                        <div className="flex justify-end mt-4">
                          <Button variant="outline" onClick={() => router.push("/admin-portal/finance/transactions")}>
                            View All Transactions
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

