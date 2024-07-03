import { gqlFetcher, gqlMutate } from "@/api/graphqlClient";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGQLFetch = <T>(tags: string[], query: string) => {
  return useQuery<T>({
    queryKey: tags,
    queryFn: (variables: Record<string, any>) => gqlFetcher(query, variables),
  });
};

export const useGQLMutate = <T>(tags: string[], query: string) => {
  return useMutation<T>({
    mutationKey: tags,
    mutationFn: (variables: any) => gqlMutate(query, variables),
  });
};
