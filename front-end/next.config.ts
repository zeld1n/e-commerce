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
      },
      {
        hostname: 'letsenhance.io'  
      },
    ]
  }
};

export default nextConfig;
