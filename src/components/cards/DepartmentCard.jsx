import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { GraduationCap, ArrowRight, ArrowLeft } from "lucide-react";

export const DepartmentCard = ({ department }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRtl = i18n.language === "ar";

  return (
    <article className="card h-100 border-0 shadow-sm department-card">
      <div className="card-body p-4 d-flex flex-column">
        <div className="department-card-icon mb-3">
          <GraduationCap size={28} />
        </div>
        <h3 className="h5 fw-bold department-card-name">
          {department.name[i18n.language]}
        </h3>
        <p className="card-text text-muted department-card-desc">
          {department.description[i18n.language]}
        </p>
        <button
          type="button"
          className="btn btn-link p-0 mt-auto department-card-link"
          onClick={() => navigate(`/departments/${department.id}`)}
        >
          {t("common.view_details")}
          {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
        </button>
      </div>
    </article>
  );
};
