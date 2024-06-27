import { TEST_NETWORK } from "@/constants";
import { baseSepolia, pulsechain, sepolia } from "viem/chains";
import { useAccount } from "wagmi";

interface IContract {
  address?: `0x${string}`;
  abi?: any;
}

import abi from "./abi.json";

const useDarkClaimContract = (): IContract => {
  const account = useAccount();
  if (TEST_NETWORK) {
    if (account.chain?.id === baseSepolia.id) {
      // Change the address here
      return {
        address: "0x8f7d987620C65cffac0d625DDE108525e4d0CEE1",
        abi,
      };
    } else if (account.chain?.id === sepolia.id) {
      return {
        address: "0xE53cD0409415342d0bdACBc4dd8D5714e5303a4C",
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

export default useDarkClaimContract;
