import { base, pulsechain, pulsechainV4, baseSepolia } from "viem/chains";
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

export const checkCorrectNetwork = (chainId: number | undefined) => {
  if (chainId) {
    if (TEST_NETWORK) {
      if (chainId === baseSepolia.id) {
        return true;
      } else if (chainId === pulsechain.id) return true;
      else return false;
    } else {
      if (chainId === base.id) return true;
      else if (chainId === pulsechain.id) return true;
      else return false;
    }
  }
};

export const condenseAddress = (address: string) => {
  const condensed = `${address.slice(0, 6)}...${address.slice(
    address.length - 2
  )}`;

  return condensed;
};
