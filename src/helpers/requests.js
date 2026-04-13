import axios from "axios";

const BASE_URL = "http://localhost:3000";

const INSTANCE = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const PUBLIC_INSTANCE = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
});

INSTANCE.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  return config;
});

export const API = {
  get: (path, config = {}) => INSTANCE.get(path, config),
  post: (path, data, config = {}) => INSTANCE.post(path, data, config),
  put: (path, data, config = {}) => INSTANCE.put(path, data, config),
  delete: (path, config = {}) => INSTANCE.delete(path, config),
};

export const PUBLIC_API = {
  get: (path) => PUBLIC_INSTANCE.get(path),
  post: (path, data) => PUBLIC_INSTANCE.post(path, data),
};
