import { getClient, query } from '@/lib/graphql/apolloClient';
import { GET_POST_COMMENTS, CREATE_COMMENT, DELETE_COMMENT } from '@/graphql/queries/comment';
import { revalidatePath } from 'next/cache';
import { Button } from '@/components/ui/button';
import { CreateForm } from '@/features/comments/components/create-form';

interface Props {
  postId: number;
}

export const List = async ({ postId }: Props) => {
  const { data: postCommentsData, error } = await query({ query: GET_POST_COMMENTS, variables: { postId } });

  if (error || !postCommentsData?.comments) return <>Something went wrong</>;

  async function createCommentAction(formData: FormData) {
    'use server';
    const content = formData.get('content')?.toString().trim();
    const usernameRaw = formData.get('username')?.toString().trim();
    const postIdStr = formData.get('postId')?.toString();
    const postIdNum = Number(postIdStr);
    if (!content || !postIdNum) return;

    const client = getClient();
    await client.mutate({
      mutation: CREATE_COMMENT,
      variables: { input: { postId: postIdNum, content, username: usernameRaw || undefined } },
    });
    revalidatePath(`/feed/${postIdNum}`);
  }

  async function deleteCommentAction(formData: FormData) {
    'use server';
    const commentIdStr = formData.get('commentId')?.toString();
    const postIdStr = formData.get('postId')?.toString();
    const commentId = Number(commentIdStr);
    const postIdNum = Number(postIdStr);
    if (!commentId || !postIdNum) return;

    const client = getClient();
    await client.mutate({
      mutation: DELETE_COMMENT,
      variables: { commentId },
    });
    revalidatePath(`/feed/${postIdNum}`);
  }

  return (
    <section className="mt-4 space-y-4">
      <CreateForm postId={postId} />

      <ul className="space-y-3">
        {postCommentsData.comments.map((c) => (
          <li
            key={c.id}
            className="rounded-md p-3 flex items-start gap-3"
          >
            <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
              {(c.username?.[0] || '?').toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{c.username || 'Anonymous'}</span>
                <span>·</span>
                <span title={new Date(c.createdAt).toLocaleString()}>
                  {new Date(c.createdAt).toLocaleDateString()} {new Date(c.createdAt).toLocaleTimeString()}
                </span>
              </div>
              <p className="text-sm break-words mt-1">{c.content}</p>
            </div>
            <div>
              <form action={deleteCommentAction}>
                <input
                  type="hidden"
                  name="commentId"
                  value={c.id}
                />
                <input
                  type="hidden"
                  name="postId"
                  value={postId}
                />
                <Button
                  type="submit"
                  variant="ghost"
                  size="sm"
                >Delete</Button>
              </form>
            </div>
          </li>
        ))}
        {postCommentsData.comments.length === 0 && (
          <li className="text-sm text-muted-foreground text-center py-6">No comments yet. Be the first!</li>
        )}
      </ul>
    </section>
  );
};
