import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {},
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
