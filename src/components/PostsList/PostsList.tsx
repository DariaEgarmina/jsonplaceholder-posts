import { useState, useEffect } from "react";
import { api } from "../../services/api";
import type { Post } from "../../types";
import styles from "./PostsList.module.css";

export const PostsList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await api.getPosts();
        setPosts(data);
        setError(null);
      } catch (err) {
        setError("Failed to load posts");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading posts...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <ul className={styles.postsList}>
      {posts.map((post) => (
        <li key={post.id} className={styles.postItem}>
          <h2 className={styles.postTitle}>{post.title}</h2>
          <p className={styles.postBody}>{post.body}</p>
        </li>
      ))}
    </ul>
  );
};
