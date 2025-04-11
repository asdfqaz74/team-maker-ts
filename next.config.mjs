/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 7,
    domains: ["imgur.com"],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "30mb",
    },
  },
  output: "standalone",
};

export default nextConfig;
