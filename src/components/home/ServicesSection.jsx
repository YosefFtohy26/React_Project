import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
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
import servicesData from "../../data/services.json";

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

const rawArray = servicesData?.default || servicesData;
const servicesList = Array.isArray(rawArray) ? rawArray.slice(0, 4) : [];

export const ServicesSection = () => {
  const { t, i18n } = useTranslation();

  if (servicesList.length === 0) return null;

  return (
    <section className="services-section py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <h2 className="fw-bold text-primary-custom mb-1">
              {t("home.services")}
            </h2>
            <div className="accent-line"></div>
          </div>
          <Link
            to="/services"
            className="btn btn-outline-primary rounded-3 btn-sm"
          >
            {t("home.view_all")}
          </Link>
        </div>

        <div className="row g-4">
          {servicesList.map((service, index) => {
            const Icon = serviceIcons[index % serviceIcons.length];
            return (
              <div className="col-md-6 col-lg-3" key={service.id}>
                <div className="card h-100 border-0 shadow-sm service-card">
                  <div className="card-body p-4 text-center">
                    <div className="service-card-icon mx-auto mb-3">
                      <Icon size={30} />
                    </div>
                    <h3 className="h6 fw-bold service-card-title">
                      {service.title[i18n.language]}
                    </h3>
                    <p className="card-text text-muted small line-clamp-3 mb-0">
                      {service.description[i18n.language]}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
