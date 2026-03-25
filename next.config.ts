import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // FIXED: Bypasses the "private ip" error by disabling Next.js image optimization service for now
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
