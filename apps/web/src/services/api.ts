import axios from "axios";

/**
 * Central axios instance. When VITE_API_URL is set the app talks to the real
 * Express backend; otherwise the service layer falls back to mock data so the
 * frontend runs standalone. A JWT (if present) is attached automatically.
 */
export const USE_REAL_API = Boolean(import.meta.env.VITE_API_URL);

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("kisaniyat_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    // Central place for global error handling / toast hooks
    return Promise.reject(error);
  },
);
