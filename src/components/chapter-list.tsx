"use client"

import { cn } from "@/lib/utils"
import type { Chapter } from "@/lib/rss"

interface ChapterListProps {
  chapters: Chapter[]
  onSeek: (seconds: number) => void
  currentTime: number
}

function formatTimeToMMSS(time: string): string {
  const parts = time.split(":")
  if (parts.length === 3) {
    // HH:MM:SS -> MM:SS
    const hours = parseInt(parts[0], 10)
    const minutes = parseInt(parts[1], 10)
    const seconds = parts[2]
    const totalMinutes = hours * 60 + minutes
    return `${totalMinutes.toString().padStart(2, "0")}:${seconds}`
  }
  // Already MM:SS format
  return time
}

export function ChapterList({ chapters, onSeek, currentTime }: ChapterListProps) {
  return (
    <div className="space-y-1">
        {chapters.map((chapter, i) => {
          const isActive = currentTime >= chapter.seconds && 
            (chapters[i + 1] ? currentTime < chapters[i + 1].seconds : true)
          
          return (
            <button
              key={i}
              onClick={() => onSeek(chapter.seconds)}
              className={cn(
                "flex items-center gap-3 w-full text-left p-2 rounded hover:bg-accent/10 transition-colors",
                isActive && "bg-accent/20 border-l-2 border-accent"
              )}
            >
              <span className="text-sm text-muted-foreground w-14 font-mono">{formatTimeToMMSS(chapter.time)}</span>
              {chapter.emoji && <span className="text-lg">{chapter.emoji}</span>}
              <span className="flex-1 line-clamp-1 text-card-foreground">{chapter.title}</span>
            </button>
          )
        })}
    </div>
  )
}

