"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

type User = {
  id: number
  name: string
  email: string
  role: string
  avatar?: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>
  logout: () => void
  resetPassword: (email: string) => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock admin user
const mockAdmin: User = {
  id: 1,
  name: "Admin User",
  email: "admin@example.com",
  role: "Administrator",
  avatar: "/placeholder.svg?height=40&width=40",
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem("adminToken")
        const savedUser = localStorage.getItem("adminUser")

        if (token && savedUser) {
          setUser(JSON.parse(savedUser))
        }
      } catch (err) {
        console.error("Auth check error:", err)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string, rememberMe = false) => {
    try {
      setIsLoading(true)
      setError(null)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock authentication logic
      if (email === "admin@example.com" && password === "Admin123") {
        const token = "mock_jwt_token"
        localStorage.setItem("adminToken", token)

        if (rememberMe) {
          localStorage.setItem("adminUser", JSON.stringify(mockAdmin))
        }

        setUser(mockAdmin)
        router.push("/admin-portal/dashboard")
      } else {
        throw new Error("Invalid credentials")
      }
    } catch (err) {
      setError(err.message || "Authentication failed")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminUser")
    setUser(null)
    router.push("/admin-portal")
  }

  const resetPassword = async (email: string) => {
    try {
      setIsLoading(true)
      setError(null)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, this would send a password reset email
      console.log(`Password reset requested for ${email}`)
    } catch (err) {
      setError(err.message || "Password reset failed")
    } finally {
      setIsLoading(false)
    }
  }

  const updateProfile = async (data: Partial<User>) => {
    try {
      setIsLoading(true)
      setError(null)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (user) {
        const updatedUser = { ...user, ...data }
        setUser(updatedUser)
        localStorage.setItem("adminUser", JSON.stringify(updatedUser))
      }
    } catch (err) {
      setError(err.message || "Profile update failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        logout,
        resetPassword,
        updateProfile,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

