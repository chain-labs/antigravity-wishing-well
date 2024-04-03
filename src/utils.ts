import { mainnet, pulsechain, pulsechainV4, sepolia } from "viem/chains";
import { TEST_NETWORK } from "./constants";

export const toBoolean = (query: string | undefined) => {
  if (query?.toLowerCase() === "true") return true;
  return false;
};

export const getApiNetwork = (chainId: number) => {
  if (chainId === mainnet.id || chainId === sepolia.id) {
    return "ethereum";
  } else if (chainId === pulsechain.id || chainId === pulsechainV4.id) {
    return "pulsechain";
  }
};
