import { memo } from "react";
import styles from "./page-button.module.css";

type Props = {
  page: number;
  isActive: boolean;
  onClick: (page: number) => void;
};

export const PageButton = memo(({ page, isActive, onClick }: Props) => {
  const handleClick = () => {
    onClick(page);
  };

  return (
    <button
      onClick={handleClick}
      className={`${styles.button} ${isActive ? styles.active : ""}`}
      aria-label={`Go to page ${page}`}
    >
      {page}
    </button>
  );
});
