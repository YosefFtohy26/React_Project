import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, GraduationCap } from "lucide-react";
import departmentsData from "../data/departments.json";
import { useAsyncData } from "../hooks/useAsyncData";
import { Loading } from "../components/common/Loading";
import { EmptyState } from "../components/common/EmptyState";

const DepartmentDetails = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const { data, loading, error, retry } = useAsyncData(departmentsData);
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

  const department = data?.find((item) => item.id === Number(id));

  if (!department) {
    return (
      <div className="page-section py-5">
        <div className="container">
          <EmptyState message={t("departments.not_found_text")} />
          <div className="text-center mt-3">
            <Link to="/departments" className="btn btn-primary">
              {t("departments.back")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-section py-5">
      <div className="container">
        <Link
          to="/departments"
          className="btn btn-link p-0 mb-4 department-back-link"
        >
          {isRtl ? <ArrowRight size={16} className="me-1" /> : <ArrowLeft size={16} className="me-1" />}
          {t("departments.back")}
        </Link>

        <div className="row align-items-start g-4">
          <div className="col-lg-8">
            <div className="department-details-icon mb-3">
              <GraduationCap size={40} />
            </div>
            <h1 className="h3 fw-bold department-details-title">
              {department.name[i18n.language]}
            </h1>
            <div className="accent-line mb-3"></div>

            <h2 className="h5 fw-bold mt-4">{t("departments.overview")}</h2>
            <p className="text-muted">{department.description[i18n.language]}</p>

            <h2 className="h5 fw-bold mt-4">{t("departments.courses")}</h2>
            <ul className="list-unstyled d-flex flex-column gap-2">
              {department.courses.map((course, index) => (
                <li key={index} className="course-list-item">
                  <span className="course-list-icon">▸</span>
                  {course[i18n.language]}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetails;
