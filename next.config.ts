import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    console.log('>>>>> process.env:', process.env);
    return [
      {
        source: '/api/auth/:path*',
        // destination: 'https://social-media-server-grapqhl.vercel.app/api/auth/:path*',
        destination: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 'https://social-media-server-grapqhl.vercel.app/api/auth',
      },
      {
        source: '/api/graphql',
        // destination: 'https://social-media-server-grapqhl.vercel.app/graphql',
        destination: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'https://social-media-server-grapqhl.vercel.app/graphql',
      },
    ];
  },
};

export default nextConfig;
