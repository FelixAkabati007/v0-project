"use client"

import { useEffect, useRef, useState, type RefObject } from "react"

type IntersectionObserverOptions = {
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
  triggerOnce?: boolean
}

export function useIntersectionObserver<T extends Element>(
  options: IntersectionObserverOptions = {},
): [RefObject<T>, boolean] {
  const { root = null, rootMargin = "0px", threshold = 0, triggerOnce = false } = options
  const ref = useRef<T>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)

        // If triggerOnce is true and the element is intersecting,
        // disconnect the observer after the first intersection
        if (triggerOnce && entry.isIntersecting) {
          observer.disconnect()
        }
      },
      { root, rootMargin, threshold },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [root, rootMargin, threshold, triggerOnce])

  return [ref, isIntersecting]
}

