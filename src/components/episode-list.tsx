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
      <div className="space-y-6">
        {initialEpisodes.map((episode) => (
          <EpisodeCard
            key={episode.id}
            episode={episode}
            onPlay={() => setCurrentEpisode(episode)}
          />
        ))}
      </div>

      <AudioPlayer
        episode={currentEpisode}
        onClose={() => setCurrentEpisode(null)}
      />
    </>
  )
}

