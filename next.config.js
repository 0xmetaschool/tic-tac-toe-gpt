/** @type {import('next').NextConfig} */
const nextConfig = {
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