import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { NewsCard } from "./NewsCard";

// Static Import
import newsDataRaw from "../../data/news_data.json";

// Derive data safely
const rawArray = newsDataRaw?.default || newsDataRaw;
const newsList = Array.isArray(rawArray) ? rawArray.slice(0, 3) : [];
const hasError = !Array.isArray(rawArray);

export const NewsSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-5 about-section ">
      <div className="container">
        {/* Section Header */}
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <h2 className="fw-bold text-primary-custom mb-1">
              {t("home.latest_news")}
            </h2>
            <div className="accent-line"></div>
          </div>
          <Link to="/news" className="btn btn-outline-primary rounded-3 btn-sm">
            {t("home.more_news")}
          </Link>
        </div>

        {/* Render Content */}
        {hasError ? (
          <div className="alert alert-danger text-center my-4">
            {t("home.news_error")}
          </div>
        ) : newsList.length === 0 ? (
          <div className="alert alert-info text-center my-4">
            {t("home.no_news")}
          </div>
        ) : (
          <div className="row g-4">
            {newsList.map((item) => (
              <div className="col-12 col-md-4" key={item.id}>
                <NewsCard newsItem={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
