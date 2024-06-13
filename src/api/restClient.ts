import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND,
});

export const fetcher = async <T>(url: string): Promise<T> => {
  const { data } = await axiosInstance.get<T>(url);
  return data;
};

export const mutate = async <T>(
  url: string,
  payload: Record<string, any>,
  headers?: Record<string, any>
): Promise<T> => {
  const { data } = await axiosInstance.post<T>(url, { data: payload, headers });
  return data;
};
