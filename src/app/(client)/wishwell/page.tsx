"use client";

import { useAccount, useSwitchChain } from "wagmi";
import "@rainbow-me/rainbowkit/styles.css";
import { useEffect } from "react";
import { TEST_NETWORK } from "@/constants";
import { base, pulsechain, baseSepolia, sepolia } from "viem/chains";
import useWishwell from "@/hooks/sc-fns/useWishwell";
import Footer from "@/components/Home/sections/Footer";
import Newsletter from "@/components/Home/sections/Newsletter";
import Leaderboard from "@/components/Home/sections/Leaderboard";
import WalletNotConnectedHero from "@/components/Wishwell/components/WalletNotConnectedHero";
import RegisteredHero from "@/components/Wishwell/components/RegisteredHero";
import ContributedHero from "@/components/Wishwell/components/ContributedHero";

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
            <ContributedHero tokenId={tokenId.toString()} />
          ) : (
            <RegisteredHero />
          )
        ) : (
          <WalletNotConnectedHero
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
        <WalletNotConnectedHero
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
      {account.isConnected && <Leaderboard accountIsConnected typeOfLeaderboard="allTimeLeaderboard" />}
      <Newsletter />
      <Footer />
    </>
  );
}
