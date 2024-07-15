import { TEST_NETWORK } from "@/constants";
import { baseSepolia, pulsechain, sepolia } from "viem/chains";
import { useAccount } from "wagmi";

interface IContract {
  address?: `0x${string}`;
  abi?: any;
}

import abi from "./abi.json";

const contracts: Record<number, { address: `0x${string}`; abi: any }> = {
  [sepolia.id]: {
    address: "0x53521B27E4cfDbF2a7de2ff6b4D24c168792cB14",
    abi,
  },
  [pulsechain.id]: {
    address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    abi,
  },
};

const useDarkContract = (): IContract => {
  if (TEST_NETWORK) {
    return contracts[sepolia.id];
  } else {
    return contracts[pulsechain.id];
  }
};

export default useDarkContract;
