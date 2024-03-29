import apiFetch from "@/utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFetchVideoList = () => {
  const { isLoading, data, isError, error, isFetching } = useQuery({
    queryKey: ["video-list"],
    queryFn: async () => {
      const response = await apiFetch.get("/video/default", {
        params: {
          cCode: "",
          cat: "",
        },
      });
      return response.data.result;
    },
    keepPreviousData: true,
  });
  return { data, isLoading, isError, error };
};

export const useSaveVideo = () => {
  const queryClient = useQueryClient();
  const { mutate: saveVideo, isLoading: saveLoading } = useMutation({
    mutationFn: async (params) => {
      console.log("video useSaveVideo ", params);
      const resp = await apiFetch.post("/video/default", params);
      return resp.data.result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["video-list"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return { saveVideo, saveLoading };
};

export const useDeleteVideo = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteVideo, isLoading: deleteLoading } = useMutation({
    mutationFn: async (params) => {
      console.log("deleteVideo mutation function call");
      const resp = await apiFetch.delete("/video/default", {
        data: params,
      });
      console.log("delete mutaion", params);
      return resp.data.result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["video-list"] });
    },
    onError: (error) => {
      console.log(error);
      // toast.error(error.response.data.msg);
    },
  });
  return { deleteVideo, deleteLoading };
};
