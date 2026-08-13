import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import programsData from "../data/programs.json";
import { useAsyncData } from "../hooks/useAsyncData";
import { SectionTitle } from "../components/common/SectionTitle";
import { Loading } from "../components/common/Loading";
import { EmptyState } from "../components/common/EmptyState";
import { ProgramCard } from "../components/cards/ProgramCard";

const Programs = () => {
  const { t } = useTranslation();
  const { data, loading, error, retry } = useAsyncData(programsData);
  const [selectedType, setSelectedType] = useState("all");

  const types = useMemo(() => {
    if (!data) return [];
    return [...new Set(data.map((program) => program.type.en))];
  }, [data]);

  const filteredPrograms = useMemo(() => {
    if (!data) return [];
    if (selectedType === "all") return data;
    return data.filter((program) => program.type.en === selectedType);
  }, [data, selectedType]);

  return (
    <div className="page-section py-5">
      <div className="container">
        <SectionTitle
          title={t("programs.title")}
          subtitle={t("programs.subtitle")}
        />

        {loading ? (
          <Loading />
        ) : error ? (
          <EmptyState error onRetry={retry} />
        ) : (
          <>
            <div className="d-flex justify-content-center flex-wrap gap-2 mb-4">
              <button
                type="button"
                className={`news-filter-tag ${selectedType === "all" ? "active" : ""}`}
                onClick={() => setSelectedType("all")}
              >
                {t("common.all")}
              </button>
              {types.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`news-filter-tag ${selectedType === type ? "active" : ""}`}
                  onClick={() => setSelectedType(type)}
                >
                  {t(type === "Bachelor" ? "programs.bachelor" : "programs.postgraduate")}
                </button>
              ))}
            </div>

            {filteredPrograms.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="row g-4">
                {filteredPrograms.map((program) => (
                  <div className="col-md-6 col-lg-4" key={program.id}>
                    <ProgramCard program={program} />
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

export default Programs;
