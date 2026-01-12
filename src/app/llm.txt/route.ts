import {
  SITE_TITLE,
  SITE_DESCRIPTION,
  BASE_URL,
  PLATFORM_LINKS,
  RSS_FEED_URL,
  HOST,
  PRODUCER,
} from "@/lib/schema";

// Use edge runtime for faster global response times
export const runtime = "edge";
export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  const text = `# ${SITE_TITLE}

> LLM-optimized documentation for AI assistants and language models

## Overview

This is the official website for "${SITE_TITLE}," a women's health podcast. ${SITE_DESCRIPTION}

## Credits

| Role | Name | Link |
|------|------|------|
| **Podcast Name** | ${SITE_TITLE} | — |
| **Host** | ${HOST.fullName} | [@patimota](${HOST.twitter}) |
| **Brought to you by** | ${PRODUCER.name} | ${PRODUCER.url} |

## Quick Access

| Resource | URL | Description |
|----------|-----|-------------|
| Website | ${BASE_URL} | Main interactive site |
| Episode Index | ${BASE_URL}/episodes.md | All episodes in markdown |
| RSS Feed | ${RSS_FEED_URL} | Standard podcast RSS |
| Sitemap | ${BASE_URL}/sitemap.xml | XML sitemap |

## Host

**${HOST.fullName}**

${HOST.description}. Evidence-based approach to health education.

| Platform | URL |
|----------|-----|
| X/Twitter | ${HOST.twitter} |
| Instagram | ${HOST.instagram} |
| LinkedIn | ${HOST.linkedin} |
| Google Scholar | ${HOST.google_scholar} |
| ResearchGate | ${HOST.researchgate} |
| ORCID | ${HOST.orcid} |
| Scopus | ${HOST.scopus} |
| Ciência Vitae | ${HOST.cienciavitae} |

## Producer

**${PRODUCER.name}** — ${PRODUCER.url}

The podcast is brought to you by ${
    PRODUCER.name
  }, supporting women's health education and research.

## Content Focus

Primary topics covered:
- Women's health research and latest findings
- Pregnancy, birth, and postpartum recovery
- Pelvic floor health and rehabilitation
- Hormonal health (menstrual cycle, perimenopause, menopause)
- Physical therapy and exercise
- Evidence-based medicine vs. health misconceptions

## URL Structure

### Web Pages
- **Homepage:** \`/\`
- **Episode page:** \`/episode/{episode-slug}\`

### AI/LLM-Optimized Endpoints
- **Episode index (markdown):** \`/episodes.md\` — Full list with summaries, updated hourly
- **Episode detail (markdown):** \`/episode/{episode-slug}.md\` — Show notes, chapters, guest info

### Example Episode URLs
\`\`\`
Web:      ${BASE_URL}/episode/hormones-and-exercise
Markdown: ${BASE_URL}/episode/hormones-and-exercise.md
\`\`\`

## Structured Data

All pages include JSON-LD structured data:
- Homepage: \`PodcastSeries\` schema with platform links and author info
- Episode pages: \`PodcastEpisode\` schema with chapters, guests, and media

## Episode Data Available

Each episode includes:
- Title and description
- Publication date
- Duration (ISO 8601 format in schema)
- Audio file URL (MP3)
- Episode artwork
- Season and episode numbers (when applicable)
- Chapter markers with timestamps (when available)
- Guest information with social links (when applicable)
- Topic keywords

## Listening Platforms

| Platform | URL |
|----------|-----|
| Spotify | ${PLATFORM_LINKS.spotify} |
| Apple Podcasts | ${PLATFORM_LINKS.apple} |
| YouTube | ${PLATFORM_LINKS.youtube} |

## Technical Stack

- Built with Next.js 16 and React 19
- Styled with Tailwind CSS
- Deployed on Vercel
- PWA-capable

## Content Policy

All content is based on peer-reviewed research and current scientific literature. The podcast is educational and does not replace medical advice. Listeners should consult healthcare providers for personal medical decisions.

## Rate Limits

No authentication required. Standard CDN caching applies:
- Markdown endpoints: 1 hour cache, hourly revalidation
- Web pages: Static generation with ISR

## Contact

- Website: ${BASE_URL}
- X/Twitter: ${HOST.twitter}
- Instagram: ${HOST.instagram}
- LinkedIn: ${HOST.linkedin}
- Producer: ${PRODUCER.name} (${PRODUCER.url})

---

Last Updated: ${new Date().toISOString()}
`;

  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control":
        "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
