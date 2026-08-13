import { useTranslation } from "react-i18next";
import { Loader2 } from "lucide-react";

export const Loading = ({ message }) => {
  const { t } = useTranslation();
  return (
    <div className="loading-state py-5 text-center" role="status" aria-live="polite">
      <Loader2 size={32} className="spinner text-primary-custom" />
      <p className="mt-3 mb-0 text-muted">{message || t("common.loading")}</p>
    </div>
  );
};
