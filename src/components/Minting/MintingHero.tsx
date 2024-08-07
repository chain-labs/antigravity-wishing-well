"use client";

import { IMAGEKIT_IMAGES } from "@/assets/imageKit";
import React, { MouseEvent, useMemo, useState } from "react";
import { useEffect, useRef } from "react";
import MintingCalculator from "./MintingCalculator";
import Button from "@/components/Button";
import { IMAGEKIT_ICONS } from "@/assets/imageKit";
import CountdownTimer from "@/components/CountdownTimer";
import ProgressingStates from "@/components/ProgressingStates";
import NoNFTHero from "./Hero/NoNFTHero";
import NFTHero from "./Hero/NFTHero";
import { useAccount, useSwitchChain } from "wagmi";
import useTimer from "@/hooks/frontend/useTimer";
import { useChainModal, useConnectModal } from "@rainbow-me/rainbowkit";
import useMinting from "./useMinting";
import { MintError, STEPPERS } from "./types";
import { checkCorrectNetwork } from "../RainbowKit";
import { TEST_NETWORK } from "@/constants";
import { pulsechain, sepolia } from "viem/chains";

export const MINTING_STATES = {
  INITIAL: "INITIAL",
  APPROVAL: "APPROVAL",
  MINT: "MINT",
  RECEIPT: "RECEIPT",
  SUCCESS: "SUCCESS",
} as const;

export default function MintingHero() {
  const nftAvailable = false;
  const account = useAccount();
  const { switchChain } = useSwitchChain();
  const { openConnectModal } = useConnectModal();
  const timerState = useTimer();
  const [txLoading, setTxLoading] = useState(false);
  const [txError, setTxError] = useState<MintError>({
    value: undefined,
    is: false,
  });
  const [darkInput, setDarkInput] = useState<bigint>(BigInt(1));
  const [currentState, setCurrentState] = useState<keyof typeof MINTING_STATES>(
    MINTING_STATES.INITIAL,
  );
  const [mintState, setMintState] = useState<STEPPERS>({
    Approve: "pending",
    Mint: "pending",
    Success: "pending",
  });

  const { darkBalance, mintLogic, allowance } = useMinting(
    darkInput,
    setCurrentState,
    setTxLoading,
    setTxError,
  );

  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    switch (currentState) {
      case MINTING_STATES.INITIAL:
        setMintState({
          Approve: "pending",
          Mint: "pending",
          Success: "pending",
        });

        return;

      case MINTING_STATES.APPROVAL:
        setMintState({
          Approve:
            txError.is && txError.value === "Approve" ? "failed" : "progress",
          Mint: "pending",
          Success: "pending",
        });

        return;

      case MINTING_STATES.MINT:
        setMintState({
          Approve: "success",
          Mint:
            txError.is && txError.value === "Mint"
              ? "failed"
              : txLoading
                ? "progress"
                : "pending",
          Success: "pending",
        });

        return;

      case MINTING_STATES.RECEIPT:
        setMintState({
          Approve: "success",
          Mint: "success",
          Success: "pending",
        });

        return;

      case MINTING_STATES.SUCCESS:
        setMintState({
          Approve: "success",
          Mint: "success",
          Success: "success",
        });

        return;
    }
  }, [currentState, txLoading, txError]);

  const buttonConfigs = useMemo(() => {
    if (txError.is) {
      return {
        text: "Retry",
        loading: false,
        disabled: false,
        icon: IMAGEKIT_ICONS.ERROR,
      };
    }
    switch (currentState) {
      case MINTING_STATES.INITIAL:
        return {
          text: "Approve Contract",
          loading: false,
          disabled: false,
          icon: IMAGEKIT_ICONS.TICK,
        };
      case MINTING_STATES.APPROVAL:
        return {
          text: "Approving",
          loading: true,
          disabled: true,
          icon: IMAGEKIT_ICONS.CUBE,
        };
      case MINTING_STATES.MINT:
        return {
          text: txLoading ? "Minting" : "Mint Now",
          loading: txLoading,
          disabled: txLoading,
          icon: IMAGEKIT_ICONS.CUBE,
        };

      case MINTING_STATES.RECEIPT:
        return {
          text: "BUILDING FUEL CELLS",
          loading: true,
          disabled: true,
          icon: IMAGEKIT_ICONS.CUBE,
        };

      case MINTING_STATES.SUCCESS:
        return {
          text: "Minted Fuel Cells!",
          loading: false,
          disabled: false,
          icon: IMAGEKIT_ICONS.CUBE,
        };

      default:
        return {
          text: "Approve Contract",
          loading: false,
          disabled: false,
          icon: IMAGEKIT_ICONS.CUBE,
        };
    }
  }, [currentState, txLoading, txError]);

  const handleMintButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mintLogic();
  };

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
                tokenBalance={BigInt(darkBalance || 0)}
                value={darkInput}
                setValue={setDarkInput}
                journey={2}
                multiplyer={11}
                bonus={44}
              />
              {account.isConnected ? (
                checkCorrectNetwork(account.chainId, [
                  TEST_NETWORK ? sepolia.id : pulsechain.id,
                ]) ? (
                  <Button
                    innerText={buttonConfigs.text}
                    loading={buttonConfigs.loading}
                    iconPosition="start"
                    iconAlt="mint-btn-icon"
                    iconSrc={buttonConfigs.icon}
                    animateButton
                    disabled={buttonConfigs.disabled}
                    onClick={handleMintButton}
                  />
                ) : (
                  <Button
                    innerText="Switch to PulseChain"
                    iconSrc={IMAGEKIT_ICONS.ERROR}
                    onClick={() => {
                      switchChain({ chainId: pulsechain.id });
                    }}
                    iconAlt="network error"
                    iconPosition="start"
                    variants={{
                      hover: {
                        animationName: "wiggle",
                        animationDuration: "1s",
                        animationFillMode: "forwards",
                        animationTimingFunction: "linear",
                      },
                    }}
                  />
                )
              ) : (
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
                  onClick={openConnectModal}
                />
              )}

              <div className="p-[8px] rounded-[6px] bg-[#030404A8] w-full max-w-[350px] md:max-w-[400px] mt-[16px]">
                <ProgressingStates states={mintState} />
              </div>
              <div className="p-[8px] rounded-[6px] bg-[#030404A8] w-full max-w-[350px] md:max-w-[400px]">
                <CountdownTimer
                  state={timerState}
                  fontDesktopSize={40}
                  fontMobileSize={48}
                  counterClassName="text-agwhite w-fit mx-auto"
                  counterSubtitleClassName="text-[14px] leading-[17.36px] px-[8px]"
                  containerClassName="text-agwhite text-[14px] leading-[17.36px] pb-[8px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
