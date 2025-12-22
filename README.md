# Just Between Us … and Science

<div align="center">

**The Women's Health Lab Podcast Website**

A modern, SEO-optimized podcast platform built with Next.js 16, featuring real-time RSS feed integration, advanced audio player, and chapter navigation.

[🎧 Live Demo](https://podcast.patriciamota.com) · [📝 Report Bug](https://github.com/rodrigobarona/just-between-us-and-science/issues) · [✨ Request Feature](https://github.com/rodrigobarona/just-between-us-and-science/issues)

</div>

---

## 📖 About

**Just Between Us … and Science** is a women's health podcast hosted by **Dr. Patrícia Mota, PT, PhD**. This website serves as the podcast's digital home, featuring episode browsing, an integrated audio player, guest information, and chapter navigation — all powered by dynamically fetched RSS feed data.

### Key Topics
- Women's Health & Wellness
- Evidence-Based Science
- Pelvic Health & Physical Therapy
- Pregnancy & Postpartum Care
- Hormones & Physiology

---

## ✨ Features

### 🎯 Core Functionality
- **Dynamic RSS Integration**: Automatically fetches and parses podcast episodes from Anchor.fm RSS feed
- **Advanced Audio Player**: Custom-built player with playback controls, progress tracking, and volume control
- **Chapter Navigation**: Jump to specific moments in episodes with timestamp-based chapters
- **Guest Information**: Automatically extracts and displays guest details with social links
- **Episode Deep Links**: Shareable URLs for individual episodes with scroll-to-episode support
- **Skeleton Loading**: Smooth loading states with animated skeletons

### 🎨 Design & UX
- **Responsive Design**: Mobile-first approach with optimized layouts for all screen sizes
- **Modern UI**: Clean interface using shadcn/ui components and Tailwind CSS v4
- **Dark Mode Ready**: Built with next-themes support (theme infrastructure in place)
- **Smooth Animations**: CSS animations with tw-animate-css
- **Accessible**: Semantic HTML and ARIA labels throughout

### 🚀 Performance & SEO
- **Server-Side Rendering**: Next.js 16 App Router for optimal performance
- **Smart Caching**: 5-minute RSS feed cache with Next.js unstable_cache
- **SEO Optimized**: Comprehensive meta tags, Open Graph, and Twitter Cards
- **Structured Data**: JSON-LD schema for PodcastSeries and PodcastEpisode
- **Analytics**: Integrated Vercel Analytics for visitor insights
- **Image Optimization**: Next.js Image component with lazy loading

### 🔧 Developer Experience
- **TypeScript**: Full type safety across the codebase
- **Modern React**: React 19 with Server Components
- **TanStack Query**: Efficient data fetching and caching on the client
- **Modular Architecture**: Clean component structure with separation of concerns
- **ESLint**: Code quality enforcement
- **PNPM**: Fast, disk space-efficient package management

---

## 🛠️ Tech Stack

### Core
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library with Server Components
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety

### Styling
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable components
- **[Lucide Icons](https://lucide.dev/)** - Icon library
- **[tw-animate-css](https://github.com/bentatum/tw-animate-css)** - CSS animations

### Data & State
- **[TanStack Query](https://tanstack.com/query)** - Server state management
- **[schema-dts](https://github.com/google/schema-dts)** - TypeScript schema.org types

### Features
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications
- **[date-fns](https://date-fns.org/)** - Date formatting
- **[Vercel Analytics](https://vercel.com/analytics)** - Web analytics

---

## 📁 Project Structure

```
just-between-us-and-science/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── episode/[id]/        # Dynamic episode pages
│   │   │   ├── page.tsx         # Episode detail page
│   │   │   └── episode-content.tsx
│   │   ├── layout.tsx           # Root layout with metadata
│   │   ├── page.tsx             # Home page
│   │   ├── not-found.tsx        # 404 page
│   │   ├── globals.css          # Global styles & CSS variables
│   │   └── favicon.ico
│   ├── components/              # React components
│   │   ├── audio-player.tsx     # Custom audio player
│   │   ├── chapter-list.tsx     # Episode chapters
│   │   ├── episode-card.tsx     # Episode list item
│   │   ├── episode-list.tsx     # Episodes container
│   │   ├── footer.tsx           # Site footer
│   │   ├── host-section.tsx     # Host bio
│   │   ├── json-ld.tsx          # Structured data
│   │   ├── platform-links.tsx   # Podcast platform badges
│   │   ├── podcast-header.tsx   # Podcast branding
│   │   ├── share-dialog.tsx     # Social sharing
│   │   ├── providers/
│   │   │   └── query-provider.tsx
│   │   └── ui/                  # shadcn/ui components
│   ├── lib/
│   │   ├── rss.ts               # RSS feed parser
│   │   ├── schema.ts            # JSON-LD schema builders
│   │   └── utils.ts             # Utility functions
│   └── hooks/
│       └── use-mobile.tsx       # Mobile detection hook
├── public/                      # Static assets
│   └── assets/                  # Images, logos, badges
├── components.json              # shadcn/ui configuration
├── next.config.ts               # Next.js configuration
├── postcss.config.mjs           # PostCSS configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20.x or higher
- **PNPM** 8.x or higher (recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rodrigobarona/just-between-us-and-science.git
   cd just-between-us-and-science
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Create optimized production build
pnpm build

# Start production server
pnpm start
```

### Linting

```bash
# Run ESLint
pnpm lint
```

---

## 🎨 Key Components

### RSS Feed Parser (`src/lib/rss.ts`)

Fetches and parses the podcast RSS feed from Anchor.fm with:
- Episode metadata extraction (title, description, audio URL, duration)
- Chapter timestamp parsing: `(03:23) Title`
- Guest information extraction
- iTunes metadata (season, episode number, explicit flag)
- Smart caching with 5-minute revalidation

### Audio Player (`src/components/audio-player.tsx`)

Custom-built HTML5 audio player featuring:
- Play/pause controls
- Progress bar with seek functionality
- Volume control
- Current time / duration display
- Keyboard shortcuts
- Persistent state across navigation

### Episode Pages (`src/app/episode/[id]/`)

Dynamic routes with:
- SEO-optimized metadata
- JSON-LD structured data
- Chapter navigation
- Guest social links
- Share functionality
- Responsive layouts

### JSON-LD Schema (`src/lib/schema.ts`)

Structured data for search engines:
- **PodcastSeries** schema for the main page
- **PodcastEpisode** schema for individual episodes
- Guest contributors
- Chapter markers
- Full metadata compliance

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rodrigobarona/just-between-us-and-science)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel will automatically detect Next.js and configure build settings
4. Deploy! 🚀

### Environment Variables

No environment variables required! The RSS feed URL is configured in `src/lib/rss.ts`.

---

## 🎯 RSS Feed Format

The application expects an RSS 2.0 feed with iTunes extensions:

```xml
<rss xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <channel>
    <title>Podcast Title</title>
    <description>Podcast Description</description>
    <itunes:author>Dr. Patrícia Mota</itunes:author>
    <item>
      <title>Episode Title</title>
      <description><![CDATA[
        Episode description with chapters:
        (00:00) Introduction
        (03:23) First Topic
        (15:45) Second Topic
      ]]></description>
      <enclosure url="audio-url.mp3" type="audio/mpeg"/>
      <itunes:duration>45:23</itunes:duration>
      <itunes:season>1</itunes:season>
      <itunes:episode>5</itunes:episode>
    </item>
  </channel>
</rss>
```

### Chapter Format

Chapters are automatically parsed from episode descriptions using the format:
```
(MM:SS) Chapter Title
(HH:MM:SS) Chapter Title with emoji 🎯
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is private and proprietary.

---

## 👩‍⚕️ About the Host

**Dr. Patrícia Mota, PT, PhD** is a Physical Therapist and researcher specializing in women's health. She combines evidence-based science with practical insights to demystify topics around pelvic health, pregnancy, postpartum care, and hormones.

### Connect
- 🎥 [YouTube](https://www.youtube.com/@patimota)
- 🎵 [Spotify](https://open.spotify.com/show/2PMAy4HFeiu8IAf8Ic8Fqo)
- 🎧 [Apple Podcasts](https://podcasts.apple.com/us/podcast/elevating-womens-health/id1770183816)

---

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Vercel](https://vercel.com/) for hosting and analytics
- [Next.js](https://nextjs.org/) team for an amazing framework
- All podcast guests who share their expertise and insights

---

<div align="center">

**Made with ❤️ for women's health education**

[⬆ back to top](#just-between-us--and-science)

</div>
