"use client";
import React, { useEffect, useState } from "react";
import Value from "./Value";
import Features from "./Features";
import Team from "./Team";
import StayUpdated from "./StayUpdated";
import Footer from "./Footer";
import Register from "./RegisterContainer";
import dynamic from "next/dynamic";
import {
  useAccount,
  useReadContract,
  useTransactionReceipt,
  useWriteContract,
} from "wagmi";
import toast from "react-hot-toast";
import useContract from "@/abi";
import { parseAbiItem } from "viem";
import { createPublicClient, http } from "viem";
import axios from "axios";
import { PROXY_API_ENDPOINT, TIMER } from "@/constants";
import { getApiNetwork } from "@/utils";

const Timer = dynamic(() => import("./Timer"));

const HomeContainer = () => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [payableAmount, setPayableAmount] = useState(0);
  const [tokenId, setTokenId] = useState<BigInt>(BigInt(0));
  const [loading, setLoading] = useState<boolean>(true);
  const account = useAccount();
  const AntiGravity = useContract();

  useEffect(() => {
    const getTokenIds = async () => {
      const publicClient = createPublicClient({
        chain: account.chain,
        transport: http(),
      });

      const filter = await publicClient.createEventFilter({
        address: AntiGravity?.address,
        event: parseAbiItem(
          "event Transfer(address indexed from, address indexed to, uint256 indexed id)"
        ),
        args: {
          to: account.address,
        },
        fromBlock: BigInt(5610902),
        toBlock: "latest",
      });

      const logs = await publicClient.getFilterLogs({ filter });
      const tokenId = logs[0]?.args.id;
      setTokenId(tokenId ?? BigInt(0));
      if (tokenId) {
        try {
          const contributionData = await axios.get(
            `${PROXY_API_ENDPOINT}contribution/${tokenId}?blockchain=${getApiNetwork(
              Number(account?.chainId)
            )}`
          );
          const contribution = parseFloat(contributionData.data.data.value);
          setLoading(false);
          if (contribution > 0) {
            setIsSuccess(true);
          }
        } catch (err) {
          toast.error("Something went wrong. Try Again!", { duration: 3000 });
          console.error({ err });
        }
      }
    };

    if (account.address) {
      getTokenIds();
    }
  }, [account.address]);

  const balance = useReadContract({
    ...AntiGravity,
    functionName: "balanceOf",
    args: [account.address as `0x${string}`],
    query: {
      enabled: account.isConnected,
    },
  });

  useEffect(() => {
    if (balance.isFetched) {
      if ((balance.data as number) > 0) {
        if (!loading) {
          setIsRegistered(true);
          return;
        }
      }
    }
    setIsRegistered(false);
  }, [balance.isFetched, balance.data, loading]);

  const {
    data: registerHash,
    error: registerError,
    writeContract: register,
  } = useWriteContract();

  const {
    data: registerReceipt,
    isFetching: registerFetching,
    isFetched: registerFetched,
  } = useTransactionReceipt({
    hash: registerHash,
  });

  const handleRegister = async () => {
    toast.loading("Getting you registered!", {
      duration: 5000,
    });

    await register({
      // @ts-ignore
      address: AntiGravity?.address,
      abi: AntiGravity?.abi,
      functionName: "register",
      // args: [`${payableAmount}`],
    });
  };

  useEffect(() => {
    if (registerError) {
      console.log({ registerError });
      toast.error("Something Went Wrong", {
        duration: 3000,
      });
      setIsRegistered(false);
    }
  }, [registerError]);

  useEffect(() => {
    if (registerFetched) {
      console.log({ registerReceipt });
      toast.success("Registered successful", {
        duration: 3000,
      });
      setIsRegistered(true);
    }
  }, [registerFetched]);

  return (
    <div className="flex flex-col min-h-screen ">
      <Register
        isRegistered={isRegistered}
        handleRegister={handleRegister}
        isSuccess={isSuccess}
        tokenId={tokenId}
        loading={loading}
      />
      {isRegistered && (
        <Timer
          handleRegister={handleRegister}
          targetTime={`${TIMER}`}
          isRegistered={isRegistered}
        />
      )}
      <div id="value"></div>
      <Value />
      {!isRegistered && (
        <Timer
          handleRegister={handleRegister}
          targetTime={`${TIMER}`}
          isRegistered={isRegistered}
        />
      )}
      {/* <SuccessFooter isSuccess={isSuccess} /> */}
      <div id="utilities"></div>
      <Features />
      <div id="team"></div>
      <Team />
      <StayUpdated />
      <Footer />
    </div>
  );
};

export default HomeContainer;
