"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Home, RefreshCcw } from "lucide-react"

export default function PortalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-300" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Something went wrong</CardTitle>
          <CardDescription className="text-center">
            We apologize for the inconvenience. An error occurred while loading this page.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700">
            <p className="text-sm font-mono text-gray-700 dark:text-gray-300 break-all">
              {error.message || "An unexpected error occurred"}
            </p>
            {error.digest && <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Error ID: {error.digest}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button onClick={reset} className="w-full">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Try again
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Return to homepage
            </Link>
          </Button>
          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
            If this problem persists, please contact IT support at{" "}
            <a href="mailto:support@ejisumanshs.edu.gh" className="text-primary hover:underline">
              support@ejisumanshs.edu.gh
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

