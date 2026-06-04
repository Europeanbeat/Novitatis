/** @type {import('next').NextConfig} */
const nextConfig = {
  // Produces a self-contained .next/standalone folder for Docker.
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
