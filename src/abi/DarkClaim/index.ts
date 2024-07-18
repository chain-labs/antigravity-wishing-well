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
    address: "0x77EF0D01DC623A4Ac0A87aFCfc66d51E6194067d",
    abi,
  },
  [pulsechain.id]: {
    address: "0x441dc2f7e3D11B738133144144aB20Cb556df14B",
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
