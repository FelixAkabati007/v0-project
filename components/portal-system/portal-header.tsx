"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface PortalHeaderProps {
  portalName: string
  userRole: string
  userName: string
  userAvatar?: string
  notificationCount?: number
  unreadMessageCount?: number
  onToggleSidebar: () => void
  isSidebarOpen: boolean
  onLogout?: () => void
  actions?: React.ReactNode
}

export function PortalHeader({
  portalName,
  userRole,
  userName,
  userAvatar = "/placeholder.svg?height=32&width=32",
  notificationCount = 0,
  unreadMessageCount = 0,
  onToggleSidebar,
  isSidebarOpen,
  onLogout,
  actions,
}: PortalHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

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
    <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-background border-b flex items-center px-4">
      {/* Skip to content link for accessibility */}
      <a
        href="#portal-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md"
      >
        Skip to content
      </a>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="font-semibold text-lg">{portalName}</div>
      </div>

      <div className="flex-1"></div>

      <div className="flex items-center gap-2">
        {/* Search */}
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

        {/* Custom Actions */}
        {actions}

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleThemeToggle}
          aria-label={resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
        >
          {resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        {/* Notifications */}
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
              {notificationCount > 0 && (
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {notificationCount} new
                </span>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[300px] overflow-y-auto">
              {notificationCount > 0 ? (
                <div className="p-2 text-sm">
                  <p className="text-center text-muted-foreground">Notifications will appear here</p>
                </div>
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  <p>No new notifications</p>
                </div>
              )}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="justify-center text-primary">
              <Link href="/notifications">View all notifications</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Messages */}
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
              {unreadMessageCount > 0 && (
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {unreadMessageCount} unread
                </span>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[300px] overflow-y-auto">
              {unreadMessageCount > 0 ? (
                <div className="p-2 text-sm">
                  <p className="text-center text-muted-foreground">Messages will appear here</p>
                </div>
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  <p>No new messages</p>
                </div>
              )}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="justify-center text-primary">
              <Link href="/messages">View all messages</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Help */}
        <Button variant="ghost" size="icon" aria-label="Help">
          <HelpCircle className="h-5 w-5" />
        </Button>

        {/* User Profile */}
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
    </header>
  )
}

