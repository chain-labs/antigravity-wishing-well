"use client";

import { useAccount } from "wagmi";
import "@rainbow-me/rainbowkit/styles.css";
import useWishwell from "@/hooks/sc-fns/useWishwell";
import Footer from "@/components/Home/sections/Footer";
import Newsletter from "@/components/Home/sections/Newsletter";
import Leaderboard from "@/components/Home/sections/Leaderboard";
import WalletNotConnectedHero from "@/components/Wishwell/components/WalletNotConnectedHero";
import RegisteredHero from "@/components/Wishwell/components/RegisteredHero";
import ContributedHero from "@/components/Wishwell/components/ContributedHero";

export default function Wishwell() {
  const account = useAccount();
  const {
    isRegistered,
    isSuccess,
    registerKit,
    error,
    setError,
    tokenId,
    loading,
  } = useWishwell();

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
      {account.isConnected && <Leaderboard accountIsConnected />}
      <Newsletter />
      <Footer />
    </>
  );
}
