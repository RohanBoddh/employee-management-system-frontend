import axios from 'axios';

// Main Production Vercel Backend URL
export const BACKEND_URL = (
  import.meta.env.VITE_BACKEND_URL || 
  import.meta.env.VITE_API_BASE_URL?.replace(/\/api\/?$/, '') || 
  'https://employee-management-system-backend-livid.vercel.app'
).replace(/\/$/, '');

export const API_BASE_URL = `${BACKEND_URL}/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;