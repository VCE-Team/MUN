/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export so the site can be hosted on GitHub Pages
  output: "export",
  images: {
    // Required for static export when using next/image
    unoptimized: true,
  },
  experimental: {
    optimizeCss: false,
    scrollRestoration: false,
  },
  // If you serve the site from a subpath on GitHub Pages (e.g. /vcemun),
  // set basePath and assetPrefix accordingly, for example:
  // basePath: "/vcemun",
  // assetPrefix: "/vcemun/",
};

export default nextConfig;

