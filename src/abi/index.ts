import { TEST_NETWORK } from "@/constants";
import { useMemo } from "react";
import { base, pulsechain, baseSepolia } from "viem/chains";
import { useAccount } from "wagmi";
import BaseSepoliaAG from "./BaseSepolia";
import BaseAG from "./Base";
import PulsechainAG from "./Pulsechain";

interface IContract {
  address: `0x${string}`;
  abi: any;
}

const useContract = (): IContract | null => {
  const account = useAccount();
  const AntiGravity: IContract | null = useMemo(() => {
    if (TEST_NETWORK) {
      if (account.chain?.id === baseSepolia.id) {
        return { address: BaseSepoliaAG.address, abi: BaseSepoliaAG.abi };
      } else if (account.chain?.id === pulsechain.id)
        return { address: PulsechainAG.address, abi: PulsechainAG.abi };
    } else {
      if (account.chain?.id === base.id)
        return { address: BaseAG.address, abi: BaseAG.abi };
      else if (account.chain?.id === pulsechain.id)
        return { address: PulsechainAG.address, abi: PulsechainAG.abi };
    }

    return null;
  }, [account.chainId]);
  return AntiGravity;
};

export default useContract;
