import { TEST_NETWORK } from "@/constants";
import { baseSepolia, pulsechain, sepolia } from "viem/chains";
import { useAccount } from "wagmi";

interface IContract {
  address?: `0x${string}`;
  abi?: any;
}

import abi from "./abi.json";
import { CONTRACTS } from "../config";
import { useEffect, useState } from "react";
import { zeroAddress } from "viem";

const contracts: Record<
  number,
  { address: `0x${string}` | undefined; abi: any }
> = {
  [sepolia.id]: {
    address: CONTRACTS[sepolia.id].darkFaucet,
    abi,
  },
  [pulsechain.id]: {
    address: CONTRACTS[pulsechain.id].darkFaucet,
    abi,
  },
};

const useDarkFaucetContract = (): IContract => {
  const [contract, setContract] = useState<IContract>({
    abi: {},
    address: zeroAddress,
  });
  useEffect(() => {
    if (TEST_NETWORK) {
      setContract(contracts[sepolia.id]);
    } else {
      setContract(contracts[pulsechain.id]);
    }
  }, []);

  return contract;
};

export default useDarkFaucetContract;
