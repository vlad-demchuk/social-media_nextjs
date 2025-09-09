import { betterAuth } from 'better-auth';
import { headers } from 'next/headers';
import { authClient } from '@/lib/auth/auth-client';

export async function getServerSession() {
  try {
    // const response = await fetch('http://localhost:4000/api/auth/get-session', {
    //   headers: await headers(),
    //   credentials: 'include',
    // });
    //
    // const session = await response.json();

    // Direct call to API for getting session in RSC to avoid creating better-auth instance on Next side
    const session = await authClient.getSession({
      fetchOptions: {
        headers: await headers(),
      },
    });

    return session;
  } catch (error) {
    console.error('Failed to get server session:', error);
    return null;
  }
}
