import { useTranslation } from "react-i18next";
import { BookOpen, Building2, Trophy, Users } from "lucide-react";

const stats = [
  { key: "programs", value: 6, icon: BookOpen },
  { key: "departments", value: 5, icon: Building2 },
  { key: "qs_rank", value: "QS", icon: Trophy, labelKey: "qs_rank_val" },
  { key: "grad_cohorts", value: 2, icon: Users },
];

export const StatsSection = () => {
  const { t } = useTranslation();

  return (
    <section className="stats-section py-5">
      <div className="container">
        <h2 className="fw-bold text-center text-primary-custom mb-4">
          {t("home.stats_title")}
        </h2>
        <div className="accent-line mx-auto mb-5"></div>
        <div className="row g-4 justify-content-center">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const labelKey = stat.labelKey || stat.key;
            return (
              <div className="col-6 col-md-3" key={stat.key}>
                <div className="stat-card text-center">
                  <Icon size={32} className="stat-card-icon mb-2" />
                  <div className="stat-card-value fw-bold display-6">
                    {stat.value}
                  </div>
                  <div className="stat-card-label text-muted">
                    {t(`stats.${labelKey}`)}
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
