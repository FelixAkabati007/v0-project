"use client"

import Image, { type ImageProps } from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

type OptimizedImageProps = Omit<ImageProps, "src"> & {
  src: string
  fallbackSrc?: string
}

export default function OptimizedImage({
  src,
  alt,
  className,
  fallbackSrc = "/placeholder.svg?height=400&width=600",
  ...props
}: OptimizedImageProps) {
  const [error, setError] = useState(false)

  // Use the original src if it's a blob URL or placeholder
  const imageSrc = error ? fallbackSrc : src

  return (
    <Image
      src={imageSrc || "/placeholder.svg"}
      alt={alt || ""}
      className={cn("transition-opacity duration-300", className)}
      onError={() => setError(true)}
      {...props}
    />
  )
}

