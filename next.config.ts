import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  experimental: {
    optimizeCss: false,
    scrollRestoration: false,
  },
};

module.exports = nextConfig;
