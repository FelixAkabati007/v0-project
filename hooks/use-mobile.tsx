"use client"

import { useState, useEffect } from "react"

// Enhanced mobile detection hook with breakpoint option
export function useMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if window exists (client-side only)
    if (typeof window !== "undefined") {
      // Initial check
      setIsMobile(window.innerWidth < breakpoint)

      // Setup resize handler
      const handleResize = () => {
        setIsMobile(window.innerWidth < breakpoint)
      }

      // Add event listener
      window.addEventListener("resize", handleResize)

      // Cleanup
      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [breakpoint])

  return isMobile
}

// Export additional breakpoint hooks for convenience
export function useBreakpoint(breakpoint: number): boolean {
  const [isAboveBreakpoint, setIsAboveBreakpoint] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAboveBreakpoint(window.innerWidth >= breakpoint)

      const handleResize = () => {
        setIsAboveBreakpoint(window.innerWidth >= breakpoint)
      }

      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [breakpoint])

  return isAboveBreakpoint
}

// Predefined breakpoint hooks
export function useSm(): boolean {
  return useBreakpoint(640)
}

export function useMd(): boolean {
  return useBreakpoint(768)
}

export function useLg(): boolean {
  return useBreakpoint(1024)
}

export function useXl(): boolean {
  return useBreakpoint(1280)
}

export function use2Xl(): boolean {
  return useBreakpoint(1536)
}

