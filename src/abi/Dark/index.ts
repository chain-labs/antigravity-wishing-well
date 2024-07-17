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
    address: "0x87710D5d5815C2A0fc39752Ff73f87812760Bb6E",
    abi,
  },
  [pulsechain.id]: {
    address: "0xc93fb3e7C6525a6D3A92016594fc3aEA7B12F0Db",
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
