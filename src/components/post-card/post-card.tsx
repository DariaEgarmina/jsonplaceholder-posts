import { Link } from "react-router-dom";
import type { Post } from "@/types";
import styles from "./post-card.module.css";

type Props = {
  post: Post;
};

export const PostCard = ({ post }: Props) => {
  return (
    <li className={styles.postItem}>
      <Link to={`/post/${post.id}`} className={styles.link}>
        <h2 className={styles.postTitle}>{post.title}</h2>
      </Link>
      <p className={styles.postBody}>{post.body}</p>
    </li>
  );
};
