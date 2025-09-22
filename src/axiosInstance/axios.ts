
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// 401 interceptor
let refreshing = false;
let queue: Array<() => void> = [];

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status !== 401 || err.config?._retry) {
      return Promise.reject(err);
    }
    err.config._retry = true;

    if (!refreshing) {
      refreshing = true;
      try {
        await api.post("/auth/refresh");
        queue.forEach((resume) => resume());
        queue = [];
        return api(err.config);
      } finally {
        refreshing = false;
      }
    }
    return new Promise((resolve) => queue.push(() => resolve(api(err.config))));
  }
);  
