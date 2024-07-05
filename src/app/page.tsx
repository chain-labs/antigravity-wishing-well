"use client";

import { useAccount, useSwitchChain } from "wagmi";
// import HomeContainer from "./home/HomeContainer";
import "@rainbow-me/rainbowkit/styles.css";
import { useEffect, useState } from "react";
import { TEST_NETWORK } from "@/constants";
import { base, pulsechain, baseSepolia, sepolia } from "viem/chains";
import dynamic from "next/dynamic";

const Homepage = dynamic(() => import("./HomePage"), {
  ssr: false,
});

export default function Home() {
  const account = useAccount();
  const switchChain = useSwitchChain();

  useEffect(() => {
    if (account.chainId) {
      const chainId = account.chainId;

      if (TEST_NETWORK) {
        if (
          chainId !== baseSepolia.id &&
          chainId !== pulsechain.id &&
          chainId !== sepolia.id
        ) {
          switchChain.switchChain({ chainId: sepolia.id });
        }
      } else {
        if (chainId !== base.id && chainId !== pulsechain.id) {
          switchChain.switchChain({ chainId: pulsechain.id });
        }
      }
    }
  }, [account.chainId]);

  return <Homepage />;
}
