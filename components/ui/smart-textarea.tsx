"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mic, X, Loader2, Maximize2, Minimize2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface SmartTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  aiAssist?: boolean
  voiceInput?: boolean
  expandable?: boolean
  templates?: { name: string; content: string }[]
  validateFn?: (value: string) => { valid: boolean; message?: string }
  onValidatedChange?: (value: string, isValid: boolean) => void
  className?: string
  labelClassName?: string
  textareaClassName?: string
}

export function SmartTextarea({
  label,
  aiAssist = false,
  voiceInput = false,
  expandable = false,
  templates = [],
  validateFn,
  onValidatedChange,
  className,
  labelClassName,
  textareaClassName,
  ...props
}: SmartTextareaProps) {
  const [value, setValue] = useState(props.value?.toString() || "")
  const [isListening, setIsListening] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)
  const [validation, setValidation] = useState<{ valid: boolean; message?: string }>({ valid: true })
  const [wordCount, setWordCount] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const templatesRef = useRef<HTMLDivElement>(null)

  // Handle value changes from parent component
  useEffect(() => {
    if (props.value !== undefined && props.value?.toString() !== value) {
      setValue(props.value?.toString() || "")
    }
  }, [props.value])

  // Update word and character count
  useEffect(() => {
    setCharCount(value.length)
    setWordCount(value.trim() === "" ? 0 : value.trim().split(/\s+/).length)
  }, [value])

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

    // Simulate voice recognition
    setIsListening(true)

    // Simulate processing time
    setTimeout(() => {
      // Add some sample text based on the textarea's name or id
      const fieldName = props.name || props.id || ""
      let voiceText = ""

      if (fieldName.includes("description")) {
        voiceText =
          "This is a detailed description of the course content, including key topics and learning objectives."
      } else if (fieldName.includes("bio")) {
        voiceText = "Experienced educator with a passion for helping students achieve their full potential."
      } else if (fieldName.includes("notes")) {
        voiceText = "Important notes regarding the student's progress and areas for improvement."
      } else if (fieldName.includes("message")) {
        voiceText =
          "Thank you for your recent submission. I've reviewed the materials and have a few suggestions for improvement."
      } else {
        voiceText = "This is sample voice input text for the textarea field."
      }

      // Append to existing text or replace
      const newValue = value ? `${value} ${voiceText}` : voiceText
      setValue(newValue)
      setIsListening(false)

      // Trigger onChange event
      if (props.onChange) {
        const event = {
          target: { value: newValue, name: props.name },
        } as React.ChangeEvent<HTMLTextAreaElement>
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

      if (fieldName.includes("description")) {
        aiSuggestion =
          "This comprehensive course covers fundamental principles and advanced techniques in the subject area. Students will engage in hands-on projects, collaborative discussions, and individual research to develop a deep understanding of key concepts."
      } else if (fieldName.includes("bio")) {
        aiSuggestion =
          "Dedicated educator with over 10 years of experience in curriculum development and classroom instruction. Specializes in creating engaging learning environments that foster critical thinking and creativity."
      } else if (fieldName.includes("feedback")) {
        aiSuggestion =
          "Your recent assignment demonstrated excellent critical thinking and analysis. Consider expanding on your discussion of methodology in future submissions to strengthen your arguments."
      } else if (fieldName.includes("message")) {
        aiSuggestion =
          "I hope this message finds you well. I wanted to follow up on our recent discussion about the upcoming project deadlines. Please let me know if you need any additional resources or support."
      } else {
        aiSuggestion =
          "AI-generated content tailored to your specific needs. This text can be customized further based on your requirements."
      }

      setValue(aiSuggestion)
      setIsLoading(false)

      // Trigger onChange event
      if (props.onChange) {
        const event = {
          target: { value: aiSuggestion, name: props.name },
        } as React.ChangeEvent<HTMLTextAreaElement>
        props.onChange(event)
      }
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setValue(newValue)

    if (props.onChange) {
      props.onChange(e)
    }
  }

  const clearInput = () => {
    setValue("")

    if (props.onChange) {
      const event = {
        target: { value: "", name: props.name },
      } as React.ChangeEvent<HTMLTextAreaElement>
      props.onChange(event)
    }

    textareaRef.current?.focus()
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const applyTemplate = (template: { name: string; content: string }) => {
    setValue(template.content)
    setShowTemplates(false)

    if (props.onChange) {
      const event = {
        target: { value: template.content, name: props.name },
      } as React.ChangeEvent<HTMLTextAreaElement>
      props.onChange(event)
    }

    textareaRef.current?.focus()
  }

  return (
    <div className={cn("relative space-y-2", className)}>
      {label && (
        <div className="flex justify-between items-center">
          <Label htmlFor={props.id || props.name} className={cn("flex items-center", labelClassName)}>
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </Label>

          {templates.length > 0 && (
            <button
              type="button"
              onClick={() => setShowTemplates(!showTemplates)}
              className="text-xs text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Use template
            </button>
          )}
        </div>
      )}

      <div className="relative">
        <Textarea
          {...props}
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          className={cn(
            "resize-none",
            isExpanded ? "h-96" : props.rows ? "" : "h-32",
            validation.valid ? "" : "border-red-500 focus-visible:ring-red-500",
            textareaClassName,
          )}
          aria-invalid={!validation.valid}
        />

        <div className="absolute right-2 top-2 flex items-center space-x-1">
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

          {expandable && (
            <button
              type="button"
              onClick={toggleExpand}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-full"
              aria-label={isExpanded ? "Minimize" : "Maximize"}
            >
              {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>
          )}
        </div>

        {showTemplates && templates.length > 0 && (
          <div
            ref={templatesRef}
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            {templates.map((template, index) => (
              <button
                key={index}
                onClick={() => applyTemplate(template)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <div className="font-medium">{template.name}</div>
                <div className="text-xs text-gray-500 truncate">{template.content.substring(0, 50)}...</div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between text-xs text-gray-500">
        <div>
          {!validation.valid && validation.message ? (
            <p className="text-sm text-red-500">{validation.message}</p>
          ) : (
            <span>{wordCount} words</span>
          )}
        </div>
        <div>{charCount} characters</div>
      </div>
    </div>
  )
}

