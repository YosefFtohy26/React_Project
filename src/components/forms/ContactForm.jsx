import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CheckCircle2 } from "lucide-react";
import { validateContact } from "../../utils/validation";

const initialValues = { name: "", email: "", phone: "", message: "" };

export const ContactForm = () => {
  const { t } = useTranslation();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateContact(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setValues(initialValues);
    }, 1200);
  };

  if (status === "success") {
    return (
      <div className="contact-form-success text-center py-5">
        <CheckCircle2 size={48} className="text-success mb-3" />
        <h3 className="h5 fw-bold">{t("contact.success_title")}</h3>
        <p className="text-muted">{t("contact.success_text")}</p>
        <button
          type="button"
          className="btn btn-outline-primary mt-2"
          onClick={() => setStatus("idle")}
        >
          {t("contact.send_another")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="row g-3">
        <div className="col-md-6">
          <label htmlFor="contact-name" className="form-label">
            {t("contact.name")} *
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            value={values.name}
            onChange={handleChange}
            placeholder={t("contact.name")}
          />
          {errors.name && (
            <div className="invalid-feedback d-block">{t(errors.name)}</div>
          )}
        </div>

        <div className="col-md-6">
          <label htmlFor="contact-email" className="form-label">
            {t("contact.email")} *
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={values.email}
            onChange={handleChange}
            placeholder={t("contact.email")}
          />
          {errors.email && (
            <div className="invalid-feedback d-block">{t(errors.email)}</div>
          )}
        </div>

        <div className="col-12">
          <label htmlFor="contact-phone" className="form-label">
            {t("contact.phone")} *
          </label>
          <input
            id="contact-phone"
            type="tel"
            name="phone"
            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
            value={values.phone}
            onChange={handleChange}
            placeholder={t("contact.phone")}
          />
          {errors.phone && (
            <div className="invalid-feedback d-block">{t(errors.phone)}</div>
          )}
        </div>

        <div className="col-12">
          <label htmlFor="contact-message" className="form-label">
            {t("contact.message")} *
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows="5"
            className={`form-control ${errors.message ? "is-invalid" : ""}`}
            value={values.message}
            onChange={handleChange}
            placeholder={t("contact.message")}
          />
          {errors.message && (
            <div className="invalid-feedback d-block">{t(errors.message)}</div>
          )}
        </div>

        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary px-4"
            disabled={status === "sending"}
          >
            {status === "sending"
              ? t("contact.sending")
              : t("contact.submit")}
          </button>
        </div>
      </div>
    </form>
  );
};
