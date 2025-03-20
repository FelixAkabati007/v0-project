"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useRouter, usePathname } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

// Define user roles with granular permissions
export type Permission =
  | "dashboard:view"
  | "dashboard:edit"
  | "users:view"
  | "users:create"
  | "users:edit"
  | "users:delete"
  | "courses:view"
  | "courses:create"
  | "courses:edit"
  | "courses:delete"
  | "finance:view"
  | "finance:create"
  | "finance:edit"
  | "finance:approve"
  | "reports:view"
  | "reports:create"
  | "reports:schedule"
  | "reports:export"
  | "curriculum:view"
  | "curriculum:approve"
  | "curriculum:edit"
  | "grades:view"
  | "grades:edit"
  | "grades:finalize"
  | "attendance:view"
  | "attendance:edit"
  | "attendance:report"
  | "settings:view"
  | "settings:edit"

export type UserRole = "student" | "teacher" | "admin" | "accountant" | "academic_board" | "parent" | "guest"

export interface UserSession {
  id: string
  name: string
  email: string
  role: UserRole
  permissions: Permission[]
  avatar?: string
  department?: string
  lastLogin?: Date
  mfaEnabled: boolean
  accessLevel: number // 1-10 scale for granular access control
  preferences: {
    theme: "light" | "dark" | "system"
    language: string
    notifications: {
      email: boolean
      push: boolean
      sms: boolean
    }
    accessibility: {
      fontSize: number
      highContrast: boolean
      reducedMotion: boolean
    }
  }
  metadata: Record<string, any>
}

interface AuthState {
  user: UserSession | null
  isLoading: boolean
  isAuthenticated: boolean
  authError: string | null
  isMfaRequired: boolean
  sessionExpiry: Date | null
  attemptCount: number
  lastAttempt: Date | null
  isLocked: boolean
  isImpersonating?: boolean
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  register: (userData: Partial<UserSession> & { password: string }) => Promise<boolean>
  verifyMfa: (code: string) => Promise<boolean>
  resetPassword: (email: string) => Promise<boolean>
  updateProfile: (data: Partial<UserSession>) => Promise<boolean>
  changePassword: (oldPassword: string, newPassword: string) => Promise<boolean>
  hasPermission: (permission: Permission) => boolean
  refreshSession: () => Promise<void>
  enableMfa: () => Promise<{ qrCode: string; backupCodes: string[] }>
  disableMfa: () => Promise<boolean>
  updatePreferences: (preferences: Partial<UserSession["preferences"]>) => Promise<boolean>
  impersonateUser?: (userId: string) => Promise<boolean>
  endImpersonation?: () => Promise<void>
}

