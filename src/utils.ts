import {
  base,
  pulsechain,
  pulsechainV4,
  baseSepolia,
  sepolia,
} from "viem/chains";
import { TEST_NETWORK } from "./constants";
import { UserData } from "./components/Home/components/header/UserConnected";

export const toBoolean = (query: string | undefined) => {
  if (query?.toLowerCase() === "true") return true;
  return false;
};

export const getApiNetwork = (chainId: number) => {
  if (chainId === base.id || chainId === baseSepolia.id) {
    return "ethereum";
  } else if (chainId === pulsechain.id || chainId === sepolia.id) {
    return "pulsechain";
  }
};

export const condenseAddress = (address: string) => {
  const condensed = `${address.slice(0, 4)}...${address.slice(
    address.length - 4,
  )}`;

  return condensed;
};

export const getTokenIds = (userData: UserData, chainId: number) => {
  let wishwellTokenId = "0";
  let miningTokenId = "0";
  let blockchain = "pulsechain";

  if (TEST_NETWORK) {
    if (chainId === sepolia.id) {
      miningTokenId = userData.antigravityPulsechainTokenId;
      wishwellTokenId = userData.wishwellPulsechainTokenId;
      blockchain = "pulsechain";
    } else if (chainId === baseSepolia.id) {
      miningTokenId = userData.antigravityBaseTokenId;
      wishwellTokenId = userData.wishwellBaseTokenId;
      blockchain = "base";
    }
  } else {
    if (chainId === pulsechain.id) {
      miningTokenId = userData.antigravityPulsechainTokenId;
      wishwellTokenId = userData.wishwellPulsechainTokenId;
      blockchain = "pulsechain";
    } else if (chainId === base.id) {
      miningTokenId = userData.antigravityBaseTokenId;
      wishwellTokenId = userData.wishwellBaseTokenId;
      blockchain = "base";
    }
  }

  return {
    wishwellTokenId: Number(wishwellTokenId),
    miningTokenId: Number(miningTokenId),
    blockchain,
  };
};
