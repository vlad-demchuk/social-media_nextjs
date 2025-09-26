import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: process.env.NEXT_PUBLIC_BETTER_AUTH_PROXY_URL || 'https://social-media-server-grapqhl.onrender.com/api/auth/:path*',
      },
      {
        source: '/graphql/:path*',
        destination: process.env.NEXT_PUBLIC_GRAPHQL_PROXY_URL || 'https://social-media-server-grapqhl.onrender.com/graphql',
      },
    ];
  },
};

export default nextConfig;
