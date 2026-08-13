import { useTranslation } from "react-i18next";
import { Inbox, AlertTriangle, RefreshCw } from "lucide-react";

export const EmptyState = ({ message, onRetry, error = false }) => {
  const { t } = useTranslation();
  const Icon = error ? AlertTriangle : Inbox;

  return (
    <div className="empty-state py-5 text-center">
      <Icon size={40} className={error ? "text-danger" : "text-muted"} />
      <p className="mt-3 mb-3 text-muted">
        {message || (error ? t("common.error") : t("common.empty"))}
      </p>
      {onRetry && (
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={onRetry}
        >
          <RefreshCw size={16} className="me-2" />
          {t("common.retry")}
        </button>
      )}
    </div>
  );
};
