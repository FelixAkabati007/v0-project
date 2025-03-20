import {
  LayoutDashboard,
  DollarSign,
  CreditCard,
  FileText,
  Users,
  Settings,
  Calculator,
  Receipt,
  PieChart,
  TrendingUp,
  Printer,
  Bell,
  MessageSquare,
  HelpCircle,
  User,
  Calendar,
} from "lucide-react"
import type { NavItem } from "../types"

export const accountantNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/accountant-portal",
    icon: LayoutDashboard,
  },
  {
    title: "Fee Management",
    href: "/accountant-portal/fees",
    icon: DollarSign,
  },
  {
    title: "Payments",
    href: "/accountant-portal/payments",
    icon: CreditCard,
  },
  {
    title: "Expenses",
    href: "/accountant-portal/expenses",
    icon: Receipt,
  },
  {
    title: "Payroll",
    href: "/accountant-portal/payroll",
    icon: Users,
  },
  {
    title: "Budget",
    href: "/accountant-portal/budget",
    icon: Calculator,
  },
  {
    title: "Reports",
    href: "/accountant-portal/reports",
    icon: FileText,
  },
  {
    title: "Analytics",
    href: "/accountant-portal/analytics",
    icon: PieChart,
  },
  {
    title: "Transactions",
    href: "/accountant-portal/transactions",
    icon: TrendingUp,
    badge: 5,
  },
  {
    title: "Invoices",
    href: "/accountant-portal/invoices",
    icon: Printer,
  },
  {
    title: "Messages",
    href: "/accountant-portal/messages",
    icon: MessageSquare,
    badge: 2,
  },
  {
    title: "Notifications",
    href: "/accountant-portal/notifications",
    icon: Bell,
    badge: 3,
  },
]

export const accountantUtilityItems: NavItem[] = [
  {
    title: "Calendar",
    href: "/accountant-portal/calendar",
    icon: Calendar,
  },
  {
    title: "Profile",
    href: "/accountant-portal/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/accountant-portal/settings",
    icon: Settings,
  },
  {
    title: "Help",
    href: "/accountant-portal/help",
    icon: HelpCircle,
  },
]

export const accountantPortalConfig = {
  name: "Accountant Portal",
  slug: "accountant-portal",
  description: "Comprehensive financial management system",
  primaryColor: "green",
  icon: DollarSign,
  features: [
    "Fee Management",
    "Payment Processing",
    "Expense Tracking",
    "Payroll Management",
    "Budget Planning",
    "Financial Reporting",
    "Financial Analytics",
    "Transaction History",
    "Invoice Generation",
    "Financial Calendar",
  ],
}

