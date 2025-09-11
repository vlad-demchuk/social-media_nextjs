import { Suspense } from 'react';
import Posts from '@/features/posts/components';
import { CreateForm } from '@/features/posts/components/create-form';
import { PostsSkeleton } from '@/features/posts/components/skeleton-list';
import { query } from '@/lib/graphql/apolloClient';
import { GET_POSTS } from '@/graphql/queries/post';

export default async function FeedPage() {
  const { data: postsData, error } = await query({
    query: GET_POSTS,
  });

  if (error || !postsData) return <>Something went wrong</>;

  return (
    <>
      {/* Create Post */}
      <CreateForm />

      {/* Posts Feed */}
      <Suspense fallback={<PostsSkeleton count={3} />}>
        <Posts posts={postsData.posts} />
      </Suspense>
    </>
  );
}
