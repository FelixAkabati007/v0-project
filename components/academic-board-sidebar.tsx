"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
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
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export function AcademicBoardSidebar() {
  const pathname = usePathname()

  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/academic-board",
      active: pathname === "/academic-board",
    },
    {
      label: "Curriculum Review",
      icon: BookOpen,
      href: "/academic-board/curriculum",
      active: pathname === "/academic-board/curriculum",
    },
    {
      label: "Academic Performance",
      icon: BarChart,
      href: "/academic-board/performance",
      active: pathname === "/academic-board/performance",
    },
    {
      label: "Policy Management",
      icon: FileText,
      href: "/academic-board/policies",
      active: pathname === "/academic-board/policies",
    },
    {
      label: "Faculty Evaluation",
      icon: Users,
      href: "/academic-board/faculty",
      active: pathname === "/academic-board/faculty",
    },
    {
      label: "Meeting Schedule",
      icon: Calendar,
      href: "/academic-board/meetings",
      active: pathname === "/academic-board/meetings",
    },
    {
      label: "Quality Assurance",
      icon: ClipboardList,
      href: "/academic-board/quality",
      active: pathname === "/academic-board/quality",
    },
    {
      label: "Academic Programs",
      icon: GraduationCap,
      href: "/academic-board/programs",
      active: pathname === "/academic-board/programs",
    },
    {
      label: "Accreditation",
      icon: Award,
      href: "/academic-board/accreditation",
      active: pathname === "/academic-board/accreditation",
    },
    {
      label: "Research Initiatives",
      icon: BookMarked,
      href: "/academic-board/research",
      active: pathname === "/academic-board/research",
    },
    {
      label: "Exam Standards",
      icon: FileCheck,
      href: "/academic-board/exams",
      active: pathname === "/academic-board/exams",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/academic-board/settings",
      active: pathname === "/academic-board/settings",
    },
  ]

  return (
    <ScrollArea className="h-full py-2">
      <div className="flex flex-col gap-1 px-2">
        {routes.map((route) => (
          <Button
            key={route.href}
            variant={route.active ? "secondary" : "ghost"}
            size="sm"
            className={cn("justify-start", route.active && "bg-primary/10")}
            asChild
          >
            <Link href={route.href}>
              <route.icon className="mr-2 h-4 w-4" />
              {route.label}
            </Link>
          </Button>
        ))}
      </div>
    </ScrollArea>
  )
}

