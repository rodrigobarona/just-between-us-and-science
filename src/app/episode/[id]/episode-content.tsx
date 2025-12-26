"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Play, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AudioPlayer } from "@/components/audio-player";
import { Footer } from "@/components/footer";
import { ShareDialog } from "@/components/share-dialog";
import { PodcastHeader } from "@/components/podcast-header";
import { PlatformLinks } from "@/components/platform-links";
import { ChapterList } from "@/components/chapter-list";
import type { Episode } from "@/lib/rss";
import { BASE_URL } from "@/lib/schema";

interface EpisodePageContentProps {
  episode: Episode;
  relatedEpisodes: Episode[];
}

export function EpisodePageContent({
  episode,
  relatedEpisodes,
}: EpisodePageContentProps) {
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [seekTo, setSeekTo] = useState<number | null>(null);

  // Remove chapter list from description if present
  const cleanDescription = episode.description.replace(
    /<p><strong>In this episode, we cover:<\/strong><\/p>\s*<ul>[\s\S]*?<\/ul>/i,
    ""
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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

  const handleChapterSeek = useCallback(
    (seconds: number) => {
      // Start playing if not already
      if (!currentEpisode) {
        setCurrentEpisode(episode);
      }
      setSeekTo(seconds);
      // Reset seekTo after a brief delay so we can seek to the same chapter again
      setTimeout(() => setSeekTo(null), 100);
    },
    [currentEpisode, episode]
  );

  const handleTimeUpdate = useCallback((time: number) => {
    setCurrentTime(time);
  }, []);

  const pageUrl = `${BASE_URL}/episode/${episode.id}`;

  return (
    <div className="min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Sticky on desktop */}
          <aside className="w-full lg:w-[400px] lg:flex-shrink-0 space-y-8 lg:sticky lg:top-8 lg:self-start lg:max-h-[calc(100vh-4rem)]">
            <PodcastHeader />
            <PlatformLinks />

            {/* Quick Actions */}
            <div className="space-y-3">
              <Button
                onClick={() => setCurrentEpisode(episode)}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground gap-2"
                size="lg"
              >
                <Play className="w-5 h-5" />
                <span>Listen Now</span>
              </Button>

              <Button
                onClick={() => setShareDialogOpen(true)}
                variant="outline"
                className="w-full gap-2 border-input bg-background hover:bg-accent hover:text-accent-foreground"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Episode</span>
              </Button>
            </div>
          </aside>

          {/* Episode Content */}
          <article className="flex-1 min-w-0 space-y-6">
            {/* Back to Episodes Button */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 hover:bg-accent/10 rounded-md px-2.5 h-9 text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Episodes</span>
            </Link>

            {/* Episode Image */}
            {episode.imageUrl && (
              <div className="rounded-lg overflow-hidden shadow-lg aspect-square bg-muted relative">
                <Image
                  src={episode.imageUrl}
                  alt={episode.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 800px, 800px"
                />
              </div>
            )}

            {/* Episode Details Card */}
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 md:p-8">
              {/* Episode Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                  <time dateTime={episode.pubDate}>
                    {formatDate(episode.pubDate)}
                  </time>
                  {formatDuration(episode.duration) && (
                    <>
                      <span>•</span>
                      <span>{formatDuration(episode.duration)}</span>
                    </>
                  )}
                  {episode.season && episode.episode && (
                    <Badge
                      variant="outline"
                      className="text-xs bg-primary/10 border-primary/20 text-primary"
                    >
                      S{episode.season} E{episode.episode}
                    </Badge>
                  )}
                </div>

                <h1 className="text-4xl font-bold text-card-foreground mb-4 leading-tight">
                  {episode.title}
                </h1>

                {/* Guest Info */}
                {episode.guest && (
                  <div className="flex items-center gap-3 mt-4 p-3 bg-accent/10 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                      {episode.guest.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-card-foreground">
                        Featured Guest
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {episode.guest.name}
                      </p>
                    </div>
                    {episode.guest.links && episode.guest.links.length > 0 && (
                      <div className="ml-auto flex gap-2">
                        {episode.guest.links.map((link) => (
                          <a
                            key={link.platform}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-accent hover:underline"
                          >
                            {link.platform}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Show Notes */}
              <div
                className="prose prose-lg max-w-none prose-headings:text-card-foreground prose-p:text-card-foreground/90 prose-strong:text-card-foreground prose-ul:text-card-foreground/90 prose-li:text-card-foreground/90"
                dangerouslySetInnerHTML={{ __html: cleanDescription }}
              />
            </div>

            {/* Chapters */}
            {episode.chapters && episode.chapters.length > 0 && (
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 md:p-8">
                <h2 className="text-2xl font-bold text-card-foreground mb-4">
                  Chapters
                </h2>
                <ChapterList
                  chapters={episode.chapters}
                  onSeek={handleChapterSeek}
                  currentTime={currentTime}
                />
              </div>
            )}

            {/* Related Episodes */}
            {relatedEpisodes.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  More Episodes
                </h2>
                <div className="space-y-4">
                  {relatedEpisodes.map((ep) => (
                    <Link
                      key={ep.id}
                      href={`/episode/${ep.id}`}
                      className="block p-4 rounded-lg border border-border hover:bg-accent/5 transition-colors"
                    >
                      <div className="flex gap-4">
                        {ep.imageUrl && (
                          <Image
                            src={ep.imageUrl}
                            alt={ep.title}
                            width={80}
                            height={80}
                            sizes="80px"
                            className="w-20 h-20 rounded object-cover flex-shrink-0"
                            loading="lazy"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-muted-foreground mb-1">
                            {formatDate(ep.pubDate)}
                          </p>
                          <h3 className="font-semibold text-foreground line-clamp-2">
                            {ep.title}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>
      </div>

      <Footer />
      <AudioPlayer
        episode={currentEpisode}
        onClose={() => setCurrentEpisode(null)}
        onTimeUpdate={handleTimeUpdate}
        seekTo={seekTo}
      />
      <ShareDialog
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        title={episode.title}
        url={pageUrl}
      />
    </div>
  );
}
