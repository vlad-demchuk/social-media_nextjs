import { createAuthClient } from 'better-auth/react';
import config from '@/lib/config';

if (!config.auth.url) {
  console.error('Auth URL is missing in client configuration');
  throw new Error('Authentication configuration error');
}

export const authClient = createAuthClient({
  baseURL: config.auth.url,
  fetchOptions: {
    credentials: 'include',
  },
});
