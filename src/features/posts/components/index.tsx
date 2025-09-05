import { query } from '@/lib/graphql/apolloClient';
import { GET_POSTS } from '@/graphql/queries/post';
import { List } from '@/features/posts/components/list';

export default async function Posts() {
  const { data: postsData, error } = await query({
    query: GET_POSTS,
  });

  if (error || !postsData?.posts) return <>Something went wrong</>;

  return <List posts={postsData.posts} />;
};
