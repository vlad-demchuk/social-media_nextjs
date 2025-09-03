import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { getClient } from '@/lib/graphql/apolloClient';
import { CREATE_COMMENT } from '@/graphql/queries/comment';
import { revalidatePath } from 'next/cache';

interface Props {
  postId: number
}

export const CreateForm = ({ postId }: Props) => {
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

  return (
    <header className="space-y-3 border-0">
      <form
        action={createCommentAction}
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
            required
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit">Post Comment</Button>
        </div>
      </form>
    </header>

  );
}
