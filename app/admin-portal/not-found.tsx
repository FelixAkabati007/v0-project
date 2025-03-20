import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileQuestion } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <FileQuestion className="h-16 w-16 text-gray-400 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
      <p className="text-gray-500 mb-6 max-w-md">The page you are looking for doesn't exist or has been moved.</p>
      <Button asChild>
        <Link href="/admin-portal/dashboard">Return to Dashboard</Link>
      </Button>
    </div>
  )
}

