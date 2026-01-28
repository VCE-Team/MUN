import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: false,
    scrollRestoration: false,
  },
};

module.exports = nextConfig;
