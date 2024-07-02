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

const LoadingPage = dynamic(() => import("./LoadingPage"), {
  ssr: false,
});

export default function Home() {
  const account = useAccount();
  const switchChain = useSwitchChain();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (window !== undefined) {
      window.addEventListener("load", () => {
        setLoading(false);
      });
    }
  }, []);

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

  return (
    <main className="min-h-screen">
      <div className="z-[0]">
        <div className="z-[100]">
          <LoadingPage contentLoaded={!loading} />
        </div>
        <Homepage />
      </div>
    </main>
  );
}
