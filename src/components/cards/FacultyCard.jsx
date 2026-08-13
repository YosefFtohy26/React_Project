import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";

export const FacultyCard = ({ member }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRtl = i18n.language === "ar";

  const getInitials = (name) =>
    name
      .split(" ")
      .filter((word) => word.length > 0)
      .slice(0, 2)
      .map((word) => word[0])
      .join("");

  return (
    <article className="card h-100 border-0 shadow-sm faculty-card">
      <div className="card-body p-4 d-flex flex-column text-center">
        <div className="faculty-card-avatar mx-auto mb-3">
          {getInitials(member.name[i18n.language])}
        </div>
        <h3 className="h6 fw-bold faculty-card-name">
          {member.name[i18n.language]}
        </h3>
        <span className="faculty-card-role text-primary-custom small">
          {member.role[i18n.language]}
        </span>
        <span className="text-muted small mt-1">{member.department[i18n.language]}</span>
        <button
          type="button"
          className="btn btn-link p-0 mt-auto pt-3 faculty-card-link"
          onClick={() => navigate(`/faculty/${member.id}`)}
        >
          {t("common.view_details")}
          {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
        </button>
      </div>
    </article>
  );
};
