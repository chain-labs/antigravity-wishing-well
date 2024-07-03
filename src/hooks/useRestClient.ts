import { fetcher, mutate } from "@/api/restClient";
import {
  QueryKey,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useRestFetch = <T>(
  tags: string[],
  endpoint: string,
): UseQueryResult<T, Error> => {
  return useQuery<T>({
    queryKey: tags,
    queryFn: () => fetcher<T>(endpoint),
  });
};

export const useRestPost = <T>(
  tags: string[],
  url: string,
): UseMutationResult<T, any, Record<string, any>, unknown> => {
  const queryClient = useQueryClient();
  const result = useMutation<T, any, Record<string, any>>({
    mutationKey: tags,
    mutationFn: (payload: Record<string, any>) => mutate<T>(url, payload),
    onError: (error: any) => {
      console.error(error);
      toast.error(`Error: ${error.message}. Try again please.`);

      // TODO: Add Sentry logs here as well
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tags });
    },
  });
  return result;
};
