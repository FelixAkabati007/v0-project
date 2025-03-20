import {
  BookOpen,
  Calendar,
  Clock,
  FileText,
  GraduationCap,
  Home,
  MessageSquare,
  Settings,
  User,
  Bell,
  Award,
  BarChart2,
  PenTool,
  LibraryIcon,
  Briefcase,
  Newspaper,
  CreditCard,
} from "lucide-react"
import type { NavItem } from "../types"

export const studentNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/student-portal/dashboard",
    icon: Home,
    badge: null,
  },
  {
    title: "Courses",
    href: "/student-portal/courses",
    icon: BookOpen,
    badge: null,
  },
  {
    title: "Assignments",
    href: "/student-portal/assignments",
    icon: FileText,
    badge: 3,
  },
  {
    title: "Grades",
    href: "/student-portal/grades",
    icon: Award,
    badge: null,
  },
  {
    title: "Schedule",
    href: "/student-portal/schedule",
    icon: Calendar,
    badge: null,
  },
  {
    title: "Attendance",
    href: "/student-portal/attendance",
    icon: Clock,
    badge: null,
  },
  {
    title: "Exams",
    href: "/student-portal/exams",
    icon: PenTool,
    badge: 2,
  },
  {
    title: "Library",
    href: "/student-portal/library",
    icon: LibraryIcon,
    badge: null,
  },
  {
    title: "Career",
    href: "/student-portal/career",
    icon: Briefcase,
    badge: null,
  },
  {
    title: "Notifications",
    href: "/student-portal/notifications",
    icon: Bell,
    badge: 5,
  },
  {
    title: "Messages",
    href: "/student-portal/messages",
    icon: MessageSquare,
    badge: 2,
  },
  {
    title: "News",
    href: "/student-portal/news",
    icon: Newspaper,
    badge: "New",
  },
]

export const studentUtilityItems: NavItem[] = [
  {
    title: "Analytics",
    href: "/student-portal/analytics",
    icon: BarChart2,
  },
  {
    title: "Profile",
    href: "/student-portal/profile",
    icon: User,
  },
  {
    title: "Payments",
    href: "/student-portal/payments",
    icon: CreditCard,
  },
  {
    title: "Settings",
    href: "/student-portal/settings",
    icon: Settings,
  },
]

export const studentPortalConfig = {
  name: "Student Portal",
  slug: "student-portal",
  description: "Access your courses, assignments, grades, and more",
  primaryColor: "blue",
  icon: GraduationCap,
  features: [
    "Course Management",
    "Assignment Tracking",
    "Grade Viewing",
    "Schedule Management",
    "Attendance Tracking",
    "Exam Information",
    "Library Access",
    "Career Services",
    "Messaging System",
    "News and Announcements",
  ],
}

