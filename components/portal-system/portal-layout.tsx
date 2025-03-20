"use client"

import { type ReactNode, useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { PortalHeader } from "./portal-header"
import { PortalSidebar } from "./portal-sidebar"
import type { UserProfile, NavItem } from "./types"
import { useMobile } from "@/hooks/use-mobile"

interface PortalLayoutProps {
  children: ReactNode
  user: UserProfile
  portalName: string
  navItems: NavItem[]
  utilityItems?: NavItem[]
  notificationCount?: number
  messageCount?: number
  onLogout?: () => void
  sidebarFooter?: ReactNode
  headerActions?: ReactNode
}

export function PortalLayout({
  children,
  user,
  portalName,
  navItems,
  utilityItems = [],
  notificationCount = 0,
  messageCount = 0,
  onLogout,
  sidebarFooter,
  headerActions,
}: PortalLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const pathname = usePathname()
  const isMobile = useMobile()

  // Close sidebar on mobile by default
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false)
    } else {
      setIsSidebarOpen(true)
    }
  }, [isMobile])

  return (
    <div className="min-h-screen bg-background pt-16">
      <PortalHeader
        portalName={portalName}
        userRole={user.role}
        userName={user.name}
        userAvatar={user.avatar}
        notificationCount={notificationCount}
        unreadMessageCount={messageCount}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
        onLogout={onLogout}
        actions={headerActions}
      />

      <div className="flex h-[calc(100vh-4rem)] pt-16">
        <PortalSidebar
          user={user}
          navItems={navItems}
          utilityItems={utilityItems}
          isOpen={isSidebarOpen}
          currentPath={pathname}
          footer={sidebarFooter}
        />

        <motion.main
          id="portal-content"
          className="flex-1 overflow-auto bg-muted/20"
          initial={false}
          animate={{
            marginLeft: isMobile ? 0 : isSidebarOpen ? "16rem" : "5rem",
          }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  )
}

