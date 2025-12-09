const FormInput = ({ label, name, type = 'text', value, onChange, placeholder, required, ...rest }) => (
  <label className="flex flex-col gap-1 text-sm text-slate-600">
    <span className="font-medium text-slate-700">{label}</span>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="rounded border border-slate-200 px-3 py-2 text-slate-700 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      {...rest}
    />
  </label>
);

export default FormInput;
