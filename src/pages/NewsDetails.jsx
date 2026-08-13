import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import newsData from "../data/news_data.json";

export default function NewsDetails() {
  const { id } = useParams();
  const { i18n, t } = useTranslation();
  const isRtl = i18n.language === "ar";
  const navigate = useNavigate();
  const news = newsData.find((item) => item.id === parseInt(id));

  if (!news) {
    return (
      <div className="container py-5 text-center">
        <h1>{t("news.not_found")}</h1>
        <button
          onClick={() => navigate("/news")}
          className="news-details-back-btn mt-3"
        >
          {isRtl ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
          <span>{t("news.back_to_news")}</span>
        </button>
      </div>
    );
  }

  const extractDate = (url) => {
    const dateMatch = url.match(/(\d{4})-(\d{2})-(\d{2})/);
    if (dateMatch) {
      const [, year, month, day] = dateMatch;
      return new Date(`${year}-${month}-${day}`).toLocaleDateString(
        i18n.language === "ar" ? "ar-EG" : "en-US",
        { year: "numeric", month: "long", day: "numeric" },
      );
    }
    return t("news.unknown_date");
  };

  return (
    <div>
      {/* Back Button */}
      <div className="container pt-4">
        <button
          onClick={() => navigate("/news")}
          className="news-details-back-btn"
        >
          <ArrowLeft size={20} />
          <span>{t("news.back")}</span>
        </button>
      </div>

      {/* Content Section */}
      <div className="container news-details-container">
        <article className="news-details-article">
          {/* Header */}
          <div className="news-details-header">
            <span className="news-details-badge">
              {news.category[i18n.language]}
            </span>
            <h1 className="news-details-title">{news.title[i18n.language]}</h1>

            <div className="news-details-date">{extractDate(news.url)}</div>
          </div>

          {/* Body Content */}
          <div className="news-details-body">
            <p className="news-details-intro">{news.body[i18n.language]}</p>
          </div>

          {/* Image Gallery */}
          {news.images && news.images.length > 0 && (
            <div className="news-details-gallery">
              <h2 className="news-details-gallery-title">
                {t("news.gallery")}
              </h2>
              <div className="news-details-gallery-grid">
                {news.images.map((img, index) => (
                  <div key={index} className="news-details-gallery-item">
                    <img
                      src={`/${img}`}
                      alt={`${news.title[i18n.language]} - ${t("news.image")} ${index + 1}`}
                      className="news-details-gallery-img"
                      onError={(e) => {
                        console.error(`Failed to load image: /${img}`);
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
