import Image from "next/image"

const platforms = [
  {
    name: "Spotify",
    url: "https://open.spotify.com/show/2PMAy4HFeiu8IAf8Ic8Fqo?go=1",
    badge: "/assets/spotify-badge.svg",
    label: "Listen on Spotify",
  },
  {
    name: "Apple Podcasts",
    url: "https://podcasts.apple.com/us/podcast/elevating-womens-health/id1770183816?uo=4",
    badge: "/assets/apple-badge.svg",
    label: "Listen on Apple Podcasts",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@patimota?sub_confirmation=1",
    badge: "/assets/youtube-badge.svg",
    label: "Watch on YouTube",
  },
]

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
              style={{ width: 'auto', height: '2.5rem' }}
            />
          </a>
        ))}
      </div>
    </div>
  )
}