// Mock user data for demonstration
const MOCK_USERS: Record<string, UserSession & { password: string }> = {
  "admin@school.edu": {
    id: "admin-123",
    name: "Admin User",
    email: "admin@school.edu",
    password: "admin123",
    role: "admin",
    permissions: ["dashboard:view", "dashboard:edit", "users:view", "users:create", "users:edit", "users:delete"],
    mfaEnabled: false,
    accessLevel: 10,
    preferences: {
      theme: "system",
      language: "en",
      notifications: { email: true, push: true, sms: false },
      accessibility: { fontSize: 16, highContrast: false, reducedMotion: false },
    },
    metadata: {},
  },
  "teacher@school.edu": {
    id: "teacher-123",
    name: "John Doe",
    email: "teacher@school.edu",
    password: "teacher123",
    role: "teacher",
    department: "Science",
    permissions: ["dashboard:view", "grades:view", "grades:edit", "attendance:view", "attendance:edit"],
    mfaEnabled: false,
    accessLevel: 7,
    preferences: {
      theme: "light",
      language: "en",
      notifications: { email: true, push: true, sms: false },
      accessibility: { fontSize: 16, highContrast: false, reducedMotion: false },
    },
    metadata: {},
  },
  "accountant@school.edu": {
    id: "accountant-123",
    name: "Jane Smith",
    email: "accountant@school.edu",
    password: "accountant123",
    role: "accountant",
    department: "Finance",
    permissions: ["dashboard:view", "finance:view", "finance:create", "finance:edit", "finance:approve"],
    mfaEnabled: false,
    accessLevel: 7,
    preferences: {
      theme: "light",
      language: "en",
      notifications: { email: true, push: false, sms: false },
      accessibility: { fontSize: 16, highContrast: false, reducedMotion: false },
    },
    metadata: {},
  },
  "board@school.edu": {
    id: "board-123",
    name: "Dr. Michael Owusu",
    email: "board@school.edu",
    password: "board123",
    role: "academic_board",
    department: "Science",
    permissions: ["dashboard:view", "curriculum:view", "curriculum:approve", "reports:view"],
    mfaEnabled: false,
    accessLevel: 8,
    preferences: {
      theme: "dark",
      language: "en",
      notifications: { email: true, push: true, sms: true },
      accessibility: { fontSize: 16, highContrast: false, reducedMotion: false },
    },
    metadata: {},
  },
  "student@school.edu": {
    id: "student-123",
    name: "Student User",
    email: "student@school.edu",
    password: "student123",
    role: "student",
    permissions: ["dashboard:view"],
    mfaEnabled: false,
    accessLevel: 3,
    preferences: {
      theme: "system",
      language: "en",
      notifications: { email: true, push: true, sms: false },
      accessibility: { fontSize: 16, highContrast: false, reducedMotion: false },
    },
    metadata: {},
  },
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Session timeout in milliseconds (30 minutes)
const SESSION_TIMEOUT = 30 * 60 * 1000

// Maximum login attempts before locking
const MAX_LOGIN_ATTEMPTS = 5

// Lock duration in milliseconds (15 minutes)
const LOCK_DURATION = 15 * 60 * 1000

export function AdvancedAuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    authError: null,
    isMfaRequired: false,
    sessionExpiry: null,
    attemptCount: 0,
    lastAttempt: null,
    isLocked: false,
  })

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    const storedExpiry = localStorage.getItem("sessionExpiry")

    if (storedUser && storedExpiry) {
      const user = JSON.parse(storedUser)
      const expiry = new Date(storedExpiry)

      if (expiry > new Date()) {
        setAuthState((prev) => ({
          ...prev,
          user,
          isAuthenticated: true,
          sessionExpiry: expiry,
          isLoading: false,
        }))

        // Set up session refresh
        const timeUntilRefresh = expiry.getTime() - new Date().getTime() - 5 * 60 * 1000 // Refresh 5 minutes before expiry
        if (timeUntilRefresh > 0) {
          const refreshTimer = setTimeout(() => refreshSession(), timeUntilRefresh)
          return () => clearTimeout(refreshTimer)
        }
      } else {
        // Session expired
        localStorage.removeItem("user")
        localStorage.removeItem("sessionExpiry")
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
        }))
      }
    } else {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
      }))
    }
  }, [])

  // Session activity tracking
  useEffect(() => {
    if (!authState.isAuthenticated) return

    const resetTimer = () => {
      const newExpiry = new Date(Date.now() + SESSION_TIMEOUT)
      localStorage.setItem("sessionExpiry", newExpiry.toISOString())
      setAuthState((prev) => ({
        ...prev,
        sessionExpiry: newExpiry,
      }))
    }

    // Events that reset the session timer
    const events = ["mousedown", "keydown", "scroll", "touchstart"]
    events.forEach((event) => window.addEventListener(event, resetTimer))

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer))
    }
  }, [authState.isAuthenticated])

  // Redirect based on authentication status
  useEffect(() => {
    if (authState.isLoading) return

    const publicPaths = ["/", "/about", "/academics", "/admissions", "/contact", "/news-events", "/student-life"]
    const isPublicPath = publicPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))

    if (!authState.isAuthenticated && pathname.includes("/portal") && !pathname.includes("/login")) {
      router.push("/login")
    } else if (authState.isAuthenticated && pathname === "/login") {
      // Redirect based on role
      switch (authState.user?.role) {
        case "admin":
          router.push("/admin-portal")
          break
        case "teacher":
          router.push("/teacher-portal")
          break
        case "accountant":
          router.push("/accountant-portal")
          break
        case "academic_board":
          router.push("/academic-board")
          break
        case "student":
          router.push("/student-portal")
          break
        default:
          router.push("/account")
      }
    }
  }, [authState.isAuthenticated, authState.isLoading, pathname, router])

  // Refresh session
  const refreshSession = async (): Promise<void> => {
    if (!authState.user) return

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    try {
      const sessionExpiry = new Date(Date.now() + SESSION_TIMEOUT)
      localStorage.setItem("sessionExpiry", sessionExpiry.toISOString())

      setAuthState((prev) => ({
        ...prev,
        sessionExpiry,
      }))
    } catch (error) {
      console.error("Session refresh error:", error)
      // Force logout on refresh failure
      logout()
    }
  }

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setAuthState((prev) => ({
      ...prev,
      isLoading: true,
      authError: null,
    }))

    // Check if account is locked
    if (authState.isLocked) {
      const lockTime = authState.lastAttempt?.getTime() || 0
      const currentTime = Date.now()

      if (currentTime - lockTime < LOCK_DURATION) {
        const remainingMinutes = Math.ceil((LOCK_DURATION - (currentTime - lockTime)) / 60000)
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          authError: `Account is locked. Try again in ${remainingMinutes} minutes.`,
        }))
        return false
      } else {
        // Reset lock if duration has passed
        setAuthState((prev) => ({
          ...prev,
          isLocked: false,
          attemptCount: 0,
        }))
      }
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      // Find user in mock data
      const user = MOCK_USERS[email]

      if (!user || user.password !== password) {
        // Increment attempt count
        const newAttemptCount = authState.attemptCount + 1
        const isLocked = newAttemptCount >= MAX_LOGIN_ATTEMPTS

        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          authError: isLocked
            ? `Account locked due to too many failed attempts. Try again in 15 minutes.`
            : `Invalid email or password. ${MAX_LOGIN_ATTEMPTS - newAttemptCount} attempts remaining.`,
          attemptCount: newAttemptCount,
          lastAttempt: new Date(),
          isLocked,
        }))
        return false
      }

      // Check if MFA is required
      if (user.mfaEnabled) {
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          isMfaRequired: true,
          // Store partial user data for MFA verification
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            permissions: [],
            mfaEnabled: true,
            accessLevel: 0,
            preferences: user.preferences,
            metadata: {},
          },
        }))
        return true
      }

      // Login successful
      const { password: _, ...userWithoutPassword } = user
      const sessionExpiry = new Date(Date.now() + SESSION_TIMEOUT)

      localStorage.setItem("user", JSON.stringify(userWithoutPassword))
      localStorage.setItem("sessionExpiry", sessionExpiry.toISOString())

      setAuthState((prev) => ({
        ...prev,
        user: userWithoutPassword,
        isAuthenticated: true,
        isLoading: false,
        sessionExpiry,
        attemptCount: 0,
        isMfaRequired: false,
      }))

      toast({
        title: "Login Successful",
        description: `Welcome back, ${userWithoutPassword.name}!`,
      })

      return true
    } catch (error) {
      console.error("Login error:", error)
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        authError: "An unexpected error occurred. Please try again.",
      }))
      return false
    }
  }

  // Verify MFA code
  const verifyMfa = async (code: string): Promise<boolean> => {
    setAuthState((prev) => ({
      ...prev,
      isLoading: true,
      authError: null,
    }))

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      // For demo purposes, any 6-digit code is valid
      if (code.length === 6 && /^\d+$/.test(code)) {
        const email = authState.user?.email || ""
        const user = MOCK_USERS[email]

        if (!user) {
          setAuthState((prev) => ({
            ...prev,
            isLoading: false,
            authError: "User not found. Please login again.",
          }))
          return false
        }

        const { password: _, ...userWithoutPassword } = user
        const sessionExpiry = new Date(Date.now() + SESSION_TIMEOUT)

        localStorage.setItem("user", JSON.stringify(userWithoutPassword))
        localStorage.setItem("sessionExpiry", sessionExpiry.toISOString())

        setAuthState((prev) => ({
          ...prev,
          user: userWithoutPassword,
          isAuthenticated: true,
          isLoading: false,
          isMfaRequired: false,
          sessionExpiry,
        }))

        toast({
          title: "Two-Factor Authentication Successful",
          description: `Welcome back, ${userWithoutPassword.name}!`,
        })

        return true
      } else {
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          authError: "Invalid verification code. Please try again.",
        }))
        return false
      }
    } catch (error) {
      console.error("MFA verification error:", error)
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        authError: "An unexpected error occurred. Please try again.",
      }))
      return false
    }
  }

  // Logout function
  const logout = async (): Promise<void> => {
    setAuthState((prev) => ({
      ...prev,
      isLoading: true,
    }))

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    localStorage.removeItem("user")
    localStorage.removeItem("sessionExpiry")

    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
      authError: null,
      isMfaRequired: false,
      sessionExpiry: null,
      attemptCount: 0,
      lastAttempt: null,
      isLocked: false,
    })

    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })

    router.push("/login")
  }

  // Register function
  const register = async (userData: Partial<UserSession> & { password: string }): Promise<boolean> => {
    setAuthState((prev) => ({
      ...prev,
      isLoading: true,
      authError: null,
    }))

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    try {
      // Check if email already exists
      if (userData.email && MOCK_USERS[userData.email]) {
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          authError: "Email already exists. Please use a different email.",
        }))
        return false
      }

      // In a real app, you would send this to your API
      console.log("Register user:", userData)

      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
      }))

      toast({
        title: "Registration Successful",
        description: "Your account has been created. You can now log in.",
      })

      return true
    } catch (error) {
      console.error("Registration error:", error)
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        authError: "An unexpected error occurred. Please try again.",
      }))
      return false
    }
  }

  // Reset password function
  const resetPassword = async (email: string): Promise<boolean> => {
    setAuthState((prev) => ({
      ...prev,
      isLoading: true,
      authError: null,
    }))

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      // Check if email exists
      if (!MOCK_USERS[email]) {
        // For security reasons, don't reveal if email exists or not
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
        }))

        toast({
          title: "Password Reset Email Sent",
          description: "If an account with this email exists, you will receive instructions to reset your password.",
        })

        return true
      }

      // In a real app, you would send a reset email
      console.log("Reset password for:", email)

      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
      }))

      toast({
        title: "Password Reset Email Sent",
        description: "If an account with this email exists, you will receive instructions to reset your password.",
      })

      return true
    } catch (error) {
      console.error("Password reset error:", error)
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        authError: "An unexpected error occurred. Please try again.",
      }))
      return false
    }
  }

  // Update profile function
  const updateProfile = async (data: Partial<UserSession>): Promise<boolean> => {
    if (!authState.user) return false

    setAuthState((prev) => ({
      ...prev,
      isLoading: true,
    }))

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      const updatedUser = {
        ...authState.user,
        ...data,
      }

      localStorage.setItem("user", JSON.stringify(updatedUser))

      setAuthState((prev) => ({
        ...prev,
        user: updatedUser,
        isLoading: false,
      }))

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      })

      return true
    } catch (error) {
      console.error("Profile update error:", error)
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        authError: "An unexpected error occurred. Please try again.",
      }))
      return false
    }
  }

  // Change password function
  const changePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    if (!authState.user) return false

    setAuthState((prev) => ({
      ...prev,
      isLoading: true,
      authError: null,
    }))

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      const user = MOCK_USERS[authState.user.email]

      if (!user || user.password !== oldPassword) {
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          authError: "Current password is incorrect.",
        }))
        return false
      }

      // In a real app, you would update the password in your database
      console.log("Change password for:", authState.user.email)

      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
      }))

      toast({
        title: "Password Changed",
        description: "Your password has been successfully updated.",
      })

      return true
    } catch (error) {
      console.error("Password change error:", error)
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        authError: "An unexpected error occurred. Please try again.",
      }))
      return false
    }
  }

  // Check if user has a specific permission
  const hasPermission = useCallback(
    (permission: Permission): boolean => {
      if (!authState.user) return false
      return authState.user.permissions.includes(permission)
    },
    [authState.user],
  )

  // Enable MFA
  const enableMfa = async (): Promise<{ qrCode: string; backupCodes: string[] }> => {
    if (!authState.user) throw new Error("User not authenticated")

    setAuthState((prev) => ({
      ...prev,
      isLoading: true,
    }))

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    try {
      // Generate QR code and backup codes
      const qrCode =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAABlBMVEX///8AAABVwtN+AAAB30lEQVR42uyYwY3DMAxEqYJLUCmqxJSiElJCSkgJKkWlqBRfwsuCm8S3XA4GGMB/cbAiHj8pkZIJbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxs/4VNAAn4AfyAyWP9ugsYPQY/UOHlYwIY/R0TwIJ/xASw4t8wAaz4F0wAK/4BE8CKf8MEsOLfMAGs+BdMACv+DRPAin/BBLDi3zABrPgXTAAr/g0TwIp/wQSw4t8wAaz4F0wAK/4NE8CKf8EEsOLfMAGs+BdMACv+DRPAin/BBLDi3zABrPgXTAAr/g0TwIp/wQSw4t8wAaz4F0wAK/4NE8CKf8EEsOLfMAGs+BdMACv+DRPAin/BBLDi3zABrPgXTAAr/g0TwIp/wQSw4t8wAaz4F0wAK/4NE8CKf8EEsOLfMAGs+BdMACv+DRPAin/BBLDi3zABrPgXTAAr/g0TwIp/wQSw4t8wAaz4F0wAK/4NE8CKf8EEsOLfMAGs+BdMACv+DRPAin/BBLDi3zABrPgXTAAr/g0TwIp/wQSw4t8wAaz4F0wAK/4NE8CKf8EEsOLfMAGs+BdMACv+DRPAin/BBLDi3zABrPgXTAAr/g0TwIp/wQTwB/gFNHa1Ezi1t/0AAAAASUVORK5CYII="
      const backupCodes = ["12345678", "23456789", "34567890", "45678901", "56789012"]

      // Update user
      const updatedUser = {
        ...authState.user,
        mfaEnabled: true,
      }

      localStorage.setItem("user", JSON.stringify(updatedUser))

      setAuthState((prev) => ({
        ...prev,
        user: updatedUser,
        isLoading: false,
      }))

      toast({
        title: "Two-Factor Authentication Enabled",
        description: "Your account is now more secure.",
      })

      return { qrCode, backupCodes }
    } catch (error) {
      console.error("Enable MFA error:", error)
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        authError: "An unexpected error occurred. Please try again.",
      }))
      throw error
    }
  }

  // Disable MFA
  const disableMfa = async (): Promise<boolean> => {
    if (!authState.user) return false

    setAuthState((prev) => ({
      ...prev,
      isLoading: true,
    }))

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      // Update user
      const updatedUser = {
        ...authState.user,
        mfaEnabled: false,
      }

      localStorage.setItem("user", JSON.stringify(updatedUser))

      setAuthState((prev) => ({
        ...prev,
        user: updatedUser,
        isLoading: false,
      }))

      toast({
        title: "Two-Factor Authentication Disabled",
        description: "Two-factor authentication has been turned off.",
      })

      return true
    } catch (error) {
      console.error("Disable MFA error:", error)
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        authError: "An unexpected error occurred. Please try again.",
      }))
      return false
    }
  }

  // Update user preferences
  const updatePreferences = async (preferences: Partial<UserSession["preferences"]>): Promise<boolean> => {
    if (!authState.user) return false

    setAuthState((prev) => ({
      ...prev,
      isLoading: true,
    }))

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    try {
      const updatedUser = {
        ...authState.user,
        preferences: {
          ...authState.user.preferences,
          ...preferences,
        },
      }

      localStorage.setItem("user", JSON.stringify(updatedUser))

      setAuthState((prev) => ({
        ...prev,
        user: updatedUser,
        isLoading: false,
      }))

      toast({
        title: "Preferences Updated",
        description: "Your preferences have been saved.",
      })

      return true
    } catch (error) {
      console.error("Update preferences error:", error)
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        authError: "An unexpected error occurred. Please try again.",
      }))
      return false
    }
  }

  // Admin-only: Impersonate user
  const impersonateUser = async (userId: string): Promise<boolean> => {
    if (!authState.user || authState.user.role !== "admin") return false

    setAuthState((prev) => ({
      ...prev,
      isLoading: true,
    }))

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      // Find user to impersonate
      const userToImpersonate = Object.values(MOCK_USERS).find((u) => u.id === userId)

      if (!userToImpersonate) {
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          authError: "User not found.",
        }))
        return false
      }

      // Store original user for returning later
      localStorage.setItem("originalUser", JSON.stringify(authState.user))

      const { password: _, ...userWithoutPassword } = userToImpersonate

      localStorage.setItem("user", JSON.stringify(userWithoutPassword))

      setAuthState((prev) => ({
        ...prev,
        user: userWithoutPassword,
        isLoading: false,
        isImpersonating: true,
      }))

      toast({
        title: "Impersonating User",
        description: `You are now viewing as ${userWithoutPassword.name}.`,
      })

      return true
    } catch (error) {
      console.error("Impersonate user error:", error)
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        authError: "An unexpected error occurred. Please try again.",
      }))
      return false
    }
  }

  // Admin-only: End impersonation
  const endImpersonation = async (): Promise<void> => {
    setAuthState((prev) => ({
      ...prev,
      isLoading: true,
    }))

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    try {
      const originalUser = localStorage.getItem("originalUser")

      if (!originalUser) {
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          authError: "Original user not found.",
        }))
        return
      }

      const user = JSON.parse(originalUser)

      localStorage.removeItem("originalUser")
      localStorage.setItem("user", originalUser)

      setAuthState((prev) => ({
        ...prev,
        user,
        isLoading: false,
        isImpersonating: false,
      }))

      toast({
        title: "Impersonation Ended",
        description: "You have returned to your account.",
      })
    } catch (error) {
      console.error("End impersonation error:", error)
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        authError: "An unexpected error occurred. Please try again.",
      }))
    }
  }

  const value = {
    ...authState,
    login,
    logout,
    register,
    verifyMfa,
    resetPassword,
    updateProfile,
    changePassword,
    hasPermission,
    refreshSession,
    enableMfa,
    disableMfa,
    updatePreferences,
    ...(authState.user?.role === "admin" ? { impersonateUser, endImpersonation } : {}),
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAdvancedAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAdvancedAuth must be used within an AdvancedAuthProvider")
  }
  return context
}

