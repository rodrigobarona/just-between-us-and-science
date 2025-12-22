import type { PodcastSeries, PodcastEpisode, WithContext } from 'schema-dts'
import type { Episode } from './rss'
import { formatISO8601Duration } from './rss'

export const BASE_URL = 'https://podcast.patriciamota.com'
export const SHARE_IMAGE = `${BASE_URL}/just-between-us-share-image.png`
export const RSS_FEED_URL = 'https://anchor.fm/s/fb6b5228/podcast/rss'

export const SITE_TITLE = "Just Between Us … and Science: The Women's Health Lab"
export const SITE_DESCRIPTION = "Join Dr. Patrícia Mota, PT, PhD, as she takes you behind the scenes of women's health — from the latest research to everyday experiences."

export function buildPodcastSeriesSchema(): WithContext<PodcastSeries> {
  return {
    '@context': 'https://schema.org',
    '@type': 'PodcastSeries',
    '@id': BASE_URL,
    name: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: BASE_URL,
    inLanguage: 'en-US',
    image: SHARE_IMAGE,
    author: {
      '@type': 'Person',
      name: 'Dr. Patrícia Mota',
      jobTitle: 'PT, PhD',
      description: 'Physical Therapist and PhD specializing in women\'s health research',
      sameAs: [
        'https://www.youtube.com/@patimota',
        'https://open.spotify.com/show/2PMAy4HFeiu8IAf8Ic8Fqo',
        'https://podcasts.apple.com/us/podcast/elevating-womens-health/id1770183816',
      ],
    },
    genre: ['Health', 'Science', 'Education', "Women's Health"],
    publisher: {
      '@type': 'Organization',
      name: 'Just Between Us … and Science',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: SHARE_IMAGE,
        width: '1200',
        height: '630',
      },
    },
    webFeed: RSS_FEED_URL,
  }
}

export function buildPodcastEpisodeSchema(episode: Episode): WithContext<PodcastEpisode> {
  const episodeUrl = `${BASE_URL}/episode/${episode.id}`
  const cleanDescription = episode.description.replace(/<[^>]*>/g, '').slice(0, 200)
  
  return {
    '@context': 'https://schema.org',
    '@type': 'PodcastEpisode',
    '@id': episodeUrl,
    name: episode.title,
    description: cleanDescription,
    datePublished: episode.pubDate,
    duration: formatISO8601Duration(episode.duration),
    url: episodeUrl,
    inLanguage: 'en-US',
    image: episode.imageUrl || SHARE_IMAGE,
    episodeNumber: episode.episode,
    partOfSeries: {
      '@type': 'PodcastSeries',
      '@id': BASE_URL,
      name: SITE_TITLE,
      url: BASE_URL,
    },
    associatedMedia: {
      '@type': 'MediaObject',
      contentUrl: episode.audioUrl,
      encodingFormat: 'audio/mpeg',
      duration: formatISO8601Duration(episode.duration),
    },
    publisher: {
      '@type': 'Organization',
      name: 'Just Between Us … and Science',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: SHARE_IMAGE,
      },
    },
    // Add guest as contributor if present
    ...(episode.guest && {
      contributor: {
        '@type': 'Person',
        name: episode.guest.name,
        ...(episode.guest.links && {
          sameAs: episode.guest.links.map(l => l.url),
        }),
      },
    }),
    // Add chapter markers as hasPart
    ...(episode.chapters?.length && {
      hasPart: episode.chapters.map((ch, i) => ({
        '@type': 'Clip',
        name: ch.title,
        startOffset: ch.seconds,
        position: i + 1,
      })),
    }),
  }
}

