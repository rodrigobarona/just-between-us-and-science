import { getEpisodes } from "@/lib/rss";
import {
  SITE_TITLE,
  BASE_URL,
  SITE_DESCRIPTION,
  PLATFORM_LINKS,
  RSS_FEED_URL,
  HOST,
  PRODUCER,
} from "@/lib/schema";

// Use edge runtime for faster global response times
export const runtime = "edge";
export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  const episodes = await getEpisodes();

  const episodesList = episodes
    .map((ep) => {
      const cleanDescription = ep.description
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/\s+/g, " ")
        .slice(0, 200)
        .trim();

      const seasonEpisode =
        ep.season && ep.episode
          ? `S${ep.season}E${ep.episode}`
          : ep.episode
          ? `E${ep.episode}`
          : "";

      const keywords = ep.keywords?.length
        ? `\n**Topics:** ${ep.keywords.slice(0, 5).join(", ")}`
        : "";

      return `### ${seasonEpisode ? `[${seasonEpisode}] ` : ""}${ep.title}

| Property | Value |
|----------|-------|
| Published | ${new Date(ep.pubDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })} |
| Duration | ${ep.duration || "N/A"} |
| Web Page | ${BASE_URL}/episode/${ep.id} |
| Markdown | ${BASE_URL}/episode/${ep.id}.md |
${keywords}

${cleanDescription}${cleanDescription.length >= 200 ? "…" : ""}

---
`;
    })
    .join("\n");

  const text = `# ${SITE_TITLE}

> *This document is designed for AI assistants, language models, and programmatic access. For the interactive website, visit [${BASE_URL}](${BASE_URL}).*

---

## Credits

| Role | Value |
|------|-------|
| **Podcast** | ${SITE_TITLE} |
| **Host** | ${HOST.fullName} |
| **Brought to you by** | [${PRODUCER.name}](${PRODUCER.url}) |

---

## About

${SITE_DESCRIPTION}

| Property | Value |
|----------|-------|
| Website | ${BASE_URL} |
| RSS Feed | ${RSS_FEED_URL} |
| Total Episodes | ${episodes.length} |
| Language | English (en-US) |
| Category | Health & Fitness > Medicine |

---

## Host

**${HOST.fullName}**

${HOST.description}

- Twitter: [@patimota](${HOST.twitter})

---

## Topics Covered

This podcast covers topics including:
- Women's health research
- Pregnancy and postpartum care
- Pelvic floor health
- Hormonal health and menopause
- Physical therapy and rehabilitation
- Evidence-based medicine
- Health misconceptions

---

## Episode Index

${episodesList}

## Listening Platforms

| Platform | Link |
|----------|------|
| Spotify | ${PLATFORM_LINKS.spotify} |
| Apple Podcasts | ${PLATFORM_LINKS.apple} |
| YouTube | ${PLATFORM_LINKS.youtube} |

---

## For AI Assistants

- **Episode details:** Access \`${BASE_URL}/episode/{episode-id}.md\` for full show notes, chapters, and guest info
- **This index:** \`${BASE_URL}/episodes.md\` (refreshed hourly)
- **Structured data:** Each web page includes JSON-LD PodcastEpisode schema
- **RSS feed:** ${RSS_FEED_URL}

---

## Medical Disclaimer

The content of this podcast is for informational and educational purposes only. It is not intended as medical advice. Always consult a qualified healthcare provider for personal medical decisions.

---

**Brought to you by [${PRODUCER.name}](${PRODUCER.url})**

Last Updated: ${new Date().toISOString()}
`;

  return new Response(text, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control":
        "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
