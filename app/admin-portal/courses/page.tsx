"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useAdmin } from "@/contexts/admin-context"
import { AdvancedDataTable } from "@/components/ui/advanced-data-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  BookPlus,
  Edit,
  Trash2,
  Download,
  Printer,
  Share2,
  RefreshCw,
  MoreHorizontal,
  Users,
  Calendar,
} from "lucide-react"
import { ResponsiveButton } from "@/components/ui/responsive-button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CoursesPage() {
  const { courses, addCourse, updateCourse, deleteCourse, addNotification } = useAdmin()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedCourses, setSelectedCourses] = useState([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentCourse, setCurrentCourse] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    instructor: "",
    description: "",
    department: "",
    credits: "3",
    capacity: "30",
    status: "Active",
  })

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false)
      addNotification("Course data refreshed", "success")
    }, 1000)
  }

  const handleExport = () => addNotification("Exporting course data...", "info")
  const handlePrint = () => addNotification("Preparing course list for printing...", "info")
  const handleShare = () => addNotification("Share functionality coming soon", "info")

  const handleDeleteSelected = () => {
    selectedCourses.forEach((course) => deleteCourse(course.id))
    setSelectedCourses([])
    addNotification(`${selectedCourses.length} courses deleted successfully`, "success")
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddCourse = () => {
    addCourse({
      name: formData.name,
      code: formData.code,
      instructor: formData.instructor,
      students: Number.parseInt(formData.capacity),
      status: formData.status,
      description: formData.description,
      department: formData.department,
      credits: Number.parseInt(formData.credits),
    })
    setIsAddDialogOpen(false)
    resetForm()
  }

  const handleEditCourse = () => {
    updateCourse(currentCourse.id, {
      name: formData.name,
      code: formData.code,
      instructor: formData.instructor,
      students: Number.parseInt(formData.capacity),
      status: formData.status,
      description: formData.description,
      department: formData.department,
      credits: Number.parseInt(formData.credits),
    })
    setIsEditDialogOpen(false)
    setCurrentCourse(null)
    resetForm()
  }

  const openEditDialog = (course) => {
    setCurrentCourse(course)
    setFormData({
      name: course.name,
      code: course.code,
      instructor: course.instructor,
      description: course.description || "",
      department: course.department || "",
      credits: course.credits?.toString() || "3",
      capacity: course.students?.toString() || "30",
      status: course.status,
    })
    setIsEditDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      instructor: "",
      description: "",
      department: "",
      credits: "3",
      capacity: "30",
      status: "Active",
    })
  }

  const columns = [
    {
      accessorKey: "name",
      header: "Course Name",
    },
    {
      accessorKey: "code",
      header: "Code",
    },
    {
      accessorKey: "instructor",
      header: "Instructor",
    },
    {
      accessorKey: "students",
      header: "Students",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status")
        return <Badge variant={status === "Active" ? "success" : "secondary"}>{status}</Badge>
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const course = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => openEditDialog(course)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" />
                View Students
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Calendar className="mr-2 h-4 w-4" />
                Schedule
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => {
                  deleteCourse(course.id)
                  addNotification(`Course ${course.name} deleted`, "success")
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const CourseForm = ({ isEdit = false }) => (
    <>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Course Name
          </Label>
          <Input id="name" name="name" value={formData.name} onChange={handleFormChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="code" className="text-right">
            Course Code
          </Label>
          <Input id="code" name="code" value={formData.code} onChange={handleFormChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="instructor" className="text-right">
            Instructor
          </Label>
          <Input
            id="instructor"
            name="instructor"
            value={formData.instructor}
            onChange={handleFormChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="department" className="text-right">
            Department
          </Label>
          <Input
            id="department"
            name="department"
            value={formData.department}
            onChange={handleFormChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="credits" className="text-right">
            Credits
          </Label>
          <Select value={formData.credits} onValueChange={(value) => handleSelectChange("credits", value)}>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select credits" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="capacity" className="text-right">
            Capacity
          </Label>
          <Input
            id="capacity"
            name="capacity"
            type="number"
            value={formData.capacity}
            onChange={handleFormChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="status" className="text-right">
            Status
          </Label>
          <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleFormChange}
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={() => (isEdit ? setIsEditDialogOpen(false) : setIsAddDialogOpen(false))}
        >
          Cancel
        </Button>
        <Button type="button" onClick={isEdit ? handleEditCourse : handleAddCourse}>
          {isEdit ? "Update Course" : "Add Course"}
        </Button>
      </DialogFooter>
    </>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Courses Management</h1>
          <p className="text-gray-500">Manage all courses in the system</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <ResponsiveButton
            onClick={handleRefresh}
            variant="outline"
            size="sm"
            icon={<RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />}
            disabled={isRefreshing}
          >
            Refresh
          </ResponsiveButton>
          <ResponsiveButton onClick={handleExport} variant="outline" size="sm" icon={<Download className="h-4 w-4" />}>
            Export
          </ResponsiveButton>
          <ResponsiveButton onClick={handlePrint} variant="outline" size="sm" icon={<Printer className="h-4 w-4" />}>
            Print
          </ResponsiveButton>
          <ResponsiveButton onClick={handleShare} variant="outline" size="sm" icon={<Share2 className="h-4 w-4" />}>
            Share
          </ResponsiveButton>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
          <div>
            <CardTitle className="text-2xl font-bold">Courses List</CardTitle>
            <CardDescription>
              {selectedCourses.length > 0
                ? `${selectedCourses.length} courses selected`
                : `Total courses: ${courses.length}`}
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedCourses.length > 0 && (
              <Dialog>
                <DialogTrigger asChild>
                  <ResponsiveButton variant="destructive" size="sm" icon={<Trash2 className="h-4 w-4" />}>
                    Delete Selected
                  </ResponsiveButton>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                      You are about to delete {selectedCourses.length} courses. This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setSelectedCourses([])}>
                      Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleDeleteSelected}>
                      Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <ResponsiveButton
                  className="bg-gradient-to-r from-blue-600 to-blue-400 text-white"
                  icon={<BookPlus className="h-4 w-4" />}
                >
                  Add New Course
                </ResponsiveButton>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Course</DialogTitle>
                  <DialogDescription>Fill in the details to add a new course to the system.</DialogDescription>
                </DialogHeader>
                <CourseForm />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All Courses</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <AdvancedDataTable
                columns={columns}
                data={courses}
                searchColumn="name"
                searchPlaceholder="Search courses..."
                selectable
                onSelectedRowsChange={setSelectedCourses}
              />
            </TabsContent>
            <TabsContent value="active">
              <AdvancedDataTable
                columns={columns}
                data={courses.filter((course) => course.status === "Active")}
                searchColumn="name"
                searchPlaceholder="Search active courses..."
                selectable
                onSelectedRowsChange={setSelectedCourses}
              />
            </TabsContent>
            <TabsContent value="inactive">
              <AdvancedDataTable
                columns={columns}
                data={courses.filter((course) => course.status === "Inactive")}
                searchColumn="name"
                searchPlaceholder="Search inactive courses..."
                selectable
                onSelectedRowsChange={setSelectedCourses}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Edit Course Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
            <DialogDescription>Update the course details.</DialogDescription>
          </DialogHeader>
          <CourseForm isEdit />
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}

