import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { decodeToken, removeToken, saveToken } from '../utils/jwt.js';
import authService from '../services/authService.js';

const AuthContext = createContext({});

const MOCK_USER = {
  email: 'admin@eislop.com',
  password: 'Admin@123',
  name: 'Avery Admin',
  role: 'ADMIN'
};

const createMockToken = () => {
  const header = window.btoa(JSON.stringify({ alg: 'none', typ: 'JWT' }));
  const payload = window.btoa(
    JSON.stringify({
      sub: MOCK_USER.email,
      user: { name: MOCK_USER.name, email: MOCK_USER.email, role: MOCK_USER.role },
      role: MOCK_USER.role,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 12
    })
  );
  return `${header}.${payload}.mock`;
};

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => window.localStorage.getItem('eislop_token'));
  const [user, setUser] = useState(() => {
    const stored = window.localStorage.getItem('eislop_token');
    return stored ? decodeToken(stored)?.user ?? null : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }
    const decoded = decodeToken(token);
    if (!decoded) {
      removeToken();
      setToken(null);
      setUser(null);
    } else {
      setUser(decoded.user ?? { name: decoded.sub, role: decoded.role });
    }
  }, [token]);

  const handleLogin = useCallback(
    async (payload) => {
    setLoading(true);
    try {
        const enableMockAuth = (import.meta.env.VITE_ENABLE_MOCK_AUTH ?? 'true') !== 'false';
        if (enableMockAuth) {
          const emailMatches = (payload.email ?? '').toLowerCase() === MOCK_USER.email;
          const passwordMatches = payload.password === MOCK_USER.password;
          if (emailMatches && passwordMatches) {
            const mockToken = createMockToken();
            saveToken(mockToken);
            setToken(mockToken);
            toast.success('Logged in with mock admin credentials');
            return { token: mockToken, user: MOCK_USER };
          }
        }
      const data = await authService.login(payload);
      saveToken(data.token);
      setToken(data.token);
      toast.success('Logged in successfully');
      return data;
    } catch (error) {
      const message = error?.message || error?.error || 'Login failed';
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
    },
    []
  );

  const handleRegister = useCallback(
    async (payload) => {
    setLoading(true);
    try {
        const enableMockAuth = (import.meta.env.VITE_ENABLE_MOCK_AUTH ?? 'true') !== 'false';
        if (enableMockAuth) {
          toast.success('Mock environment enabled. Use admin@eislop.com / Admin@123 to log in.');
          return { success: true };
        }
      const data = await authService.register(payload);
      toast.success('Registration successful, please log in');
      return data;
    } catch (error) {
      const message = error?.message || error?.error || 'Registration failed';
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
    },
    []
  );

  const handleLogout = useCallback(() => {
    removeToken();
    setToken(null);
    setUser(null);
    toast.success('Logged out');
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      loading,
      login: handleLogin,
      register: handleRegister,
      logout: handleLogout
    }),
    [token, user, loading, handleLogin, handleRegister, handleLogout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => useContext(AuthContext);

export { AuthProvider, useAuthContext as useAuthContextRaw };

export default AuthContext;
