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

const api = axios.create({
  baseURL: API_BASE,            // <-- important
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false       // change to true only if you use cookies
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
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

export default api;
