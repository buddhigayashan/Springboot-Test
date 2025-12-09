const intentClass = {
  primary: 'bg-primary',
  secondary: 'bg-slate-500',
  danger: 'bg-red-500'
};

const DataTable = ({ columns, data, actions }) => (
  <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
    <table className="min-w-full divide-y divide-slate-200 text-sm">
      <thead className="bg-slate-50">
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              scope="col"
              className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
            >
              {column.title}
            </th>
          ))}
          {actions && <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-slate-500">Actions</th>}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-200 bg-white">
        {data.map((row) => (
          <tr key={row.id} className="hover:bg-slate-50">
            {columns.map((column) => (
              <td key={column.key} className="whitespace-nowrap px-4 py-3 text-slate-600">
                {column.render ? column.render(row[column.dataIndex], row) : row[column.dataIndex]}
              </td>
            ))}
            {actions && (
              <td className="whitespace-nowrap px-4 py-3 text-right text-slate-600">
                {actions.map((action) => (
                  <button
                    key={action.label}
                    type="button"
                    onClick={() => action.onClick(row)}
                    className={`ml-2 rounded ${intentClass[action.intent ?? 'primary'] ?? 'bg-primary'} px-3 py-1 text-xs font-semibold text-white shadow hover:opacity-90`}
                  >
                    {action.label}
                  </button>
                ))}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default DataTable;
