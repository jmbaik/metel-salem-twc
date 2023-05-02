import axios from "axios";
import { getUserFromLocalStorage } from "./localStorage";

const apiFetch = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL + "/api",
});

apiFetch.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage();
  if (user?.email) {
    config.headers["Authorization"] = `Bearer ${user?.token}`;
  }
  return config;
});

export default apiFetch;
