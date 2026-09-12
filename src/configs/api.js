// src/configs/api.js
import axios from 'axios';
import { auth } from './firebase.js';

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

api.interceptors.request.use(async (config) => {
  const currentUser = auth.currentUser;
  if (currentUser && !config.headers?.Authorization) {
    const idToken = await currentUser.getIdToken();
    config.headers.Authorization = `Bearer ${idToken}`;
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
