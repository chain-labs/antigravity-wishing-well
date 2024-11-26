import useDarkClaimContract from "@/abi/DarkClaim";
import { useEffect, useState } from "react";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { errorToast, successToast } from "../frontend/toast";
import useDarkContract from "@/abi/Dark";
import { TEST_NETWORK } from "@/constants";
import { pulsechain, pulsechainV4 } from "viem/chains";

/**
 * Primary utility hook for everything related to the claiming phase
 *
 * @returns {{ transactionLoading: any; claim: (points: string, nonce: string, proof: {}) => void; darkBalance: any; }}
 */
const useClaim = () => {
  const account = useAccount();
  const DarkClaimContract = useDarkClaimContract();
  const DarkContract = useDarkContract();

  const [transactionLoading, setTransactionLoading] = useState<boolean>(false);

  const { data: darkBalance } = useReadContract({
    address: DarkContract?.address as `0x${string}`,
    abi: DarkContract?.abi,
    functionName: "balanceOf",
    args: [`${account.address}`],
    chainId: TEST_NETWORK ? pulsechainV4.id : pulsechain.id,
  });

  const {
    writeContract: claimFn,
    data: hash,
    error: claimError,
  } = useWriteContract();

  const { data: receipt } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (claimError) {
      console.log({ claimError });
      if ((claimError.cause as any)?.code === 4001) {
        errorToast(
          "You cancelled the claim process. Please Try Again if you wish to claim.",
        );
      } else if (
        (claimError.cause as any)?.data?.errorName === "AlreadyClaimed"
      ) {
        errorToast("You have already claimed your $Dark Token!");
      } else {
        errorToast("Couldn't claim your $Dark tokens.");
      }
      setTransactionLoading(false);
    }

    if (receipt) {
      // TODO: Add number of tokens claimed here.
      successToast(`Succesfully claimed $Dark tokens`);
      setTransactionLoading(false);
      console.log({ receipt });
    }
  }, [claimError, receipt]);

  const claim = (
    addresses: string[],
    points: string[],
    nonces: string[],
    proofs: string[][],
  ) => {
    console.log("Claiming...");
    setTransactionLoading(true);
    if (account.address) {
      claimFn({
        address: DarkClaimContract.address as `0x${string}`,
        abi: DarkClaimContract.abi,
        functionName: "claim",
        args: [addresses, points, nonces, proofs],
        chainId: TEST_NETWORK ? pulsechainV4.id : pulsechain.id,
      });
    }
  };
  return { transactionLoading, claim, darkBalance, receipt };
};

export default useClaim;
