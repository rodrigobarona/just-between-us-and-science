const RSS_FEED_URL = "https://anchor.fm/s/fb6b5228/podcast/rss";

// Cache configuration
const RSS_CACHE_SECONDS = 300; // 5 minutes

// Enhanced Episode interface with all RSS data
export interface Episode {
  id: string;
  guid: string;
  title: string;
  description: string;
  pubDate: string;
  audioUrl: string;
  audioSize?: number;
  imageUrl?: string;
  duration?: string;
  link?: string;

  // iTunes metadata
  season?: number;
  episode?: number;
  episodeType?: "full" | "trailer" | "bonus";
  explicit: boolean;

  // Parsed content
  chapters?: Chapter[];
  guest?: Guest;
  keywords?: string[];
}

export interface Chapter {
  time: string; // "03:23"
  seconds: number; // 203
  title: string;
  emoji?: string;
}

export interface Guest {
  name: string;
  title?: string;
  links?: { platform: string; url: string }[];
}

export interface PodcastMeta {
  title: string;
  description: string;
  author: string;
  email: string;
  copyright: string;
  language: string;
  category: string;
  subcategory: string;
  imageUrl: string;
  websiteUrl: string;
  feedUrl: string;
  explicit: boolean;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// Decode HTML entities in text
function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ");
}

// Parse chapter timestamps from description: "(03:23) Title"
function parseChapters(description: string): Chapter[] {
  const chapterRegex = /\((\d{1,2}:\d{2}(?::\d{2})?)\)\s*([^\n<]+)/g;
  const chapters: Chapter[] = [];
  let match;

  while ((match = chapterRegex.exec(description)) !== null) {
    const [, time, title] = match;
    const parts = time.split(":").map(Number);
    const seconds =
      parts.length === 3
        ? parts[0] * 3600 + parts[1] * 60 + parts[2]
        : parts[0] * 60 + parts[1];

    // Extract emoji if present
    const emojiMatch = title.match(/^(\p{Emoji})\s*/u);
    
    // Decode HTML entities in title
    const decodedTitle = decodeHtmlEntities(
      emojiMatch
        ? title.replace(emojiMatch[0], "").trim()
        : title.trim()
    );

    chapters.push({
      time,
      seconds,
      title: decodedTitle,
      emoji: emojiMatch?.[1],
    });
  }

  return chapters;
}

// Parse guest info from description
function parseGuest(description: string): Guest | undefined {
  // Match "Dr. Name" or "Name, Title" patterns
  const guestMatch = description.match(/sits down with\s+\*\*([^*]+)\*\*/i);
  if (!guestMatch) return undefined;

  const name = guestMatch[1];

  // Find guest links section
  const linksSection = description.match(
    /Where to find[^:]*:\*\*<\/p>([\s\S]*?)(?:<p><strong>|$)/i
  );
  const links: { platform: string; url: string }[] = [];

  if (linksSection) {
    const linkRegex =
      /(LinkedIn|Instagram|ResearchGate|Twitter|X):\s*<a[^>]*href="([^"]+)"/gi;
    let linkMatch;
    while ((linkMatch = linkRegex.exec(linksSection[1])) !== null) {
      links.push({ platform: linkMatch[1], url: linkMatch[2] });
    }
  }

  return { name, links: links.length ? links : undefined };
}

function parseEpisodes(xmlText: string): Episode[] {
  const episodes: Episode[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  const matches = xmlText.matchAll(itemRegex);

  for (const match of matches) {
    const itemContent = match[1];

    const title =
      itemContent.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] ||
      itemContent.match(/<title>(.*?)<\/title>/)?.[1] ||
      "Untitled Episode";

    const description =
      itemContent.match(
        /<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/
      )?.[1] ||
      itemContent.match(/<description>([\s\S]*?)<\/description>/)?.[1] ||
      "";

    const pubDate =
      itemContent.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] ||
      new Date().toISOString();

    // Enclosure with audio URL and file size
    const enclosureMatch = itemContent.match(
      /<enclosure[^>]*url="([^"]*)"[^>]*(?:length="(\d+)")?/i
    );
    const audioUrl = enclosureMatch?.[1] || "";
    const audioSize = enclosureMatch?.[2]
      ? parseInt(enclosureMatch[2], 10)
      : undefined;

    const duration = itemContent.match(
      /<itunes:duration>(.*?)<\/itunes:duration>/
    )?.[1];
    const imageUrl = itemContent.match(
      /<itunes:image[^>]*href="([^"]*)"/i
    )?.[1];
    const link = itemContent.match(/<link>(.*?)<\/link>/)?.[1];

    // GUID
    const guid = itemContent.match(/<guid[^>]*>(.*?)<\/guid>/)?.[1] || "";

    // iTunes metadata
    const season = itemContent.match(
      /<itunes:season>(\d+)<\/itunes:season>/
    )?.[1];
    const episodeNum = itemContent.match(
      /<itunes:episode>(\d+)<\/itunes:episode>/
    )?.[1];
    const episodeType = itemContent.match(
      /<itunes:episodeType>(full|trailer|bonus)<\/itunes:episodeType>/
    )?.[1] as Episode["episodeType"];
    const explicit =
      itemContent.includes("<itunes:explicit>true</itunes:explicit>") ||
      itemContent.includes("<itunes:explicit>yes</itunes:explicit>");

    // Keywords from itunes:keywords
    const keywordsMatch = itemContent.match(
      /<itunes:keywords>(.*?)<\/itunes:keywords>/
    );
    const keywords = keywordsMatch?.[1]
      ?.split(",")
      .map((k) => k.trim())
      .filter(Boolean);

    if (title && audioUrl) {
      const id = generateSlug(title);
      const chapters = parseChapters(description);
      const guest = parseGuest(description);

      episodes.push({
        id,
        guid,
        title,
        description,
        pubDate,
        duration,
        audioUrl,
        audioSize,
        imageUrl,
        link,
        season: season ? parseInt(season, 10) : undefined,
        episode: episodeNum ? parseInt(episodeNum, 10) : undefined,
        episodeType,
        explicit,
        chapters: chapters.length ? chapters : undefined,
        guest,
        keywords,
      });
    }
  }
  return episodes;
}

