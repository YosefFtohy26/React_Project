import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";

const getPageNumbers = (current, total) => {
  if (total <= 5) {
    return [...Array(total)].map((_, i) => i + 1);
  }
  if (current <= 3) {
    return [1, 2, 3, 4, 5];
  }
  if (current >= total - 2) {
    return [total - 4, total - 3, total - 2, total - 1, total];
  }
  return [current - 2, current - 1, current, current + 1, current + 2];
};

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const { t } = useTranslation();
  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers(currentPage, totalPages);
  const isRtl = window.document.documentElement.dir === "rtl";

  return (
    <nav className="news-pagination" aria-label="pagination">
      <div className="pagination-controls">
        <button
          type="button"
          className="pagination-btn"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label={t("news.prev")}
        >
          {isRtl ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        {pageNumbers.map((page) => (
          <button
            key={page}
            type="button"
            className={`pagination-btn ${currentPage === page ? "active" : ""}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          className="pagination-btn pagination-next"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label={t("news.next")}
        >
          {t("news.next")}
          {isRtl ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>
    </nav>
  );
};
