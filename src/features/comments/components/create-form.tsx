'use client';

import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { createComment, CommentFormState } from '@/features/comments/actions';
import { useActionState } from 'react';
import { Loader } from 'lucide-react';

interface Props {
  postId: number;
}

export const CreateForm = ({ postId }: Props) => {
  const initialState: CommentFormState = { message: null, errors: {} };

  const createPostAction = createComment.bind(null, postId);

  const [state, formAction, isPending] = useActionState(createPostAction, initialState);

  return (
    <header className="space-y-3 border-0">
      <form
        action={formAction}
        className="space-y-3"
      >
        <input
          type="hidden"
          name="postId"
          value={postId}
        />
        <div className="sm:col-span-3">
          <Textarea
            name="content"
            placeholder="Write a comment..."
            rows={2}
          />
          {state?.errors?.content && <p className="mt-2 text-sm text-red-500">This field is required</p>}
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isPending}
          >
            {isPending ? (
              <span className="inline-flex items-center gap-2">
                <Loader className="h-4 w-4 animate-spin" />
                <span>Posting…</span>
              </span>
            ) : 'Post Comment'}
          </Button>
        </div>
      </form>
    </header>

  );
};
