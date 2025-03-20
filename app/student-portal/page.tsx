"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, GraduationCap, Eye, EyeOff, Loader2, LockKeyhole, User, Info, Shield } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export default function StudentPortal() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [isLocked, setIsLocked] = useState(false)
  const [lockTime, setLockTime] = useState<Date | null>(null)
  const [timeRemaining, setTimeRemaining] = useState<number>(0)
  const router = useRouter()

  // Check if account is locked
  useEffect(() => {
    const storedLockTime = localStorage.getItem("portalLockTime")
    if (storedLockTime) {
      const lockTimeDate = new Date(storedLockTime)
      const now = new Date()
      const diffInMinutes = Math.floor((lockTimeDate.getTime() - now.getTime()) / (1000 * 60))

      if (diffInMinutes > 0) {
        setIsLocked(true)
        setLockTime(lockTimeDate)
        setTimeRemaining(diffInMinutes)
      } else {
        // Lock period expired
        localStorage.removeItem("portalLockTime")
        localStorage.removeItem("portalLoginAttempts")
        setIsLocked(false)
        setLoginAttempts(0)
      }
    }

    // Load login attempts from localStorage
    const storedAttempts = localStorage.getItem("portalLoginAttempts")
    if (storedAttempts) {
      setLoginAttempts(Number.parseInt(storedAttempts))
    }
  }, [])

  // Update countdown timer
  useEffect(() => {
    if (!isLocked || !lockTime) return

    const timer = setInterval(() => {
      const now = new Date()
      const diffInMinutes = Math.floor((lockTime.getTime() - now.getTime()) / (1000 * 60))

      if (diffInMinutes <= 0) {
        clearInterval(timer)
        setIsLocked(false)
        localStorage.removeItem("portalLockTime")
        localStorage.removeItem("portalLoginAttempts")
        setLoginAttempts(0)
      } else {
        setTimeRemaining(diffInMinutes)
      }
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [isLocked, lockTime])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validate inputs
    if (!username.trim()) {
      setError("Please enter your student ID")
      return
    }

    if (!password) {
      setError("Please enter your password")
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, accept any non-empty credentials
      // In a real app, this would validate against a backend
      if (username === "STD2023001" && password === "student123") {
        // Successful login
        setLoginAttempts(0)
        localStorage.removeItem("portalLoginAttempts")

        toast({
          title: "Login Successful",
          description: "Welcome to the Student Portal!",
        })

        router.push("/student-portal/dashboard")
      } else {
        // Failed login
        const newAttempts = loginAttempts + 1
        setLoginAttempts(newAttempts)
        localStorage.setItem("portalLoginAttempts", newAttempts.toString())

        // Lock account after 5 failed attempts
        if (newAttempts >= 5) {
          const lockTimeDate = new Date()
          lockTimeDate.setMinutes(lockTimeDate.getMinutes() + 15) // Lock for 15 minutes

          setIsLocked(true)
          setLockTime(lockTimeDate)
          setTimeRemaining(15)
          localStorage.setItem("portalLockTime", lockTimeDate.toString())

          setError("Too many failed attempts. Your account has been locked for 15 minutes.")
        } else {
          setError(`Invalid student ID or password. ${5 - newAttempts} attempts remaining.`)
        }
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Link href="/" className="absolute top-4 left-4 text-primary hover:text-primary/80 transition-colors">
        ← Back to Homepage
      </Link>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-md">
        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-1">
            <motion.div variants={itemVariants} className="flex flex-col items-center justify-center mb-4 space-y-2">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <GraduationCap className="h-10 w-10 text-primary" />
              </div>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ejisuman%20logo-fotor-bg-remover-2024111252452-PdjjFdQdmWdtGULMkf70SUH6pdiATB.png"
                alt="Ejisuman SHS Logo"
                width={60}
                height={60}
                className="mt-2"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <CardTitle className="text-2xl text-center">Student Portal</CardTitle>
              <CardDescription className="text-center">Access your academic information and resources</CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              {isLocked ? (
                <motion.div
                  key="locked"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center py-6"
                >
                  <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Account Temporarily Locked</h3>
                  <p className="mb-4">
                    Due to multiple failed login attempts, your account has been locked for security reasons.
                  </p>
                  <p className="font-medium">
                    Please try again in {timeRemaining} minute{timeRemaining !== 1 ? "s" : ""}.
                  </p>
                  <Button variant="outline" className="mt-6" onClick={() => (window.location.href = "/")}>
                    Return to Homepage
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="login-form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleLogin}
                >
                  <div className="grid w-full items-center gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Student ID</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="username"
                          placeholder="Enter your student ID"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          disabled={isLoading}
                          className="bg-background pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link
                          href="#"
                          className="text-xs text-primary hover:text-primary/80 transition-colors"
                          onClick={(e) => {
                            e.preventDefault()
                            toast({
                              title: "Password Reset",
                              description: "Please contact your school administrator for password reset assistance.",
                            })
                          }}
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <LockKeyhole className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          disabled={isLoading}
                          className="bg-background pl-10 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                          disabled={isLoading}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked === true)}
                        disabled={isLoading}
                      />
                      <Label htmlFor="remember" className="text-sm">
                        Remember me for 30 days
                      </Label>
                    </div>
                  </div>

                  {error && (
                    <Alert variant="destructive" className="mt-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className="w-full mt-6" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>

                  <div className="mt-6 flex items-center justify-center">
                    <Info className="h-4 w-4 text-muted-foreground mr-2" />
                    <p className="text-sm text-muted-foreground">
                      First time? Use the credentials provided by your school.
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>Demo credentials:</p>
              <p>Student ID: STD2023001</p>
              <p>Password: student123</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground">
              Having trouble logging in? Contact the IT support at{" "}
              <span className="text-primary">support@ejisumanshs.edu.gh</span>
            </div>
          </CardFooter>
        </Card>
      </motion.div>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Ejisuman Senior High School. All rights reserved.</p>
      </div>
    </div>
  )
}

