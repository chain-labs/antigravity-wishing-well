import useMiningContract from "@/abi/MiningRig";
import { useEffect, useMemo } from "react";
import { parseUnits, zeroAddress } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

/**
 * Description placeholder
 *
 * @param {string} tokenAddress
 * @param {number} amountToInvest
 * @param {string[]} merkleProof
 * @returns {{ mineToken: () => void; receipt: any; receiptError: any; mineError: any; isLoading: any; isPending: any; }}
 */
const useMining = (
  tokenAddress: string,
  amountToInvest: number,
  merkleProof: string[]
) => {
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

  useEffect(() => {
    if (mineError) {
      console.log({ mineError });
    }
  }, [mineError]);

  const mineToken = () => {
    if (tokenAddress && amountToInvest && merkleProof) {
      mine({
        address: MiningContract?.address as `0x${string}`,
        abi: MiningContract?.abi,
        functionName: "mine",
        args: [tokenAddress, investAmount, merkleProof],
        value: tokenAddress === zeroAddress ? investAmount : BigInt(0),
      });
    }
  };

  return { mineToken, receipt, receiptError, mineError, isLoading, isPending };
};

export default useMining;
