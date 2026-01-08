import axios from 'axios';

const isDev = typeof window !== 'undefined' && window.location.port === '5173';
// In dev, let service paths include '/api' and keep baseURL empty so we don't get '/api/api/...'
const baseURL = isDev ? '' : (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8082');

const axiosInstance = axios.create({
  baseURL,
  timeout: 15000
});

// Dev request logging
axiosInstance.interceptors.request.use((config) => {
  try {
    const method = (config.method || 'GET').toUpperCase();
    const url = config.baseURL ? `${config.baseURL}${config.url}` : config.url;
    // Only log in dev
    if (isDev) {
      console.info('[HTTP] ->', method, url, { params: config.params });
    }
  } catch (_) {
    // ignore logging errors
  }
  return config;
});

// No auth headers; JWT removed
// axiosInstance.interceptors.request.use((config) => config);

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status;
    const method = error.config?.method?.toUpperCase();
    const url = error.config?.baseURL ? `${error.config.baseURL}${error.config.url}` : error.config?.url;
    const message = error.response?.data?.message || error.message;
    if (isDev) {
      console.error('[HTTP] x', status, method, url, message, {
        data: error.response?.data,
        params: error.config?.params
      });
    }

    // No redirect on 401; auth is disabled
    return Promise.reject(error.response?.data || error);
  }
);

export default axiosInstance;
