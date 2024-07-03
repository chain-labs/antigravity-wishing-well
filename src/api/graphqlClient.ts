import { gql, request } from "graphql-request";

const endpoint =
  process.env.NEXT_PUBLIC_SUBGRAPH ||
  "https://subgraph.satsuma-prod.com/ae960656bdbb/20487qm6brhign2ppaml2h/bipzy-polygon/api";

export const gqlFetcher = async <T>(
  query: string,
  variables: Record<string, any>,
): Promise<T> => {
  //   const document = gql(query);
  const data = await request<T>(endpoint, query, variables);
  return data;
};

export const gqlMutate = async <T>(
  query: string,
  variables: Record<string, any>,
): Promise<T> => {
  //   const document = gql(query);
  const data = await request<T>(endpoint, query, variables);
  return data;
};
