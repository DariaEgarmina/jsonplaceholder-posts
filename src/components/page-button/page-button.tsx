import styles from "./page-button.module.css";

type Props = {
  page: number;
  isActive: boolean;
  onClick: () => void;
};

export const PageButton = ({ page, isActive, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${isActive ? styles.active : ""}`}
    >
      {page}
    </button>
  );
};
