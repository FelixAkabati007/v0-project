"use client"

import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EventActionButtonProps {
  icon: ReactNode
  children: ReactNode
  onClick: () => void
  variant?: "default" | "outline" | "ghost"
  className?: string
  disabled?: boolean
  ariaLabel: string
}

export function EventActionButton({
  icon,
  children,
  onClick,
  variant = "default",
  className,
  disabled = false,
  ariaLabel,
}: EventActionButtonProps) {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex items-center transition-all duration-300 group",
        variant === "outline" && "hover:bg-primary/10",
        className,
      )}
      aria-label={ariaLabel}
    >
      <span className="mr-2">{icon}</span>
      <span>{children}</span>
      {variant === "default" && (
        <span className="absolute bottom-0 left-0 w-0 h-full bg-black/10 transition-all duration-300 group-hover:w-full"></span>
      )}
    </Button>
  )
}

