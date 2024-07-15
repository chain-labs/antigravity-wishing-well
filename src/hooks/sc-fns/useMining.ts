import useMiningContract from "@/abi/MiningRig";
import { useEffect, useMemo, useState } from "react";
import { formatUnits, parseUnits, zeroAddress } from "viem";
import erc20ABI from "erc-20-abi";
import {
  useAccount,
  useBalance,
  useReadContract,
  useReadContracts,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { IToken } from "@/components/Mining/types";
import { errorToast, successToast } from "../frontend/toast";
import { watchContractEvent } from "viem/actions";
import { sepolia } from "viem/chains";
import useDarkXContract from "@/abi/DarkX";
import { useRestPost } from "../useRestClient";
import { verify } from "crypto";

/**
 *  Primary utility hook for everything related to the mining phase
 *
 * @param {IToken} tokenSelected
 * @param {number} amountToInvest
 * @param {number} multiplier
 * @param {string} nativeToken
 * @returns {{ mineToken: (merkleProof: {}) => void; receipt: any; receiptError: any; mineError: any; isLoading: any; isPending: any; transactionLoading: boolean; darkXBalance: BigInt; tokenBalance: BigInt }}
 */
const useMining = (
  tokenSelected: number,
  tokens: IToken[],
  amountToInvest: number,
  multiplier: number,
  nativeToken: string,
) => {
  const [isApprovalNeeded, setIsApprovalNeeded] = useState(false);
  const [merkleProofState, setMerkleProofState] = useState<string[] | null>(
    null,
  );
  const [transactionLoading, setTransactionLoading] = useState<boolean>(false);

  const account = useAccount();

  const { data: nativeBalanceData } = useBalance({
    address: account.address,
    chainId: account.chainId,
  });

  const MiningContract = useMiningContract();
  const DarkXContract = useDarkXContract();

  const balance = useMemo(() => {
    if (nativeBalanceData) {
      const response = formatUnits(
        nativeBalanceData.value,
        nativeBalanceData.decimals,
      );
      return response;
    }
    return 0;
  }, [nativeBalanceData]);

  // Single out currently selected token
  const token = useMemo<IToken>(() => {
    // @ts-ignore
    return tokens?.[tokenSelected];
  }, [tokens, tokenSelected]);

  // calculate points depending on multiplier change or amount change
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
  const { data: tokenBalance } = useReadContracts({
    // @ts-ignore
    contracts: tokens?.map((token) => ({
      address: token.address as `0x${string}`,
      abi: erc20ABI,
      functionName: "balanceOf",
      args: [`${account.address}`],
      chainId: token.chainId,
    })),
  });

  /* Approval Contract Function Declaration */

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

  /* <--------END----------> */

  /* Mine Contract Function Declaration */

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

  /* <--------END----------> */

  const investAmount = useMemo(() => {
    if (amountToInvest) {
      return parseUnits(`${amountToInvest}`, tokens?.[tokenSelected]?.decimals);
    }
    return BigInt(0);
  }, [amountToInvest]);

  const { data: allowance } = useReadContract({
    address: tokens?.[tokenSelected]?.address as `0x${string}`,
    abi: erc20ABI,
    functionName: "allowance",
    args: [account.address, MiningContract?.address],
  });

  const { data, mutateAsync: verifyAsync } = useRestPost(
    ["verify-mine"],
    `/api/verify-mining`,
  );

  useEffect(() => {
    if (mineError) {
      console.log({ mineError });
      if ((mineError.cause as any).code === 4001) {
        errorToast(
          "You cancelled the mining process. Please Try Again if you wish to mine.",
        );
      } else if (
        (mineError.cause as any).reason ===
        "ERC20: transfer amount exceeds balance"
      ) {
        errorToast(
          `You do not have ${amountToInvest} ${token.symbol} in your wallet balance.`,
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
          `You did not approve sending us your ${token.symbol} tokens. Please Try Again if you wish to mine.`,
        );
      } else {
        errorToast(
          `Couldn't approve transfer of your ${token.symbol} tokens for mining! Please Try Again.`,
        );
      }
      setTransactionLoading(false);
    }
    if (receipt) {
      verifyAsync({ walletAddress: account.address }).then((response) => {
        successToast(`Succesfully mined ${points} $DarkX tokens!`);
        setTransactionLoading(false);
        console.log({ receipt });
      });
    }
  }, [mineError, receipt, approveError]);

  useEffect(() => {
    if (token && allowance && amountToInvest) {
      const allowed = formatUnits(allowance as bigint, token.decimals);
      if (Number(allowed) < amountToInvest) {
        setIsApprovalNeeded(true);
      } else {
        setIsApprovalNeeded(false);
      }
    }
  }, [allowance, amountToInvest, token]);

  const mineToken = (merkleProof: string[]) => {
    if (token.address && amountToInvest && merkleProof) {
      setTransactionLoading(true);
      const allowed = formatUnits(
        (allowance as bigint) || BigInt(0),
        token.decimals,
      );
      const amount = formatUnits(investAmount, token.decimals);

      if (
        !(nativeToken.toLowerCase() === token.address.toLowerCase()) &&
        Number(allowed) < Number(amount)
      ) {
        setIsApprovalNeeded(true);
        setMerkleProofState(merkleProof);
        approve({
          address: token.address as `0x${string}`,
          abi: erc20ABI,
          functionName: "approve",
          args: [MiningContract.address, investAmount],
        });
      } else {
        mine({
          address: MiningContract?.address as `0x${string}`,
          abi: MiningContract?.abi,
          functionName: "mine",
          args: [token.address, investAmount, merkleProof],
          value:
            token.address.toLowerCase() === nativeToken.toLowerCase()
              ? investAmount
              : BigInt(0),
        });
      }
    }
  };

  useEffect(() => {
    if (approveReceipt) {
      console.log({ approveReceipt, approveIsLoading, isApprovalNeeded });
    }
    if (isApprovalNeeded && !approveIsLoading && approveReceipt) {
      console.log("mining", { merkleProofState });

      mine({
        address: MiningContract?.address as `0x${string}`,
        abi: MiningContract?.abi,
        functionName: "mine",
        args: [token.address, investAmount, merkleProofState || []],
        value: token.address === nativeToken ? investAmount : BigInt(0),
      });
      setIsApprovalNeeded(false);
      setMerkleProofState(null);
    }
  }, [isApprovalNeeded, approveIsLoading, approveReceipt]);

  return {
    mineToken,
    receipt,
    approveReceipt,
    receiptError,
    mineError,
    isLoading,
    isPending,
    transactionLoading,
    isApprovalNeeded,
    darkXBalance,
    tokenBalances: tokenBalance?.map((tokenBalance: any, index: number) => {
      if (tokens[index].address?.toLowerCase() === nativeToken?.toLowerCase())
        return balance;
      return (
        formatUnits(
          (tokenBalance.result as bigint) || BigInt(0),
          tokens?.[index].decimals,
        ) || "0"
      );
    }),
  };
};

export default useMining;
