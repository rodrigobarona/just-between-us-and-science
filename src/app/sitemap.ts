import { MetadataRoute } from 'next'
import { getEpisodes } from '@/lib/rss'
import { BASE_URL } from '@/lib/schema'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const episodes = await getEpisodes()

  const episodeUrls = episodes.map((episode) => ({
    url: `${BASE_URL}/episode/${episode.id}`,
    lastModified: new Date(episode.pubDate),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...episodeUrls,
  ]
}

