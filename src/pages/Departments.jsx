import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import departmentsData from "../data/departments.json";
import { useAsyncData } from "../hooks/useAsyncData";
import { SectionTitle } from "../components/common/SectionTitle";
import { SearchBar } from "../components/common/SearchBar";
import { Loading } from "../components/common/Loading";
import { EmptyState } from "../components/common/EmptyState";
import { DepartmentCard } from "../components/cards/DepartmentCard";

const Departments = () => {
  const { t, i18n } = useTranslation();
  const { data, loading, error, retry } = useAsyncData(departmentsData);
  const [search, setSearch] = useState("");

  const filteredDepartments = useMemo(() => {
    if (!data) return [];
    const query = search.trim().toLowerCase();
    if (!query) return data;
    return data.filter((department) =>
      department.name[i18n.language].toLowerCase().includes(query)
    );
  }, [data, search, i18n.language]);

  return (
    <div className="page-section py-5">
      <div className="container">
        <SectionTitle
          title={t("departments.title")}
          subtitle={t("departments.subtitle")}
        />

        <div className="row justify-content-center mb-4">
          <div className="col-md-6 col-lg-5">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder={t("common.search_placeholder")}
            />
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : error ? (
          <EmptyState error onRetry={retry} />
        ) : filteredDepartments.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="row g-4">
            {filteredDepartments.map((department) => (
              <div className="col-md-6 col-lg-4" key={department.id}>
                <DepartmentCard department={department} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Departments;
