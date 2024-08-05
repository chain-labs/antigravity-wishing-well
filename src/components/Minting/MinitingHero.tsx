"use client";

import { IMAGEKIT_IMAGES } from "@/assets/imageKit";
import React, { useState } from "react";
import { useEffect, useRef } from "react";
import MintingCalculator from "./MintingCalculator";
import Button from "@/components/Button";
import { IMAGEKIT_ICONS } from "@/assets/imageKit";
import CountdownTimer from "@/components/CountdownTimer";
import ProgressingStates, { states } from "@/components/ProgressingStates";
import NoNFTHero from "./Hero/NoNFTHero";
import NFTHero from "./Hero/NFTHero";
import { useAccount } from "wagmi";
import useTimer from "@/hooks/frontend/useTimer";

export default function MintingHero() {
  const nftAvailable = false;
  const account = useAccount();
  const timerState = useTimer();

  const [miningState, setMiningState] = useState<{
    Approve: states;
    Mint: states;
    Success: states;
  }>({
    Approve: "progress",
    Mint: "pending",
    Success: "pending",
  });

  const heroRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setTimeout(() => {
      setMiningState({
        ...miningState,
        Approve: "success",
        Mint: "progress",
      });
    }, 10000);
    setTimeout(() => {
      setMiningState({
        ...miningState,
        Approve: "success",
        Mint: "success",
        Success: "progress",
      });
    }, 15000);
    setTimeout(() => {
      setMiningState({
        ...miningState,
        Approve: "success",
        Mint: "success",
        Success: "success",
      });
    }, 20000);
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${IMAGEKIT_IMAGES.MINING_PAGE_ERA_3})`,
      }}
      className="relative w-full min-h-screen h-fit z-10 overflow-hidden bg-auto bg-[40%_50%] md:bg-cover "
    >
      <div className="h-fit z-0 ">
        <div className="flex flex-col justify-center items-center w-full h-fit py-[30px] md:pt-[100px] z-0">
          <div
            ref={heroRef}
            className="max-w-full relative flex flex-col lg:flex-row justify-start items-center lg:items-start gap-[24px] lg:gap-[16px] mt-[80px] px-[16px] h-fit"
          >
            {nftAvailable ? <NFTHero /> : <NoNFTHero />}
            <div className="flex flex-col justify-center items-center gap-[8px]">
              <MintingCalculator
                tokenBalance={"12000"}
                value={0}
                points={0}
                setValue={() => {}}
                conversionRateToUSD={0.245}
                era={2}
                phase={timerState.phase}
                multiplyer={11}
                inputOptions={[]}
                setSelectedToken={() => {}}
                selectedToken={1}
              />
              <Button
                innerText="Connect Wallet"
                iconSrc={IMAGEKIT_ICONS.WALLET_WHITE}
                iconAlt="wallet"
                variants={{
                  hover: {
                    animationName: "wiggle",
                    animationDuration: "1s",
                    animationFillMode: "forwards",
                    animationTimingFunction: "linear",
                  },
                }}
              />
              <div className="p-[8px] rounded-[6px] bg-[#030404A8] w-full max-w-[350px] md:max-w-[400px]">
                <ProgressingStates states={miningState} />
              </div>
              <div className="p-[8px] rounded-[6px] bg-[#030404A8] w-full max-w-[350px] md:max-w-[400px]">
                <CountdownTimer state={timerState} fontDesktopSize={56} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
