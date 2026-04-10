import styles from "./navigation-button.module.css";

type Props = {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
};

export const NavigationButton = ({ direction, onClick, disabled }: Props) => {
  const label = direction === "prev" ? "Prev" : "Next";

  return (
    <button onClick={onClick} disabled={disabled} className={styles.button}>
      {label}
    </button>
  );
};
