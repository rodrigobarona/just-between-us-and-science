# SEO & Performance Setup

## Overview

This document outlines the comprehensive SEO and performance optimizations implemented for the Just Between Us … and Science podcast website.

## ✅ Implemented Features

### 1. **Metadata & SEO**

- ✅ Complete Open Graph tags for social sharing
- ✅ Twitter Card metadata
- ✅ Structured data (JSON-LD) for podcast series and episodes
- ✅ Canonical URLs on all pages
- ✅ Dynamic metadata for episode pages
- ✅ Proper meta descriptions and keywords
- ✅ Author and publisher information

### 2. **Technical SEO**

- ✅ **Sitemap** (`/sitemap.xml`) - Auto-generated with all episodes
- ✅ **Robots.txt** (`/robots.txt`) - Configured via Next.js
- ✅ **Web Manifest** (`/manifest.json`) - PWA support
- ✅ RSS feed integration
- ✅ Proper HTML lang attribute
- ✅ Semantic HTML structure

### 3. **Favicon & Icons**

- ✅ Main favicon: `/FAVICON.png`
- ✅ Apple touch icon
- ✅ Dynamic icon generation for multiple sizes
- ✅ Mask icon support
- ✅ PWA icons in manifest

### 4. **Performance Optimizations**

#### Image Optimization

- ✅ AVIF and WebP format support
- ✅ Responsive image sizes
- ✅ Lazy loading
- ✅ CDN integration for remote images
- ✅ Minimum cache TTL configured

#### Loading Performance

- ✅ DNS prefetch for external domains
- ✅ Preconnect to CDN hosts
- ✅ Font optimization (Outfit font with swap)
- ✅ Package import optimization (lucide-react, tanstack, date-fns)
- ✅ Removed powered-by header

#### Build Optimizations

- ✅ Compression enabled
- ✅ React strict mode
- ✅ Production source maps disabled
- ✅ Font optimization enabled

### 5. **Security Headers**

Implemented via middleware:

- ✅ Strict-Transport-Security (HSTS)
- ✅ X-Frame-Options (SAMEORIGIN)
- ✅ X-Content-Type-Options (nosniff)
- ✅ X-XSS-Protection
- ✅ Referrer-Policy
- ✅ Permissions-Policy
- ✅ X-DNS-Prefetch-Control

### 6. **Social Media Optimization**

- ✅ Open Graph images (1200x630) - using `/public/just-between-us-share-image.png`
- ✅ Twitter card with large image
- ✅ Episode-specific OG images (when available)
- ✅ Social media handles (@patimota)

### 7. **Structured Data (Schema.org)**

- ✅ PodcastSeries schema
- ✅ PodcastEpisode schema with:
  - Episode numbers
  - Duration in ISO 8601 format
  - Audio file URLs
  - Chapter markers
  - Guest information
  - Publisher details

### 8. **Mobile Optimization**

