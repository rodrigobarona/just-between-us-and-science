import type { PodcastSeries, PodcastEpisode, WithContext } from "schema-dts";
import type { Episode } from "./rss";
import { formatISO8601Duration } from "./rss";

export const BASE_URL = "https://podcast.patriciamota.com";
export const SHARE_IMAGE = `${BASE_URL}/just-between-us-share-image.png`;
export const RSS_FEED_URL = "https://anchor.fm/s/fb6b5228/podcast/rss";

export const SITE_TITLE =
  "Just Between Us … and Science: The Women's Health Lab";
export const SITE_DESCRIPTION =
  "Join Dr. Patrícia Mota, PT, PhD, as she takes you behind the scenes of women's health — from the latest research to everyday experiences.";

// Platform links for sameAs schema field
export const PLATFORM_LINKS = {
  spotify: "https://open.spotify.com/show/2PMAy4HFeiu8IAf8Ic8Fqo",
  apple:
    "https://podcasts.apple.com/us/podcast/elevating-womens-health/id1770183816",
  youtube: "https://www.youtube.com/@patimota",
} as const;

export function buildPodcastSeriesSchema(): WithContext<PodcastSeries> {
  return {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    "@id": BASE_URL,
    name: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: BASE_URL,
    inLanguage: "en-US",
    image: {
      "@type": "ImageObject",
      url: SHARE_IMAGE,
      width: "1200",
      height: "630",
    },
    // Modern podcast schema fields
    isAccessibleForFree: true,
    accessMode: ["auditory", "textual"],
    // Cross-platform discovery
    sameAs: [
      PLATFORM_LINKS.spotify,
      PLATFORM_LINKS.apple,
      PLATFORM_LINKS.youtube,
      BASE_URL,
    ],
    author: {
      "@type": "Person",
      name: "Dr. Patrícia Mota",
      jobTitle: "PT, PhD",
      description:
        "Physical Therapist and PhD specializing in women's health research",
      sameAs: [PLATFORM_LINKS.youtube, "https://twitter.com/patimota"],
    },
    genre: ["Health", "Science", "Education", "Women's Health"],
    keywords:
      "women's health, pregnancy, postpartum, pelvic health, hormones, evidence-based medicine, physical therapy",
    publisher: {
      "@type": "Organization",
      name: "Eleva Care",
      url: "https://eleva.care",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/assets/eleva-care-logo-white.png`,
      },
    },
    webFeed: RSS_FEED_URL,
    // Potential action for podcast apps
    potentialAction: {
      "@type": "ListenAction",
      target: [
        {
          "@type": "EntryPoint",
          urlTemplate: PLATFORM_LINKS.spotify,
          actionPlatform: [
            "https://schema.org/DesktopWebPlatform",
            "https://schema.org/IOSPlatform",
            "https://schema.org/AndroidPlatform",
          ],
        },
        {
          "@type": "EntryPoint",
          urlTemplate: PLATFORM_LINKS.apple,
          actionPlatform: [
            "https://schema.org/IOSPlatform",
            "https://schema.org/DesktopWebPlatform",
          ],
        },
      ],
    },
  };
}

export function buildPodcastEpisodeSchema(
  episode: Episode
): WithContext<PodcastEpisode> {
  const episodeUrl = `${BASE_URL}/episode/${episode.id}`;
  const episodeMdUrl = `${BASE_URL}/episode/${episode.id}.md`;
  const cleanDescription = episode.description
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 300);

  const isoDuration = formatISO8601Duration(episode.duration);

  return {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    "@id": episodeUrl,
    name: episode.title,
    description: cleanDescription,
    datePublished: episode.pubDate,
    dateModified: episode.pubDate,
    duration: isoDuration,
    timeRequired: isoDuration,
    url: episodeUrl,
    inLanguage: "en-US",
    isAccessibleForFree: true,
    accessMode: ["auditory", "textual"],
    image: {
      "@type": "ImageObject",
      url: episode.imageUrl || SHARE_IMAGE,
      width: "1200",
      height: "630",
    },
    episodeNumber: episode.episode,
    // Season info if available
    ...(episode.season && {
      partOfSeason: {
        "@type": "PodcastSeason",
        seasonNumber: episode.season,
      },
    }),
    partOfSeries: {
      "@type": "PodcastSeries",
      "@id": BASE_URL,
      name: SITE_TITLE,
      url: BASE_URL,
    },
    associatedMedia: {
      "@type": "AudioObject",
      contentUrl: episode.audioUrl,
      encodingFormat: "audio/mpeg",
      duration: isoDuration,
      ...(episode.audioSize && {
        contentSize: `${Math.round(episode.audioSize / 1024 / 1024)}MB`,
      }),
    },
    // Link to markdown/transcript endpoint for LLMs and accessibility
    subjectOf: {
      "@type": "WebPage",
      url: episodeMdUrl,
      name: `${episode.title} - Show Notes & Transcript`,
      description: "Detailed show notes and episode content in markdown format",
    },
    publisher: {
      "@type": "Organization",
      name: "Eleva Care",
      url: "https://eleva.care",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/assets/eleva-care-logo-white.png`,
      },
    },
    creator: {
      "@type": "Person",
      name: "Dr. Patrícia Mota",
      jobTitle: "PT, PhD",
      sameAs: ["https://twitter.com/patimota", PLATFORM_LINKS.youtube],
    },
    // Keywords/topics from episode metadata
    ...(episode.keywords?.length && {
      about: episode.keywords.map((keyword) => ({
        "@type": "Thing",
        name: keyword,
      })),
      keywords: episode.keywords.join(", "),
    }),
    // Add guest as contributor if present
    ...(episode.guest && {
      contributor: {
        "@type": "Person",
        name: episode.guest.name,
        ...(episode.guest.links?.length && {
          sameAs: episode.guest.links.map((l) => l.url),
        }),
      },
    }),
    // Add chapter markers as hasPart with enhanced Clip schema
    ...(episode.chapters?.length && {
      hasPart: episode.chapters.map((ch, i) => ({
        "@type": "Clip",
        name: ch.title,
        startOffset: ch.seconds,
        position: i + 1,
        url: `${episodeUrl}#chapter-${i + 1}`,
      })),
    }),
    // Potential action to listen
    potentialAction: {
      "@type": "ListenAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: episode.audioUrl,
        actionPlatform: [
          "https://schema.org/DesktopWebPlatform",
          "https://schema.org/IOSPlatform",
          "https://schema.org/AndroidPlatform",
        ],
      },
    },
  };
}
