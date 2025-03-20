"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, ArrowUp, ArrowDown, Filter, Download, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

interface PortalDashboardTemplateProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
  actions?: React.ReactNode
}

export function PortalDashboardTemplate({
  title,
  description,
  children,
  className,
  actions,
}: PortalDashboardTemplateProps) {
  return (
    <div className={cn("p-6 space-y-6 portal-fade-in", className)}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="portal-heading-1">{title}</h1>
          {description && <p className="text-muted-foreground mt-1">{description}</p>}
        </div>

        <div className="flex items-center gap-2">{actions}</div>
      </div>

      {children}
    </div>
  )
}

interface DashboardStatsProps {
  stats: {
    title: string
    value: string | number
    change?: number
    icon?: React.ReactNode
  }[]
  className?: string
}

export function DashboardStats({ stats, className }: DashboardStatsProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 portal-slide-in", className)}>
      {stats.map((stat, index) => (
        <Card key={index} className="portal-dashboard-stat">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="portal-dashboard-stat-title">{stat.title}</CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="portal-dashboard-stat-value">{stat.value}</div>
            {typeof stat.change !== "undefined" && (
              <p className={cn("flex items-center text-xs mt-2", stat.change > 0 ? "text-green-600" : "text-red-600")}>
                {stat.change > 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                {Math.abs(stat.change)}% from last period
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

interface DashboardActionsProps {
  className?: string
}

export function DashboardActions({ className }: DashboardActionsProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search..."
          className="h-10 w-full rounded-md border border-input bg-background pl-8 pr-4 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:w-[200px] lg:w-[300px]"
        />
      </div>

      <Button variant="outline" size="sm" className="h-10">
        <Filter className="mr-2 h-4 w-4" />
        Filter
      </Button>

      <Button variant="outline" size="sm" className="h-10">
        <Download className="mr-2 h-4 w-4" />
        Export
      </Button>

      <Button size="sm" className="h-10 ml-auto">
        <FileText className="mr-2 h-4 w-4" />
        New Report
      </Button>
    </div>
  )
}

interface DashboardTabsProps {
  tabs: {
    label: string
    icon?: React.ReactNode
    count?: number
  }[]
  activeTab: number
  onChange: (index: number) => void
  className?: string
}

export function DashboardTabs({ tabs, activeTab, onChange, className }: DashboardTabsProps) {
  return (
    <div className={cn("flex overflow-x-auto border-b", className)}>
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => onChange(index)}
          className={cn(
            "flex items-center px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors",
            activeTab === index
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground hover:border-border",
          )}
        >
          {tab.icon && <span className="mr-2">{tab.icon}</span>}
          {tab.label}
          {tab.count !== undefined && (
            <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs">{tab.count}</span>
          )}
        </button>
      ))}
    </div>
  )
}

export function DashboardEmptyState({
  title = "No data available",
  description = "There is no data to display at this time.",
  icon,
  action,
}: {
  title?: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
}) {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col items-center justify-center py-12">
        {icon || (
          <div className="rounded-full bg-muted p-3 mb-4">
            <FileText className="h-6 w-6 text-muted-foreground" />
          </div>
        )}
        <h3 className="text-lg font-semibold mt-4">{title}</h3>
        <p className="text-sm text-muted-foreground text-center max-w-sm mt-2">{description}</p>
        {action && <div className="mt-6">{action}</div>}
      </CardContent>
    </Card>
  )
}

export function DashboardSection({
  title,
  description,
  children,
  action,
}: {
  title: string
  description?: string
  children: React.ReactNode
  action?: React.ReactNode
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="portal-heading-2">{title}</h2>
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  )
}

