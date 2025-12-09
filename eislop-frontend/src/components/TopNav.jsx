import { FiMenu, FiMoon, FiSun } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth.js';

const TopNav = ({ onMenuToggle }) => {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 shadow-sm dark:bg-slate-900 dark:text-slate-100">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuToggle}
          className="rounded bg-primary p-2 text-white shadow hover:bg-blue-600 md:hidden"
        >
          <FiMenu className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-semibold text-slate-700">Enterprise Intelligent Supply Chain & Logistics Orchestration Platform</h1>
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className="rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-slate-200"
        >
          {darkMode ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
        </button>
        <div className="flex flex-col text-right text-sm text-slate-600 dark:text-slate-300">
          <span className="font-medium text-slate-700 dark:text-white">{user?.name ?? 'Team Member'}</span>
          <span className="text-xs uppercase text-slate-400 dark:text-slate-500">{user?.role ?? 'Role TBD'}</span>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
