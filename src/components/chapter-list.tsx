"use client";

import { cn } from "@/lib/utils";
import type { Chapter } from "@/lib/rss";

interface ChapterListProps {
  chapters: Chapter[];
  onSeek: (seconds: number) => void;
  currentTime: number;
}

function formatTimeToMMSS(time: string): string {
  const parts = time.split(":");
  if (parts.length === 3) {
    // HH:MM:SS -> MM:SS
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const seconds = parts[2];
    const totalMinutes = hours * 60 + minutes;
    return `${totalMinutes.toString().padStart(2, "0")}:${seconds}`;
  }
  // Already MM:SS format
  return time;
}

export function ChapterList({
  chapters,
  onSeek,
  currentTime,
}: ChapterListProps) {
  return (
    <ol className="space-y-1" aria-label="Episode chapters">
      {chapters.map((chapter, i) => {
        const isActive =
          currentTime >= chapter.seconds &&
          (chapters[i + 1] ? currentTime < chapters[i + 1].seconds : true);

        return (
          <li key={i}>
            <button
              onClick={() => onSeek(chapter.seconds)}
              className={cn(
                "flex items-center gap-3 w-full text-left p-2 rounded hover:bg-accent/10 transition-colors",
                isActive && "bg-accent/20 border-l-2 border-accent"
              )}
              aria-label={`Jump to chapter: ${
                chapter.title
              } at ${formatTimeToMMSS(chapter.time)}`}
              aria-current={isActive ? "true" : undefined}
            >
              <span
                className="text-sm text-muted-foreground w-14 font-mono"
                aria-hidden="true"
              >
                {formatTimeToMMSS(chapter.time)}
              </span>
              {chapter.emoji && (
                <span className="text-lg" aria-hidden="true">
                  {chapter.emoji}
                </span>
              )}
              <span className="flex-1 line-clamp-1 text-card-foreground">
                {chapter.title}
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
