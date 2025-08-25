'use client';

import { Heart } from 'lucide-react';
import { useActionState, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { LikeFormState, toggleLike } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';

interface Props {
  postId: number,
  isLiked: boolean;
  likesCount: number;
  onLike: () => Promise<void>;
  onUnlike: () => Promise<void>;
}

// TODO: Check if user already liked post before

export const Like = ({ postId, isLiked: initialIsLiked, likesCount: initialLikesCount }: Props) => {
  const { toast } = useToast();

  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);

  const initialState: LikeFormState = { errorMessage: null, action: null };

  const toggleLikeAction = toggleLike.bind(null, postId, isLiked ? 'unlike' : 'like');

  const [state, formAction] = useActionState(toggleLikeAction, initialState);

  useEffect(() => {
    if (state?.errorMessage) {
      toast({
        title: state.errorMessage,
        variant: 'destructive',
        duration: 3000,
      });
    }
  }, [state, toast]);

  return (
    <form
      action={formAction}
      onSubmit={() => {
        setIsLiked(!isLiked);
        setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
      }}
    >
      <Button
        type="submit"
        variant="ghost"
        size="sm"
      >
        <Heart
          className={`h-4 w-4 mr-2 ${
            isLiked ? 'fill-current' : ''
          }`}
        />
        {likesCount}
      </Button>
    </form>

  );
};
