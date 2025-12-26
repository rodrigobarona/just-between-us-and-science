import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Outfit } from "next/font/google";
import { QueryProvider } from "@/components/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  BASE_URL,
  SHARE_IMAGE,
  SITE_TITLE,
  SITE_DESCRIPTION,
  RSS_FEED_URL,
  HOST,
} from "@/lib/schema";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

export const viewport: Viewport = {
  themeColor: "#007a7a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: `%s | Just Between Us … and Science`,
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: HOST.fullName }],
  creator: HOST.name,
  publisher: SITE_TITLE,
  keywords: [
    "women's health",
    "podcast",
    "science",
    "evidence-based",
    "pelvic health",
    "pregnancy",
    "postpartum",
    "hormones",
    "physical therapy",
    "physiotherapy",
    "Dr. Patrícia Mota",
    "women's health research",
    "health education",
    "medical podcast",
  ],
  metadataBase: new URL(BASE_URL),
  applicationName: "Just Between Us … and Science",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Just Between Us … and Science",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: SHARE_IMAGE,
        width: 1200,
        height: 630,
        alt: "Just Between Us and Science Podcast with Dr. Patrícia Mota",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@patimota",
    creator: "@patimota",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SHARE_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
    types: {
      "application/rss+xml": [
        {
          url: RSS_FEED_URL,
          title: `${SITE_TITLE} RSS Feed`,
        },
      ],
    },
  },
  icons: {
    icon: [{ url: "/FAVICON.png", type: "image/png" }],
    apple: [{ url: "/FAVICON.png", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/FAVICON.png",
      },
    ],
  },
  manifest: "/manifest.json",
  category: "Health & Fitness",
  classification: "Health & Fitness > Medicine",
  other: {
    "podcast:category": "Health & Fitness > Medicine",
    "podcast:explicit": "false",
    "podcast:author": HOST.fullName,
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "JBUS Podcast",
    "mobile-web-app-capable": "yes",
    "format-detection": "telephone=no",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://d3t3ozftmdmh3i.cloudfront.net" />
        <link rel="preconnect" href="https://megaphone.imgix.net" />
        <link rel="dns-prefetch" href="https://anchor.fm" />
      </head>
      <body className={outfit.className} suppressHydrationWarning>
        <QueryProvider>
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
        </QueryProvider>
        <Analytics />
      </body>
    </html>
  );
}
