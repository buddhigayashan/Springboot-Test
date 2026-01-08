import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const Login = lazy(() => import('./pages/auth/Login.jsx'));
const Register = lazy(() => import('./pages/auth/Register.jsx'));
const Overview = lazy(() => import('./pages/dashboard/Overview.jsx'));
const Products = lazy(() => import('./pages/supply/Products.jsx'));
const Suppliers = lazy(() => import('./pages/supply/Suppliers.jsx'));
const PurchaseOrders = lazy(() => import('./pages/supply/PurchaseOrders.jsx'));
const Vehicles = lazy(() => import('./pages/fleet/Vehicles.jsx'));
const Drivers = lazy(() => import('./pages/fleet/Drivers.jsx'));
const Deliveries = lazy(() => import('./pages/fleet/Deliveries.jsx'));
const AnalyticsDashboard = lazy(() => import('./pages/analytics/AnalyticsDashboard.jsx'));

const routes = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { index: true, element: <Login /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> }
    ]
  },
  {
    path: '/',
    // element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <Overview /> },
          { path: 'supply/products', element: <Products /> },
          { path: 'supply/suppliers', element: <Suppliers /> },
          { path: 'supply/purchase-orders', element: <PurchaseOrders /> },
          { path: 'fleet/vehicles', element: <Vehicles /> },
          { path: 'fleet/drivers', element: <Drivers /> },
          { path: 'fleet/deliveries', element: <Deliveries /> },
          { path: 'analytics', element: <AnalyticsDashboard /> }
        ]
      }
    ]
  }
], {
  future: {
    v7_startTransition: true
  }
});

export default routes;
