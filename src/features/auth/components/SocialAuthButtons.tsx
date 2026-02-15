'use client';

import { Button } from '@/components/ui/button';
import { Chrome, Github } from 'lucide-react';

interface SocialAuthButtonsProps {
  onSocialAuth: (provider: string) => void;
}

export function SocialAuthButtons({ onSocialAuth }: SocialAuthButtonsProps) {
  return (
    <>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          onClick={() => onSocialAuth('Google')}
          className="w-full"
        >
          <Chrome className="mr-2 h-4 w-4" />
          Google
        </Button>
        <Button
          variant="outline"
          onClick={() => onSocialAuth('GitHub')}
          className="w-full"
        >
          <Github className="mr-2 h-4 w-4" />
          GitHub
        </Button>
      </div>
    </>
  );
}