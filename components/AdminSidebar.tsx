"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/ThemeToggle"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import {
  ChevronLeft,
  ChevronRight,
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
  LogOut,
  User,
  Search,
  Folder,
  Sparkles,
  Bell,
  Home,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

type SidebarProps = {
  isOpen: boolean
  onToggle: () => void
}

export const sidebarItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin-portal/dashboard",
    description: "Overview of school metrics and activities",
  },
  {
    name: "Users",
    icon: Users,
    path: "/admin-portal/users",
    description: "Manage students, teachers and staff",
  },
  {
    name: "Courses",
    icon: BookOpen,
    path: "/admin-portal/courses",
    description: "Manage academic courses and curriculum",
  },
  {
    name: "Reports",
    icon: FileText,
    path: "/admin-portal/reports",
    description: "View and generate school reports",
  },
  {
    name: "Analytics",
    icon: BarChart2,
    path: "/admin-portal/analytics",
    description: "Advanced data insights and trends",
  },
  {
    name: "Calendar",
    icon: Calendar,
    path: "/admin-portal/calendar",
    description: "School events and academic calendar",
  },
  {
    name: "Messages",
    icon: Mail,
    path: "/admin-portal/messages",
    badge: 3,
    description: "Internal communication system",
  },
  {
    name: "Finance",
    icon: DollarSign,
    path: "/admin-portal/finance",
    description: "Budget management and financial reports",
  },
  {
    name: "HR",
    icon: Briefcase,
    path: "/admin-portal/hr",
    description: "Human resources and staff management",
  },
  {
    name: "Roles & Permissions",
    icon: ShieldCheck,
    path: "/admin-portal/roles",
    description: "Access control and user permissions",
  },
  {
    name: "Files",
    icon: Folder,
    path: "/admin-portal/files",
    description: "Document management system",
  },
  {
    name: "AI Insights",
    icon: Sparkles,
    path: "/admin-portal/insights",
    badge: "New",
    description: "AI-powered analytics and recommendations",
  },
]

const utilityItems = [
  {
    name: "Settings",
    icon: Settings,
    path: "/admin-portal/settings",
    description: "System configuration and preferences",
  },
  {
    name: "Help",
    icon: HelpCircle,
    path: "/admin-portal/help",
    description: "Support resources and documentation",
  },
]

export default function AdminSidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredItems, setFilteredItems] = useState(sidebarItems)
  const [notifications, setNotifications] = useState(3)
  const { user, logout } = useAuth()
  const router = useRouter()

  // Filter sidebar items based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredItems(sidebarItems)
      return
    }

    const filtered = sidebarItems.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())),
    )
    setFilteredItems(filtered)
  }, [searchQuery])

  const handleLogout = () => {
    logout()
    router.push("/admin-portal")
  }

  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? "280px" : "80px" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-gradient-to-b from-gray-900 to-gray-800 text-white h-screen overflow-y-auto flex flex-col fixed left-0 top-0 z-50"
    >
      <div className="flex items-center justify-between p-4">
        {isOpen ? (
          <div className="flex items-center">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="School Logo"
              width={40}
              height={40}
              className="rounded-md"
            />
            <span className="ml-2 font-bold">Admin Portal</span>
          </div>
        ) : (
          <Image
            src="/placeholder.svg?height=40&width=40"
            alt="School Logo"
            width={40}
            height={40}
            className="rounded-md mx-auto"
          />
        )}
        <Button variant="ghost" size="icon" onClick={onToggle} className="text-white hover:bg-gray-800">
          {isOpen ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
        </Button>
      </div>

      {user && (
        <div
          className={`px-4 py-3 border-b border-gray-700 ${isOpen ? "flex items-center" : "flex flex-col items-center"}`}
        >
          <div className="relative">
            <Image
              src={user.avatar || "/placeholder.svg?height=40&width=40"}
              alt={user.name}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
          </div>
          {isOpen && (
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-gray-400 truncate">{user.role}</p>
            </div>
          )}

          {isOpen && (
            <div className="ml-auto">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5 text-gray-300" />
                      {notifications > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                          {notifications}
                        </span>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>You have {notifications} notifications</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
        </div>
      )}

      <div className="p-2">
        <div className="relative mb-2">
          {isOpen ? (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search..."
                className="w-full bg-gray-700 border-gray-600 text-white pl-9 h-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
                  onClick={() => setSearchQuery("")}
                >
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Button>
              )}
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="w-full flex justify-center text-gray-400 hover:text-white hover:bg-gray-700"
              onClick={onToggle}
            >
              <Search className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      <Link
        href="/"
        className={cn(
          "flex items-center space-x-2 mx-2 rounded-lg px-3 py-2 transition-all duration-200 ease-in-out text-gray-300 hover:bg-gray-800 hover:text-white",
          !isOpen && "justify-center",
        )}
      >
        <Home className="h-5 w-5" />
        {isOpen && <span>Back to Website</span>}
      </Link>

      <nav className="flex-grow space-y-1 p-2 overflow-y-auto mt-2">
        <AnimatePresence>
          {filteredItems.map((item) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.path}
                      className={cn(
                        "flex items-center space-x-2 rounded-lg px-3 py-2 transition-all duration-200 ease-in-out relative",
                        pathname === item.path
                          ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white"
                          : "text-gray-300 hover:bg-gray-800 hover:text-white",
                        hoveredItem === item.name && "scale-105 shadow-lg",
                      )}
                      onMouseEnter={() => setHoveredItem(item.name)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <item.icon className={cn("h-5 w-5 transition-all", isOpen ? "mr-2" : "mr-0")} />
                      {isOpen && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2 }}
                          className="whitespace-nowrap"
                        >
                          {item.name}
                        </motion.span>
                      )}
                      {item.badge && (
                        <Badge
                          className={`ml-auto ${typeof item.badge === "number" ? "bg-red-500" : "bg-blue-500"} text-white`}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </TooltipTrigger>
                  {(!isOpen || (isOpen && hoveredItem === item.name)) && (
                    <TooltipContent side="right" className={isOpen ? "ml-4" : ""}>
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        {item.description && <p className="text-xs text-gray-400">{item.description}</p>}
                      </div>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </motion.div>
          ))}
        </AnimatePresence>

        {isOpen && <Separator className="my-2 bg-gray-700" />}

        {utilityItems.map((item) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.path}
                    className={cn(
                      "flex items-center space-x-2 rounded-lg px-3 py-2 transition-all duration-200 ease-in-out relative",
                      pathname === item.path
                        ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white",
                      hoveredItem === item.name && "scale-105 shadow-lg",
                    )}
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <item.icon className={cn("h-5 w-5 transition-all", isOpen ? "mr-2" : "mr-0")} />
                    {isOpen && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="whitespace-nowrap"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </Link>
                </TooltipTrigger>
                {!isOpen && (
                  <TooltipContent side="right">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      {item.description && <p className="text-xs text-gray-400">{item.description}</p>}
                    </div>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        ))}
      </nav>

      <div className="mt-auto p-4 border-t border-gray-700 flex items-center justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "justify-start text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200",
                !isOpen && "justify-center",
              )}
            >
              <User className="h-5 w-5 mr-2" />
              {isOpen && <span>Profile</span>}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem asChild>
              <Link href="/admin-portal/profile" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>My Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin-portal/settings" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ThemeToggle />
      </div>
    </motion.aside>
  )
}

