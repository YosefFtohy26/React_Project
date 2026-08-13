import { useTranslation } from "react-i18next";
import { Search, X } from "lucide-react";

export const SearchBar = ({ value, onChange, placeholder, className = "" }) => {
  const { t } = useTranslation();
  return (
    <div className={`search-bar position-relative ${className}`}>
      <Search size={18} className="search-bar-icon" />
      <input
        type="search"
        className="form-control search-bar-input ps-5"
        value={value}
        placeholder={placeholder || t("common.search_placeholder")}
        onChange={(e) => onChange(e.target.value)}
        aria-label={t("common.search")}
      />
      {value && (
        <button
          type="button"
          className="search-bar-clear"
          onClick={() => onChange("")}
          aria-label={t("common.search")}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};
