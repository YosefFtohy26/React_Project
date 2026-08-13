import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function NewsCard({ news }) {
  const {t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const navigate = useNavigate();

  // Extract date from URL
  const extractDate = (url) => {
    const dateMatch = url.match(/(\d{4})-(\d{2})-(\d{2})/);
    if (dateMatch) {
      const [, year, month, day] = dateMatch;
      const date = new Date(`${year}-${month}-${day}`);
      return date.toLocaleDateString(
        i18n.language === "ar" ? "ar-EG" : "en-US",
        { year: "numeric", month: "short", day: "numeric" },
      );
    }
    return t("news.unknown_date");
  };

  const handleCardClick = () => {
    navigate(`/news/${news.id}`);
  };

  return (
    <article className="news-page-card">
      {/* Image Container */}
      <div className="news-page-card-image" onClick={handleCardClick}>
        <img
          src={news.images[0]}
          alt={news.title[i18n.language]}
          className="news-page-card-img"
        />
        <div className="news-page-card-category">
          {news.category[i18n.language]}
        </div>
      </div>

      {/* Content Container */}
      <div className="news-page-card-body" onClick={handleCardClick}>
        {/* Meta Header */}
        <div className="news-page-card-header">
          <span className="news-page-card-badge">
            {news.category[i18n.language]}
          </span>
          <span className="news-page-card-divider">•</span>
          <span className="news-page-card-date">{extractDate(news.url)}</span>
        </div>

        {/* Title */}
        <h3 className="news-page-card-title line-clamp-2">
          {news.title[i18n.language]}
        </h3>

        {/* Excerpt */}
        <p className="news-page-card-excerpt line-clamp-3">
          {news.body[i18n.language]}
        </p>

        {/* Footer */}
        <div
          className="news-page-card-footer"
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={handleCardClick} className="news-page-card-link">
            {t("news.read_more")}
            {isRtl ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
          </button>
        </div>
      </div>
    </article>
  );
}
