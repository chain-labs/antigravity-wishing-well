"use client";

import { useAccount, useSwitchChain } from "wagmi";
import HomeContainer from "./home/HomeContainer";
import "@rainbow-me/rainbowkit/styles.css";
import { useEffect } from "react";
import { TEST_NETWORK } from "@/constants";
import { mainnet, pulsechain, pulsechainV4, sepolia } from "viem/chains";

export default function Home() {
  const account = useAccount();
  const switchChain = useSwitchChain();

  useEffect(() => {
    if (account.chainId) {
      const chainId = account.chainId;

      if (TEST_NETWORK) {
        if (chainId !== sepolia.id && chainId !== pulsechainV4.id) {
          switchChain.switchChain({ chainId: sepolia.id });
        }
      } else {
        if (chainId !== mainnet.id && chainId !== pulsechain.id) {
          switchChain.switchChain({ chainId: mainnet.id });
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
