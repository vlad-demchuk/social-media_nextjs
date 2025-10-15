import Posts from '@/features/posts/components';
import { CreateForm } from '@/features/posts/components/create-form';
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

  return (
    <>
      <CreateForm />
      <Posts posts={postsData.posts} />
    </>
  );
}
