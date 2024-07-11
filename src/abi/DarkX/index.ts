import { TEST_NETWORK } from "@/constants";
import { baseSepolia, pulsechain, sepolia } from "viem/chains";
import { useAccount } from "wagmi";

interface IContract {
  address?: `0x${string}`;
  abi?: any;
}

import abi from "./abi.json";

const useDarkXContract = (): IContract => {
  const account = useAccount();
  if (TEST_NETWORK) {
    if (account.chain?.id === baseSepolia.id) {
      // Change the address here
      return {
        address: "0xC719b2a61Cf9D0185d23b316f9EF7e28845c2274",
        abi,
      };
    } else if (account.chain?.id === sepolia.id) {
      return {
        address: "0xD7ae623f3e0ceF54e7447513A7f47571dec09e0B",
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

export default useDarkXContract;
