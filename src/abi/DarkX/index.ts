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
    address: "0x5ecc92CE4B271C32c6DFBC23bd3b15EcC54ea9B6",
    abi,
  },
  [baseSepolia.id]: {
    address: "0x6a3282ec6a687105e1B71327bf6B2e7db9A7e889",
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
