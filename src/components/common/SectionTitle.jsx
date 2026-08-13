export const SectionTitle = ({ title, subtitle, centered = true }) => {
  return (
    <div className={`section-title-wrapper ${centered ? "text-center" : ""}`}>
      <h2 className="section-title">{title}</h2>
      <div className="accent-line mx-auto"></div>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
};
