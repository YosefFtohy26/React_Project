import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="container py-5 text-center">
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <p className="fs-4">{t("notfound.title")}</p>
      <p className="text-muted">{t("notfound.text")}</p>
      <Link to="/" className="btn btn-primary">
        {t("notfound.back_home")}
      </Link>
    </div>
  );
};

export default NotFound;
