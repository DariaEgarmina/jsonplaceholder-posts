import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import styles from './main-page.module.css';
import type { Post } from "../../types";
import { POSTS_PER_PAGE } from "./const";
import { calculateTotalPages, getCurrentPosts } from "../../utils/pagination";
import { api } from "../../services/api";
import { PostsList } from "../../components/posts-list/posts-list";
import { Pagination } from "../../components/pagination/pagination";

export const MainPage = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await api.getPosts();
        setAllPosts(data);
      } catch (err) {
        setError("Failed to load posts");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const totalPages = calculateTotalPages(allPosts.length, POSTS_PER_PAGE);
  const currentPosts = getCurrentPosts(allPosts, currentPage, POSTS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Helmet>
        <title>The Daily Posts - News from verified sources</title>
      </Helmet>
      <div className={styles.app}>
        <header className={styles.header}>
          <h1>The Daily Posts</h1>
          <p className={styles.subtitle}>News from verified sources</p>
        </header>

        <main className={styles.main}>
          <PostsList posts={currentPosts} loading={loading} error={error} />

          {!loading && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </main>

        <footer className={styles.footer}>
          <p>© 2026 The Daily Posts | All rights reserved</p>
        </footer>
      </div>
    </>
  );
};
