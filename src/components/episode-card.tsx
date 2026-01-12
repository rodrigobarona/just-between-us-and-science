"use client";

import { Play, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import type { Episode } from "@/lib/rss";

interface EpisodeCardProps {
  episode: Episode;
  onPlay: () => void;
}

export function EpisodeCard({ episode, onPlay }: EpisodeCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, "");
  };

  const formatDuration = (duration?: string) => {
    if (!duration) return null;

    const parts = duration.split(":").map(Number);

    if (parts.length === 3) {
      const [hours, minutes] = parts;
      if (hours > 0) {
        return `${hours}h ${minutes}m`;
      }
      return `${minutes} min`;
    } else if (parts.length === 2) {
      const [minutes] = parts;
      return `${minutes} min`;
    }

    return duration;
  };

  return (
    <article id={episode.id} aria-labelledby={`episode-title-${episode.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow scroll-mt-8">
        <CardContent className="px-6">
          <div className="flex gap-4">
            {episode.imageUrl && (
              <Link href={`/episode/${episode.id}`} className="shrink-0" tabIndex={-1} aria-hidden="true">
                <Image
                  src={episode.imageUrl}
                  alt=""
                  width={96}
                  height={96}
                  sizes="96px"
                  className="w-24 h-24 rounded object-cover shrink-0 hover:opacity-80 transition-opacity cursor-pointer"
                  loading="lazy"
                />
              </Link>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <p className="text-sm text-muted-foreground">
                  <time dateTime={episode.pubDate}>{formatDate(episode.pubDate)}</time>
                  {formatDuration(episode.duration) && (
                    <>
                      <span aria-hidden="true"> • </span>
                      <span>{formatDuration(episode.duration)}</span>
                    </>
                  )}
                </p>
                {episode.season && episode.episode && (
                  <Badge
                    variant="outline"
                    className="text-xs bg-primary/10 border-primary/20 text-primary"
                  >
                    <span className="sr-only">Season {episode.season}, Episode {episode.episode}</span>
                    <span aria-hidden="true">S{episode.season} E{episode.episode}</span>
                  </Badge>
                )}
              </div>
              <Link href={`/episode/${episode.id}`}>
                <h3 id={`episode-title-${episode.id}`} className="text-xl font-bold text-card-foreground mb-3 line-clamp-2 hover:text-accent transition-colors cursor-pointer">
                  {episode.title}
                </h3>
              </Link>
              {episode.guest && (
                <p className="text-sm text-muted-foreground mb-2">
                  <span className="font-medium">Guest:</span> {episode.guest.name}
                </p>
              )}
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {stripHtml(episode.description)}
              </p>
              <div className="flex gap-2" role="group" aria-label={`Actions for ${episode.title}`}>
                <Button
                  onClick={onPlay}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2"
                  aria-label={`Listen to ${episode.title}`}
                >
                  <Play className="w-4 h-4" aria-hidden="true" />
                  <span>Listen</span>
                </Button>
                <Link
                  href={`/episode/${episode.id}`}
                  className="inline-flex items-center justify-center gap-2 h-9 px-3 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground text-sm font-medium"
                  aria-label={`View details for ${episode.title}`}
                >
                  <BookOpen className="w-4 h-4" aria-hidden="true" />
                  <span>Details</span>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </article>
  );
}
