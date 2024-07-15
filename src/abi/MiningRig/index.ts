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
    address: "0xdcBeDF395384582369F6035c62bEf1A73e14d938",
    abi,
  },
  [baseSepolia.id]: {
    address: "0x968fd3e3f1Ebc136A79BE36201346BEc26331608",
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
