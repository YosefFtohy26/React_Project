import { useTranslation } from "react-i18next";
import { SectionTitle } from "../components/common/SectionTitle";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="page-section py-5">
      <div className="container">
        <SectionTitle
          title={t("about.title")}
          subtitle={t("about.subtitle")}
        />

        <div className="row g-4 mb-5">
          <div className="col-lg-6">
            <h2 className="h5 fw-bold">{t("about.intro_title")}</h2>
            <p className="text-muted">{t("about.intro_text")}</p>
          </div>
          <div className="col-lg-6">
            <img
              src="src/assets/images/grid-img-1.webp"
              alt={t("about.intro_title")}
              className="img-fluid rounded shadow-sm"
            />
          </div>
        </div>

        <div className="row g-4">
          <div className="col-md-6">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body p-4">
                <h2 className="h5 fw-bold">{t("about.mission_title")}</h2>
                <p className="text-muted mb-0">{t("about.mission_text")}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body p-4">
                <h2 className="h5 fw-bold">{t("about.vision_title")}</h2>
                <p className="text-muted mb-0">{t("about.vision_text")}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4 mt-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h2 className="h5 fw-bold">{t("about.history_title")}</h2>
                <p className="text-muted mb-0">{t("about.history_text")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
