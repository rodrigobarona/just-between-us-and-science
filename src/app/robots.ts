import { MetadataRoute } from 'next'
import { BASE_URL } from '@/lib/schema'

// Use edge runtime for faster global response times
export const runtime = 'edge'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}

// Note: llm.txt is referenced in the file itself and doesn't need to be in robots.txt
// AI crawlers will discover it at /llm.txt based on convention

