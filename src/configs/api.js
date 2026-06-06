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

export default api;
