const { hostname } = require('os');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol:"https",
        hostname:"wembleypark.com",
        pathname:"/**",
      },{
        protocol:"https",
        hostname:"hydeparkwinterwonderland.com",
        pathname:"/**"
      }
    ],
  },
};

module.exports = nextConfig;
