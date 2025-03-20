"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format, addDays, subDays, isBefore, isAfter, isToday } from "date-fns"
import { CalendarIcon, ChevronLeft, ChevronRight, Clock } from "lucide-react"

interface SmartDatePickerProps {
  label?: string
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  required?: boolean
  error?: string
  minDate?: Date
  maxDate?: Date
  includeTime?: boolean
  presets?: { label: string; date: () => Date }[]
  className?: string
  labelClassName?: string
  buttonClassName?: string
}

export function SmartDatePicker({
  label,
  value,
  onChange,
  placeholder = "Select date",
  disabled = false,
  required = false,
  error,
  minDate,
  maxDate,
  includeTime = false,
  presets = [],
  className,
  labelClassName,
  buttonClassName,
}: SmartDatePickerProps) {
  const [date, setDate] = useState<Date | undefined>(value)
  const [time, setTime] = useState<string>(value ? format(value, "HH:mm") : "12:00")
  const [isOpen, setIsOpen] = useState(false)

  // Update date when value prop changes
  useEffect(() => {
    if (value !== date) {
      setDate(value)
      if (value) {
        setTime(format(value, "HH:mm"))
      }
    }
  }, [value])

  // Combine date and time
  const combineDateAndTime = (date: Date, timeString: string): Date => {
    const [hours, minutes] = timeString.split(":").map(Number)
    const newDate = new Date(date)
    newDate.setHours(hours)
    newDate.setMinutes(minutes)
    return newDate
  }

  const handleSelect = (newDate: Date | undefined) => {
    setDate(newDate)

    if (newDate && includeTime) {
      const dateWithTime = combineDateAndTime(newDate, time)
      if (onChange) onChange(dateWithTime)
    } else {
      if (onChange) onChange(newDate)
    }

    if (!includeTime) {
      setIsOpen(false)
    }
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value
    setTime(newTime)

    if (date) {
      const dateWithTime = combineDateAndTime(date, newTime)
      if (onChange) onChange(dateWithTime)
    }
  }

  const handlePresetClick = (presetFn: () => Date) => {
    const presetDate = presetFn()
    setDate(presetDate)

    if (includeTime) {
      const dateWithTime = combineDateAndTime(presetDate, time)
      if (onChange) onChange(dateWithTime)
    } else {
      if (onChange) onChange(presetDate)
    }

    setIsOpen(false)
  }

  const handleQuickNavigation = (direction: "prev" | "next", unit: "day" | "week" | "month") => {
    if (!date) return

    let newDate: Date

    if (unit === "day") {
      newDate = direction === "prev" ? subDays(date, 1) : addDays(date, 1)
    } else if (unit === "week") {
      newDate = direction === "prev" ? subDays(date, 7) : addDays(date, 7)
    } else {
      // month - approximate with 30 days
      newDate = direction === "prev" ? subDays(date, 30) : addDays(date, 30)
    }

    // Check min/max constraints
    if (minDate && isBefore(newDate, minDate)) return
    if (maxDate && isAfter(newDate, maxDate)) return

    setDate(newDate)

    if (includeTime) {
      const dateWithTime = combineDateAndTime(newDate, time)
      if (onChange) onChange(dateWithTime)
    } else {
      if (onChange) onChange(newDate)
    }
  }

  // Default presets if none provided
  const defaultPresets = [
    { label: "Today", date: () => new Date() },
    { label: "Yesterday", date: () => subDays(new Date(), 1) },
    { label: "Tomorrow", date: () => addDays(new Date(), 1) },
    { label: "One week ago", date: () => subDays(new Date(), 7) },
    { label: "One week from now", date: () => addDays(new Date(), 7) },
  ]

  const allPresets = presets.length > 0 ? presets : defaultPresets

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label className={cn("flex items-center", labelClassName)}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
              error ? "border-red-500" : "",
              buttonClassName,
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? includeTime ? format(date, "PPP 'at' HH:mm") : format(date, "PPP") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          {date && (
            <div className="flex items-center justify-between p-3 border-b">
              <div className="flex space-x-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => handleQuickNavigation("prev", "day")}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => handleQuickNavigation("next", "day")}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="text-sm font-medium">{isToday(date) ? "Today" : format(date, "MMMM d, yyyy")}</div>

              {date && (
                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={() => handleSelect(undefined)}>
                  Clear
                </Button>
              )}
            </div>
          )}

          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            disabled={disabled}
            initialFocus
            defaultMonth={date}
            fromDate={minDate}
            toDate={maxDate}
          />

          {includeTime && (
            <div className="p-3 border-t flex items-center">
              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
              <input
                type="time"
                value={time}
                onChange={handleTimeChange}
                className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
          )}

          {allPresets.length > 0 && (
            <div className="p-3 border-t">
              <div className="text-sm font-medium mb-2">Quick select</div>
              <div className="grid grid-cols-2 gap-2">
                {allPresets.map((preset, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => handlePresetClick(preset.date)}
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  )
}

