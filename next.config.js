/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Temporarily ignore ESLint errors during build
  },
  images: {
    domains: ['placehold.co'], // Allow images from placehold.co
  },
};

module.exports = nextConfig; 