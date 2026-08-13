import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import announcementsData from "../../data/announcements.json";

const rawArray = announcementsData?.default || announcementsData;
const announcementsList = Array.isArray(rawArray) ? rawArray.slice(0, 3) : [];

const formatDate = (dateString, language) => {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString(language === "ar" ? "ar-EG" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const AnnouncementsSection = () => {
  const { t, i18n } = useTranslation();

  if (announcementsList.length === 0) return null;

  return (
    <section className="announcements-section py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <h2 className="fw-bold text-primary-custom mb-1">
              {t("home.announcements")}
            </h2>
            <div className="accent-line"></div>
          </div>
          <Link
            to="/announcements"
            className="btn btn-outline-primary rounded-3 btn-sm"
          >
            {t("home.view_all")}
          </Link>
        </div>

        <div className="row g-4">
          {announcementsList.map((item) => (
            <div className="col-md-4" key={item.id}>
              <article className="card border-0 shadow-sm h-100 announcement-item">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <span className="badge rounded-pill announcement-category">
                      {item.category[i18n.language]}
                    </span>
                    <span className="small text-muted">
                      {formatDate(item.date, i18n.language)}
                    </span>
                  </div>
                  <h3 className="h6 fw-bold announcement-title">
                    {item.title[i18n.language]}
                  </h3>
                  <p className="text-muted small mb-0 line-clamp-2">
                    {item.body[i18n.language]}
                  </p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
