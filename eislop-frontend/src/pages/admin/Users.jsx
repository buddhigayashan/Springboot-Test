import { useEffect, useState } from 'react';
import userService from '../../services/userService.js';
import toast from 'react-hot-toast';

const ALL_ROLES = ['ADMIN', 'MANAGER', 'DRIVER', 'SUPPLIER'];

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await userService.listUsers();
      setUsers(data);
    } catch (e) {
      toast.error(e?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleRole = (userId, role) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, roles: u.roles?.includes(role) ? u.roles.filter((r) => r !== role) : [...(u.roles || []), role] }
          : u
      )
    );
  };

  const saveRoles = async (user) => {
    try {
      await userService.updateUserRoles(user.id, user.roles || []);
      toast.success('Roles updated');
      fetchUsers();
    } catch (e) {
      toast.error(e?.message || 'Failed to update roles');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">User Management</h1>
        <button
          onClick={fetchUsers}
          className="rounded bg-primary px-3 py-2 text-white hover:bg-blue-600"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <div>Loading users…</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-slate-600">Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-slate-600">Email</th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-slate-600">Roles</th>
                <th className="px-4 py-2" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {users.map((u) => (
                <tr key={u.id}>
                  <td className="px-4 py-2 text-sm">{u.name}</td>
                  <td className="px-4 py-2 text-sm">{u.email}</td>
                  <td className="px-4 py-2 text-sm">
                    <div className="flex flex-wrap gap-3">
                      {ALL_ROLES.map((role) => (
                        <label key={role} className="inline-flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={u.roles?.includes(role) || false}
                            onChange={() => toggleRole(u.id, role)}
                          />
                          <span>{role}</span>
                        </label>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-2 text-right">
                    <button
                      onClick={() => saveRoles(u)}
                      className="rounded bg-primary px-3 py-2 text-white hover:bg-blue-600"
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;
