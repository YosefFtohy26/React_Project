import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import facultyData from "../data/faculty.json";
import { useAsyncData } from "../hooks/useAsyncData";
import { SectionTitle } from "../components/common/SectionTitle";
import { SearchBar } from "../components/common/SearchBar";
import { Loading } from "../components/common/Loading";
import { EmptyState } from "../components/common/EmptyState";
import { FacultyCard } from "../components/cards/FacultyCard";

const Faculty = () => {
  const { t, i18n } = useTranslation();
  const { data, loading, error, retry } = useAsyncData(facultyData);
  const [search, setSearch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const departments = useMemo(() => {
    if (!data) return [];
    return [...new Set(data.map((member) => member.department.en))];
  }, [data]);

  const filteredFaculty = useMemo(() => {
    if (!data) return [];
    const query = search.trim().toLowerCase();
    return data.filter((member) => {
      const matchesSearch =
        !query ||
        member.name[i18n.language].toLowerCase().includes(query) ||
        member.role[i18n.language].toLowerCase().includes(query);
      const matchesDepartment =
        selectedDepartment === "all" ||
        member.department.en === selectedDepartment;
      return matchesSearch && matchesDepartment;
    });
  }, [data, search, selectedDepartment, i18n.language]);

  return (
    <div className="page-section py-5">
      <div className="container">
        <SectionTitle
          title={t("faculty.title")}
          subtitle={t("faculty.subtitle")}
        />

        {loading ? (
          <Loading />
        ) : error ? (
          <EmptyState error onRetry={retry} />
        ) : (
          <>
            <div className="row justify-content-center mb-4 g-3">
              <div className="col-md-6 col-lg-5">
                <SearchBar
                  value={search}
                  onChange={setSearch}
                  placeholder={t("faculty.search_placeholder")}
                />
              </div>
              <div className="col-md-4 col-lg-3">
                <select
                  className="form-select"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  aria-label={t("common.filter")}
                >
                  <option value="all">{t("common.all")}</option>
                  {departments.map((department) => (
                    <option key={department} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {filteredFaculty.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="row g-4">
                {filteredFaculty.map((member) => (
                  <div className="col-md-6 col-lg-4 col-xl-3" key={member.id}>
                    <FacultyCard member={member} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Faculty;
