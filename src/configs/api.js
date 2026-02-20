// src/configs/api.js
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || window.location.origin;

const api = axios.create({
  baseURL: API_BASE,            // <-- important
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false       // change to true only if you use cookies
});

export default api;
