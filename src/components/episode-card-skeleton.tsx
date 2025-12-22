import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function EpisodeCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex gap-4">
          {/* Thumbnail Skeleton */}
          <Skeleton className="w-24 h-24 rounded flex-shrink-0" />
          
          <div className="flex-1 min-w-0 space-y-3">
            {/* Date and Duration */}
            <Skeleton className="h-4 w-48" />
            
            {/* Title */}
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
            
            {/* Description */}
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            
            {/* Buttons */}
            <div className="flex gap-2 pt-2">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

