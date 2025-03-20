"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
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
} from "lucide-react"

const accountantNavItems = [
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
    title: "Settings",
    href: "/accountant-portal/settings",
    icon: Settings,
  },
]

export function AccountantSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full py-4">
      <div className="px-4 py-2">
        <h2 className="text-lg font-semibold">Accountant Portal</h2>
        <p className="text-sm text-muted-foreground">Financial management system</p>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {accountantNavItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto border-t px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-1">
            <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
              JS
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">Jane Smith</p>
            <p className="text-xs text-muted-foreground">Finance Department</p>
          </div>
        </div>
      </div>
    </div>
  )
}

