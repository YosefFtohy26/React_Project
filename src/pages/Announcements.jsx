import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Megaphone } from "lucide-react";
import announcementsData from "../data/announcements.json";
import { useAsyncData } from "../hooks/useAsyncData";
import { SectionTitle } from "../components/common/SectionTitle";
import { SearchBar } from "../components/common/SearchBar";
import { Loading } from "../components/common/Loading";
import { EmptyState } from "../components/common/EmptyState";

const formatDate = (dateString, language) => {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString(language === "ar" ? "ar-EG" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const Announcements = () => {
  const { t, i18n } = useTranslation();
  const { data, loading, error, retry } = useAsyncData(announcementsData);
  const [search, setSearch] = useState("");

  const filteredAnnouncements = useMemo(() => {
    if (!data) return [];
    const query = search.trim().toLowerCase();
    if (!query) return data;
    return data.filter(
      (item) =>
        item.title[i18n.language].toLowerCase().includes(query) ||
        item.body[i18n.language].toLowerCase().includes(query)
    );
  }, [data, search, i18n.language]);

  return (
    <div className="page-section py-5">
      <div className="container">
        <SectionTitle
          title={t("announcements.title")}
          subtitle={t("announcements.subtitle")}
        />

        <div className="row justify-content-center mb-4">
          <div className="col-md-6 col-lg-5">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder={t("announcements.search_placeholder")}
            />
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : error ? (
          <EmptyState error onRetry={retry} />
        ) : filteredAnnouncements.length === 0 ? (
          <EmptyState message={t("announcements.no_announcements")} />
        ) : (
          <div className="announcements-list mx-auto">
            {filteredAnnouncements.map((item) => (
              <article
                key={item.id}
                className="card border-0 shadow-sm mb-3 announcement-item"
              >
                <div className="card-body p-4">
                  <div className="d-flex align-items-start gap-3">
                    <div className="announcement-icon">
                      <Megaphone size={22} />
                    </div>
                    <div>
                      <div className="d-flex flex-wrap gap-2 align-items-center mb-1">
                        <span className="badge rounded-pill announcement-category">
                          {item.category[i18n.language]}
                        </span>
                        <span className="announcement-date small text-muted">
                          {formatDate(item.date, i18n.language)}
                        </span>
                      </div>
                      <h3 className="h6 fw-bold announcement-title">
                        {item.title[i18n.language]}
                      </h3>
                      <p className="text-muted small mb-0 announcement-body">
                        {item.body[i18n.language]}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements;
