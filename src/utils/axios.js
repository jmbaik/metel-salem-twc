import axios from "axios";
import { getUserFromSessionStorage } from "./sessionStorage";

const apiFetch = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL + "/api",
});

apiFetch.interceptors.request.use((config) => {
  const user = getUserFromSessionStorage();
  if (user?.email) {
    config.headers["Authorization"] = `Bearer ${user?.token}`;
  }
  return config;
});

export default apiFetch;
