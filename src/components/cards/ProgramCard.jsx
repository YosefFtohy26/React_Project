import { useTranslation } from "react-i18next";
import { BookOpen, Clock } from "lucide-react";

export const ProgramCard = ({ program }) => {
  const { t, i18n } = useTranslation();

  return (
    <article className="card h-100 border-0 shadow-sm program-card">
      <div className="card-body p-4 d-flex flex-column">
        <span className="badge rounded-pill mb-2 program-card-type">
          {t(program.type.en === "Bachelor" ? "programs.bachelor" : "programs.postgraduate")}
        </span>
        <h3 className="h5 fw-bold program-card-name">
          {program.name[i18n.language]}
        </h3>
        <p className="card-text text-muted program-card-desc">
          {program.description[i18n.language]}
        </p>
        <div className="d-flex align-items-center mt-2 program-card-meta">
          <BookOpen size={16} className="me-1 text-muted" />
          <span className="text-muted small">
            {t("programs.type")}: {program.type[i18n.language]}
          </span>
        </div>
        <div className="d-flex align-items-center mt-1 program-card-meta">
          <Clock size={16} className="me-1 text-muted" />
          <span className="text-muted small">
            {t("programs.duration")}: {program.duration[i18n.language]}
          </span>
        </div>
      </div>
    </article>
  );
};
