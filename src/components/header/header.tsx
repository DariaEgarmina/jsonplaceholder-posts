import { Link } from "react-router-dom";
import styles from "./header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.link} aria-label="Go to main page">
        <h1>The Daily Posts</h1>
      </Link>
      <p className={styles.subtitle}>News from verified sources</p>
    </header>
  );
};
