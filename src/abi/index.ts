import { TEST_NETWORK } from "@/constants";
import { useMemo } from "react";
import { mainnet, pulsechain, pulsechainV4, sepolia } from "viem/chains";
import { useAccount } from "wagmi";
import SepoliaAG from "./Sepolia";
import MainnetAG from "./Mainnet";
import PulsechainAG from "./Pulsechain";

interface IContract {
  address: `0x${string}`;
  abi: any;
}

const useContract = (): IContract | null => {
  const account = useAccount();
  const AntiGravity: IContract | null = useMemo(() => {
    if (TEST_NETWORK) {
      if (account.chain?.id === sepolia.id) {
        return { address: SepoliaAG.address, abi: SepoliaAG.abi };
      } else if (account.chain?.id === pulsechainV4.id)
        return { address: PulsechainAG.address, abi: PulsechainAG.abi };
    } else {
      if (account.chain?.id === mainnet.id)
        return { address: MainnetAG.address, abi: MainnetAG.abi };
      else if (account.chain?.id === pulsechain.id)
        return { address: PulsechainAG.address, abi: PulsechainAG.abi };
    }

    return null;
  }, [account.chainId]);
  return AntiGravity;
};

export default useContract;
