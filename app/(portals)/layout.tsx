"use client"

import type { ReactNode } from "react"
import { ThemeProvider } from "@/components/ThemeProvider"
import { AccessibilityHelper } from "@/components/accessibility-helpers"
import { Toaster } from "@/components/ui/toaster"

interface PortalLayoutProps {
  children: ReactNode
}

export default function PortalLayout({ children }: PortalLayoutProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="pt-20">{children}</div>
      <AccessibilityHelper />
      <Toaster />
    </ThemeProvider>
  )
}

