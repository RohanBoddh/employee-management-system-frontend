import axios from 'axios';

// Automatically detect whether frontend is running locally or deployed in production
const isLocalhost = Boolean(
  typeof window !== 'undefined' && (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname.endsWith('.local')
  )
);

const DEFAULT_PROD_BACKEND = 'https://employee-management-system-backend-livid.vercel.app';
const DEFAULT_DEV_BACKEND = 'http://localhost:5000';

// Get base URL from environment or fallback intelligently depending on host environment
export const BACKEND_URL = (
  import.meta.env.VITE_BACKEND_URL || 
  import.meta.env.VITE_API_BASE_URL?.replace(/\/api\/?$/, '') || 
  (isLocalhost ? DEFAULT_DEV_BACKEND : DEFAULT_PROD_BACKEND)
).replace(/\/$/, '');

export const API_BASE_URL = `${BACKEND_URL}/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;