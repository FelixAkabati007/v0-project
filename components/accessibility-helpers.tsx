"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, Type, Contrast, Glasses, PanelLeftClose } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

interface AccessibilityHelperProps {
  className?: string
}

export function AccessibilityHelper({ className }: AccessibilityHelperProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [fontSize, setFontSize] = useState(100)
  const [highContrast, setHighContrast] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()
  const panelRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close panel
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Apply font size to document
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`
  }, [fontSize])

  // Apply high contrast
  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }
  }, [highContrast])

  const increaseFontSize = () => {
    setFontSize((prev) => Math.min(prev + 10, 150))
  }

  const decreaseFontSize = () => {
    setFontSize((prev) => Math.max(prev - 10, 80))
  }

  const resetFontSize = () => {
    setFontSize(100)
  }

  const toggleHighContrast = () => {
    setHighContrast((prev) => !prev)
  }

  const toggleDarkMode = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  return (
    <div className={cn("fixed bottom-4 right-4 z-50", className)} ref={panelRef}>
      {isOpen ? (
        <div className="bg-background border rounded-lg shadow-lg p-4 w-64 animate-in slide-in-from-right-10 duration-300">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold">Accessibility Options</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <PanelLeftClose className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-medium mb-2">Text Size</h4>
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decreaseFontSize}
                  disabled={fontSize <= 80}
                  aria-label="Decrease font size"
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-sm">{fontSize}%</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={increaseFontSize}
                  disabled={fontSize >= 150}
                  aria-label="Increase font size"
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={resetFontSize} aria-label="Reset font size">
                  Reset
                </Button>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-medium mb-2">Display</h4>
              <div className="flex flex-col gap-2">
                <Button
                  variant={highContrast ? "default" : "outline"}
                  size="sm"
                  onClick={toggleHighContrast}
                  aria-pressed={highContrast}
                  className="justify-start"
                >
                  <Contrast className="h-4 w-4 mr-2" />
                  High Contrast
                </Button>
                <Button
                  variant={resolvedTheme === "dark" ? "default" : "outline"}
                  size="sm"
                  onClick={toggleDarkMode}
                  aria-pressed={resolvedTheme === "dark"}
                  className="justify-start"
                >
                  <Type className="h-4 w-4 mr-2" />
                  Dark Mode
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(true)}
          className="rounded-full h-12 w-12 shadow-lg bg-primary text-primary-foreground hover:bg-primary/90"
          aria-label="Open accessibility options"
        >
          <Glasses className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}

