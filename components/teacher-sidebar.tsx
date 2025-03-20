"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  FileText,
  MessageSquare,
  Clock,
  Award,
  Settings,
} from "lucide-react"

const teacherNavItems = [
  {
    title: "Dashboard",
    href: "/teacher-portal",
    icon: LayoutDashboard,
  },
  {
    title: "My Students",
    href: "/teacher-portal/students",
    icon: Users,
  },
  {
    title: "Lesson Plans",
    href: "/teacher-portal/lesson-plans",
    icon: BookOpen,
  },
  {
    title: "Schedule",
    href: "/teacher-portal/schedule",
    icon: Calendar,
  },
  {
    title: "Assignments",
    href: "/teacher-portal/assignments",
    icon: FileText,
  },
  {
    title: "Gradebook",
    href: "/teacher-portal/gradebook",
    icon: Award,
  },
  {
    title: "Attendance",
    href: "/teacher-portal/attendance",
    icon: Clock,
  },
  {
    title: "Messages",
    href: "/teacher-portal/messages",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    href: "/teacher-portal/settings",
    icon: Settings,
  },
]

export function TeacherSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full py-4">
      <div className="px-4 py-2">
        <h2 className="text-lg font-semibold">Teacher Portal</h2>
        <p className="text-sm text-muted-foreground">Manage your classes and students</p>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {teacherNavItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto border-t px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-1">
            <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
              JD
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-muted-foreground">Science Department</p>
          </div>
        </div>
      </div>
    </div>
  )
}

