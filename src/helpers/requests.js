import axios from "axios";

const BASE_URL = "http://localhost:3000";

// Axios instance for requests that may include credentials (cookies, JWT in headers)
const INSTANCE = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // important if backend uses credentials
  headers: {
    "Content-Type": "application/json",
  },
});

// Public instance (no credentials)
const PUBLIC_INSTANCE = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
});

// Attach token automatically for all authenticated requests
INSTANCE.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // get token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // attach token
  }

  // Let browser set correct boundary for FormData (do not force json)
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  return config;
});

// API wrapper for authenticated requests
export const API = {
  get: (path, config = {}) => INSTANCE.get(path, config),
  post: (path, data, config = {}) => INSTANCE.post(path, data, config),
  put: (path, data, config = {}) => INSTANCE.put(path, data, config),
  delete: (path, config = {}) => INSTANCE.delete(path, config),
};

// Public API wrapper (no credentials)
export const PUBLIC_API = { 
  get: (path) => PUBLIC_INSTANCE.get(path),
  post: (path, data) => PUBLIC_INSTANCE.post(path, data),
};



// import axios from "axios";

// const BASE_URL = "http://localhost:3000";

// // Axios instance for requests that may include credentials (cookies, JWT in headers)
// const INSTANCE = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true, // important if backend uses credentials
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Public instance (no credentials)
// const PUBLIC_INSTANCE = axios.create({
//   baseURL: BASE_URL,
//   headers: { "Content-Type": "application/json" },
//   withCredentials: false,
// });

// // API wrapper for authenticated requests
// export const API = {
//   get: (path) => INSTANCE.get(path),
//   post: (path, data) => INSTANCE.post(path, data),
//   put: (path, data) => INSTANCE.put(path, data),
//   delete: (path) => INSTANCE.delete(path),
// };

// // Public API wrapper (no credentials)
// export const PUBLIC_API = {
//   get: (path) => PUBLIC_INSTANCE.get(path),
//   post: (path, data) => PUBLIC_INSTANCE.post(path, data),
// };
