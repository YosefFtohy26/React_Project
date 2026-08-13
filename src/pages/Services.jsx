import { useTranslation } from "react-i18next";
import {
  Users,
  Library,
  MonitorPlay,
  Briefcase,
  Headset,
  HeartPulse,
  BadgeCheck,
  PartyPopper,
} from "lucide-react";
import servicesData from "../data/services.json";
import { useAsyncData } from "../hooks/useAsyncData";
import { SectionTitle } from "../components/common/SectionTitle";
import { Loading } from "../components/common/Loading";
import { EmptyState } from "../components/common/EmptyState";

const serviceIcons = [
  Users,
  Library,
  MonitorPlay,
  Briefcase,
  Headset,
  HeartPulse,
  BadgeCheck,
  PartyPopper,
];

const Services = () => {
  const { t, i18n } = useTranslation();
  const { data, loading, error, retry } = useAsyncData(servicesData);

  return (
    <div className="page-section py-5">
      <div className="container">
        <SectionTitle
          title={t("services.title")}
          subtitle={t("services.subtitle")}
        />

        {loading ? (
          <Loading />
        ) : error ? (
          <EmptyState error onRetry={retry} />
        ) : !data || data.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="row g-4">
            {data.map((service, index) => {
              const Icon = serviceIcons[index % serviceIcons.length];
              return (
                <div className="col-md-6 col-lg-4 col-xl-3" key={service.id}>
                  <div className="card h-100 border-0 shadow-sm service-card">
                    <div className="card-body p-4 text-center">
                      <div className="service-card-icon mx-auto mb-3">
                        <Icon size={30} />
                      </div>
                      <h3 className="h6 fw-bold service-card-title">
                        {service.title[i18n.language]}
                      </h3>
                      <p className="card-text text-muted small service-card-desc">
                        {service.description[i18n.language]}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
