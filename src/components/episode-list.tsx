"use client"

import { useState } from "react"
import type { Episode } from "@/lib/rss"
import { EpisodeCard } from "./episode-card"
import { AudioPlayer } from "./audio-player"

interface EpisodeListProps {
  initialEpisodes: Episode[]
}

export function EpisodeList({ initialEpisodes }: EpisodeListProps) {
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null)

  return (
    <>
      <div 
        className="space-y-6" 
        role="feed" 
        aria-label="Episode list"
        aria-busy="false"
      >
        {initialEpisodes.map((episode, index) => (
          <div
            key={episode.id}
            role="article"
            aria-posinset={index + 1}
            aria-setsize={initialEpisodes.length}
          >
            <EpisodeCard
              episode={episode}
              onPlay={() => setCurrentEpisode(episode)}
            />
          </div>
        ))}
      </div>

      <AudioPlayer
        episode={currentEpisode}
        onClose={() => setCurrentEpisode(null)}
      />
    </>
  )
}

