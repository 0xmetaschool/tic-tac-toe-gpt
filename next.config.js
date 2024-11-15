/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true, // Disables ESLint during builds
    },
    reactStrictMode: true,
    images: {
        domains: ['metaschool.so'],
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'metaschool.so',
            pathname: '/**',
          },
        ],
    },
  }
  
  module.exports = nextConfig