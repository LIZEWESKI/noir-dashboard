import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:8000",
  withCredentials: true, 
  withXSRFToken:true,
  headers: {
    Accept: "application/json",
  },
});

let csrfFetching = null;

async function getCsrfCookie() {
  if (!csrfFetching) {
    csrfFetching = api.get("/sanctum/csrf-cookie").finally(() => {
      csrfFetching = null;
    });
  }
  return csrfFetching;
}

api.interceptors.request.use(async (config) => {
  const methodsRequiringCsrf = ["post", "put", "patch", "delete"];
  if (methodsRequiringCsrf.includes(config.method.toLowerCase())) {
    await getCsrfCookie();
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 419 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      await getCsrfCookie();
      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default api;
