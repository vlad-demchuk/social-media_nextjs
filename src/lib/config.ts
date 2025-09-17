import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_BETTER_AUTH_URL: z.string().url(),
  NEXT_PUBLIC_GRAPHQL_URL: z.string().url(),
  DEV_BETTER_AUTH_URL: z.string().url(),
  DEV_GRAPHQL_URL: z.string().url(),
  NODE_ENV: z.enum(['development', 'production', 'test']),
});

const env = envSchema.parse({
  NEXT_PUBLIC_BETTER_AUTH_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  NEXT_PUBLIC_GRAPHQL_URL: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  DEV_BETTER_AUTH_URL: 'http://localhost:3000/api/auth',
  DEV_GRAPHQL_URL: 'http://localhost:3000/graphql/',
  NODE_ENV: process.env.NODE_ENV,
});

export const config = {
  auth: {
    url: env.NODE_ENV === 'production' ? env.NEXT_PUBLIC_BETTER_AUTH_URL : env.DEV_BETTER_AUTH_URL,
  },
  graphql: {
    url: env.NODE_ENV === 'production' ? env.NEXT_PUBLIC_GRAPHQL_URL : env.DEV_GRAPHQL_URL,
  },
  isDev: env.NODE_ENV === 'development',
  isProd: env.NODE_ENV === 'production',
} as const;

export default config;
