import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MapPin, Mail, ExternalLink } from "lucide-react"; // Cleaned imports

export const Footer = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  return (
    <footer className="footer-custom pt-5 pb-3 mt-auto">
      <div className="container">
        <div className="row g-4">
          {/* Column 1: College Info & Map */}
          <div className="col-12 col-md-4">
            <h5 className="fw-bold text-info mb-3">{t("college.name")}</h5>
            <p className="small text-light opacity-75">{t("college.sub")}</p>

            <div className="d-flex align-items-center mb-2">
              <MapPin size={18} className="me-2 ms-2 text-info" />
              <span className="small">{t("footer.address")}</span>
            </div>

            <div className="d-flex align-items-center mb-3">
              <Mail size={18} className="me-2 ms-2 text-info" />
              <a
                href={`mailto:${t("footer.email")}`}
                className="small text-white text-decoration-none"
              >
                {t("footer.email")}
              </a>
            </div>

            {isHomePage && (
              <div className="map-container mt-3">
                <iframe
                  title="FCDS Location Map"
                  src="https://maps.google.com/maps?q=31.209,29.932&z=15&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            )}
          </div>

          {/* Column 2: Important Links */}
          <div className="col-12 col-md-4">
            <h5 className="fw-bold text-info mb-3">
              {t("footer.important_links")}
            </h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a
                  href="https://www.alexu.edu.eg/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white text-decoration-none small d-flex align-items-center gap-2"
                >
                  <ExternalLink size={14} /> {t("footer.alex_univ")}
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://www.ekb.eg/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white text-decoration-none small d-flex align-items-center gap-2"
                >
                  <ExternalLink size={14} /> {t("footer.ekb")}
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://scholar.google.com.eg/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white text-decoration-none small d-flex align-items-center gap-2"
                >
                  <ExternalLink size={14} /> {t("footer.google_scholar")}
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://fldc.alexu.edu.eg/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white text-decoration-none small d-flex align-items-center gap-2"
                >
                  <ExternalLink size={14} /> {t("footer.fldc")}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Social & Directions */}
          <div className="col-12 col-md-4">
            <h5 className="fw-bold text-info mb-3">{t("footer.facebook")} </h5>
            <div className="d-flex gap-3 mb-3">
              <a
                href="https://www.facebook.com/FCDS.AlexU/?locale=ar_AR"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-info btn-sm rounded-circle p-2 d-flex align-items-center justify-content-center"
                aria-label="Facebook Page"
              >
                {/* Facebook Inline SVG */}
                <svg
                  width="18"
                  height="18"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
            <a
              href="https://share.google/aULjnnOyRuqycmmXB"
              target="_blank"
              rel="noreferrer"
              className="btn btn-info btn-sm text-dark fw-bold d-inline-flex align-items-center gap-2"
            >
              <MapPin size={16} />
              {t("footer.loc")}
            </a>
          </div>
        </div>

        <hr className="my-4 border-secondary" />

        <div className="text-center text-light opacity-50 small">
          <p className="mb-0">{t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
};
