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
  usePublicClient,
  useReadContract,
  useTransactionReceipt,
  useWriteContract,
} from "wagmi";
import toast from "react-hot-toast";
import useContract from "@/abi";
import { parseAbiItem } from "viem";
import { createPublicClient, http } from "viem";
import axios from "axios";
import { POLL_TIME, PROXY_API_ENDPOINT, TIMER } from "@/constants";
import { checkCorrectNetwork, getApiNetwork } from "@/utils";

const Timer = dynamic(() => import("./Timer"));

const HomeContainer = () => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [payableAmount, setPayableAmount] = useState(0);
  const [tokenId, setTokenId] = useState<BigInt>(BigInt(0));
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [poll, setPoll] = useState<boolean>(false);
  const account = useAccount();
  const AntiGravity = useContract();
  const publicClient = usePublicClient();

  const getTokenIds = async (poll?: boolean) => {
    console.log({ publicClient });

    if (publicClient === undefined) return;
    if (!poll) {
      setLoading(true);
      setIsRegistered(false);
      setIsSuccess(false);
    }
    // note: using the public client which is already set to ensure another conditional logic is not needed to set the http transport.
    // const publicClient =  createPublicClient({
    //   chain: account.chain,
    //   transport: http("https://base-sepolia.g.alchemy.com/v2/Ck1jBlebtn6A92-eXG1tnievZs0kfS9F"),
    // });

    const fromBlockNumber = account.chainId
      ? process.env.NEXT_PUBLIC_BASE_FROM_BLOCK_NUMBER
      : process.env.NEXT_PUBLIC_PLS_FROM_BLOCK_NUMBER;

    if (fromBlockNumber === undefined)
      throw Error("Please set the enviornment variable for Block Number");

    const filter = await publicClient.createEventFilter({
      address: AntiGravity?.address,
      event: parseAbiItem(
        "event Transfer(address indexed from, address indexed to, uint256 indexed id)"
      ),
      args: {
        to: account.address,
      },
      fromBlock: BigInt(fromBlockNumber),
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
        console.log({ contribution });

        setLoading(false);
        if (contribution > 0) {
          setIsSuccess(true);
        } else {
          setIsRegistered(true);
        }
      } catch (err) {
        toast.error("Something went wrong. Try Again!", { duration: 3000 });
        setError(true);
        console.error({ err });
      }
    } else {
      setLoading(false);
      setIsSuccess(false);
      setIsRegistered(false);
    }
  };

  useEffect(() => {
    if (account.address && checkCorrectNetwork(account.chain?.id) && !error) {
      getTokenIds(false);
    }
  }, [account.address, error]);

  useEffect(() => {
    let timer: any;
    if (poll) {
      getTokenIds(true);

      timer = setInterval(() => {
        getTokenIds(true);
      }, POLL_TIME ?? 30000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [poll]);

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
    isIdle: registerIdle,
    isPending: registerPending,
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
      duration: 10000,
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
    <div className="flex flex-col min-h-screen max-w-screen overflow-hidden">
      <Register
        isRegistered={isRegistered}
        handleRegister={handleRegister}
        isSuccess={isSuccess}
        tokenId={tokenId}
        loading={loading}
        registerIdle={registerIdle || !registerPending}
        error={error}
        setError={setError}
        setPoll={setPoll}
      />
      {!isRegistered && (
        <Timer
          handleRegister={handleRegister}
          targetTime={`${TIMER}`}
          isRegistered={isRegistered}
        />
      )}
      <div id="value"></div>
      <Value />

      {/* <SuccessFooter isSuccess={isSuccess} /> */}
      <div id="utilities"></div>
      <Features />
      <div id="team"></div>
      <Team />
      {!isRegistered && (
        <Timer
          handleRegister={handleRegister}
          targetTime={`${TIMER}`}
          isRegistered={isRegistered}
        />
      )}
      <StayUpdated />
      <Footer />
    </div>
  );
};

export default HomeContainer;
