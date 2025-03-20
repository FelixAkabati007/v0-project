import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileQuestion } from "lucide-react"

export default function NewsNotFound() {
  return (
    <main className="container mx-auto px-4 py-24 text-center">
      <FileQuestion className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
      <h1 className="text-4xl font-bold mb-4">News Article Not Found</h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
        The news article you're looking for doesn't exist or may have been removed.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild size="lg">
          <Link href="/news">Browse All News</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/">Return to Homepage</Link>
        </Button>
      </div>
    </main>
  )
}

