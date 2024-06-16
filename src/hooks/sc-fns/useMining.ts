import useMiningContract from "@/abi/MiningRig";
import { useEffect, useMemo } from "react";
import { parseUnits, zeroAddress } from "viem";
import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

/**
 * Description placeholder
 *
 * @param {string} tokenAddress
 * @param {number} amountToInvest
 * @returns {{ mineToken: (merkleProof: {}) => void; receipt: any; receiptError: any; mineError: any; isLoading: any; isPending: any; }}
 */
const useMining = (tokenAddress: string, amountToInvest: number) => {
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

  const { data: nativeToken } = useReadContract({
    address: MiningContract?.address as `0x${string}`,
    abi: MiningContract?.abi,
    functionName: "NATIVE_TOKEN",
  });

  useEffect(() => {
    if (nativeToken) {
      console.log({ nativeToken });
    }
  }, [nativeToken]);

  useEffect(() => {
    if (mineError) {
      console.log({ mineError });
    }
  }, [mineError]);

  const mineToken = (merkleProof: string[]) => {
    if (tokenAddress && amountToInvest && merkleProof) {
      mine({
        address: MiningContract?.address as `0x${string}`,
        abi: MiningContract?.abi,
        functionName: "mine",
        args: [tokenAddress, investAmount, merkleProof],
        value: tokenAddress === nativeToken ? investAmount : BigInt(0),
      });
    }
  };

  return { mineToken, receipt, receiptError, mineError, isLoading, isPending };
};

export default useMining;
