import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import Loader from './Loader.jsx';

const ProtectedRoute = ({ allowedRoles }) => {
  const { loading } = useAuth();
  if (loading) {
    return <Loader message="Loading..." />;
  }
  // Auth disabled: always allow
  return <Outlet />;
};

export default ProtectedRoute;
