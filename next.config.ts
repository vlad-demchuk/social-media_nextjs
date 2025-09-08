import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        // destination: 'https://social-media-server-grapqhl.vercel.app/api/auth/:path*',
        destination: process.env.NEXT_PUBLIC_BETTER_AUTH_PROXY_URL || 'https://social-media-server-grapqhl.vercel.app/api/auth',
      },
      {
        source: '/graphql/:path*',
        // destination: 'https://social-media-server-grapqhl.vercel.app/graphql',
        destination: process.env.NEXT_PUBLIC_GRAPHQL_PROXY_URL || 'https://social-media-server-grapqhl.vercel.app/graphql',
      },
    ];
  },
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
};

export default nextConfig;
