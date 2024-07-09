/** @type {import('next').NextConfig} */

const TEST_API_ENDPOINT = process.env.NEXT_PUBLIC_TEST_BACKEND;
const API_ENDPOINT = process.env.NEXT_PUBLIC_BACKEND;

const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    // ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "ik.imagekit.io",
        protocol: "https",
      },
      {
        hostname: "s3.amazonaws.com",
        protocol: "https",
      },
      {
        hostname: "cdn.sanity.io",
        protocol: "https",
      },
      {
        hostname: "assets.coingecko.com",
        protocol: "https",
      },
    ],
    dangerouslyAllowSVG: true,
  },
  async rewrites() {
    return [
      {
        source: "/test/be-api/:path*",
        destination: `${TEST_API_ENDPOINT}/api/:path*`,
      },
      {
        source: "/be-api/:path*",
        destination: `${API_ENDPOINT}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
