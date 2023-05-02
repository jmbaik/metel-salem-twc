import apiFetch from "utils/axios";

export const areaCodeApi = async () => {
  const response = await apiFetch.get("/intro/area-code");
  return response.data.result;
};
