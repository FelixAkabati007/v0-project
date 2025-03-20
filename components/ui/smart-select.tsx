"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select"
import { Check, Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Option {
  value: string
  label: string
  group?: string
  description?: string
}

interface SmartSelectProps {
  label?: string
  options: Option[]
  value?: string
  defaultValue?: string
  placeholder?: string
  searchable?: boolean
  required?: boolean
  disabled?: boolean
  error?: string
  className?: string
  labelClassName?: string
  selectClassName?: string
  onChange?: (value: string) => void
  onBlur?: () => void
  id?: string
  name?: string
}

export function SmartSelect({
  label,
  options,
  value,
  defaultValue,
  placeholder = "Select an option",
  searchable = false,
  required = false,
  disabled = false,
  error,
  className,
  labelClassName,
  selectClassName,
  onChange,
  onBlur,
  id,
  name,
}: SmartSelectProps) {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(value || defaultValue)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options)
  const [groups, setGroups] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)

  // Update selected value when value prop changes
  useEffect(() => {
    if (value !== undefined && value !== selectedValue) {
      setSelectedValue(value)
    }
  }, [value])

  // Extract unique groups from options
  useEffect(() => {
    const uniqueGroups = [...new Set(options.filter((option) => option.group).map((option) => option.group!))]
    setGroups(uniqueGroups)
  }, [options])

  // Filter options based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = options.filter(
        (option) =>
          option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          option.description?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredOptions(filtered)
    } else {
      setFilteredOptions(options)
    }
  }, [searchQuery, options])

  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue)
    setIsOpen(false)

    if (onChange) {
      onChange(newValue)
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
  }

  const getSelectedLabel = () => {
    const option = options.find((opt) => opt.value === selectedValue)
    return option ? option.label : placeholder
  }

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label htmlFor={id || name} className={cn("flex items-center", labelClassName)}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}

      <div className="relative">
        <Select value={selectedValue} onValueChange={handleValueChange} disabled={disabled} onOpenChange={setIsOpen}>
          <SelectTrigger
            id={id || name}
            className={cn(error ? "border-red-500 focus:ring-red-500" : "", selectClassName)}
          >
            <SelectValue placeholder={placeholder}>{getSelectedLabel()}</SelectValue>
          </SelectTrigger>

          <SelectContent>
            {searchable && (
              <div className="px-2 py-2 sticky top-0 bg-white dark:bg-gray-800 z-10">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-8"
                  />
                  {searchQuery && (
                    <button onClick={clearSearch} className="absolute right-2 top-1/2 -translate-y-1/2">
                      <X className="h-4 w-4 text-gray-500" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {groups.length > 0
              ? // Render grouped options
                groups.map((group) => {
                  const groupOptions = filteredOptions.filter((option) => option.group === group)

                  if (groupOptions.length === 0) return null

                  return (
                    <SelectGroup key={group}>
                      <SelectLabel>{group}</SelectLabel>
                      {groupOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center justify-between w-full">
                            <div>
                              <div>{option.label}</div>
                              {option.description && <div className="text-xs text-gray-500">{option.description}</div>}
                            </div>
                            {selectedValue === option.value && <Check className="h-4 w-4 text-green-500 ml-2" />}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  )
                })
              : // Render flat options list
                filteredOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <div>{option.label}</div>
                        {option.description && <div className="text-xs text-gray-500">{option.description}</div>}
                      </div>
                      {selectedValue === option.value && <Check className="h-4 w-4 text-green-500 ml-2" />}
                    </div>
                  </SelectItem>
                ))}

            {filteredOptions.length === 0 && (
              <div className="px-2 py-4 text-center text-sm text-gray-500">No options found</div>
            )}
          </SelectContent>
        </Select>
      </div>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  )
}

