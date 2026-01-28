import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BACKEND_URL: "https://munvcebackend.vercel.app",
    UPLOADTHING_TOKEN:
      "eyJhcGlLZXkiOiJza19saXZlX2QyZjY2YTc0MjIwYzZhZGQwNjBhNjI5MjBkNjE3ZjNlOGQzZTQ3Y2RhN2NlMzI1OTViZmU3YTdkZDA4M2I1ODIiLCJhcHBJZCI6ImwwdHNldXUxZGkiLCJyZWdpb25zIjpbInNlYTEiXX0=",
  },
  experimental: {
    optimizeCss: false,
    scrollRestoration: false,
  },
};

module.exports = nextConfig;
