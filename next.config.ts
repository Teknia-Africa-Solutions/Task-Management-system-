import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Allow production builds to continue even with existing type issues
    // during early app development.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;