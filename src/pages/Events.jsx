import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import eventsData from "../data/events.json";
import { useAsyncData } from "../hooks/useAsyncData";
import { SectionTitle } from "../components/common/SectionTitle";
import { Loading } from "../components/common/Loading";
import { EmptyState } from "../components/common/EmptyState";
import { EventCard } from "../components/cards/EventCard";

const Events = () => {
  const { t } = useTranslation();
  const { data, loading, error, retry } = useAsyncData(eventsData);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = useMemo(() => {
    if (!data) return [];
    return [...new Set(data.map((event) => event.category.en))];
  }, [data]);

  const filteredEvents = useMemo(() => {
    if (!data) return [];
    if (selectedCategory === "all") return data;
    return data.filter((event) => event.category.en === selectedCategory);
  }, [data, selectedCategory]);

  return (
    <div className="page-section py-5">
      <div className="container">
        <SectionTitle
          title={t("events.title")}
          subtitle={t("events.subtitle")}
        />

        {loading ? (
          <Loading />
        ) : error ? (
          <EmptyState error onRetry={retry} />
        ) : (
          <>
            <div className="d-flex justify-content-center flex-wrap gap-2 mb-4">
              <button
                type="button"
                className={`news-filter-tag ${selectedCategory === "all" ? "active" : ""}`}
                onClick={() => setSelectedCategory("all")}
              >
                {t("common.all")}
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`news-filter-tag ${selectedCategory === category ? "active" : ""}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {filteredEvents.length === 0 ? (
              <EmptyState message={t("events.no_events")} />
            ) : (
              <div className="row g-4">
                {filteredEvents.map((event) => (
                  <div className="col-md-6 col-lg-4" key={event.id}>
                    <EventCard event={event} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Events;
