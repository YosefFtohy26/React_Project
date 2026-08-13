import { useTranslation } from "react-i18next";
import { Clock, MapPin } from "lucide-react";

const formatDate = (dateString, language) => {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString(language === "ar" ? "ar-EG" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const EventCard = ({ event }) => {
  const { i18n } = useTranslation();

  return (
    <article className="card h-100 border-0 shadow-sm event-card">
      <div className="card-body p-4 d-flex flex-column">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <span className="badge rounded-pill event-card-category">
            {event.category[i18n.language]}
          </span>
          <div className="text-center event-card-date-badge">
            <span className="d-block event-card-date-day">
              {formatDate(event.date, i18n.language).split(" ")[0]}
            </span>
            <span className="d-block small text-muted">
              {formatDate(event.date, i18n.language)}
            </span>
          </div>
        </div>
        <h3 className="h5 fw-bold event-card-title">
          {event.title[i18n.language]}
        </h3>
        <p className="card-text text-muted event-card-desc">
          {event.description[i18n.language]}
        </p>
        <div className="d-flex align-items-center mt-auto pt-3 event-card-meta">
          <div className="me-3">
            <Clock size={16} className="me-1 text-primary-custom" />
            <span className="small">{event.time[i18n.language]}</span>
          </div>
          <div>
            <MapPin size={16} className="me-1 text-primary-custom" />
            <span className="small">{event.location[i18n.language]}</span>
          </div>
        </div>
      </div>
    </article>
  );
};
