"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mic, X, Check, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface SmartInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  suggestions?: string[]
  predictiveText?: boolean
  voiceInput?: boolean
  aiAssist?: boolean
  validateFn?: (value: string) => { valid: boolean; message?: string }
  onValidatedChange?: (value: string, isValid: boolean) => void
  className?: string
  labelClassName?: string
  inputClassName?: string
}

export function SmartInput({
  label,
  suggestions = [],
  predictiveText = false,
  voiceInput = false,
  aiAssist = false,
  validateFn,
  onValidatedChange,
  className,
  labelClassName,
  inputClassName,
  ...props
}: SmartInputProps) {
  const [value, setValue] = useState(props.value?.toString() || "")
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [activeSuggestion, setActiveSuggestion] = useState(0)
  const [isListening, setIsListening] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [validation, setValidation] = useState<{ valid: boolean; message?: string }>({ valid: true })
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionRef = useRef<HTMLUListElement>(null)

  // Handle value changes from parent component
  useEffect(() => {
    if (props.value !== undefined && props.value?.toString() !== value) {
      setValue(props.value?.toString() || "")
    }
  }, [props.value])

  // Filter suggestions based on input
  useEffect(() => {
    if (predictiveText && value) {
      const filtered = suggestions.filter((suggestion) => suggestion.toLowerCase().indexOf(value.toLowerCase()) > -1)
      setFilteredSuggestions(filtered)
      setShowSuggestions(filtered.length > 0)
      setActiveSuggestion(0)
    } else {
      setShowSuggestions(false)
    }
  }, [value, suggestions, predictiveText])

  // Validate input
  useEffect(() => {
    if (validateFn) {
      const result = validateFn(value)
      setValidation(result)

      if (onValidatedChange) {
        onValidatedChange(value, result.valid)
      }
    }
  }, [value, validateFn, onValidatedChange])

  // Handle voice input
  const handleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice input is not supported in this browser")
      return
    }

    // Simulate voice recognition since we can't use the actual API in this environment
    setIsListening(true)

    // Simulate processing time
    setTimeout(() => {
      // Add some sample text based on the input field's name or id
      const fieldName = props.name || props.id || ""
      let voiceText = ""

      if (fieldName.includes("name")) {
        voiceText = "John Smith"
      } else if (fieldName.includes("email")) {
        voiceText = "john.smith@example.com"
      } else if (fieldName.includes("phone")) {
        voiceText = "555-123-4567"
      } else if (fieldName.includes("address")) {
        voiceText = "123 Main Street, Anytown"
      } else {
        voiceText = "Sample voice input text"
      }

      setValue(voiceText)
      setIsListening(false)

      // Trigger onChange event
      if (props.onChange) {
        const event = {
          target: { value: voiceText, name: props.name },
        } as React.ChangeEvent<HTMLInputElement>
        props.onChange(event)
      }
    }, 1500)
  }

  // Handle AI assistance
  const handleAIAssist = async () => {
    setIsLoading(true)

    // Simulate AI processing
    setTimeout(() => {
      const fieldName = props.name || props.id || ""
      let aiSuggestion = ""

      if (fieldName.includes("name")) {
        aiSuggestion = "Jane Doe"
      } else if (fieldName.includes("email")) {
        aiSuggestion = "jane.doe@example.com"
      } else if (fieldName.includes("description") || fieldName.includes("bio")) {
        aiSuggestion =
          "Professional educator with 5+ years of experience in curriculum development and student engagement."
      } else if (fieldName.includes("address")) {
        aiSuggestion = "456 Oak Avenue, Springfield"
      } else if (fieldName.includes("title")) {
        aiSuggestion = "Introduction to Computer Science"
      } else {
        aiSuggestion = "AI suggested content"
      }

      setValue(aiSuggestion)
      setIsLoading(false)

      // Trigger onChange event
      if (props.onChange) {
        const event = {
          target: { value: aiSuggestion, name: props.name },
        } as React.ChangeEvent<HTMLInputElement>
        props.onChange(event)
      }
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)

    if (props.onChange) {
      props.onChange(e)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setValue(suggestion)
    setShowSuggestions(false)

    if (props.onChange) {
      const event = {
        target: { value: suggestion, name: props.name },
      } as React.ChangeEvent<HTMLInputElement>
      props.onChange(event)
    }

    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle keyboard navigation for suggestions
    if (showSuggestions && filteredSuggestions.length > 0) {
      // Arrow down
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setActiveSuggestion((prev) => (prev < filteredSuggestions.length - 1 ? prev + 1 : prev))
      }
      // Arrow up
      else if (e.key === "ArrowUp") {
        e.preventDefault()
        setActiveSuggestion((prev) => (prev > 0 ? prev - 1 : 0))
      }
      // Enter
      else if (e.key === "Enter" && showSuggestions) {
        e.preventDefault()
        setValue(filteredSuggestions[activeSuggestion])
        setShowSuggestions(false)

        if (props.onChange) {
          const event = {
            target: {
              value: filteredSuggestions[activeSuggestion],
              name: props.name,
            },
          } as React.ChangeEvent<HTMLInputElement>
          props.onChange(event)
        }
      }
      // Escape
      else if (e.key === "Escape") {
        setShowSuggestions(false)
      }
    }

    if (props.onKeyDown) {
      props.onKeyDown(e)
    }
  }

  const clearInput = () => {
    setValue("")

    if (props.onChange) {
      const event = {
        target: { value: "", name: props.name },
      } as React.ChangeEvent<HTMLInputElement>
      props.onChange(event)
    }

    inputRef.current?.focus()
  }

  return (
    <div className={cn("relative space-y-2", className)}>
      {label && (
        <Label htmlFor={props.id || props.name} className={cn("flex items-center", labelClassName)}>
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}

      <div className="relative">
        <Input
          {...props}
          ref={inputRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => predictiveText && value && setShowSuggestions(filteredSuggestions.length > 0)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className={cn("pr-10", validation.valid ? "" : "border-red-500 focus-visible:ring-red-500", inputClassName)}
          aria-invalid={!validation.valid}
        />

        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
          {value && (
            <button
              type="button"
              onClick={clearInput}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-full"
              aria-label="Clear input"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {voiceInput && !isListening && (
            <button
              type="button"
              onClick={handleVoiceInput}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-full"
              aria-label="Voice input"
            >
              <Mic className="h-4 w-4" />
            </button>
          )}

          {isListening && (
            <div className="animate-pulse text-red-500 p-1">
              <Mic className="h-4 w-4" />
            </div>
          )}

          {aiAssist && !isLoading && (
            <button
              type="button"
              onClick={handleAIAssist}
              className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 p-1 rounded-full"
              aria-label="AI assist"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
              </svg>
            </button>
          )}

          {isLoading && <Loader2 className="h-4 w-4 animate-spin text-blue-500" />}

          {!isLoading && validation.valid && value && <Check className="h-4 w-4 text-green-500" />}
        </div>

        {showSuggestions && filteredSuggestions.length > 0 && (
          <ul
            ref={suggestionRef}
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className={cn(
                  "cursor-pointer select-none relative py-2 pl-3 pr-9",
                  index === activeSuggestion ? "bg-blue-600 text-white" : "text-gray-900 dark:text-gray-100",
                )}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {!validation.valid && validation.message && <p className="text-sm text-red-500 mt-1">{validation.message}</p>}
    </div>
  )
}

