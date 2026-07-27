import type { NextConfig } from "next"

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
]

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {},
  images: {
    qualities: [75, 90],
  },
  typescript: {
    // Prevent Vercel TypeScript errors from blocking builds.
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.resolve = config.resolve ?? {}
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      canvas: false,
    }
    return config
  },
  async redirects() {
    return [
      {
        source: "/vodic",
        destination: "/Legantis-Vodic-za-Korisnike-2026.pdf",
        permanent: false,
      },
    ]
  },
  async headers() {
    const dashboardNoStore = [
      {
        key: "Cache-Control",
        value: "no-store, no-cache, must-revalidate",
      },
      { key: "Pragma", value: "no-cache" },
    ]
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      // Authenticated app only — do not apply to marketing pages (LCP/cache).
      {
        source: "/dashboard",
        headers: dashboardNoStore,
      },
      {
        source: "/dashboard/:path*",
        headers: dashboardNoStore,
      },
    ]
  },
}

export default nextConfig
