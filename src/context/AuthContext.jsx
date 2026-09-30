import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi, getAuthToken, setAuthToken, removeAuthToken } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(getAuthToken());
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem('kassa_theme') || 'dark');

  // Sync theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('kassa_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Load user on start
  useEffect(() => {
    async function loadUser() {
      if (token) {
        try {
          const res = await authApi.getMe();
          if (res.success && res.user) {
            setUser(res.user);
          } else {
            handleLogout();
          }
        } catch (err) {
          console.warn('Avtorizatsiya eskirgan yoki xato:', err.message);
          handleLogout();
        }
      }
      setLoading(false);
    }
    loadUser();
  }, [token]);

  const handleLogin = async (email, password) => {
    const res = await authApi.login(email, password);
    if (res.success && res.token) {
      setAuthToken(res.token);
      setToken(res.token);
      setUser(res.user);
      return res;
    }
  };

  const handleRegister = async (userData) => {
    const res = await authApi.register(userData);
    if (res.success && res.token) {
      setAuthToken(res.token);
      setToken(res.token);
      setUser(res.user);
      return res;
    }
  };

  const handleLogout = () => {
    removeAuthToken();
    setToken(null);
    setUser(null);
  };

  // Quick demo switch for evaluation & pair programming testing
  const quickLoginAs = async (role) => {
    const credentials = {
      admin: { email: 'admin@kassa.uz', pass: 'admin123' },
      manager: { email: 'manager@kassa.uz', pass: 'manager123' },
      student: { email: 'student@kassa.uz', pass: 'student123' }
    };

    const target = credentials[role];
    if (target) {
      return await handleLogin(target.email, target.pass);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        theme,
        toggleTheme,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        quickLoginAs,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
