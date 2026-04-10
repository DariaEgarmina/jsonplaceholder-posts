import type { Post } from "../../types";
import styles from "./posts-list.module.css";
import { PostCard } from "../post-card/post-card";

type Props = {
  posts: Post[];
  loading: boolean;
  error: string | null;
};

export const PostsList = ({ posts, loading, error }: Props) => {
  if (loading) {
    return <div className={styles.loading}>Loading posts...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <>
      <ul className={styles.postsList}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ul>
    </>
  );
};
