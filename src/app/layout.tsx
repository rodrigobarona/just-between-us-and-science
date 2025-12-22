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
  authors: [{ name: "Dr. Patrícia Mota, PT, PhD" }],
  creator: "Dr. Patrícia Mota",
  publisher: "Just Between Us … and Science",
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
  ],
  metadataBase: new URL(BASE_URL),
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
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SHARE_IMAGE],
    creator: "@patimota",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
    types: {
      "application/rss+xml": RSS_FEED_URL,
    },
  },
  icons: {
    icon: "/FAVICON.png",
    apple: "/FAVICON.png",
  },
  category: "Health & Fitness",
  other: {
    "podcast:category": "Health & Fitness > Medicine",
    "podcast:explicit": "false",
    "podcast:author": "Dr. Patrícia Mota, PT, PhD",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className={outfit.className}>
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
