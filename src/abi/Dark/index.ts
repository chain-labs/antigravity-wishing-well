import { TEST_NETWORK } from "@/constants";
import { baseSepolia, pulsechain, sepolia } from "viem/chains";
import { useAccount } from "wagmi";

interface IContract {
  address?: `0x${string}`;
  abi?: any;
}

import abi from "./abi.json";

const useDarkContract = (): IContract => {
  const account = useAccount();
  if (TEST_NETWORK) {
    if (account.chain?.id === baseSepolia.id) {
      // Change the address here
      return {
        address: "0x53521B27E4cfDbF2a7de2ff6b4D24c168792cB14",
        abi,
      };
    } else if (account.chain?.id === sepolia.id) {
      return {
        address: "0x53521B27E4cfDbF2a7de2ff6b4D24c168792cB14",
        abi,
      };
    }
  } else {
    if (account.chain?.id === pulsechain.id) {
      // Change the address here
      return {
        address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        abi,
      };
    }
  }

  return {};
};

export default useDarkContract;
