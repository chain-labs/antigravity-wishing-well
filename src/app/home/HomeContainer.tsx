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
import AntiGravity from "../../abi/Antigravity";
import toast from "react-hot-toast";

const Timer = dynamic(() => import("./Timer"));

const HomeContainer = () => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const account = useAccount();

  useEffect(() => {}, [account.address]);

  const balance = useReadContract({
    ...AntiGravity,
    functionName: "balanceOf",
    args: [account.address],
    query: {
      enabled: account.isConnected,
    },
  });

  useEffect(() => {
    if (balance.isFetched) {
      if ((balance.data as number) > 0) {
        setIsRegistered(true);
        return;
      }
    }
    setIsRegistered(false);
  }, [balance.isFetched, balance.data]);

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
    toast.loading("Getting you regisetered!");
    await register({
      ...AntiGravity,
      functionName: "register",
    });
  };

  useEffect(() => {
    if (registerError) {
      console.log({ registerError });
      toast.error("Something Went Wrong");
      setIsRegistered(false);
    }
  }, [registerError]);

  useEffect(() => {
    if (registerFetched) {
      console.log({ registerReceipt });
      toast.success("Registered successful");
      setIsRegistered(true);
    }
  }, [registerFetched]);

  const handleSuccess = () => {
    // setIsSuccess(!isSuccess);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Register
        isRegistered={isRegistered}
        handleRegister={handleRegister}
        isSuccess={isSuccess}
        handleSuccess={handleSuccess}
      />
      {isRegistered && (
        <Timer
          handleRegister={handleRegister}
          targetTime="2024-04-02T21:00:00Z"
          isRegistered={isRegistered}
        />
      )}
      <div id="value"></div>
      <Value />
      {!isRegistered && (
        <Timer
          handleRegister={handleRegister}
          targetTime="2024-04-02T21:00:00Z"
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
