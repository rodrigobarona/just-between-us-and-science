import { getEpisode, getEpisodes } from "@/lib/rss"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { JsonLd } from "@/components/json-ld"
import { buildPodcastEpisodeSchema, BASE_URL, SHARE_IMAGE, SITE_TITLE } from "@/lib/schema"
import { EpisodePageContent } from "./episode-content"

interface PageProps {
  params: Promise<{ id: string }>
}

// Generate static paths for all episodes
export async function generateStaticParams() {
  const episodes = await getEpisodes()
  return episodes.map((ep) => ({ id: ep.id }))
}

// Dynamic SEO metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const episode = await getEpisode(id)
  
  if (!episode) {
    return {
      title: "Episode Not Found",
      description: "The requested episode could not be found.",
    }
  }
  
  const description = episode.description.replace(/<[^>]*>/g, "").slice(0, 200)
  const pageUrl = `${BASE_URL}/episode/${id}`
  const imageUrl = episode.imageUrl || SHARE_IMAGE
  
  return {
    title: episode.title,
    description,
    authors: [{ name: "Dr. Patrícia Mota, PT, PhD" }],
    keywords: [
      "women's health",
      "podcast episode",
      "health science",
      "Dr. Patrícia Mota",
      episode.title,
    ],
    openGraph: {
      type: "article",
      title: episode.title,
      description,
      url: pageUrl,
      siteName: SITE_TITLE,
      publishedTime: episode.pubDate,
      authors: ["Dr. Patrícia Mota, PT, PhD"],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: episode.title,
          type: "image/png",
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      site: "@patimota",
      creator: "@patimota",
      title: episode.title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: pageUrl,
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}

export default async function EpisodePage({ params }: PageProps) {
  const { id } = await params
  const [episode, allEpisodes] = await Promise.all([
    getEpisode(id),
    getEpisodes(),
  ])
  
  if (!episode) {
    notFound()
  }
  
  // Get related episodes (excluding current one)
  const relatedEpisodes = allEpisodes
    .filter((ep) => ep.id !== episode.id)
    .slice(0, 3)

  return (
    <>
      <JsonLd data={buildPodcastEpisodeSchema(episode)} />
      <EpisodePageContent
        episode={episode}
        relatedEpisodes={relatedEpisodes}
      />
    </>
  )
}

