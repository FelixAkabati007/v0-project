import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"

// Base navigation item type
export interface NavItem {
  title: string
  href: string
  icon: LucideIcon
  badge?: number | string | null
  description?: string
  children?: NavItem[]
}

// User profile type
export interface UserProfile {
  id: string
  name: string
  role: string
  avatar?: string
  email?: string
  department?: string
  status?: "online" | "away" | "offline" | "busy"
}

// Portal configuration type
export interface PortalConfig {
  name: string
  slug: string
  description?: string
  primaryColor?: string
  secondaryColor?: string
  icon?: LucideIcon
  features?: string[]
}

// Stat card type
export interface StatCardProps {
  title: string
  value: string | number
  icon: ReactNode
  description?: string
  trend?: {
    value: string
    direction: "up" | "down" | "neutral"
  }
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "info" | "default"
  onClick?: () => void
}

// Dashboard tab type
export interface DashboardTab {
  id: string
  label: string
  icon?: LucideIcon
  content: ReactNode
}

// Notification type
export interface Notification {
  id: number | string
  title: string
  message: string
  timestamp: string | Date
  read: boolean
  type?: "info" | "warning" | "success" | "error"
  link?: string
}

// Message type
export interface Message {
  id: number | string
  sender: {
    id: string
    name: string
    avatar?: string
  }
  content: string
  timestamp: string | Date
  read: boolean
}

// Action button type
export interface ActionButton {
  label: string
  icon?: LucideIcon
  onClick: () => void
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  disabled?: boolean
}

