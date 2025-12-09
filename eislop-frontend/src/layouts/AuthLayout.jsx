import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

const AuthLayout = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
