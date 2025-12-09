const SelectInput = ({ label, name, value, onChange, options = [], required, placeholder }) => (
  <label className="flex flex-col gap-1 text-sm text-slate-600">
    <span className="font-medium text-slate-700">{label}</span>
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="rounded border border-slate-200 px-3 py-2 text-slate-700 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </label>
);

export default SelectInput;
