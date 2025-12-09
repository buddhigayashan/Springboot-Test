import { NavLink } from 'react-router-dom';
import { FiBox, FiTruck, FiCpu, FiBarChart2, FiLogOut, FiMenu } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth.js';

const links = [
  { to: '/', label: 'Overview', icon: FiBarChart2, end: true },
  { to: '/supply/products', label: 'Products', icon: FiBox },
  { to: '/supply/suppliers', label: 'Suppliers', icon: FiBox },
  { to: '/supply/purchase-orders', label: 'Purchase Orders', icon: FiBox },
  { to: '/fleet/vehicles', label: 'Vehicles', icon: FiTruck },
  { to: '/fleet/drivers', label: 'Drivers', icon: FiTruck },
  { to: '/fleet/deliveries', label: 'Deliveries', icon: FiTruck },
  { to: '/analytics', label: 'Analytics', icon: FiCpu }
];

const Sidebar = ({ collapsed, onToggle }) => {
  const { logout } = useAuth();
  const baseClass = 'fixed inset-y-0 left-0 z-40 flex h-full flex-col bg-secondary text-white transition-all duration-200 md:translate-x-0';
  const widthClass = collapsed ? 'w-20' : 'w-64';
  const mobileClass = collapsed ? 'max-md:-translate-x-full' : 'max-md:translate-x-0';

  return (
    <aside className={`${baseClass} ${widthClass} ${mobileClass}`}>
      <div className="flex items-center justify-between px-6 py-5">
        <span className={`text-lg font-semibold ${collapsed ? 'hidden' : 'block'}`}>EISLOP</span>
        <button
          type="button"
          onClick={onToggle}
          className="rounded bg-secondary p-2 text-white hover:bg-slate-700"
        >
          <FiMenu className="h-5 w-5" />
        </button>
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition hover:bg-slate-700 ${
                isActive ? 'bg-primary text-white' : 'text-slate-200'
              }`
            }
          >
            <Icon className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>
      <div className="px-3 py-4">
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700"
        >
          <FiLogOut className="h-5 w-5" />
          {!collapsed && <span>Log out</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
