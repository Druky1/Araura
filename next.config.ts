import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    domains: ["i.pinimg.com", "images.unsplash.com", "pixabay.com"],  // Add allowed image domains here
  },
  env: {
    X_API_KEY: process.env.X_API_KEY,
  }
};

export default nextConfig;
