import { gqlFetcher, gqlMutate } from "@/api/graphqlClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { pulsechain } from "viem/chains";
import { useAccount } from "wagmi";

export const useGQLFetch = <T>(
  tags: string[],
  query: string,
  chainId: number,
) => {
  return useQuery<T>({
    queryKey: tags,
    queryFn: (variables: Record<string, any>) =>
      gqlFetcher(query, variables, chainId),
  });
};

export const useGQLMutate = <T>(
  tags: string[],
  query: string,
  chainId: number,
) => {
  return useMutation<T>({
    mutationKey: tags,
    mutationFn: (variables: any) => gqlMutate(query, variables, chainId),
  });
};
