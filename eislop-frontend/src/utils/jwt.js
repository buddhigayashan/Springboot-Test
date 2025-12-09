export const decodeToken = (token) => {
  try {
    const [, payload] = token.split('.');
    if (!payload) return null;
    const decoded = JSON.parse(window.atob(payload));
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      return null;
    }
    return decoded;
  } catch (error) {
    return null;
  }
};

export const saveToken = (token) => {
  window.localStorage.setItem('eislop_token', token);
};

export const removeToken = () => {
  window.localStorage.removeItem('eislop_token');
};
