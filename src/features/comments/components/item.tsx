'use client';

import { deleteCommentById } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Comment } from '@/graphql/generated/graphql';
import { useActionState } from 'react';
import { Loader } from 'lucide-react';
import { authClient } from '@/lib/auth/auth-client';

interface Props {
  comment: Comment,
  postId: number,
}

export const Item = ({ comment, postId }: Props) => {
  const { data: session } = authClient.useSession();
  const [, formAction, isPending] = useActionState(deleteCommentById, null);

  const canDelete = session?.user.name === comment.username;

  return (
    <article
      key={comment.id}
      className="rounded-md p-3 flex items-start gap-3"
    >
      <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
        {(comment.username?.[0] || '?').toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{comment.username || 'Anonymous'}</span>
          <span>·</span>
          {new Date(comment.createdAt).toLocaleString()}
        </div>
        <p className="text-sm break-words mt-1">{comment.content}</p>
      </div>
      <div>
        <form action={formAction}>
          <input
            type="hidden"
            name="commentId"
            value={comment.id}
          />
          <input
            type="hidden"
            name="postId"
            value={postId}
          />
          {canDelete && (
            <Button
              type="submit"
              variant="ghost"
              size="sm"
            >
              {isPending ? (
                <span className="inline-flex items-center gap-2">
              <Loader className="h-4 w-4 animate-spin" />
              <span>Deleting…</span>
            </span>
              ) : 'Delete'}
            </Button>
          )}
        </form>
      </div>
    </article>
  );
};
