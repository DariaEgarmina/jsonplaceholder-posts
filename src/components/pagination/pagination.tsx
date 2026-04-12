import { memo } from "react";
import styles from "./pagination.module.css";
import { generatePageNumbers } from "../../utils/pagination";
import { NavigationButton } from "../navigation-button/navigation-button";
import { PageButton } from "../page-button/page-button";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination = memo(
  ({ currentPage, totalPages, onPageChange }: Props) => {
    const pages = generatePageNumbers(totalPages);

    const handlePrevClick = () => {
      onPageChange(currentPage - 1);
    };

    const handleNextClick = () => {
      onPageChange(currentPage + 1);
    };

    return (
      <div className={styles.pagination}>
        <NavigationButton
          direction="prev"
          onClick={handlePrevClick}
          disabled={currentPage === 1}
        />

        {pages.map((page) => (
          <PageButton
            key={page}
            page={page}
            isActive={currentPage === page}
            onClick={onPageChange}
          />
        ))}

        <NavigationButton
          direction="next"
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
        />
      </div>
    );
  },
);
