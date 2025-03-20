"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  BookOpen,
  Calendar,
  Clock,
  FileText,
  Home,
  MessageSquare,
  Settings,
  User,
  Compass,
  Bell,
  Award,
  BarChart2,
  PenTool,
  LibraryIcon,
  Briefcase,
  Newspaper,
  CreditCard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

const studentNavItems = [
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

const studentUtilityItems = [
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

export function StudentSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isHovered, setIsHovered] = useState<string | null>(null)

  return (
    <div className="flex flex-col h-full pt-0 bg-background border-r">
      <div className="px-4 py-4 border-b">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10 border border-muted">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="John Doe" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-sm font-semibold">John Doe</h3>
            <p className="text-xs text-muted-foreground">Student ID: STD-1234</p>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-xs mb-1">
            <span>Course Progress</span>
            <span className="font-medium">75%</span>
          </div>
          <Progress value={75} className="h-2" />
        </div>
      </div>

      <div className="flex-1 overflow-auto py-4">
        <nav className="space-y-1.5 px-3">
          {studentNavItems.map((item) => (
            <TooltipProvider key={item.href} delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors relative",
                      pathname === item.href ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted",
                      isHovered === item.href && "scale-[1.02]",
                    )}
                    onMouseEnter={() => setIsHovered(item.href)}
                    onMouseLeave={() => setIsHovered(null)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                    {item.badge && (
                      <Badge
                        className={cn(
                          "ml-auto",
                          typeof item.badge === "number"
                            ? "bg-primary text-primary-foreground"
                            : "bg-blue-500 text-white",
                        )}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.title}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>

        <Separator className="my-4" />

        <nav className="space-y-1.5 px-3">
          {studentUtilityItems.map((item) => (
            <TooltipProvider key={item.href} delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      pathname === item.href ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted",
                      isHovered === item.href && "scale-[1.02]",
                    )}
                    onMouseEnter={() => setIsHovered(item.href)}
                    onMouseLeave={() => setIsHovered(null)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.title}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>
      </div>

      <div className="px-3 py-4 border-t mt-auto">
        <div className="flex items-center justify-between">
          <Button variant="default" size="sm" className="w-full text-xs" onClick={() => (window.location.href = "/")}>
            <Compass className="mr-2 h-4 w-4" />
            Back to Main Site
          </Button>
        </div>
      </div>
    </div>
  )
}

