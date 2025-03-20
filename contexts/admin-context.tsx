"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { useRouter } from "next/navigation"

// Types
type NotificationType = "success" | "error" | "warning" | "info"

interface Notification {
  id: string
  message: string
  type: NotificationType
  duration?: number
}

interface User {
  id: number
  name: string
  email: string
  role: string
  status: string
  lastActive: string
  avatar?: string
}

interface Course {
  id: number
  name: string
  code: string
  instructor: string
  students: number
  status: string
  description?: string
  department?: string
  credits?: number
}

interface AdminContextType {
  users: User[]
  courses: Course[]
  notifications: Notification[]
  addNotification: (message: string, type: NotificationType, duration?: number) => void
  removeNotification: (id: string) => void
  addUser: (user: Omit<User, "id">) => void
  updateUser: (id: number, data: Partial<User>) => void
  deleteUser: (id: number) => void
  addCourse: (course: Omit<Course, "id">) => void
  updateCourse: (id: number, data: Partial<Course>) => void
  deleteCourse: (id: number) => void
  filterUsers: (role?: string, status?: string, search?: string) => User[]
  filterCourses: (status?: string, search?: string) => Course[]
  stats: {
    totalUsers: number
    activeUsers: number
    totalCourses: number
    activeCourses: number
  }
}

// Mock data
const mockUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Administrator",
    status: "Active",
    lastActive: "2023-12-15",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Teacher",
    status: "Active",
    lastActive: "2023-12-14",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Student",
    status: "Inactive",
    lastActive: "2023-11-30",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Alice Williams",
    email: "alice@example.com",
    role: "Teacher",
    status: "Active",
    lastActive: "2023-12-13",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Student",
    status: "Active",
    lastActive: "2023-12-10",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    name: "Diana Prince",
    email: "diana@example.com",
    role: "Administrator",
    status: "Active",
    lastActive: "2023-12-12",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 7,
    name: "Ethan Hunt",
    email: "ethan@example.com",
    role: "Student",
    status: "Inactive",
    lastActive: "2023-11-25",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 8,
    name: "Fiona Gallagher",
    email: "fiona@example.com",
    role: "Teacher",
    status: "Active",
    lastActive: "2023-12-11",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const mockCourses: Course[] = [
  {
    id: 1,
    name: "Introduction to Mathematics",
    code: "MATH101",
    instructor: "Jane Smith",
    students: 30,
    status: "Active",
    department: "Mathematics",
    credits: 3,
  },
  {
    id: 2,
    name: "Advanced Physics",
    code: "PHYS201",
    instructor: "Alice Williams",
    students: 25,
    status: "Active",
    department: "Physics",
    credits: 4,
  },
  {
    id: 3,
    name: "English Literature",
    code: "ENG101",
    instructor: "Fiona Gallagher",
    students: 35,
    status: "Active",
    department: "English",
    credits: 3,
  },
  {
    id: 4,
    name: "Computer Science Fundamentals",
    code: "CS101",
    instructor: "John Doe",
    students: 40,
    status: "Active",
    department: "Computer Science",
    credits: 4,
  },
  {
    id: 5,
    name: "History of Art",
    code: "ART202",
    instructor: "Diana Prince",
    students: 20,
    status: "Inactive",
    department: "Art",
    credits: 3,
  },
  {
    id: 6,
    name: "Chemistry Basics",
    code: "CHEM101",
    instructor: "Bob Johnson",
    students: 28,
    status: "Active",
    department: "Chemistry",
    credits: 4,
  },
]

// Create context
const AdminContext = createContext<AdminContextType | undefined>(undefined)

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [courses, setCourses] = useState<Course[]>(mockCourses)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const router = useRouter()

  // Calculate stats
  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter((user) => user.status === "Active").length,
    totalCourses: courses.length,
    activeCourses: courses.filter((course) => course.status === "Active").length,
  }

  // Notification functions
  const addNotification = (message: string, type: NotificationType = "info", duration = 5000) => {
    const id = Date.now().toString()
    const newNotification = { id, message, type, duration }
    setNotifications((prev) => [...prev, newNotification])

    // Auto-remove notification after duration
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, duration)
    }
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  // User functions
  const addUser = (user: Omit<User, "id">) => {
    const newUser = {
      ...user,
      id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
    }
    setUsers((prev) => [...prev, newUser as User])
  }

  const updateUser = (id: number, data: Partial<User>) => {
    setUsers((prev) => prev.map((user) => (user.id === id ? { ...user, ...data } : user)))
  }

  const deleteUser = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id))
  }

  // Course functions
  const addCourse = (course: Omit<Course, "id">) => {
    const newCourse = {
      ...course,
      id: courses.length > 0 ? Math.max(...courses.map((c) => c.id)) + 1 : 1,
    }
    setCourses((prev) => [...prev, newCourse as Course])
  }

  const updateCourse = (id: number, data: Partial<Course>) => {
    setCourses((prev) => prev.map((course) => (course.id === id ? { ...course, ...data } : course)))
  }

  const deleteCourse = (id: number) => {
    setCourses((prev) => prev.filter((course) => course.id !== id))
  }

  // Filter functions
  const filterUsers = (role?: string, status?: string, search?: string) => {
    return users.filter((user) => {
      const roleMatch = !role || role === "All" || user.role === role
      const statusMatch = !status || status === "All" || user.status === status
      const searchMatch =
        !search ||
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())

      return roleMatch && statusMatch && searchMatch
    })
  }

  const filterCourses = (status?: string, search?: string) => {
    return courses.filter((course) => {
      const statusMatch = !status || status === "All" || course.status === status
      const searchMatch =
        !search ||
        course.name.toLowerCase().includes(search.toLowerCase()) ||
        course.code.toLowerCase().includes(search.toLowerCase()) ||
        course.instructor.toLowerCase().includes(search.toLowerCase())

      return statusMatch && searchMatch
    })
  }

  return (
    <AdminContext.Provider
      value={{
        users,
        courses,
        notifications,
        addNotification,
        removeNotification,
        addUser,
        updateUser,
        deleteUser,
        addCourse,
        updateCourse,
        deleteCourse,
        filterUsers,
        filterCourses,
        stats,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider")
  }
  return context
}

