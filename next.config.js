/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    loader: 'akamai',
    path: '/',
  }
}

module.exports = nextConfig
