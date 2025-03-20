"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle } from "lucide-react"

interface ValidatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  success?: string
  showValidationIcon?: boolean
  required?: boolean
  validate?: (value: string) => string | undefined
  onValidChange?: (isValid: boolean) => void
}

export function ValidatedInput({
  label,
  error,
  success,
  showValidationIcon = true,
  required = false,
  validate,
  onValidChange,
  className,
  id,
  ...props
}: ValidatedInputProps) {
  const [value, setValue] = useState(props.value || "")
  const [touched, setTouched] = useState(false)
  const [validationError, setValidationError] = useState<string | undefined>(error)
  const [validationSuccess, setValidationSuccess] = useState<string | undefined>(success)
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-")

  useEffect(() => {
    setValidationError(error)
  }, [error])

  useEffect(() => {
    setValidationSuccess(success)
  }, [success])

  useEffect(() => {
    if (props.value !== undefined) {
      setValue(props.value)
    }
  }, [props.value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)

    if (validate) {
      const validationResult = validate(newValue)
      setValidationError(validationResult)
      setValidationSuccess(validationResult ? undefined : "Looks good!")

      if (onValidChange) {
        onValidChange(!validationResult)
      }
    }

    if (props.onChange) {
      props.onChange(e)
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(true)

    if (validate && !validationError) {
      const validationResult = validate(value as string)
      setValidationError(validationResult)
      setValidationSuccess(validationResult ? undefined : "Looks good!")

      if (onValidChange) {
        onValidChange(!validationResult)
      }
    }

    if (props.onBlur) {
      props.onBlur(e)
    }
  }

  const isInvalid = touched && !!validationError
  const isValid = touched && !validationError && !!value

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={inputId} className="flex items-center">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      <div className="relative">
        <Input
          id={inputId}
          {...props}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className={cn(
            isInvalid && "border-red-500 focus-visible:ring-red-500",
            isValid && "border-green-500 focus-visible:ring-green-500",
            className,
          )}
          aria-invalid={isInvalid}
          aria-describedby={isInvalid ? `${inputId}-error` : isValid ? `${inputId}-success` : undefined}
        />
        {showValidationIcon && (
          <>
            {isInvalid && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>
            )}
            {isValid && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
            )}
          </>
        )}
      </div>
      {isInvalid && validationError && (
        <p id={`${inputId}-error`} className="text-sm text-red-500">
          {validationError}
        </p>
      )}
      {isValid && validationSuccess && (
        <p id={`${inputId}-success`} className="text-sm text-green-500">
          {validationSuccess}
        </p>
      )}
    </div>
  )
}