- ✅ Viewport configuration
- ✅ Theme color (#007a7a)
- ✅ Apple mobile web app capable
- ✅ Mobile web app capable
- ✅ Touch icon support (FAVICON.png)

### 9. **LLM & Markdown Optimization**

- ✅ `/llm.txt` - Root site documentation for AI crawlers
- ✅ `/episodes.md` - All episodes list with summaries (1 hour cache, markdown format)
- ✅ `/episode/[id]/md` - Individual episode markdown files (statically generated)
- ✅ Comprehensive structured content for LLMs and documentation
- ✅ Clean markdown format with metadata, chapters, and guest info
- ✅ Uses Next.js 16 route handlers with `generateStaticParams`
- ✅ Proper `text/markdown` content type

## 📁 Files Created/Modified

### New Files

- `src/app/sitemap.ts` - Dynamic sitemap generation
- `src/app/robots.ts` - Robots.txt configuration
- `src/app/manifest.ts` - PWA manifest
- `src/proxy.ts` - Security and performance headers (Next.js 16 convention)
- `public/llm.txt` - LLM-friendly site documentation
- `src/app/episode/[id]/md/route.ts` - Individual episode markdown files
- `next.config.ts` - Added rewrite rule to map `.md` URLs to `/md` routes
- `src/app/episodes.md/route.ts` - All episodes aggregated in markdown format

### Modified Files

- `src/app/layout.tsx` - Enhanced metadata and preconnect links
- `src/app/page.tsx` - Added page-specific metadata
- `src/app/episode/[id]/page.tsx` - Enhanced episode metadata
- `src/app/not-found.tsx` - Added 404 metadata
- `next.config.ts` - Performance and image optimizations

## 🔍 SEO Checklist

### On-Page SEO

- ✅ Title tags (unique per page)
- ✅ Meta descriptions (unique per page)
- ✅ H1 tags (one per page)
- ✅ Semantic HTML structure
- ✅ Alt text for images
- ✅ Internal linking
- ✅ Mobile-friendly design
- ✅ Fast loading times

### Technical SEO

- ✅ XML sitemap
- ✅ Robots.txt
- ✅ Canonical URLs
- ✅ HTTPS (via Vercel)
- ✅ Structured data
- ✅ 404 page
- ✅ Clean URL structure

### Content SEO

- ✅ Keyword optimization
- ✅ Quality content
- ✅ Regular updates (via RSS)
- ✅ Multimedia content (audio)

## 🚀 Performance Metrics

Expected improvements:

- **Lighthouse SEO Score**: 95-100
- **Lighthouse Performance**: 90+
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s

## 🔗 Important URLs

- Homepage: `https://podcast.patriciamota.com`
- Sitemap: `https://podcast.patriciamota.com/sitemap.xml`
- Robots: `https://podcast.patriciamota.com/robots.txt`
- Manifest: `https://podcast.patriciamota.com/manifest.json`
- LLM Site Info: `https://podcast.patriciamota.com/llm.txt`
- Episodes List (Markdown): `https://podcast.patriciamota.com/episodes.md`
- Episode Markdown: `https://podcast.patriciamota.com/episode/[id].md`
- RSS Feed: `https://anchor.fm/s/fb6b5228/podcast/rss`

## 📊 Testing Tools

Use these tools to verify SEO implementation:

- [Google Search Console](https://search.google.com/search-console)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Schema.org Validator](https://validator.schema.org/)

## 🎯 Next Steps

1. Submit sitemap to Google Search Console
2. Verify site ownership in Google Search Console
3. Test social media cards on Twitter/Facebook
4. Monitor Core Web Vitals
5. Set up Google Analytics (if needed)
6. Test markdown endpoints:
   - Visit `/episodes.md` to see all episodes
   - Visit `/episode/[any-episode-id].md` for episode details
7. Consider implementing:
   - Podcast-specific platforms (Apple Podcasts, Spotify)
   - Newsletter integration
   - Comments/engagement features

## 📝 Notes

- All metadata is dynamically generated based on episode content
- Images are optimized automatically by Next.js
- The site is fully PWA-capable
- Security headers are applied to all routes via `proxy.ts` (Next.js 16 convention)
- The favicon is served from `/public/FAVICON.png`
- Markdown files are statically generated at build time using `generateStaticParams`
- Each episode gets its own `.md` extension URL for detailed markdown content
- Uses Next.js rewrites to map `/episode/[id].md` URLs to `/episode/[id]/md` routes
- Clean URL structure with proper file extension semantics
- The `/episodes.md` aggregates all episodes with 1-hour cache revalidation
- Uses proper `text/markdown` content type for better compatibility

## 🤖 LLM & Markdown Integration Details

### Route Structure
```
/llm.txt                          → Site overview and navigation (plain text)
/episodes.md                      → All episodes list (markdown, revalidates hourly)
/episode/[id].md                  → Individual episode markdown (static)
```

### Features
- **Markdown format**: Clean, readable, and universally supported
- **Proper content type**: `text/markdown; charset=utf-8`
- **Comprehensive metadata**: Title, date, duration, URLs
- **Full descriptions**: HTML stripped, entities decoded
- **Chapter markers**: Timestamped content sections
- **Guest information**: Names, titles, and links
- **Static generation**: Pre-rendered at build time for performance
- **Cache headers**: Optimal cache control for static assets
- **GitHub compatible**: Renders properly in repos and documentation sites
