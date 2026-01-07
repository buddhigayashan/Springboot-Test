import axios from 'axios';

const isDev = typeof window !== 'undefined' && window.location.port === '5173';
const baseURL = isDev ? '/api' : (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8082');

const axiosInstance = axios.create({
  baseURL,
  timeout: 15000
});

axiosInstance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('eislop_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      window.localStorage.removeItem('eislop_token');
      if (!window.location.pathname.startsWith('/auth')) {
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error.response?.data || error);
  }
);

export default axiosInstance;
