"use client";

import { useAccount, useSwitchChain } from "wagmi";
import "@rainbow-me/rainbowkit/styles.css";
import { useEffect, useState } from "react";
import { TEST_NETWORK } from "@/constants";
import { base, pulsechain, baseSepolia } from "viem/chains";
import dynamic from "next/dynamic";
import useWishwell from "@/hooks/sc-fns/useWishwell";

const Contributed = dynamic(() => import("./Contributed"), {
  ssr: false,
  loading: () => <>{console.log("loading homepage")}</>,
});

const WalletNotConnected = dynamic(() => import("./WalletNotConnected"), {
  ssr: false,
  loading: () => <>{console.log("loading homepage")}</>,
});

const Registered = dynamic(() => import("./Registered"), {
  ssr: false,
  loading: () => <>{console.log("loading homepage")}</>,
});

const LoadingPage = dynamic(() => import("../LoadingPage"), {
  ssr: false,
  loading: () => <>{console.log("loading loading page")}</>,
});

export default function Wishwell() {
  const account = useAccount();
  const switchChain = useSwitchChain();
  const [pageLoading, setPageLoading] = useState(true);
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
    if (window !== undefined) {
      window.addEventListener("load", () => {
        console.log("window loaded page");
        setPageLoading(false);
      });
    }
  }, []);

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
      <div className="z-[0]">
        <div className="z-[100]">
					<LoadingPage contentLoaded={!pageLoading} />
				</div>
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
      </div>
    </main>
  );
}
