const ChartCard = ({ title, description, children }) => (
  <div className="rounded-lg bg-white p-5 shadow-sm">
    <div className="mb-4">
      <h3 className="text-base font-semibold text-slate-700">{title}</h3>
      {description && <p className="text-xs text-slate-500">{description}</p>}
    </div>
    <div className="h-64">{children}</div>
  </div>
);

export default ChartCard;
