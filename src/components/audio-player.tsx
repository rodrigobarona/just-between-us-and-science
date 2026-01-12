"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import type { Episode } from "@/lib/rss";
import Image from "next/image";

interface AudioPlayerProps {
  episode: Episode | null;
  onClose: () => void;
  onTimeUpdate?: (currentTime: number) => void;
  seekTo?: number | null;
}

export function AudioPlayer({
  episode,
  onClose,
  onTimeUpdate,
  seekTo,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // Handle episode changes - use onPlay callback to set isPlaying
  useEffect(() => {
    if (episode && audioRef.current) {
      audioRef.current.src = episode.audioUrl;
      audioRef.current.play();
    }
  }, [episode]);

  // Handle seek from chapter clicks
  useEffect(() => {
    if (seekTo !== null && seekTo !== undefined && audioRef.current) {
      audioRef.current.currentTime = seekTo;
    }
  }, [seekTo]);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleSeeked = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      const time = audioRef.current.currentTime;
      setCurrentTime(time);
      onTimeUpdate?.(time);
    }
  }, [onTimeUpdate]);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }, []);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (!episode) return null;

  return (
    <section 
      className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50"
      role="region"
      aria-label={`Audio player: ${episode.title}`}
    >
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handlePause}
        onSeeked={handleSeeked}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Episode Info */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {episode.imageUrl && (
              <Image
                src={episode.imageUrl}
                alt=""
                width={48}
                height={48}
                sizes="48px"
                className="w-12 h-12 rounded object-cover shrink-0"
                loading="lazy"
                aria-hidden="true"
              />
            )}
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-sm text-card-foreground truncate" id="player-episode-title">
                {episode.title}
              </p>
              <p className="text-xs text-muted-foreground">
                {episode.duration}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center gap-2 flex-1 max-w-2xl" role="group" aria-label="Playback controls">
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-2 transition-colors"
                aria-label={isPlaying ? "Pause episode" : "Play episode"}
                aria-pressed={isPlaying}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Play className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center gap-2 w-full">
              <span className="text-xs text-muted-foreground min-w-[40px]" aria-hidden="true">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min={0}
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="flex-1 h-1 bg-muted rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                aria-label="Episode progress"
                aria-valuemin={0}
                aria-valuemax={duration || 0}
                aria-valuenow={currentTime}
                aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
              />
              <span className="text-xs text-muted-foreground min-w-[40px]" aria-hidden="true">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Volume & Close */}
          <div className="flex items-center gap-2" role="group" aria-label="Volume and close controls">
            <button
              onClick={toggleMute}
              className="text-card-foreground/70 hover:text-card-foreground transition-colors"
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              aria-pressed={isMuted}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Volume2 className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
            <button
              onClick={onClose}
              className="text-card-foreground/70 hover:text-card-foreground transition-colors text-2xl leading-none px-1"
              aria-label="Close audio player"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
