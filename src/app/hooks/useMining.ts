import useMiningContract from "@/abi/ mining";
import { useMemo } from "react";
import { parseUnits, zeroAddress } from "viem";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

const useMining = (
  tokenAddress: string,
  amountToInvest: number,
  merkleProof: string[]
) => {
  const nativeTokenAddress = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

  const MiningContract = useMiningContract();

  const {
    writeContract: mine,
    data: hash,
    error: mineError,
    isPending,
  } = useWriteContract();

  const {
    data: receipt,
    error: receiptError,
    isLoading,
  } = useWaitForTransactionReceipt({ hash });

  const investAmount = useMemo(() => {
    if (amountToInvest) {
      return parseUnits(`${amountToInvest}`, 18);
    }
    return BigInt(0);
  }, [amountToInvest]);

  const mineToken = () => {
    if (tokenAddress && amountToInvest && merkleProof) {
      mine({
        address: MiningContract?.address as `0x${string}`,
        abi: MiningContract?.abi,
        functionName: "mine",
        args: [nativeTokenAddress, investAmount, merkleProof],
        value: tokenAddress === zeroAddress ? investAmount : BigInt(0),
      });
    }
  };

  return { mineToken, receipt, receiptError, mineError, isLoading, isPending };
};

export default useMining;
