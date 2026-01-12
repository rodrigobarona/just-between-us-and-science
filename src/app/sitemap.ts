import { MetadataRoute } from "next";
import { getEpisodes } from "@/lib/rss";
import { BASE_URL } from "@/lib/schema";

// Use edge runtime for faster global response times
export const runtime = "edge";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const episodes = await getEpisodes();

  const episodeUrls = episodes.map((episode) => ({
    url: `${BASE_URL}/episode/${episode.id}`,
    lastModified: new Date(episode.pubDate),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Add markdown endpoints for each episode (LLM-friendly)
  const episodeMdUrls = episodes.map((episode) => ({
    url: `${BASE_URL}/episode/${episode.id}.md`,
    lastModified: new Date(episode.pubDate),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    // LLM-friendly endpoints
    {
      url: `${BASE_URL}/llm.txt`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/episodes.md`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    ...episodeUrls,
    ...episodeMdUrls,
  ];
}
