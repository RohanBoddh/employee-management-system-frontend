import axios from 'axios';

// Get base URL from environment or default to local development port
export const BACKEND_URL = (
  import.meta.env.VITE_BACKEND_URL || 
  import.meta.env.VITE_API_BASE_URL?.replace(/\/api\/?$/, '') || 
  'http://localhost:5000'
).replace(/\/$/, '');

export const API_BASE_URL = `${BACKEND_URL}/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;