/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizeCss: false,
    scrollRestoration: false,
  },
};

export default nextConfig;

