export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
  AUTH_API_BASE_URL: import.meta.env.VITE_AUTH_API_BASE_URL || 'https://reqres.in/api',
  API_KEY: import.meta.env.VITE_API_KEY,
  TIMEOUT: 30000,
};
