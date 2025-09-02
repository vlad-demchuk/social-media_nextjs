import { Post } from '@/graphql/generated/graphql';
import { Item } from '@/features/posts/components/item';

interface Props {
  posts: Post[];
}

export const List = ({ posts }: Props) => {
  return (
    <section className="space-y-4">
      {posts.map((post) => (
        <Item
          key={post.id}
          post={post}
        />
      ))}
    </section>
  );
};
