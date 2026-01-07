import axiosInstance from './axiosInstance.js';

const userService = {
  listUsers: () => axiosInstance.get('/api/admin/users'),
  updateUserRoles: (id, roles) => axiosInstance.put(`/api/admin/users/${id}/roles`, { roles })
};

export default userService;
