import { getEpisodes } from "@/lib/rss"
import { JsonLd } from "@/components/json-ld"
import { buildPodcastSeriesSchema } from "@/lib/schema"
import { PodcastHeader } from "@/components/podcast-header"
import { HostSection } from "@/components/host-section"
import { PlatformLinks } from "@/components/platform-links"
import { Footer } from "@/components/footer"
import { EpisodeList } from "@/components/episode-list"

export default async function HomePage() {
  const episodes = await getEpisodes()

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
