import { useTranslation } from "react-i18next";
import { MapPin, Mail, Clock } from "lucide-react";
import { SectionTitle } from "../components/common/SectionTitle";
import { ContactForm } from "../components/forms/ContactForm";

const Contact = () => {
  const { t } = useTranslation();

  return (
    <div className="page-section py-5">
      <div className="container">
        <SectionTitle
          title={t("contact.title")}
          subtitle={t("contact.subtitle")}
        />

        <div className="row g-5">
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 p-md-5">
                <h2 className="h5 fw-bold mb-4">{t("contact.form_title")}</h2>
                <ContactForm />
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <h2 className="h5 fw-bold mb-4">{t("contact.info_title")}</h2>
            <div className="d-flex flex-column gap-4">
              <div className="d-flex align-items-start gap-3">
                <div className="contact-info-icon">
                  <MapPin size={22} />
                </div>
                <div>
                  <h3 className="h6 fw-bold mb-1">{t("footer.address")}</h3>
                  <p className="text-muted mb-0">{t("contact.address")}</p>
                </div>
              </div>
              <div className="d-flex align-items-start gap-3">
                <div className="contact-info-icon">
                  <Mail size={22} />
                </div>
                <div>
                  <h3 className="h6 fw-bold mb-1">{t("faculty.email")}</h3>
                  <p className="text-muted mb-0">{t("footer.email")}</p>
                </div>
              </div>
              <div className="d-flex align-items-start gap-3">
                <div className="contact-info-icon">
                  <Clock size={22} />
                </div>
                <div>
                  <h3 className="h6 fw-bold mb-1">{t("contact.working_hours")}</h3>
                  <p className="text-muted mb-0">
                    {t("contact.working_hours_value")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
