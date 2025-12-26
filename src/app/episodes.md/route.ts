import { getEpisodes } from "@/lib/rss";
import { SITE_TITLE, BASE_URL, SITE_DESCRIPTION } from "@/lib/schema";

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
        .slice(0, 200)
        .trim();

      return `
## Episode ${ep.episode}: ${ep.title}

**Published:** ${new Date(ep.pubDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}

**Duration:** ${ep.duration || "N/A"}

**URL:** ${BASE_URL}/episode/${ep.id}

**Markdown:** ${BASE_URL}/episode/${ep.id}.md

${cleanDescription}${cleanDescription.length >= 200 ? "..." : ""}

---
`;
    })
    .join("\n");

  const text = `# ${SITE_TITLE}

${SITE_DESCRIPTION}

**Website:** ${BASE_URL}
**RSS Feed:** https://anchor.fm/s/fb6b5228/podcast/rss
**Total Episodes:** ${episodes.length}

---

## Host

Dr. Patrícia Mota, PT, PhD
- Physical Therapist specializing in women's health
- Evidence-based approach to health education
- Twitter: @patimota

---

## All Episodes

${episodesList}

## Listen

- **Spotify:** https://open.spotify.com/show/2PMAy4HFeiu8IAf8Ic8Fqo
- **Apple Podcasts:** https://podcasts.apple.com/us/podcast/elevating-womens-health/id1770183816
- **YouTube:** https://www.youtube.com/@patimota

---

For detailed information about any episode, visit: ${BASE_URL}/episode/[id].md

Last Updated: ${new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}
`;

  return new Response(text, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
