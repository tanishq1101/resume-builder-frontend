// src/configs/api.js
import axios from 'axios';

export const API_BASE = (() => {
  const envBase = import.meta.env.VITE_API_BASE;
  const hostname = window.location.hostname;

  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:5001';
  }
  return envBase || window.location.origin;
})();

const TOKEN_KEY = 'token';

// localStorage can throw (private mode, blocked storage), so never let it break the app.
export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

export const setToken = (token) => {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    // ignore
  }
};

// App.jsx registers a callback so an expired/invalid session logs the user out everywhere.
let onUnauthorized = null;
export const setUnauthorizedHandler = (fn) => {
  onUnauthorized = fn;
};

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token && !config.headers?.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (typeof FormData !== 'undefined' && config.data instanceof FormData) {
    if (config.headers && typeof config.headers.delete === 'function') {
      config.headers.delete('Content-Type');
    } else if (config.headers) {
      delete config.headers['Content-Type'];
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthCall = /\/api\/users\/(login|register)$/.test(error?.config?.url || '');
    if (error?.response?.status === 401 && !isAuthCall && getToken()) {
      setToken(null);
      onUnauthorized?.();
    }
    return Promise.reject(error);
  }
);

export default api;
