"use client"

import { type ReactNode, useEffect, useState } from "react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

type LazyLoadProps = {
  children: ReactNode
  placeholder?: ReactNode
  threshold?: number
  rootMargin?: string
}

export default function LazyLoad({
  children,
  placeholder = <div className="h-40 bg-gray-200 animate-pulse rounded-md" />,
  threshold = 0.1,
  rootMargin = "200px",
}: LazyLoadProps) {
  const [ref, isIntersecting] = useIntersectionObserver<HTMLDivElement>({
    threshold,
    rootMargin,
    triggerOnce: true,
  })

  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (isIntersecting) {
      setShouldRender(true)
    }
  }, [isIntersecting])

  return <div ref={ref}>{shouldRender ? children : placeholder}</div>
}

