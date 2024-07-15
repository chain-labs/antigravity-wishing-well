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
        address: "0x441dc2f7e3D11B738133144144aB20Cb556df14B",
        abi,
      };
    } else if (account.chain?.id === sepolia.id) {
      return {
        address: "0x441dc2f7e3D11B738133144144aB20Cb556df14B",
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
