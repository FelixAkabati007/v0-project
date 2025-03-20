import {
  BarChart,
  BookOpen,
  Calendar,
  ClipboardList,
  FileText,
  GraduationCap,
  Home,
  Settings,
  Users,
  Award,
  BookMarked,
  FileCheck,
  MessageSquare,
  Bell,
  User,
  HelpCircle,
  PieChart,
} from "lucide-react"
import type { NavItem } from "../types"

export const academicBoardNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/academic-board",
    icon: Home,
  },
  {
    title: "Curriculum Review",
    href: "/academic-board/curriculum",
    icon: BookOpen,
  },
  {
    title: "Academic Performance",
    href: "/academic-board/performance",
    icon: BarChart,
  },
  {
    title: "Policy Management",
    href: "/academic-board/policies",
    icon: FileText,
  },
  {
    title: "Faculty Evaluation",
    href: "/academic-board/faculty",
    icon: Users,
  },
  {
    title: "Meeting Schedule",
    href: "/academic-board/meetings",
    icon: Calendar,
    badge: 2,
  },
  {
    title: "Quality Assurance",
    href: "/academic-board/quality",
    icon: ClipboardList,
  },
  {
    title: "Academic Programs",
    href: "/academic-board/programs",
    icon: GraduationCap,
  },
  {
    title: "Accreditation",
    href: "/academic-board/accreditation",
    icon: Award,
  },
  {
    title: "Research Initiatives",
    href: "/academic-board/research",
    icon: BookMarked,
    badge: "New",
  },
  {
    title: "Exam Standards",
    href: "/academic-board/exams",
    icon: FileCheck,
  },
  {
    title: "Messages",
    href: "/academic-board/messages",
    icon: MessageSquare,
    badge: 3,
  },
  {
    title: "Notifications",
    href: "/academic-board/notifications",
    icon: Bell,
    badge: 4,
  },
]

export const academicBoardUtilityItems: NavItem[] = [
  {
    title: "Analytics",
    href: "/academic-board/analytics",
    icon: PieChart,
  },
  {
    title: "Profile",
    href: "/academic-board/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/academic-board/settings",
    icon: Settings,
  },
  {
    title: "Help",
    href: "/academic-board/help",
    icon: HelpCircle,
  },
]

export const academicBoardPortalConfig = {
  name: "Academic Board",
  slug: "academic-board",
  description: "Academic policy and curriculum management",
  primaryColor: "indigo",
  icon: GraduationCap,
  features: [
    "Curriculum Management",
    "Performance Analytics",
    "Policy Development",
    "Faculty Evaluation",
    "Meeting Management",
    "Quality Assurance",
    "Program Development",
    "Accreditation Management",
    "Research Coordination",
    "Exam Standards",
  ],
}

