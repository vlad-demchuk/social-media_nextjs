import { PostCreateForm, PostList } from '@/features/posts/components';
import { query } from '@/lib/graphql/apolloClient';
import { GET_POSTS } from '@/graphql/queries/post';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function FeedPage() {
  const { data: postsData, error } = await query({
    query: GET_POSTS,
    context: {
      fetchOptions: {
        cache: 'no-store',
      },
    },
  });

  if (error || !postsData) {
    throw new Error('Failed to fetch posts');
  }

  if (!postsData.posts?.length) {
    return (
      <>
        <PostCreateForm />
        <div>There are no posts yet.</div>
      </>
    );
  }

  return (
    <>
      <PostCreateForm />
      <PostList posts={postsData.posts} />
    </>
  );
}
