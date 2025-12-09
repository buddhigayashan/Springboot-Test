import axiosInstance from './axiosInstance.js';

const base = '/api/supply';

const supplyService = {
  getProducts: () => axiosInstance.get(`${base}/products`),
  createProduct: (payload) => axiosInstance.post(`${base}/products`, payload),
  updateProduct: (id, payload) => axiosInstance.put(`${base}/products/${id}`, payload),
  deleteProduct: (id) => axiosInstance.delete(`${base}/products/${id}`),
  getSuppliers: () => axiosInstance.get(`${base}/suppliers`),
  createSupplier: (payload) => axiosInstance.post(`${base}/suppliers`, payload),
  updateSupplier: (id, payload) => axiosInstance.put(`${base}/suppliers/${id}`, payload),
  deleteSupplier: (id) => axiosInstance.delete(`${base}/suppliers/${id}`),
  getPurchaseOrders: () => axiosInstance.get(`${base}/purchase-orders`),
  createPurchaseOrder: (payload) => axiosInstance.post(`${base}/purchase-orders`, payload),
  updatePurchaseOrder: (id, payload) => axiosInstance.put(`${base}/purchase-orders/${id}`, payload),
  deletePurchaseOrder: (id) => axiosInstance.delete(`${base}/purchase-orders/${id}`)
};

export default supplyService;
