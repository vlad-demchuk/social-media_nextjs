import { PostItem } from '@/features/posts/components';
import { query } from '@/lib/graphql/apolloClient';
import { GET_POST } from '@/graphql/queries/post';
import { CommentList, CommentSkeleton } from '@/features/comments/components';
import { Suspense } from 'react';
import { BackButton } from '@/components/ui/back-button';

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const postId = Number(id);
  if (!Number.isFinite(postId) || !Number.isInteger(postId) || postId <= 0) {
    return <>Invalid post id</>;
  }

  const { data: postData, error } = await query({ query: GET_POST, variables: { postId } });

  if (error || !postData?.post) return <>Something went wrong</>;

  return (
    <>
      <div className="mb-4">
        <BackButton />
      </div>

      <PostItem post={postData.post}>
        <Suspense fallback={<CommentSkeleton />}>
          <CommentList postId={postId} />
        </Suspense>
      </PostItem>
    </>
  );
}
