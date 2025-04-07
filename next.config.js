/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Temporarily ignore ESLint errors during build
  },
  images: {
    domains: ['placehold.co'], // Allow images from placehold.co
  },
  // Ignore deprecation warnings during build
  webpack: (config) => {
    // Ignore deprecation warnings
    config.ignoreWarnings = [
      { module: /node_modules\/@nextui-org/ },
    ];
    return config;
  },
};

module.exports = nextConfig; 