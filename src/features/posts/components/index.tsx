import { List } from '@/features/posts/components/list';
import { Post } from '@/graphql/generated/graphql';

interface Props {
  posts: Post[];
}

export default function Posts({ posts }: Props) {
  if (!posts?.length) {
    return <>There are no posts yet.</>;
  }

  return <List posts={posts} />;
}
