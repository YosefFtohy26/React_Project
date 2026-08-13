import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, User, Mail, Award } from "lucide-react";
import facultyData from "../data/faculty.json";
import { useAsyncData } from "../hooks/useAsyncData";
import { Loading } from "../components/common/Loading";
import { EmptyState } from "../components/common/EmptyState";

const FacultyDetails = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const { data, loading, error, retry } = useAsyncData(facultyData);
  const isRtl = i18n.language === "ar";

  if (loading) {
    return (
      <div className="page-section py-5">
        <div className="container"><Loading /></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-section py-5">
        <div className="container">
          <EmptyState error onRetry={retry} />
        </div>
      </div>
    );
  }

  const member = data?.find((item) => item.id === Number(id));

  if (!member) {
    return (
      <div className="page-section py-5">
        <div className="container">
          <EmptyState message={t("faculty.not_found_text")} />
          <div className="text-center mt-3">
            <Link to="/faculty" className="btn btn-primary">
              {t("faculty.back")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getInitials = (name) =>
    name
      .split(" ")
      .filter((word) => word.length > 0)
      .slice(0, 2)
      .map((word) => word[0])
      .join("");

  return (
    <div className="page-section py-5">
      <div className="container">
        <Link to="/faculty" className="btn btn-link p-0 mb-4 faculty-back-link">
          {isRtl ? <ArrowRight size={16} className="me-1" /> : <ArrowLeft size={16} className="me-1" />}
          {t("faculty.back")}
        </Link>

        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 p-md-5">
            <div className="row g-4 align-items-center">
              <div className="col-md-auto text-center">
                <div className="faculty-details-avatar mx-auto">
                  {getInitials(member.name[i18n.language])}
                </div>
              </div>
              <div className="col-md">
                <h1 className="h3 fw-bold mb-1">{member.name[i18n.language]}</h1>
                <p className="text-primary-custom fw-semibold mb-2">
                  {member.role[i18n.language]}
                </p>
                <div className="faculty-details-meta d-flex flex-column gap-2">
                  <span className="d-flex align-items-center gap-2 text-muted">
                    <Award size={18} />
                    {member.department[i18n.language]}
                  </span>
                  <a
                    href={`mailto:${member.email}`}
                    className="d-flex align-items-center gap-2 text-decoration-none"
                  >
                    <Mail size={18} />
                    {member.email}
                  </a>
                </div>
              </div>
            </div>

            <hr className="my-4" />

            <div>
              <h2 className="h5 fw-bold mb-3">
                <User size={20} className="me-2" />
                {t("faculty.interests")}
              </h2>
              <p className="text-muted mb-0">{member.interests[i18n.language]}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDetails;
