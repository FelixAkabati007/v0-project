"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { useMobile } from "@/hooks/use-mobile"

const responsiveButtonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
        gradient: "bg-gradient-to-r from-blue-600 to-blue-400 text-white hover:from-blue-700 hover:to-blue-500",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ResponsiveButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof responsiveButtonVariants> {
  icon: React.ReactNode
  iconPosition?: "left" | "right"
  showTextOnMobile?: boolean
  asChild?: boolean
}

export const ResponsiveButton = React.forwardRef<HTMLButtonElement, ResponsiveButtonProps>(
  (
    {
      className,
      variant,
      size,
      icon,
      iconPosition = "left",
      showTextOnMobile = false,
      children,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const isMobile = useMobile()

    const content = (
      <>
        {(!isMobile || !children || showTextOnMobile || iconPosition === "right") && iconPosition === "left" && (
          <span className={cn("mr-2", isMobile && !showTextOnMobile && !children ? "" : "mr-2")}>{icon}</span>
        )}
        {(!isMobile || showTextOnMobile || !icon) && children}
        {(!isMobile || !children || showTextOnMobile || iconPosition === "left") && iconPosition === "right" && (
          <span className={cn("ml-2", isMobile && !showTextOnMobile && !children ? "" : "ml-2")}>{icon}</span>
        )}
      </>
    )

    return (
      <Button className={cn(responsiveButtonVariants({ variant, size, className }))} ref={ref} {...props}>
        {content}
      </Button>
    )
  },
)

ResponsiveButton.displayName = "ResponsiveButton"

