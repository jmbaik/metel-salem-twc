import apiFetch from "@/utils/axios";

export const areaCodeApi = async () => {
  const response = await apiFetch.get("/intro/area-code");
  return response.data.result;
};

export const loginApi = async (userData) => {
  const response = await apiFetch.post("/admin-user/login", userData);
  return response.data;
};
