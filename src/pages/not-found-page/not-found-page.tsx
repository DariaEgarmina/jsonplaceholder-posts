import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import styles from "./not-found-page.module.css";

export const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>The Daily Posts - Page not found</title>
      </Helmet>
      <div className={styles.container}>
        <h1 className={styles.code}>404</h1>
        <p className={styles.message}>Page not found</p>
        <Link to="/" className={styles.link}>
          Back to main page
        </Link>
      </div>
    </>
  );
};
