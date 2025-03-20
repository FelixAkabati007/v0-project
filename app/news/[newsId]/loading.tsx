import { Skeleton } from "@/components/ui/skeleton"

export default function NewsDetailLoading() {
  return (
    <main className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center mb-6">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-4 mx-2 rounded-full" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-4 mx-2 rounded-full" />
        <Skeleton className="h-4 w-40" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Back button */}
          <Skeleton className="h-9 w-32" />

          {/* News Header */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-12 w-full" />

            <div className="flex flex-wrap items-center gap-4">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-32" />
            </div>
          </div>

          {/* Featured Image */}
          <Skeleton className="h-[300px] md:h-[400px] w-full rounded-lg" />

          {/* Author Info */}
          <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-2/3" />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Related News */}
          <div className="border rounded-lg p-6">
            <Skeleton className="h-7 w-40 mb-4" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="h-16 w-16 rounded-md" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="border rounded-lg p-6">
            <Skeleton className="h-7 w-40 mb-4" />
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-8 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

