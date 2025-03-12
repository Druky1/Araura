import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    domains: ["i.pinimg.com", "images.unsplash.com", "pixabay.com"],  // Add allowed image domains here
  },
};

export default nextConfig;
