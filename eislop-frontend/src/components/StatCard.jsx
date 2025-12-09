const StatCard = ({ title, value, delta, icon: Icon, color = 'bg-primary' }) => (
  <div className="rounded-lg bg-white p-5 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-sm font-medium text-slate-500">{title}</h3>
        <p className="mt-2 text-2xl font-semibold text-slate-800">{value}</p>
        {delta && <p className="mt-1 text-xs text-emerald-500">{delta}</p>}
      </div>
      {Icon && (
        <div className={`rounded-full p-3 text-white ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
      )}
    </div>
  </div>
);

export default StatCard;
