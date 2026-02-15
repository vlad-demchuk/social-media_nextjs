'use client';

import { authClient } from '@/lib/auth/auth-client';
import { validateUsername } from '@/utils/validation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await authClient.signIn.email({
        email,
        password,
        callbackURL: '/feed',
        fetchOptions: {
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
          onSuccess: async () => {
            toast.success('Signed in successfully');
          },
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    setIsLoading(true);

    try {
      const validation = validateUsername(name);
      if (!validation.isValid) {
        toast.error(validation.error);
        return;
      }

      await authClient.signUp.email({
        email,
        name,
        password,
        fetchOptions: {
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
          onSuccess: async () => {
            toast.success('Account created');
            router.push('/feed');
          },
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = (provider: string) => {
    toast.error(`${provider} Sign In`, {
      description: 'Social authentication would be implemented here.',
    });
  };

  return {
    signIn,
    signUp,
    handleSocialAuth,
    isLoading,
  };
}
