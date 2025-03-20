"use client"

import { type ReactNode, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import type { StatCardProps, DashboardTab } from "./types"
import { cn } from "@/lib/utils"

interface DashboardProps {
  title: string
  subtitle?: string
  actions?: ReactNode
  stats: StatCardProps[]
  tabs?: DashboardTab[]
  defaultTab?: string
  children?: ReactNode
}

export function Dashboard({ title, subtitle, actions, stats, tabs, defaultTab, children }: DashboardProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || (tabs && tabs.length > 0 ? tabs[0].id : ""))

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-6 p-4 md:p-6 lg:p-8">
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h1>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            description={stat.description}
            trend={stat.trend}
            variant={stat.variant}
            onClick={stat.onClick}
          />
        ))}
      </motion.div>

      {tabs && tabs.length > 0 && (
        <motion.div variants={itemVariants}>
          <Tabs
            defaultValue={defaultTab || tabs[0].id}
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5">
              {tabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id}>
                  {tab.icon && <tab.icon className="mr-2 h-4 w-4" />}
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {tabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="space-y-4 animate-in fade-in-50">
                {tab.content}
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      )}

      {children && <motion.div variants={itemVariants}>{children}</motion.div>}
    </motion.div>
  )
}

// Stat Card Component
export function StatCard({ title, value, icon, description, trend, variant = "default", onClick }: StatCardProps) {
  const getCardClass = (variant: StatCardProps["variant"] = "default") => {
    const baseClass = "transition-all hover:shadow-md dark:border-gray-700"

    switch (variant) {
      case "primary":
        return cn(baseClass, "border-l-4 border-l-blue-500")
      case "secondary":
        return cn(baseClass, "border-l-4 border-l-purple-500")
      case "success":
        return cn(baseClass, "border-l-4 border-l-green-500")
      case "warning":
        return cn(baseClass, "border-l-4 border-l-amber-500")
      case "danger":
        return cn(baseClass, "border-l-4 border-l-red-500")
      case "info":
        return cn(baseClass, "border-l-4 border-l-blue-400")
      default:
        return baseClass
    }
  }

  return (
    <Card className={getCardClass(variant)} onClick={onClick}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend ? (
          <div
            className={cn(
              "flex items-center text-xs mt-1",
              trend.direction === "up"
                ? "text-green-600 dark:text-green-400"
                : trend.direction === "down"
                  ? "text-red-600 dark:text-red-400"
                  : "text-gray-500",
            )}
          >
            {trend.direction === "up" && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {trend.direction === "down" && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <span>{trend.value}</span>
          </div>
        ) : (
          description && <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
      {onClick && (
        <CardFooter className="p-2">
          <Button variant="ghost" size="sm" className="w-full text-xs" onClick={onClick}>
            View details
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

// Dashboard Card Component
export function DashboardCard({
  title,
  description,
  children,
  footer,
  actions,
  className,
}: {
  title: string
  description?: string
  children: ReactNode
  footer?: ReactNode
  actions?: ReactNode
  className?: string
}) {
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  )
}

