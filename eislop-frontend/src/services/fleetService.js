import axiosInstance from './axiosInstance.js';

const base = '/api/fleet';

const fleetService = {
  getVehicles: () => axiosInstance.get(`${base}/vehicles`),
  createVehicle: (payload) => axiosInstance.post(`${base}/vehicles`, payload),
  updateVehicle: (id, payload) => axiosInstance.put(`${base}/vehicles/${id}`, payload),
  deleteVehicle: (id) => axiosInstance.delete(`${base}/vehicles/${id}`),
  getDrivers: () => axiosInstance.get(`${base}/drivers`),
  createDriver: (payload) => axiosInstance.post(`${base}/drivers`, payload),
  updateDriver: (id, payload) => axiosInstance.put(`${base}/drivers/${id}`, payload),
  deleteDriver: (id) => axiosInstance.delete(`${base}/drivers/${id}`),
  getDeliveries: () => axiosInstance.get(`${base}/deliveries`),
  createDelivery: (payload) => axiosInstance.post(`${base}/deliveries`, payload),
  updateDelivery: (id, payload) => axiosInstance.put(`${base}/deliveries/${id}`, payload),
  deleteDelivery: (id) => axiosInstance.delete(`${base}/deliveries/${id}`),
  assignRoute: (payload) => axiosInstance.post(`${base}/route-assignments`, payload)
};

export default fleetService;
