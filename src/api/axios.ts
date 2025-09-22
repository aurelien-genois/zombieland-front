
import axios, { type AxiosRequestConfig } from "axios";

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



// ----- Helpers -----
export async function get<T>(url: string, cfg?: AxiosRequestConfig) {
  const { data } = await api.get<T>(url, cfg);
  return data;
}
export async function post<T>(url: string, body?: any, cfg?: AxiosRequestConfig) {
  const { data } = await api.post<T>(url, body, cfg);
  return data;
}
export async function put<T>(url: string, body?: any, cfg?: AxiosRequestConfig) {
  const { data } = await api.put<T>(url, body, cfg);
  return data;
}
export async function patch<T>(url: string, body?: any, cfg?: AxiosRequestConfig) {
  const { data } = await api.patch<T>(url, body, cfg);
  return data;
}
export async function del<T>(url: string, cfg?: AxiosRequestConfig) {
  const { data } = await api.delete<T>(url, cfg);
  return data;
}
  
