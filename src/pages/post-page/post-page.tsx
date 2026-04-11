import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import styles from "./post-page.module.css";
import type { Post } from "../../types";
import { api } from "../../services/api";

export const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await api.getPostById(Number(id));
        setPost(data);
        setError(null);
      } catch (err) {
        setError("Failed to load post");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <div className={styles.loading}>Loading post...</div>;
  }

  if (error || !post) {
    return (
      <div className={styles.error}>
        <p>{error || "Post not found"}</p>
        <Link to="/" className={styles.backLink}>
          Back to main page
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | The Daily Posts</title>
      </Helmet>

      <div className={styles.container}>
        <Link to="/" className={styles.backLink}>
          ← Back to all posts
        </Link>

        <article className={styles.post}>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.body}>{post.body}</p>
        </article>
      </div>
    </>
  );
};
