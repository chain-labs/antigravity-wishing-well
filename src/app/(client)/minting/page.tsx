"use client";

import { useAccount } from "wagmi";
import "@rainbow-me/rainbowkit/styles.css";
import { useEffect, useState } from "react";
import { TEST_NETWORK } from "@/constants";
import { base, pulsechain, baseSepolia, sepolia } from "viem/chains";
import dynamic from "next/dynamic";

const MiningPage = dynamic(() => import("./MintingPage"), {
  ssr: false,
});

export default function Mining() {
  const account = useAccount();

  return <MiningPage />;
}
