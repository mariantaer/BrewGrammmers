// --- client/src/utils/auth.js ---
export const setToken = (token) => localStorage.setItem('token', token);
export const getToken = () => localStorage.getItem('token');
export const getRole = () => JSON.parse(atob(getToken().split('.')[1])).role;
export const logout = () => localStorage.removeItem('token');
export const isAuthenticated = () => !!getToken();