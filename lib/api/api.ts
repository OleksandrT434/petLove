import axios from "axios";

const baseURL =
  (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000")
    .replace(/\/+$/, "") + "/api";

export const publicApi = axios.create({
  baseURL,
});

export const privateApi = axios.create({
  baseURL,

});

privateApi.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default publicApi;