import { mainnet, pulsechain, pulsechainV4, sepolia } from "viem/chains";
import { TEST_NETWORK } from "./constants";
import SepoliaAG from "./abi/Sepolia";
import PulsechainAG from "./abi/Pulsechain";
import MainnetAG from "./abi/Mainnet";

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

export const checkCorrectNetwork = (chainId: number | undefined) => {
  if (chainId) {
    if (TEST_NETWORK) {
      if (chainId === sepolia.id) {
        return true;
      } else if (chainId === pulsechain.id) return true;
      else return false;
    } else {
      if (chainId === mainnet.id) return true;
      else if (chainId === pulsechain.id) return true;
      else return false;
    }
  }
};
