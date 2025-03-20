import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  Settings,
  HelpCircle,
  BarChart2,
  Calendar,
  Mail,
  DollarSign,
  Briefcase,
  ShieldCheck,
  Folder,
  Sparkles,
  Server,
  Database,
  Globe,
} from "lucide-react"
import type { NavItem } from "../types"

export const adminNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin-portal/dashboard",
    icon: LayoutDashboard,
    description: "Overview of school metrics and activities",
  },
  {
    title: "Users",
    href: "/admin-portal/users",
    icon: Users,
    description: "Manage students, teachers and staff",
  },
  {
    title: "Courses",
    href: "/admin-portal/courses",
    icon: BookOpen,
    description: "Manage academic courses and curriculum",
  },
  {
    title: "Reports",
    href: "/admin-portal/reports",
    icon: FileText,
    description: "View and generate school reports",
  },
  {
    title: "Analytics",
    href: "/admin-portal/analytics",
    icon: BarChart2,
    description: "Advanced data insights and trends",
  },
  {
    title: "Calendar",
    href: "/admin-portal/calendar",
    icon: Calendar,
    description: "School events and academic calendar",
  },
  {
    title: "Messages",
    href: "/admin-portal/messages",
    icon: Mail,
    badge: 3,
    description: "Internal communication system",
  },
  {
    title: "Finance",
    href: "/admin-portal/finance",
    icon: DollarSign,
    description: "Budget management and financial reports",
  },
  {
    title: "HR",
    href: "/admin-portal/hr",
    icon: Briefcase,
    description: "Human resources and staff management",
  },
  {
    title: "Roles & Permissions",
    href: "/admin-portal/roles",
    icon: ShieldCheck,
    description: "Access control and user permissions",
  },
  {
    title: "Files",
    href: "/admin-portal/files",
    icon: Folder,
    description: "Document management system",
  },
  {
    title: "AI Insights",
    href: "/admin-portal/insights",
    icon: Sparkles,
    badge: "New",
    description: "AI-powered analytics and recommendations",
  },
]

export const adminUtilityItems: NavItem[] = [
  {
    title: "System",
    href: "/admin-portal/system",
    icon: Server,
    description: "System configuration and maintenance",
  },
  {
    title: "Database",
    href: "/admin-portal/database",
    icon: Database,
    description: "Database management and backups",
  },
  {
    title: "Website",
    href: "/admin-portal/website",
    icon: Globe,
    description: "Website management and content",
  },
  {
    title: "Settings",
    href: "/admin-portal/settings",
    icon: Settings,
    description: "System configuration and preferences",
  },
  {
    title: "Help",
    href: "/admin-portal/help",
    icon: HelpCircle,
    description: "Support resources and documentation",
  },
]

export const adminPortalConfig = {
  name: "Admin Portal",
  slug: "admin-portal",
  description: "Comprehensive school management system",
  primaryColor: "blue",
  icon: ShieldCheck,
  features: [
    "User Management",
    "Course Management",
    "Reporting Tools",
    "Analytics Dashboard",
    "Calendar Management",
    "Messaging System",
    "Financial Management",
    "HR Management",
    "Access Control",
    "Document Management",
    "AI-powered Insights",
  ],
}

