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
  User,
  BarChart2,
  PenTool,
  Bell,
  HelpCircle,
  FileCheck,
  GraduationCap,
  Newspaper,
} from "lucide-react"
import type { NavItem } from "../types"

export const teacherNavItems: NavItem[] = [
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
    badge: 5,
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
    title: "Exams",
    href: "/teacher-portal/exams",
    icon: PenTool,
  },
  {
    title: "Messages",
    href: "/teacher-portal/messages",
    icon: MessageSquare,
    badge: 3,
  },
  {
    title: "Notifications",
    href: "/teacher-portal/notifications",
    icon: Bell,
    badge: 2,
  },
  {
    title: "Reports",
    href: "/teacher-portal/reports",
    icon: FileCheck,
  },
  {
    title: "News",
    href: "/teacher-portal/news",
    icon: Newspaper,
    badge: "New",
  },
]

export const teacherUtilityItems: NavItem[] = [
  {
    title: "Analytics",
    href: "/teacher-portal/analytics",
    icon: BarChart2,
  },
  {
    title: "Profile",
    href: "/teacher-portal/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/teacher-portal/settings",
    icon: Settings,
  },
  {
    title: "Help",
    href: "/teacher-portal/help",
    icon: HelpCircle,
  },
]

export const teacherPortalConfig = {
  name: "Teacher Portal",
  slug: "teacher-portal",
  description: "Manage your classes, students, and teaching resources",
  primaryColor: "green",
  icon: GraduationCap,
  features: [
    "Student Management",
    "Lesson Planning",
    "Schedule Management",
    "Assignment Creation",
    "Grading System",
    "Attendance Tracking",
    "Exam Management",
    "Messaging System",
    "Reporting Tools",
    "Analytics Dashboard",
  ],
}

