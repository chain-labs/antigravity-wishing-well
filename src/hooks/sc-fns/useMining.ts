import useMiningContract from "@/abi/MiningRig";
import { useEffect, useMemo, useState } from "react";
import { formatUnits, parseUnits, zeroAddress } from "viem";
import erc20ABI from "erc-20-abi";
import {
  useAccount,
  useReadContract,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWatchContractEvent,
  useWriteContract,
} from "wagmi";
import { IToken } from "@/components/Mining/types";
import { errorToast, successToast } from "../frontend/toast";
import { watchContractEvent } from "viem/actions";
import { sepolia } from "viem/chains";
import useDarkXContract from "@/abi/DarkX";

/**
 *  Primary utility hook for everything related to the mining phase
 *
 * @param {IToken} token
 * @param {number} amountToInvest
 * @param {number} multiplier
 * @returns {{ mineToken: (merkleProof: {}) => void; receipt: any; receiptError: any; mineError: any; isLoading: any; isPending: any; transactionLoading: boolean; darkXBalance: BigInt; tokenBalance: BigInt }}
 */
const useMining = (
  token: IToken,
  amountToInvest: number,
  multiplier: number
) => {
  const [isApprovalNeeded, setIsApprovalNeeded] = useState(false);
  const [merkleProofState, setMerkleProofState] = useState<string[] | null>(
    null
  );
  const [transactionLoading, setTransactionLoading] = useState<boolean>(false);

  const MiningContract = useMiningContract();
  const DarkXContract = useDarkXContract();
  const { switchChain } = useSwitchChain();

  const account = useAccount();

  useEffect(() => {
    if (account.chainId) {
      const chainId = account.chainId;
      if (chainId !== sepolia.id) {
        switchChain({ chainId: sepolia.id });
      }
    }
  }, [account.chainId]);

  const points = useMemo(() => {
    if (multiplier && amountToInvest) {
      return multiplier * amountToInvest;
    }
    return 0;
  }, [multiplier, amountToInvest]);

  // Fetching darkX token Balance
  const { data: darkXBalance } = useReadContract({
    address: DarkXContract?.address as `0x${string}`,
    abi: DarkXContract?.abi,
    functionName: "balanceOf",
    args: [`${account.address}`],
  });

  // Fetching current selected token Balance
  const { data: tokenBalance } = useReadContract({
    address: token.tokenContract as `0x${string}`,
    abi: erc20ABI,
    functionName: "balanceOf",
    args: [`${account.address}`],
  });

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

  const {
    writeContract: approve,
    data: approveHash,
    error: approveError,
    isPending: approveIsPending,
  } = useWriteContract();

  const {
    data: approveReceipt,
    error: approveReceiptError,
    isLoading: approveIsLoading,
  } = useWaitForTransactionReceipt({ hash: approveHash });

  const investAmount = useMemo(() => {
    console.log({ amountToInvest });

    if (amountToInvest) {
      return parseUnits(`${amountToInvest}`, token.decimals);
    }
    return BigInt(0);
  }, [amountToInvest]);

  const { data: nativeToken } = useReadContract({
    address: MiningContract?.address as `0x${string}`,
    abi: MiningContract?.abi,
    functionName: "NATIVE_TOKEN",
  });

  const { data: allowance } = useReadContract({
    address: token.tokenContract as `0x${string}`,
    abi: erc20ABI,
    functionName: "allowance",
    args: [account.address, MiningContract?.address],
  });

  useEffect(() => {
    if (tokenBalance) {
      console.log({ tokenBalance });
    }
  }, [tokenBalance]);

  useEffect(() => {
    if (mineError) {
      console.log({ mineError });
      if ((mineError.cause as any).code === 4001) {
        errorToast(
          "You cancelled the mining process. Please Try Again if you wish to mine."
        );
      } else if (
        (mineError.cause as any).reason ===
        "ERC20: transfer amount exceeds balance"
      ) {
        errorToast(
          `You do not have ${amountToInvest} ${token.label} in your wallet balance.`
        );
      } else {
        errorToast("Couldn't mine your $DarkX token.");
      }
      setTransactionLoading(false);
    }
    if (approveError) {
      console.log({ approveError });
      if ((approveError.cause as any).code === 4001) {
        errorToast(
          `You did not approve sending us your ${token.label} tokens. Please Try Again if you wish to mine.`
        );
      } else {
        errorToast(
          `Couldn't approve transfer of your ${token.label} tokens for mining! Please Try Again.`
        );
      }
      setTransactionLoading(false);
    }
    if (receipt) {
      successToast(`Succesfully mined ${points} $DarkX tokens!`);
      setTransactionLoading(false);
      console.log({ receipt });
    }
  }, [mineError, receipt, approveError]);

  const mineToken = (merkleProof: string[]) => {
    if (token.tokenContract && amountToInvest && merkleProof) {
      setTransactionLoading(true);
      const allowed = formatUnits(allowance as bigint, token.decimals);
      const amount = formatUnits(investAmount, token.decimals);
      console.log({ allowed, amount });

      if (Number(allowed) < Number(amount)) {
        setIsApprovalNeeded(true);
        setMerkleProofState(merkleProof);
        approve({
          address: token.tokenContract as `0x${string}`,
          abi: erc20ABI,
          functionName: "approve",
          args: [MiningContract.address, investAmount],
        });
      } else {
        mine({
          address: MiningContract?.address as `0x${string}`,
          abi: MiningContract?.abi,
          functionName: "mine",
          args: [token.tokenContract, investAmount, merkleProof],
          value: token.tokenContract === nativeToken ? investAmount : BigInt(0),
        });
      }
    }
  };

  useEffect(() => {
    if (approveReceipt)
      console.log({ approveReceipt, approveIsLoading, isApprovalNeeded });
    if (isApprovalNeeded && !approveIsLoading && approveReceipt) {
      console.log("mining", { merkleProofState });

      mine({
        address: MiningContract?.address as `0x${string}`,
        abi: MiningContract?.abi,
        functionName: "mine",
        args: [token.tokenContract, investAmount, merkleProofState || []],
        value: token.tokenContract === nativeToken ? investAmount : BigInt(0),
      });
      setIsApprovalNeeded(false);
      setMerkleProofState(null);
    }
  }, [isApprovalNeeded, approveIsLoading, approveReceipt]);

  return {
    mineToken,
    receipt,
    receiptError,
    mineError,
    isLoading,
    isPending,
    transactionLoading,
    darkXBalance,
    tokenBalance:
      formatUnits((tokenBalance as bigint) || BigInt(0), token.decimals) || "0",
  };
};

export default useMining;
