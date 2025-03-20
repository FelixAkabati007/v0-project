"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import {
  Upload,
  X,
  File,
  ImageIcon,
  FileText,
  FileArchive,
  FileIcon as FilePdf,
  FileCode,
  FileSpreadsheet,
  FileAudio,
  FileVideo,
  Check,
  AlertCircle,
} from "lucide-react"

interface SmartFileUploadProps {
  label?: string
  accept?: string
  multiple?: boolean
  maxFiles?: number
  maxSize?: number // in MB
  minSize?: number // in MB
  required?: boolean
  disabled?: boolean
  error?: string
  value?: File[] | null
  onChange?: (files: File[] | null) => void
  onError?: (error: string) => void
  className?: string
  labelClassName?: string
  dropzoneClassName?: string
  preview?: boolean
  autoUpload?: boolean
  validateFn?: (file: File) => { valid: boolean; message?: string }
}

export function SmartFileUpload({
  label,
  accept,
  multiple = false,
  maxFiles = 5,
  maxSize = 10, // 10MB default
  minSize = 0,
  required = false,
  disabled = false,
  error,
  value,
  onChange,
  onError,
  className,
  labelClassName,
  dropzoneClassName,
  preview = true,
  autoUpload = false,
  validateFn,
}: SmartFileUploadProps) {
  const [files, setFiles] = useState<File[]>(value || [])
  const [isDragging, setIsDragging] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})
  const [fileErrors, setFileErrors] = useState<Record<string, string>>({})
  const [uploadStatus, setUploadStatus] = useState<Record<string, "idle" | "uploading" | "success" | "error">>({})
  const [previews, setPreviews] = useState<Record<string, string>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Update files when value prop changes
  useEffect(() => {
    if (value !== undefined && value !== null) {
      setFiles(value)
    }
  }, [value])

  // Generate previews for image files
  useEffect(() => {
    const newPreviews: Record<string, string> = {}

    files.forEach((file) => {
      if (file.type.startsWith("image/") && preview) {
        // Check if we already have a preview for this file
        if (!previews[file.name]) {
          const reader = new FileReader()
          reader.onload = (e) => {
            if (e.target?.result) {
              setPreviews((prev) => ({
                ...prev,
                [file.name]: e.target!.result as string,
              }))
            }
          }
          reader.readAsDataURL(file)
        } else {
          newPreviews[file.name] = previews[file.name]
        }
      }
    })

    // Clean up previews for files that were removed
    const fileNames = files.map((f) => f.name)
    Object.keys(previews).forEach((name) => {
      if (!fileNames.includes(name)) {
        URL.revokeObjectURL(previews[name])
      } else {
        newPreviews[name] = previews[name]
      }
    })

    if (Object.keys(newPreviews).length !== Object.keys(previews).length) {
      setPreviews(newPreviews)
    }
  }, [files, preview, previews])

  // Auto upload files if enabled
  useEffect(() => {
    if (autoUpload && files.length > 0) {
      files.forEach((file) => {
        if (uploadStatus[file.name] === "idle") {
          simulateUpload(file)
        }
      })
    }
  }, [files, autoUpload, uploadStatus])

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (disabled) return
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (disabled) return
    setIsDragging(true)
  }

  const validateFile = (file: File): { valid: boolean; message?: string } => {
    // Check file size
    const fileSizeInMB = file.size / (1024 * 1024)
    if (fileSizeInMB > maxSize) {
      return { valid: false, message: `File size exceeds ${maxSize}MB limit` }
    }

    if (fileSizeInMB < minSize) {
      return { valid: false, message: `File size is below ${minSize}MB minimum` }
    }

    // Check file type if accept is specified
    if (accept) {
      const acceptedTypes = accept.split(",").map((type) => type.trim())
      const fileType = file.type

      // Handle wildcards like image/*
      const isAccepted = acceptedTypes.some((type) => {
        if (type.endsWith("/*")) {
          const category = type.split("/")[0]
          return fileType.startsWith(`${category}/`)
        }
        return type === fileType
      })

      if (!isAccepted) {
        return { valid: false, message: `File type ${fileType} is not accepted` }
      }
    }

    // Custom validation if provided
    if (validateFn) {
      return validateFn(file)
    }

    return { valid: true }
  }

  const processFiles = (fileList: FileList | null) => {
    if (!fileList) return

    const newFiles: File[] = []
    const newErrors: Record<string, string> = { ...fileErrors }
    const newUploadStatus: Record<string, "idle" | "uploading" | "success" | "error"> = { ...uploadStatus }

    // Check if adding these files would exceed maxFiles
    if (multiple && files.length + fileList.length > maxFiles) {
      const errorMsg = `Cannot upload more than ${maxFiles} files`
      if (onError) onError(errorMsg)
      return
    }

    Array.from(fileList).forEach((file) => {
      const validation = validateFile(file)

      if (!validation.valid) {
        newErrors[file.name] = validation.message || "Invalid file"
        newUploadStatus[file.name] = "error"
        if (onError) onError(validation.message || "Invalid file")
      } else {
        newFiles.push(file)
        newUploadStatus[file.name] = "idle"
        // Clear any previous errors for this file
        if (newErrors[file.name]) {
          delete newErrors[file.name]
        }
      }
    })

    setFileErrors(newErrors)
    setUploadStatus(newUploadStatus)

    const updatedFiles = multiple ? [...files, ...newFiles] : newFiles
    setFiles(updatedFiles)

    if (onChange) {
      onChange(updatedFiles.length > 0 ? updatedFiles : null)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    if (disabled) return

    const { files: droppedFiles } = e.dataTransfer
    processFiles(droppedFiles)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files)
    // Reset the input value so the same file can be selected again if removed
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleRemoveFile = (fileToRemove: File) => {
    const updatedFiles = files.filter((file) => file !== fileToRemove)
    setFiles(updatedFiles)

    // Clean up upload progress and status
    const newUploadProgress = { ...uploadProgress }
    const newUploadStatus = { ...uploadStatus }
    delete newUploadProgress[fileToRemove.name]
    delete newUploadStatus[fileToRemove.name]
    setUploadProgress(newUploadProgress)
    setUploadStatus(newUploadStatus)

    // Clean up errors
    const newErrors = { ...fileErrors }
    delete newErrors[fileToRemove.name]
    setFileErrors(newErrors)

    if (onChange) {
      onChange(updatedFiles.length > 0 ? updatedFiles : null)
    }
  }

  const simulateUpload = (file: File) => {
    setUploadStatus((prev) => ({ ...prev, [file.name]: "uploading" }))
    setUploadProgress((prev) => ({ ...prev, [file.name]: 0 }))

    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 10
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setUploadStatus((prev) => ({ ...prev, [file.name]: "success" }))
      }
      setUploadProgress((prev) => ({ ...prev, [file.name]: progress }))
    }, 300)
  }

  const getFileIcon = (file: File) => {
    const type = file.type

    if (type.startsWith("image/")) return <ImageIcon className="h-6 w-6 text-blue-500" />
    if (type.startsWith("text/")) return <FileText className="h-6 w-6 text-yellow-500" />
    if (type.startsWith("application/pdf")) return <FilePdf className="h-6 w-6 text-red-500" />
    if (type.includes("spreadsheet") || type.includes("excel"))
      return <FileSpreadsheet className="h-6 w-6 text-green-500" />
    if (type.includes("zip") || type.includes("compressed")) return <FileArchive className="h-6 w-6 text-purple-500" />
    if (type.includes("audio")) return <FileAudio className="h-6 w-6 text-pink-500" />
    if (type.includes("video")) return <FileVideo className="h-6 w-6 text-orange-500" />
    if (type.includes("javascript") || type.includes("json") || type.includes("html") || type.includes("css"))
      return <FileCode className="h-6 w-6 text-cyan-500" />

    return <File className="h-6 w-6 text-gray-500" />
  }

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label className={cn("flex items-center", labelClassName)}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}

      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-4 transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-gray-300 dark:border-gray-700",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
          dropzoneClassName,
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleFileInputChange}
        />

        <div className="flex flex-col items-center justify-center py-4">
          <Upload className="h-10 w-10 text-gray-400 mb-2" />
          <p className="text-sm font-medium">
            {isDragging ? "Drop files here" : "Drag and drop files here or click to browse"}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {multiple ? `Upload up to ${maxFiles} files (max ${maxSize}MB each)` : `Max file size: ${maxSize}MB`}
          </p>
          {accept && <p className="text-xs text-gray-500 mt-1">Accepted file types: {accept.split(",").join(", ")}</p>}
        </div>
      </div>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}

      {files.length > 0 && (
        <ul className="mt-4 space-y-2">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className={cn(
                "flex items-center p-2 rounded-md border",
                fileErrors[file.name] ? "border-red-300 bg-red-50" : "border-gray-200",
              )}
            >
              <div className="mr-2">
                {preview && file.type.startsWith("image/") && previews[file.name] ? (
                  <div className="h-10 w-10 rounded overflow-hidden">
                    <img
                      src={previews[file.name] || "/placeholder.svg"}
                      alt={file.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  getFileIcon(file)
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-gray-500 ml-2">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>

                {fileErrors[file.name] ? (
                  <p className="text-xs text-red-500 mt-1 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {fileErrors[file.name]}
                  </p>
                ) : uploadStatus[file.name] === "uploading" ? (
                  <div className="w-full mt-1">
                    <Progress value={uploadProgress[file.name]} className="h-1" />
                    <p className="text-xs text-gray-500 mt-1">Uploading... {Math.round(uploadProgress[file.name])}%</p>
                  </div>
                ) : uploadStatus[file.name] === "success" ? (
                  <p className="text-xs text-green-500 mt-1 flex items-center">
                    <Check className="h-3 w-3 mr-1" />
                    Upload complete
                  </p>
                ) : null}
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-500 hover:text-red-500"
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemoveFile(file)
                }}
                disabled={disabled}
              >
                <X className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      )}

      {autoUpload && files.length > 0 && (
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-gray-500">
            {files.filter((f) => uploadStatus[f.name] === "success").length} of {files.length} files uploaded
          </p>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              files.forEach((file) => {
                if (uploadStatus[file.name] !== "success" && !fileErrors[file.name]) {
                  simulateUpload(file)
                }
              })
            }}
            disabled={disabled || files.every((f) => uploadStatus[f.name] === "success" || fileErrors[f.name])}
          >
            Upload All
          </Button>
        </div>
      )}
    </div>
  )
}

