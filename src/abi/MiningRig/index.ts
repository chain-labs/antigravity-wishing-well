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
    address: "0x4D06Dc6ACB64194E417658BF0e610de463EC091e",
    abi,
  },
  [baseSepolia.id]: {
    address: "0xa2A6b9507eB9bFFCCBdAf853ED98047CdEb154F7",
    abi,
  },
  [base.id]: {
    address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    abi,
  },
  [pulsechain.id]: {
    address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    abi,
  },
};

const useMiningContract = (): IContract => {
  const account = useAccount();
  if (TEST_NETWORK) {
    if (account.chain?.id === baseSepolia.id) {
      // Change the address here
      return contracts[baseSepolia.id];
    } else if (account.chain?.id === sepolia.id) {
      return contracts[sepolia.id];
    }

    return contracts[sepolia.id];
  } else {
    if (account.chain?.id === pulsechain.id) {
      return contracts[pulsechain.id];
    } else if (account.chain?.id === base.id) {
      return contracts[base.id];
    }

    return contracts[pulsechain.id];
  }

  return {};
};

export default useMiningContract;
