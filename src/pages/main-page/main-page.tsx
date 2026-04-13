import { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import styles from "./main-page.module.css";
import type { Post } from "@/types";
import { POSTS_PER_PAGE } from "./const";
import { api } from "@/services/api";
import { PostsList } from "@/components/posts-list/posts-list";
import { Pagination } from "@/components/pagination/pagination";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";

export const MainPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  // Восстанавливает страницу, на которой пользователь был до перехода на страницу поста
  useEffect(() => {
    const savedPage = localStorage.getItem("currentPage");
    if (savedPage) {
      setCurrentPage(Number(savedPage));
    }
  }, []);

  // Эффект срабатывает при смене currentPage — загружается новая порция постов.
  // Зависимость [currentPage] гарантирует, что запрос всегда актуален.
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { posts: fetchedPosts, totalCount } = await api.getPostsPage(
          currentPage,
          POSTS_PER_PAGE,
        );
        setPosts(fetchedPosts);
        setTotalPages(Math.ceil(totalCount / POSTS_PER_PAGE));
        setError(null);
      } catch (err) {
        setError("Failed to load posts");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [currentPage]);

  // Мемоизирует функцию, чтобы избежать лишних перерендеров Pagination
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    localStorage.setItem("currentPage", String(page));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Helmet>
        <title>The Daily Posts - News from verified sources</title>
      </Helmet>
      <div className={styles.page}>
        <Header />

        <main className={styles.main}>
          <PostsList posts={posts} loading={loading} error={error} />

          {!loading && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};
