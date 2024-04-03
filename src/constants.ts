import { toBoolean } from "./utils";

export const TEST_NETWORK = toBoolean(process.env.NEXT_PUBLIC_TEST);
export const PROJECT_ID = process.env.NEXT_PUBLIC_WALLET_CONNECT_PID;

export const PROXY_API_ENDPOINT = TEST_NETWORK ? "/test/api/" : "/api/";

export const API_ENDPOINT = TEST_NETWORK
  ? process.env.NEXT_PUBLIC_TEST_BACKEND
  : process.env.NEXT_PUBLIC_BACKEND;

export const TIMER = process.env.NEXT_PUBLIC_TIMER;
