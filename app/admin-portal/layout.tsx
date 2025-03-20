"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter, usePathname } from "next/navigation"
import { AdminProvider } from "@/contexts/admin-context"
import { AuthProvider, useAuth } from "@/contexts/auth-context"
import { NotificationToast } from "@/components/ui/notification-toast"
import AdminSidebar from "@/components/AdminSidebar"
import { AlertTriangle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

// Custom error boundary implementation
const ErrorBoundary = ({ children, FallbackComponent }) => {
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState(null)
  const errorRef = useRef(null)

  useEffect(() => {
    const errorHandler = (error) => {
      errorRef.current = error
      setHasError(true)
      setError(error)
      return true
    }

    window.addEventListener("error", errorHandler)
    return () => window.removeEventListener("error", errorHandler)
  }, [])

  const resetErrorBoundary = useCallback(() => {
    errorRef.current = null
    setHasError(false)
    setError(null)
  }, [])

  if (hasError) {
    return <FallbackComponent error={error} resetErrorBoundary={resetErrorBoundary} />
  }

  return children
}

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50 dark:bg-red-900/20 px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
            <AlertTriangle className="h-10 w-10 text-red-600 dark:text-red-400" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Something went wrong</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">{error.message || "An unexpected error occurred"}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={resetErrorBoundary} className="bg-red-600 hover:bg-red-700 text-white">
            Try again
          </Button>
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/admin-portal")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Admin Portal
          </Button>
        </div>
      </div>
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="relative h-12 w-12">
        <div className="absolute animate-ping h-12 w-12 rounded-full bg-primary opacity-75"></div>
        <div className="relative animate-spin h-12 w-12 rounded-full border-4 border-transparent border-t-primary"></div>
      </div>
      <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">Loading admin portal...</p>
    </div>
  )
}

function AdminPortalContent({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsSidebarOpen(width >= 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    // Check if user is logged in
    const checkLoginStatus = () => {
      if (!isAuthenticated && pathname !== "/admin-portal") {
        router.push("/admin-portal")
      }
      setIsLoading(false)
    }

    // Simulate a loading delay
    setTimeout(checkLoginStatus, 500)

    return () => window.removeEventListener("resize", handleResize)
  }, [router, pathname, isAuthenticated])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  if (isLoading) {
    return <LoadingFallback />
  }

  if (pathname === "/admin-portal") {
    return <>{children}</>
  }

  return (
    <AdminProvider>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
          {isAuthenticated && <AdminSidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />}
          <div className="flex-1 flex flex-col overflow-hidden">
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={`flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4 transition-all duration-300 ease-in-out ${
                isAuthenticated && isSidebarOpen ? "md:ml-64" : "md:ml-20"
              }`}
            >
              {children}
            </motion.main>
          </div>
          <NotificationToast />
        </div>
      </ErrorBoundary>
    </AdminProvider>
  )
}

export default function AdminPortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <AdminPortalContent children={children} />
    </AuthProvider>
  )
}

