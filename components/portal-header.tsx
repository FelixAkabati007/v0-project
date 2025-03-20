"use client"

import { useState, useEffect, type ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Bell,
  ChevronDown,
  HelpCircle,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Moon,
  Search,
  Settings,
  Sun,
  User,
  X,
} from "lucide-react"
import { useTheme } from "next-themes"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

interface PortalHeaderProps {
  portalName: string
  userRole: string
  userName: string
  userAvatar?: string
  sidebarContent: ReactNode
  notificationCount?: number
  unreadMessageCount?: number
  onLogout?: () => void
}

export function PortalHeader({
  portalName,
  userRole,
  userName,
  userAvatar = "/placeholder.svg?height=32&width=32",
  sidebarContent,
  notificationCount = 0,
  unreadMessageCount = 0,
  onLogout,
}: PortalHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()
  const isMobile = useMobile()

  // Close sidebar on mobile by default
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false)
    }
  }, [isMobile])

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const handleThemeToggle = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    } else {
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      })
      // Default logout behavior
      window.location.href = "/login"
    }
  }

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>

      {/* Portal Header */}
      <header className="sticky top-0 z-40 w-full bg-background border-b">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
              className="mr-2 md:flex"
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="font-semibold text-lg flex items-center">
              <span className="hidden sm:inline">{portalName}</span>
              <div className="flex sm:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Search button/field */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center bg-muted rounded-md px-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-48 md:w-64 h-9 focus-visible:ring-0 border-none focus-visible:ring-offset-0 bg-transparent"
                    autoFocus
                    onBlur={() => setIsSearchOpen(false)}
                  />
                </div>
              ) : (
                <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)} aria-label="Search">
                  <Search className="h-5 w-5" />
                </Button>
              )}
            </div>

            {/* Theme toggle button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleThemeToggle}
              aria-label={resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            >
              {resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* Notifications dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      {notificationCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                  <span>Notifications</span>
                  {notificationCount > 0 && <Badge variant="outline">{notificationCount} new</Badge>}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notificationCount > 0 ? (
                  <>
                    <div className="max-h-[300px] overflow-y-auto">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <DropdownMenuItem key={i} className="flex flex-col items-start py-2 cursor-pointer">
                          <div className="flex w-full justify-between">
                            <span className="font-medium">Notification Title</span>
                            <span className="text-xs text-muted-foreground">2h ago</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">This is a sample notification message.</p>
                        </DropdownMenuItem>
                      ))}
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="justify-center text-primary">
                      <Link href="/notifications">View all notifications</Link>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    <p>No new notifications</p>
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Messages dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <MessageSquare className="h-5 w-5" />
                  {unreadMessageCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      {unreadMessageCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                  <span>Messages</span>
                  {unreadMessageCount > 0 && <Badge variant="outline">{unreadMessageCount} unread</Badge>}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {unreadMessageCount > 0 ? (
                  <>
                    <div className="max-h-[300px] overflow-y-auto">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <DropdownMenuItem key={i} className="flex flex-col items-start py-2 cursor-pointer">
                          <div className="flex w-full justify-between">
                            <span className="font-medium">John Doe</span>
                            <span className="text-xs text-muted-foreground">5m ago</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            Hello, I wanted to follow up on our previous discussion...
                          </p>
                        </DropdownMenuItem>
                      ))}
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="justify-center text-primary">
                      <Link href="/messages">View all messages</Link>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    <p>No new messages</p>
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Help button */}
            <Button variant="ghost" size="icon" aria-label="Help">
              <HelpCircle className="h-5 w-5" />
            </Button>

            {/* User profile dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-2" aria-label="User menu">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={userAvatar} alt={userName} />
                    <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-medium">{userName}</div>
                    <div className="text-xs text-muted-foreground">{userRole}</div>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[200px]">
                <DropdownMenuLabel>
                  <div className="flex md:hidden flex-col">
                    <span>{userName}</span>
                    <span className="text-xs text-muted-foreground">{userRole}</span>
                  </div>
                  <div className="hidden md:block">My Account</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/" className="cursor-pointer flex items-center">
                    <Home className="mr-2 h-4 w-4" />
                    <span>Back to Website</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 focus:text-red-600 cursor-pointer flex items-center"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        className={cn(
          "fixed z-30 top-16 bottom-0 left-0 h-[calc(100vh-4rem)] w-64 bg-background border-r",
          isMobile && !isSidebarOpen && "-translate-x-full",
          isMobile && !isMenuOpen && "-translate-x-full",
        )}
        initial={false}
        animate={{
          width: isSidebarOpen ? "16rem" : "5rem",
          opacity: isMobile && !isSidebarOpen && !isMenuOpen ? 0 : 1,
          x: isMobile && !isSidebarOpen && !isMenuOpen ? -280 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="h-full overflow-y-auto">{sidebarContent}</div>
      </motion.div>

      {/* Main Content */}
      <motion.main
        id="main-content" // For accessibility skip to content
        className="min-h-[calc(100vh-4rem)] pt-16 bg-muted/30"
        initial={false}
        animate={{
          marginLeft: isMobile ? 0 : isSidebarOpen ? "16rem" : "5rem",
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Content is rendered inside portal pages */}
      </motion.main>
    </>
  )
}

