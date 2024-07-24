import { TEST_NETWORK } from "@/constants";
import { base, baseSepolia, pulsechain, sepolia } from "viem/chains";
import { useAccount } from "wagmi";

interface IContract {
  address?: `0x${string}`;
  abi?: any;
}

import abi from "./abi.json";
import { CONTRACTS } from "../config";
import { useMemo } from "react";

const contracts: Record<number, { address: `0x${string}`; abi: any }> = {
  [sepolia.id]: {
    address: CONTRACTS[sepolia.id].miningRig,
    abi,
  },
  [baseSepolia.id]: {
    address: CONTRACTS[baseSepolia.id].miningRig,
    abi,
  },
  [base.id]: {
    address: CONTRACTS[base.id].miningRig,
    abi,
  },
  [pulsechain.id]: {
    address: CONTRACTS[pulsechain.id].miningRig,
    abi,
  },
};

const useMiningContract = (): IContract => {
  const account = useAccount();

  const contract = useMemo(() => {
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
  }, [account.chain?.id]);

  return contract;
};

export default useMiningContract;
