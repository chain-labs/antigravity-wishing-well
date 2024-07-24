import useMiningContract from "@/abi/MiningRig";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { formatUnits, parseUnits } from "viem";
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
import useDarkXContract from "@/abi/DarkX";
import { useRestPost } from "../useRestClient";
import useUserData from "@/app/(client)/store";
import { UserData } from "@/components/Home/components/header/UserConnected";
import { hydrateUserAndNFT } from "@/components/Home/components/header/utils";

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
  setNFTHover: Dispatch<SetStateAction<boolean>>,
  setMinedSuccess: Dispatch<SetStateAction<boolean>>,
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
    query: {
      enabled: !transactionLoading,
    },
  });

  const MiningContract = useMiningContract();
  const DarkXContract = useDarkXContract();

  const balance = useMemo(() => {
    if (nativeBalanceData) {
      const response = formatUnits(
        nativeBalanceData?.value,
        nativeBalanceData?.decimals,
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
  const { data: darkXBalanceData }: { data?: { result: BigInt } } =
    useReadContract({
      address: DarkXContract?.address as `0x${string}`,
      abi: DarkXContract?.abi,
      functionName: "balanceOf",
      args: [`${account.address}`],
      query: {
        enabled: !transactionLoading,
      },
    });

  const [darkXBalance, setDarkXBalance] = useState<BigInt>(BigInt(0));

  useEffect(() => {
    if (darkXBalanceData) {
      if (darkXBalanceData.result) {
        setDarkXBalance(darkXBalanceData.result);
      }
    }
  }, [darkXBalanceData]);

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
    query: {
      enabled: !transactionLoading,
    },
  });

  /* Approval Contract Function Declaration */

  const {
    writeContract: approve,
    data: approveHash,
    error: approveError,
  } = useWriteContract();

  const { data: approveReceipt, isLoading: approveIsLoading } =
    useWaitForTransactionReceipt({ hash: approveHash, confirmations: 2 });

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
  }, [amountToInvest, tokens, tokenSelected]);

  const { data: allowance } = useReadContract({
    address: token?.address as `0x${string}`,
    abi: erc20ABI,
    functionName: "allowance",
    args: [account.address, MiningContract?.address],
    query: {
      enabled: !transactionLoading,
    },
  });

  const { mutateAsync: verifyAsync } = useRestPost(
    ["verify-mine"],
    `/api/verify-mining`,
  );

  const { mutateAsync: fetchUserFn } = useRestPost<UserData>(
    ["get-user"],
    "/api/user",
  );

  const { mutateAsync: mutateNFTData1 } = useRestPost<any>(
    ["generate-nft-era1"],
    "/api/generate-nft",
  );

  const { mutateAsync: mutateNFTData2 } = useRestPost<any>(
    ["generate-nft-era2"],
    "/api/generate-nft",
  );

  const { mutation: mutateUser } = useUserData();

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
      hydrateUserAndNFT(
        account,
        fetchUserFn,
        mutateNFTData1,
        mutateNFTData2,
        mutateUser,
      ).then(() => {
        console.log("Hydrated User Data");
      });
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
  }, [mineError, approveError]);

  useEffect(() => {
    if (receipt) {
      verifyAsync({ walletAddress: account.address }).then((response) => {
        // setDarkXBalance(BigInt(Number(darkXBalance) + 1));
        hydrateUserAndNFT(
          account,
          fetchUserFn,
          mutateNFTData1,
          mutateNFTData2,
          mutateUser,
        ).then(() => {
          console.log("Hydrated User Data");
          setTransactionLoading(false);
          successToast(`Succesfully mined ${points} $DarkX tokens!`);
          setNFTHover(true);
          setMinedSuccess(true);
        });
        console.log({ receipt });
      });
    }
  }, [receipt]);

  useEffect(() => {
    if (
      token &&
      amountToInvest &&
      allowance !== undefined &&
      nativeToken?.toLowerCase() !== token?.address?.toLowerCase()
    ) {
      if (allowance === BigInt(0)) {
        setIsApprovalNeeded(true);
      } else {
        const allowed =
          Number(formatUnits(allowance as bigint, token.decimals)) || 0;
        if (allowed < amountToInvest) {
          setIsApprovalNeeded(true);
        } else {
          setIsApprovalNeeded(false);
        }
      }
    } else {
      setIsApprovalNeeded(false);
    }
  }, [allowance, amountToInvest, token, nativeToken]);

  const mineToken = (merkleProof: string[]) => {
    if (token.address && amountToInvest && merkleProof) {
      setTransactionLoading(true);
      const allowed = formatUnits(
        (allowance as bigint) || BigInt(0),
        token.decimals,
      );
      const amount = formatUnits(investAmount, token.decimals);
      setMerkleProofState(merkleProof);

      // !(nativeToken.toLowerCase() === token.address.toLowerCase()) &&
      // Number(allowed) < Number(amount)
      if (isApprovalNeeded) {
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
    if (transactionLoading) {
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
        setMerkleProofState(null);
      }
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
