import {  query } from '@/lib/graphql/apolloClient';
import { GET_POST_COMMENTS } from '@/graphql/queries/comment';
import { CreateForm } from '@/features/comments/components/create-form';
import { Item } from '@/features/comments/components/item';

interface Props {
  postId: number;
}

export const List = async ({ postId }: Props) => {
  const { data: postCommentsData, error } = await query({ query: GET_POST_COMMENTS, variables: { postId } });

  if (error || !postCommentsData?.comments) return <>Something went wrong</>;

  return (
    <section className="mt-4 space-y-4">
      <CreateForm postId={postId} />

      <section className="space-y-3">
        {postCommentsData.comments.map((comment) => (
          <Item key={comment.id} comment={comment} postId={postId} />
        ))}
        {postCommentsData.comments.length === 0 && (
          <article className="text-sm text-muted-foreground text-center py-6 list-none">No comments yet. Be the first!</article>
        )}
      </section>
    </section>
  );
};
