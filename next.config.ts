/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allow any host
      },
    ],
  },
};

module.exports = nextConfig;
