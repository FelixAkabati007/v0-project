"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import type { NavItem, UserProfile } from "./types"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

interface PortalSidebarProps {
  user: UserProfile
  navItems: NavItem[]
  utilityItems?: NavItem[]
  isOpen: boolean
  currentPath: string
  footer?: React.ReactNode
  progressValue?: number
  progressLabel?: string
}

export function PortalSidebar({
  user,
  navItems,
  utilityItems = [],
  isOpen,
  currentPath,
  footer,
  progressValue,
  progressLabel,
}: PortalSidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const isMobile = useMobile()

  return (
    <motion.aside
      className={cn(
        "fixed top-16 bottom-0 left-0 z-30 bg-background border-r overflow-hidden",
        isMobile && !isOpen && "hidden",
      )}
      initial={false}
      animate={{
        width: isOpen ? "16rem" : "5rem",
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex flex-col h-full">
        {/* User Profile Section */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 border border-muted">
              <AvatarImage src={user.avatar || "/placeholder.svg?height=40&width=40"} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {isOpen && (
              <div className="overflow-hidden">
                <h3 className="text-sm font-semibold truncate">{user.name}</h3>
                <p className="text-xs text-muted-foreground truncate">{user.role}</p>
              </div>
            )}
          </div>

          {isOpen && progressValue !== undefined && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs mb-1">
                <span>{progressLabel || "Progress"}</span>
                <span className="font-medium">{progressValue}%</span>
              </div>
              <Progress value={progressValue} className="h-2" />
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-auto py-4">
          <nav className="space-y-1.5 px-3">
            {navItems.map((item) => (
              <TooltipProvider key={item.href} delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors relative",
                        currentPath === item.href
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:bg-muted",
                        hoveredItem === item.href && "scale-[1.02]",
                      )}
                      onMouseEnter={() => setHoveredItem(item.href)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {isOpen && <span className="truncate">{item.title}</span>}
                      {item.badge && isOpen && (
                        <Badge
                          className={cn(
                            "ml-auto",
                            typeof item.badge === "number"
                              ? "bg-primary text-primary-foreground"
                              : "bg-blue-500 text-white",
                          )}
                        >
                          {item.badge}
                        </Badge>
                      )}
                      {item.badge && !isOpen && (
                        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary"></span>
                      )}
                    </Link>
                  </TooltipTrigger>
                  {!isOpen && (
                    <TooltipContent side="right">
                      <div>
                        <p>{item.title}</p>
                        {item.description && <p className="text-xs text-muted-foreground">{item.description}</p>}
                        {item.badge && (
                          <Badge
                            className={cn(
                              "mt-1",
                              typeof item.badge === "number"
                                ? "bg-primary text-primary-foreground"
                                : "bg-blue-500 text-white",
                            )}
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            ))}
          </nav>

          {utilityItems.length > 0 && (
            <>
              <Separator className="my-4" />
              <nav className="space-y-1.5 px-3">
                {utilityItems.map((item) => (
                  <TooltipProvider key={item.href} delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                            currentPath === item.href
                              ? "bg-primary text-primary-foreground"
                              : "text-foreground hover:bg-muted",
                            hoveredItem === item.href && "scale-[1.02]",
                          )}
                          onMouseEnter={() => setHoveredItem(item.href)}
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          <item.icon className="h-5 w-5 flex-shrink-0" />
                          {isOpen && <span className="truncate">{item.title}</span>}
                          {item.badge && isOpen && (
                            <Badge
                              className={cn(
                                "ml-auto",
                                typeof item.badge === "number"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-blue-500 text-white",
                              )}
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </Link>
                      </TooltipTrigger>
                      {!isOpen && (
                        <TooltipContent side="right">
                          <p>{item.title}</p>
                          {item.description && <p className="text-xs text-muted-foreground">{item.description}</p>}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </nav>
            </>
          )}
        </div>

        {/* Footer */}
        {footer && <div className="px-3 py-4 border-t mt-auto">{footer}</div>}
      </div>
    </motion.aside>
  )
}

