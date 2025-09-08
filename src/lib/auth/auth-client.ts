import { createAuthClient } from 'better-auth/react';
import config from '@/lib/config'; // make sure to import from better-auth/react

export const authClient = createAuthClient({
  baseURL: config.auth.url,
  fetchOptions: {
    credentials: 'include',
  },
});
