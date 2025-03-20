import { Skeleton } from "@/components/ui/skeleton"

export default function EventsLoading() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="text-center mb-12">
        <Skeleton className="h-10 w-[300px] mx-auto mb-4" />
        <Skeleton className="h-6 w-[400px] mx-auto" />
      </div>

      {/* Featured Event Skeleton */}
      <div className="mb-16">
        <div className="border rounded-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6">
            <Skeleton className="h-64 md:h-[350px] w-full" />
            <div className="p-6 flex flex-col justify-between">
              <div>
                <Skeleton className="h-6 w-24 rounded-full mb-2" />
                <Skeleton className="h-10 w-full mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-6" />

                <div className="mt-6 space-y-3">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-5 w-36" />
                  <Skeleton className="h-5 w-48" />
                </div>
              </div>
              <div className="mt-6">
                <Skeleton className="h-10 w-40" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Events Grid Skeleton */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="border rounded-lg overflow-hidden">
              <div className="relative">
                <Skeleton className="h-48 w-full" />
              </div>
              <div className="p-6">
                <Skeleton className="h-6 w-full mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-6" />

                <div className="space-y-3 mb-6">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-5 w-36" />
                  <Skeleton className="h-5 w-48" />
                </div>

                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          ))}
      </div>

      {/* Calendar Link Skeleton */}
      <div className="text-center mt-12">
        <Skeleton className="h-5 w-64 mx-auto mb-4" />
        <Skeleton className="h-10 w-48 mx-auto" />
      </div>
    </div>
  )
}

