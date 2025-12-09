import axiosInstance from './axiosInstance.js';

const analyticsService = {
  fetchSummary: () => axiosInstance.get('/api/analytics/summary'),
  fetchDeliveryPerformance: () => axiosInstance.get('/api/analytics/delivery-performance'),
  fetchInventorySummary: () => axiosInstance.get('/api/analytics/inventory'),
  exportReport: (type) => axiosInstance.get(`/api/analytics/export?type=${type}`, { responseType: 'blob' })
};

export default analyticsService;
