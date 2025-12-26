import { getEpisode, getEpisodes } from "@/lib/rss";
import { SITE_TITLE, BASE_URL } from "@/lib/schema";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const episodes = await getEpisodes();
  return episodes.map((ep) => ({ id: ep.id }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  const episode = await getEpisode(id);

  if (!episode) {
    return new Response("Episode not found", { status: 404 });
  }

  const cleanDescription = episode.description
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();

  const chaptersText = episode.chapters?.length
    ? `\n\n## Chapters\n\n${episode.chapters
        .map((ch, i) => {
          const timestamp = new Date(ch.seconds * 1000)
            .toISOString()
            .substr(11, 8);
          return `${i + 1}. [${timestamp}] ${ch.title}`;
        })
        .join("\n")}`
    : "";

  const guestText = episode.guest
    ? `\n\n## Guest\n\n**${episode.guest.name}**${
        episode.guest.title ? ` - ${episode.guest.title}` : ""
      }${
        episode.guest.links?.length
          ? `\n\nLinks:\n${episode.guest.links
              .map((l) => `- ${l.platform}: ${l.url}`)
              .join("\n")}`
          : ""
      }`
    : "";

  const text = `# ${episode.title}

> Episode ${episode.episode} | ${SITE_TITLE}

**Published:** ${new Date(episode.pubDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}

**Duration:** ${episode.duration || "N/A"}

**URL:** ${BASE_URL}/episode/${id}

**Audio:** ${episode.audioUrl}

## Description

${cleanDescription}${chaptersText}${guestText}

---

## About the Podcast

${SITE_TITLE} is hosted by Dr. Patrícia Mota, PT, PhD, exploring the latest research in women's health, from pregnancy and postpartum to hormones and pelvic health.

Listen on:
- Spotify: https://open.spotify.com/show/2PMAy4HFeiu8IAf8Ic8Fqo
- Apple Podcasts: https://podcasts.apple.com/us/podcast/elevating-womens-health/id1770183816
- YouTube: https://www.youtube.com/@patimota

Website: ${BASE_URL}
`;

  return new Response(text, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

