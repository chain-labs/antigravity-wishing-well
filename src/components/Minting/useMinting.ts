import useDarkContract from "@/abi/Dark";
import useLCC_Contract from "@/abi/LaunchControlCenter";
import useUserData from "@/app/(client)/store";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { formatUnits, parseUnits } from "viem";
import { readContract } from "@wagmi/core";
import {
  useAccount,
  useConfig,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { checkCorrectNetwork } from "../RainbowKit";
import { TEST_NETWORK } from "@/constants";
import { pulsechain, sepolia } from "viem/chains";
import { errorToast } from "@/hooks/frontend/toast";
import { MINTING_STATES } from "./MintingHero";
import { MintError } from "./types";
const useMinting = (
  darkInput: number,
  setMintStep: Dispatch<SetStateAction<keyof typeof MINTING_STATES>>,
  setTxLoading: Dispatch<SetStateAction<boolean>>,
  setTxError: Dispatch<SetStateAction<MintError>>,
) => {
  const { darkBalance } = useUserData();
  const account = useAccount();
  const config = useConfig();

  const LCC_Contract = useLCC_Contract();
  const DarkContract = useDarkContract();

  const {
    data: approveHash,
    writeContractAsync: approve,
    error: approveError,
  } = useWriteContract();
  const {
    data: mintHash,
    writeContractAsync: mint,
    error: mintError,
  } = useWriteContract();
  const { data: approveReceipt } = useWaitForTransactionReceipt({
    hash: approveHash,
    confirmations: 2,
  });
  const { data: mintReceipt } = useWaitForTransactionReceipt({
    hash: mintHash,
  });

  const [allowance, setAllowance] = useState({ allowed: false, value: -1 });

  useEffect(() => {
    if (
      account.address &&
      darkInput &&
      config &&
      DarkContract.address &&
      LCC_Contract.address
    ) {
      readContract(config, {
        address: DarkContract.address as `0x${string}`,
        abi: DarkContract.abi,
        functionName: "allowance",
        args: [
          account.address as `0x${string}`,
          LCC_Contract.address as `0x${string}`,
        ],
      })
        .then((allowanceData) => {
          const allowance = formatUnits(allowanceData as bigint, 18);
          const response = {
            value: Number(allowance),
            allowed: darkInput <= Number(allowance),
          };

          return setAllowance(response);
        })
        .catch((err) => {
          console.log("ERROR", err);
          setAllowance({ allowed: false, value: 0 });
        });
    } else {
      setAllowance({ allowed: false, value: 0 });
    }
  }, [darkInput, account.address, DarkContract, LCC_Contract, config]);

  const mintFn = useCallback(() => {
    setMintStep(MINTING_STATES.MINT);
    mint({
      address: LCC_Contract.address as `0x${string}`,
      abi: LCC_Contract.abi,
      functionName: "mintFuelCell",
      args: [darkInput],
    }).then((tx) => {
      console.log({ tx });
      setMintStep(MINTING_STATES.RECEIPT);
    });
  }, [LCC_Contract, darkInput, mint, setMintStep]);

  const approveFn = useCallback(() => {
    setMintStep(MINTING_STATES.APPROVAL);
    approve({
      address: DarkContract.address as `0x${string}`,
      abi: DarkContract.abi,
      functionName: "approve",
      args: [
        LCC_Contract.address as `0x${string}`,
        parseUnits(darkInput.toString(), 18),
      ],
    }).then((tx) => {
      console.log({ approveTx: tx });
    });
  }, [DarkContract, LCC_Contract, darkInput, approve, setMintStep]);

  const mintLogic = useCallback(() => {
    setTxError({ is: false, value: undefined });
    if (
      darkInput > 0 &&
      checkCorrectNetwork(account.chainId, [
        TEST_NETWORK ? sepolia.id : pulsechain.id,
      ])
    ) {
      setTxLoading(true);
      if (allowance.allowed) {
        mintFn();
      } else {
        approveFn();
      }
    } else {
      setTxLoading(false);
      if (
        !checkCorrectNetwork(account.chainId, [
          TEST_NETWORK ? sepolia.id : pulsechain.id,
        ])
      )
        errorToast("You are connected to a wrong network!");
      else if (darkInput < darkBalance) {
        console.log({ darkInput, darkBalance });
        errorToast("Insufficient Dark Balance!");
      }
    }
  }, [
    allowance.allowed,
    darkInput,
    mintFn,
    approveFn,
    darkBalance,
    account.chainId,
    setTxLoading,
    setTxError,
  ]);

  useEffect(() => {
    if (approveReceipt) {
      mintFn();
      console.log({ approveReceipt });
    }
  }, [approveReceipt, mintFn]);

  useEffect(() => {
    if (mintReceipt) {
      setMintStep(MINTING_STATES.SUCCESS);
      console.log({ mintReceipt });
    }
  }, [mintReceipt, setMintStep]);
  useEffect(() => {
    if (approveError) {
      setTxError({ is: true, value: "Approve" });
      console.log({ approveError });
    }
  }, [approveError]);

  useEffect(() => {
    if (mintError) {
      setTxError({ is: true, value: "Mint" });
      console.log({ mintError });
    }
  }, [mintError]);

  useEffect(() => {
    console.log({ allowance });
    if (allowance.allowed) {
      setMintStep(MINTING_STATES.MINT);
    } else {
      setMintStep(MINTING_STATES.INITIAL);
    }
  }, [allowance, setMintStep]);

  return { darkBalance, allowance, mintLogic };
};

export default useMinting;
