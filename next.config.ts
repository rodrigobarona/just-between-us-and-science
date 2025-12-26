import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/episode/:id(.*).md",
        destination: "/episode/:id/md",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d3t3ozftmdmh3i.cloudfront.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "megaphone.imgix.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s3-us-west-2.amazonaws.com",
        pathname: "/anchor-generated-image/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@tanstack/react-query",
      "date-fns",
    ],
  },
}

export default nextConfig
