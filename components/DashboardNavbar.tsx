"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, Bell, UserCircle, LogOut, Search, Settings } from "lucide-react"

type NavbarProps = {
  userType: "student" | "admin"
  onToggleSidebar?: () => void
  userName: string
}

export default function DashboardNavbar({ userType, onToggleSidebar, userName }: NavbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    router.push("/admin-portal")
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2 md:hidden" onClick={onToggleSidebar}>
              <Menu className="h-6 w-6" />
            </Button>
            <Link href={`/${userType}-portal/dashboard`} className="text-xl font-bold text-gray-800">
              {userType === "admin" ? "Admin Portal" : "Student Portal"}
            </Link>
          </div>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)} className="mr-2">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="mr-2">
              <Bell className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="ml-2">
                  <UserCircle className="h-5 w-5 mr-2" />
                  <span className="hidden md:inline">{userName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/admin-portal/settings" className="w-full flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    Account Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      {isSearchOpen && (
        <div className="px-4 pb-4">
          <Input type="search" placeholder="Search..." className="w-full" />
        </div>
      )}
    </nav>
  )
}

