import { TEST_NETWORK } from "@/constants";
import { base, baseSepolia, pulsechain, sepolia } from "viem/chains";
import { useAccount } from "wagmi";

interface IContract {
  address?: `0x${string}`;
  abi?: any;
}

import abi from "./abi.json";

const contracts: Record<number, { address: `0x${string}`; abi: any }> = {
  [sepolia.id]: {
    address: "0x74E33af8ffa59B68402e5c4767c37416827D5D2E",
    abi,
  },
  [baseSepolia.id]: {
    address: "0x63DDC2ACab1Fb8871F19A2B89b50c1F99C21D718",
    abi,
  },
  [pulsechain.id]: {
    address: "0x74E33af8ffa59B68402e5c4767c37416827D5D2E",
    abi,
  },
  [base.id]: {
    address: "0x74E33af8ffa59B68402e5c4767c37416827D5D2E",
    abi,
  },
};

const useDarkXContract = (): IContract => {
  const account = useAccount();
  if (TEST_NETWORK) {
    if (account.chain?.id === baseSepolia.id) {
      return contracts[baseSepolia.id];
    } else if (account.chain?.id === sepolia.id) {
      return contracts[sepolia.id];
    }
  } else {
    if (account.chain?.id === pulsechain.id) {
      return contracts[pulsechain.id];
    } else if (account.chain?.id === base.id) {
      return contracts[base.id];
    }
  }

  return {};
};

export default useDarkXContract;
