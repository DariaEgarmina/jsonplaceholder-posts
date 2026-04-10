import type { Post } from "../../types";
import styles from "./post-card.module.css";

type Props = {
  post: Post;
};

export const PostCard = ({ post }: Props) => {
  return (
    <li className={styles.postItem}>
      <h2 className={styles.postTitle}>{post.title}</h2>
      <p className={styles.postBody}>{post.body}</p>
    </li>
  );
};
