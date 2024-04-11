"use client";

import { useAccount, useSwitchChain } from "wagmi";
import HomeContainer from "./home/HomeContainer";
import "@rainbow-me/rainbowkit/styles.css";
import { useEffect } from "react";
import { TEST_NETWORK } from "@/constants";
import { base, pulsechain, baseSepolia } from "viem/chains";

export default function Home() {
  const account = useAccount();
  const switchChain = useSwitchChain();

  useEffect(() => {
    if (account.chainId) {
      const chainId = account.chainId;

      if (TEST_NETWORK) {
        if (chainId !== baseSepolia.id && chainId !== pulsechain.id) {
          switchChain.switchChain({ chainId: pulsechain.id });
        }
      } else {
        if (chainId !== base.id && chainId !== pulsechain.id) {
          switchChain.switchChain({ chainId: pulsechain.id });
        }
      }
    }
  }, [account.chainId]);
  return (
    <main className="min-h-screen">
      <HomeContainer />
    </main>
  );
}
