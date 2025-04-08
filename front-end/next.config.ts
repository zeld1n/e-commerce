import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'upload.wikimedia.org'
      },
      {
        hostname: 'www.alleycat.org'
      }
    ]
  }
};

export default nextConfig;
