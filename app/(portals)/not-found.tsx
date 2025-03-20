import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileQuestion, Home } from "lucide-react"

export default function PortalNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <FileQuestion className="h-8 w-8 text-blue-600 dark:text-blue-300" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Page Not Found</CardTitle>
          <CardDescription className="text-center">
            The page you are looking for doesn't exist or has been moved.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              You might have followed a broken link, mistyped the address, or the page may have been relocated.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button variant="default" className="w-full" asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Return to homepage
            </Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/portals">Go to portal selection</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

