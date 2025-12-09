const Loader = ({ message = 'Loading...' }) => (
  <div className="flex h-full w-full items-center justify-center">
    <div className="flex flex-col items-center gap-3 text-slate-500">
      <span className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  </div>
);

export default Loader;
