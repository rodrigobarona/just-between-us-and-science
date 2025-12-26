import type { Metadata } from "next"
import { getEpisodes } from "@/lib/rss"
import { JsonLd } from "@/components/json-ld"
import { buildPodcastSeriesSchema, BASE_URL, SITE_TITLE, SITE_DESCRIPTION, SHARE_IMAGE } from "@/lib/schema"
import { PodcastHeader } from "@/components/podcast-header"
import { HostSection } from "@/components/host-section"
import { PlatformLinks } from "@/components/platform-links"
import { Footer } from "@/components/footer"
import { EpisodeList } from "@/components/episode-list"

export const metadata: Metadata = {
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    url: BASE_URL,
    type: "website",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SHARE_IMAGE],
  },
}

export default async function HomePage() {
  const episodes = await getEpisodes(20) // Limit for homepage performance

  return (
    <>
      <JsonLd data={buildPodcastSeriesSchema()} />
      
      <div className="min-h-screen pb-24">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Podcast Info */}
            <div className="lg:col-span-1 space-y-8">
              <PodcastHeader />
              <HostSection />
              <PlatformLinks />
            </div>

            {/* Right Column - Episodes */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-foreground mb-6">Latest Episodes</h2>
              <EpisodeList initialEpisodes={episodes} />
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </>
  )
}
