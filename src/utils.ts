import {
  base,
  pulsechain,
  pulsechainV4,
  baseSepolia,
  sepolia,
} from "viem/chains";
import { TEST_NETWORK } from "./constants";

export const toBoolean = (query: string | undefined) => {
  if (query?.toLowerCase() === "true") return true;
  return false;
};

export const getApiNetwork = (chainId: number) => {
  if (chainId === base.id || chainId === baseSepolia.id) {
    return "ethereum";
  } else if (chainId === pulsechain.id || chainId === pulsechainV4.id) {
    return "pulsechain";
  }
};

export const condenseAddress = (address: string) => {
  const condensed = `${address.slice(0, 4)}...${address.slice(
    address.length - 4,
  )}`;

  return condensed;
};
