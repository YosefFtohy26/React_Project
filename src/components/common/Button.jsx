import { Loader2 } from "lucide-react";

export const Button = ({
  children,
  variant = "primary",
  loading = false,
  disabled = false,
  className = "",
  type = "button",
  onClick,
  ...rest
}) => {
  const variantClass =
    variant === "outline" ? "btn-outline-primary" : "btn-primary";
  return (
    <button
      type={type}
      className={`btn ${variantClass} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...rest}
    >
      {loading && <Loader2 size={16} className="me-2 spinner" />}
      {children}
    </button>
  );
};
