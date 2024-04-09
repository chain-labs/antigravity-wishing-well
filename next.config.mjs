/** @type {import('next').NextConfig} */

const TEST_API_ENDPOINT = process.env.NEXT_PUBLIC_TEST_BACKEND;
const API_ENDPOINT = process.env.NEXT_PUBLIC_BACKEND;


const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "ik.imagekit.io",
                protocol: "https",
            },
        ],
        dangerouslyAllowSVG: true
    },
    async rewrites() {
		return [
			{
				source: '/test/api/:path*',
				destination: `${TEST_API_ENDPOINT}/api/:path*`,
            },
            {
				source: '/api/:path*',
				destination: `${API_ENDPOINT}/api/:path*`,
			},
		]
	},
};

export default nextConfig;
