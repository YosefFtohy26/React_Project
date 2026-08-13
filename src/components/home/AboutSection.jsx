import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import gridImg1 from "../../assets/images/grid-img-1.webp";
import gridImg2 from "../../assets/images/grid-img-2.jpg";
import gridImg3 from "../../assets/images/grid-img-3.jpg";

export const AboutSection = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  return (
    <section className="py-5 container">
      <div className="row g-4 align-items-center">
        {/* Left Column: Text */}
        <div className="col-12 col-lg-6">
          <h2 className="fw-bold text-primary-custom mb-2">
            {t("home.about_title")}
          </h2>
          <div className="accent-line mb-4"></div>
          <p className="text-secondary lh-lg mb-4">{t("home.about_text")}</p>
          <Link
            to="/about"
            className="text-primary-custom fw-bold text-decoration-none d-inline-flex align-items-center gap-2"
          >
            <span>{t("home.learn_more")}</span>
            {isRtl ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
          </Link>
        </div>

        {/* Right Column: Image Grid */}
        <div className="col-12 col-lg-6">
          <div className="grid-container">
            <div
              className="grid-item-main grid-img-wrapper"
              style={{ height: "380px" }}
            >
              <img src={gridImg1} alt="FCDS Building" />
            </div>
            <div className="grid-item-side">
              <div className="grid-img-wrapper" style={{ height: "182px" }}>
                <img src={gridImg2} alt="Student Team" />
              </div>
              <div className="grid-img-wrapper" style={{ height: "182px" }}>
                <img src={gridImg3} alt="Faculty Event" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
