import type React from "react"
import { PortalHeader } from "@/components/portal-header"
import { AccountantSidebar } from "@/components/accountant-sidebar"

export default function AccountantPortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <PortalHeader
        portalName="Accountant Portal"
        userRole="Senior Accountant"
        userName="Jane Smith"
        userAvatar="/placeholder.svg?height=32&width=32"
        sidebarContent={<AccountantSidebar />}
        notificationCount={3}
      />
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-muted/40 md:block">
          <AccountantSidebar />
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}

