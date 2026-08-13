import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight, ArrowLeft } from "lucide-react";

export const NewsCard = ({ newsItem }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.startsWith("ar") ? "ar" : "en";
  const isRtl = lang === "ar";

  if (!newsItem) return null;

  // Extract category, title, body for current language
  const category = newsItem.category?.[lang] || newsItem.category?.en || "";
  const title = newsItem.title?.[lang] || newsItem.title?.en || "";
  const body = newsItem.body?.[lang] || newsItem.body?.en || "";

  // Handle first image or fallback default
  const hasImages =
    Array.isArray(newsItem.images) && newsItem.images.length > 0;
  const cardImg = hasImages
    ? `/${newsItem.images[0]}`
    : "/images/hero-section-img.jpeg";

  return (
    <div className="news-card h-100 d-flex flex-column">
      {/* Image Header */}
      <div className="news-card-img-container">
        <img
          src={cardImg}
          alt={title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/hero-section-img.jpeg";
          }}
        />
      </div>

      {/* Card Content Body */}
      <div className="p-4 d-flex flex-column flex-grow-1">
        {category && (
          <span className="text-data-cyan fw-semibold small text-uppercase mb-2">
            {category}
          </span>
        )}

        <h5 className="fw-bold text-primary-custom mb-3 line-clamp-2">
          {title}
        </h5>

        <p className="small text-secondary mb-4 flex-grow-1 line-clamp-3">
          {body}
        </p>

        {/* Card Footer Action */}
        <div className="pt-3 border-top d-flex justify-content-between align-items-center mt-auto">
          <span className="small text-muted d-flex align-items-center gap-1">
            <Calendar size={14} />
            {newsItem.url?.match(/\d{4}-\d{2}-\d{2}/)?.[0] ||
              newsItem.url?.match(/20\d{2}/)?.[0] ||
              t("news.unknown_date")}
          </span>
          <Link
            to={`/news/${newsItem.id}`}
            className="text-primary-custom fw-semibold small text-decoration-none d-flex align-items-center gap-1"
          >
            <span>{t("home.read_more")}</span>
            {isRtl ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
          </Link>
        </div>
      </div>
    </div>
  );
};
