import { TEST_NETWORK } from "@/constants";
import { baseSepolia, pulsechain, sepolia } from "viem/chains";
import { useAccount } from "wagmi";

interface IContract {
  address?: `0x${string}`;
  abi?: any;
}

import abi from "./abi.json";
import { CONTRACTS } from "../config";

const contracts: Record<
  number,
  { address: `0x${string}` | undefined; abi: any }
> = {
  [sepolia.id]: {
    address: CONTRACTS[sepolia.id].darkClaims,
    abi,
  },
  [pulsechain.id]: {
    address: CONTRACTS[pulsechain.id].darkClaims,
    abi,
  },
};

const useDarkClaimContract = (): IContract => {
  if (TEST_NETWORK) {
    return contracts[sepolia.id];
  } else {
    return contracts[pulsechain.id];
  }
};

export default useDarkClaimContract;
