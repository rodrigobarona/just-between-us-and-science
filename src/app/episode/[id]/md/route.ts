import { getEpisode } from "@/lib/rss";
import {
  SITE_TITLE,
  SITE_DESCRIPTION,
  BASE_URL,
  PLATFORM_LINKS,
  HOST,
  PRODUCER,
} from "@/lib/schema";
import type { NextRequest } from "next/server";

// Use edge runtime for faster global response times
export const runtime = "edge";
export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour

export async function GET(
  _request: NextRequest,
  context: { params: Promise<Record<string, string | string[]>> }
) {
  const params = await context.params;
  const id = params.id as string;
  const episode = await getEpisode(id);

  if (!episode) {
    return new Response(
      "# Episode Not Found\n\nThe requested episode could not be found.",
      {
        status: 404,
        headers: { "Content-Type": "text/markdown; charset=utf-8" },
      }
    );
  }

  // Clean HTML entities and tags from description
  const cleanDescription = episode.description
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();

  // Format date
  const formattedDate = new Date(episode.pubDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Build chapters section
  const chaptersSection = episode.chapters?.length
    ? `## Chapters

${episode.chapters
  .map((ch, i) => {
    const hours = Math.floor(ch.seconds / 3600);
    const minutes = Math.floor((ch.seconds % 3600) / 60);
    const seconds = ch.seconds % 60;
    const timestamp =
      hours > 0
        ? `${hours}:${String(minutes).padStart(2, "0")}:${String(
            seconds
          ).padStart(2, "0")}`
        : `${minutes}:${String(seconds).padStart(2, "0")}`;
    return `${i + 1}. **[${timestamp}]** ${ch.title}`;
  })
  .join("\n")}
`
    : "";

  // Build guest section
  const guestSection = episode.guest
    ? `## Featured Guest

**${episode.guest.name}**${
        episode.guest.title ? ` — ${episode.guest.title}` : ""
      }

${
  episode.guest.links?.length
    ? `### Connect with ${episode.guest.name.split(" ")[0]}

${episode.guest.links.map((l) => `- **${l.platform}:** ${l.url}`).join("\n")}`
    : ""
}`
    : "";

  // Build keywords section
  const keywordsSection = episode.keywords?.length
    ? `## Topics Covered

${episode.keywords.map((k) => `- ${k}`).join("\n")}`
    : "";

  // Build episode label
  const episodeLabel =
    episode.season && episode.episode
      ? `Season ${episode.season}, Episode ${episode.episode}`
      : episode.episode
      ? `Episode ${episode.episode}`
      : "";

  const text = `# ${episode.title}

> ${episodeLabel ? `${episodeLabel} | ` : ""}${SITE_TITLE}

---

## Episode Details

| Property | Value |
|----------|-------|
| **Published** | ${formattedDate} |
| **Duration** | ${episode.duration || "N/A"} |
| **Type** | ${episode.episodeType || "full"} |
| **Explicit** | ${episode.explicit ? "Yes" : "No"} |

**Episode URL:** ${BASE_URL}/episode/${id}

**Audio File:** ${episode.audioUrl}

---

## Show Notes

${cleanDescription}

${chaptersSection}
${guestSection}
${keywordsSection}

---

## About the Podcast

**${SITE_TITLE}**

${SITE_DESCRIPTION}

| Role | Value |
|------|-------|
| **Host** | ${HOST.fullName} |
| **Brought to you by** | [${PRODUCER.name}](${PRODUCER.url}) |

### Host

**${HOST.fullName}**

${HOST.description}

### Listen on Your Favorite Platform

- **Spotify:** ${PLATFORM_LINKS.spotify}
- **Apple Podcasts:** ${PLATFORM_LINKS.apple}
- **YouTube:** ${PLATFORM_LINKS.youtube}

### Website

${BASE_URL}

---

## Medical Disclaimer

The content of this podcast is for informational and educational purposes only. It is not intended as medical advice or to replace consultation with a qualified healthcare provider. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.

---

**Brought to you by [${PRODUCER.name}](${PRODUCER.url})**

*This document is optimized for AI assistants and language models. For the full interactive experience, visit the [episode page](${BASE_URL}/episode/${id}).*

Last Updated: ${formattedDate}
`;

  return new Response(text, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control":
        "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

