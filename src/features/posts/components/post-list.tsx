import { Post } from '@/graphql/generated/graphql';
import { PostItem } from './post-item';

interface Props {
  posts: Post[];
}

export const PostList = ({ posts }: Props) => {
  return (
    <section className="space-y-4">
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
        />
      ))}
    </section>
  );
};
