import Image from "next/image";
import { PLATFORM_LINKS } from "@/lib/schema";

// Platform links with optional tracking parameters for component use
const platforms = [
  {
    name: "Spotify",
    url: `${PLATFORM_LINKS.spotify}?go=1`, // Tracking parameter
    badge: "/assets/spotify-badge.svg",
    label: "Listen on Spotify",
  },
  {
    name: "Apple Podcasts",
    url: `${PLATFORM_LINKS.apple}?uo=4`, // UTM tracking parameter
    badge: "/assets/apple-badge.svg",
    label: "Listen on Apple Podcasts",
  },
  {
    name: "YouTube",
    url: `${PLATFORM_LINKS.youtube}?sub_confirmation=1`, // Subscription confirmation
    badge: "/assets/youtube-badge.svg",
    label: "Watch on YouTube",
  },
] as const;

export function PlatformLinks() {
  return (
    <div>
      <h3 className="text-lg font-bold text-foreground mb-4">Listen on</h3>
      <div className="flex gap-2">
        {platforms.map((platform) => (
          <a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
            aria-label={platform.label}
          >
            <Image
              src={platform.badge}
              alt={platform.label}
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </a>
        ))}
      </div>
    </div>
  )
}

