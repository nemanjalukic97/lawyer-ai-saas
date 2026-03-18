import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {},
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
}

export default nextConfig
