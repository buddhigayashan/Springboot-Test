import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/tailwind.css';
import { AuthProvider } from './context/AuthContext.jsx';
import { AnalyticsProvider } from './context/AnalyticsContext.jsx';
import { Toaster } from 'react-hot-toast';
import './config/chartjs.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <AnalyticsProvider>
        <App />
        <Toaster position="top-right" />
      </AnalyticsProvider>
    </AuthProvider>
  </React.StrictMode>
);
