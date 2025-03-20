import type React from "react"
import { PortalHeader } from "@/components/portal-header"
import { AcademicBoardSidebar } from "@/components/academic-board-sidebar"

export default function AcademicBoardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <PortalHeader
        portalName="Academic Board"
        userRole="Board Member"
        userName="Dr. Michael Owusu"
        userAvatar="/placeholder.svg?height=32&width=32"
        sidebarContent={<AcademicBoardSidebar />}
        notificationCount={7}
      />
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-muted/40 md:block">
          <AcademicBoardSidebar />
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}

