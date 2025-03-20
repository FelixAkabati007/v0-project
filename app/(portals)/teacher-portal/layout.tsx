import type React from "react"
import { PortalHeader } from "@/components/portal-header"
import { TeacherSidebar } from "@/components/teacher-sidebar"

export default function TeacherPortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <PortalHeader
        portalName="Teacher Portal"
        userRole="Senior Teacher"
        userName="John Doe"
        userAvatar="/placeholder.svg?height=32&width=32"
        sidebarContent={<TeacherSidebar />}
        notificationCount={5}
      />
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-muted/40 md:block">
          <TeacherSidebar />
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}

