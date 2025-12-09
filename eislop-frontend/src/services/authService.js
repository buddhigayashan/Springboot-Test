import axiosInstance from './axiosInstance.js';

const authService = {
  login: (payload) => axiosInstance.post('/auth/login', payload),
  register: (payload) => axiosInstance.post('/auth/register', payload)
};

export default authService;
