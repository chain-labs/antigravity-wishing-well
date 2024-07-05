"use client";

import { useAccount, useSwitchChain } from "wagmi";
import "@rainbow-me/rainbowkit/styles.css";
import { useEffect } from "react";
import { TEST_NETWORK } from "@/constants";
import { base, pulsechain, baseSepolia, sepolia } from "viem/chains";
import dynamic from "next/dynamic";
import useWishwell from "@/hooks/sc-fns/useWishwell";
import Footer from "@/components/Home/sections/Footer";
import Newsletter from "@/components/Home/sections/Newsletter";
import Leaderboard from "@/components/Collective/Leaderboard";

const Contributed = dynamic(() => import("./Contributed"), {
  ssr: false,
});

const WalletNotConnected = dynamic(() => import("./WalletNotConnected"), {
  ssr: false,
});

const Registered = dynamic(() => import("./Registered"), {
  ssr: false,
});

export default function Wishwell() {
  const account = useAccount();
  const switchChain = useSwitchChain();
  const {
    isRegistered,
    isSuccess,
    registerKit,
    error,
    setError,
    tokenId,
    loading,
  } = useWishwell();

  useEffect(() => {
    if (account.chainId) {
      const chainId = account.chainId;

      if (TEST_NETWORK) {
        if (chainId !== baseSepolia.id && chainId !== pulsechain.id) {
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
    <>
      {account.status === "connected" ? (
        isRegistered ? (
          isSuccess ? (
            <Contributed tokenId={tokenId.toString()} />
          ) : (
            <Registered />
          )
        ) : (
          <WalletNotConnected
            registrationKit={{
              error,
              loading,
              setError,
              isRegistered,
              handleRegister: registerKit.registerFn,
              registerIdle: registerKit.registerIdle,
            }}
          />
        )
      ) : (
        <WalletNotConnected
          registrationKit={{
            error,
            loading,
            setError,
            isRegistered,
            handleRegister: registerKit.registerFn,
            registerIdle: registerKit.registerIdle,
          }}
        />
      )}
      {account.isConnected && <Leaderboard accountIsConnected />}
      <Newsletter />
      <Footer />
    </>
  );
}
