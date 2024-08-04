import { TEST_NETWORK } from "@/constants";
import { pulsechain, sepolia } from "viem/chains";

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
    address: CONTRACTS[sepolia.id].fuelCell,
    abi,
  },
  [pulsechain.id]: {
    address: CONTRACTS[pulsechain.id].fuelCell,
    abi,
  },
};

const useFuelCellContract = (): IContract => {
  if (TEST_NETWORK) {
    return contracts[sepolia.id];
  } else {
    return contracts[pulsechain.id];
  }
};

export default useFuelCellContract;