function parsePodcastMeta(xmlText: string): PodcastMeta {
  // Get channel-level data (before first <item>)
  const channelContent = xmlText.split("<item>")[0];

  const title =
    channelContent.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] ||
    channelContent.match(/<title>(.*?)<\/title>/)?.[1] ||
    "";

  const description =
    channelContent.match(
      /<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/
    )?.[1] ||
    channelContent.match(/<description>([\s\S]*?)<\/description>/)?.[1] ||
    "";

  const author =
    channelContent.match(/<itunes:author>(.*?)<\/itunes:author>/)?.[1] || "";
  const email =
    channelContent.match(/<itunes:email>(.*?)<\/itunes:email>/)?.[1] || "";
  const copyright =
    channelContent.match(/<copyright>(.*?)<\/copyright>/)?.[1] || "";
  const language =
    channelContent.match(/<language>(.*?)<\/language>/)?.[1] || "en";

  // Category
  const categoryMatch = channelContent.match(
    /<itunes:category[^>]*text="([^"]*)"/
  );
  const category = categoryMatch?.[1] || "";
  const subcategoryMatch = channelContent.match(
    /<itunes:category[^>]*text="[^"]*"[^>]*>\s*<itunes:category[^>]*text="([^"]*)"/
  );
  const subcategory = subcategoryMatch?.[1] || "";

  const imageUrl =
    channelContent.match(/<itunes:image[^>]*href="([^"]*)"/i)?.[1] || "";
  const websiteUrl = channelContent.match(/<link>(.*?)<\/link>/)?.[1] || "";
  const feedUrl =
    channelContent.match(
      /<atom:link[^>]*href="([^"]*)"[^>]*rel="self"/i
    )?.[1] || RSS_FEED_URL;
  const explicit =
    channelContent.includes("<itunes:explicit>true</itunes:explicit>") ||
    channelContent.includes("<itunes:explicit>yes</itunes:explicit>");

  return {
    title,
    description,
    author,
    email,
    copyright,
    language,
    category,
    subcategory,
    imageUrl,
    websiteUrl,
    feedUrl,
    explicit,
  };
}

/**
 * Fetch RSS feed with Next.js native caching
 * Uses the fetch API with next.revalidate for automatic cache management
 */
async function fetchRSS(): Promise<string> {
  const response = await fetch(RSS_FEED_URL, {
    next: {
      revalidate: RSS_CACHE_SECONDS,
      tags: ["episodes", "podcast-rss"],
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch RSS feed: ${response.statusText}`);
  }

  return response.text();
}

export async function getPodcastMeta(): Promise<PodcastMeta> {
  const xmlText = await fetchRSS();
  return parsePodcastMeta(xmlText);
}

/**
 * Get episodes with optional limit
 * @param limit - Maximum number of episodes to return (default: all)
 */
export async function getEpisodes(limit?: number): Promise<Episode[]> {
  const xmlText = await fetchRSS();
  const allEpisodes = parseEpisodes(xmlText);
  return limit ? allEpisodes.slice(0, limit) : allEpisodes;
}

export async function getEpisode(id: string): Promise<Episode | undefined> {
  const episodes = await getEpisodes();
  return episodes.find((ep) => ep.id === id);
}

// Convert "HH:MM:SS" or "MM:SS" to ISO 8601 duration
export function formatISO8601Duration(duration?: string): string | undefined {
  if (!duration) return undefined;
  const parts = duration.split(":").map(Number);

  if (parts.length === 3) {
    const [hours, minutes, seconds] = parts;
    return `PT${hours}H${minutes}M${seconds}S`;
  } else if (parts.length === 2) {
    const [minutes, seconds] = parts;
    return `PT${minutes}M${seconds}S`;
  }
  return undefined;
}
