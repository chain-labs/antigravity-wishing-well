import { TEST_NETWORK } from "@/constants";
import { baseSepolia, pulsechain, pulsechainV4, sepolia } from "viem/chains";

interface IContract {
  address?: `0x${string}`;
  abi?: any;
}

import abi from "./abi.json";
import { CONTRACTS } from "../config";
import { TESTCHAINS } from "@/components/RainbowKit";

const contracts: Record<
  number,
  { address: `0x${string}` | undefined; abi: any }
> = {
  [sepolia.id]: {
    address: CONTRACTS[sepolia.id].fuelCell,
    abi,
  },
  [pulsechainV4.id]: {
    address: CONTRACTS[pulsechainV4.id].fuelCell,
    abi,
  },
  [pulsechain.id]: {
    address: CONTRACTS[pulsechain.id].fuelCell,
    abi,
  },
  [baseSepolia.id]: {
    address: CONTRACTS[baseSepolia.id].fuelCell,
    abi,
  },
};

const useFuelCellContract = (): IContract => {
  if (TEST_NETWORK) {
    const id = TESTCHAINS[0].id;
    return contracts[id];
  } else {
    return contracts[pulsechain.id];
  }
};

export default useFuelCellContract;
