"use client";

import { IMAGEKIT_IMAGES } from "@/assets/imageKit";
import React, { MouseEvent, useMemo, useState } from "react";
import { useEffect, useRef } from "react";
import MintingCalculator from "./MintingCalculator";
import Button from "@/components/Button";
import { IMAGEKIT_ICONS } from "@/assets/imageKit";
import CountdownTimer from "@/components/CountdownTimer";
import ProgressingStates from "@/components/ProgressingStates";
import { useAccount, useSwitchChain } from "wagmi";
import useTimer from "@/hooks/frontend/useTimer";
import { useChainModal, useConnectModal } from "@rainbow-me/rainbowkit";
import useMinting from "./useMinting";
import { MintError, STEPPERS } from "./types";
import { checkCorrectNetwork } from "../RainbowKit";
import { TEST_NETWORK } from "@/constants";
import { pulsechain, sepolia } from "viem/chains";
import Image from "next/image";
import P from "../HTML/P";
import H1 from "../HTML/H1";
import { motion } from "framer-motion";
import { getButtonCofigs, setCurrentMintState } from "./utils";
import { useJourneyData } from "@/app/(client)/store";

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
  const heroRef = useRef<HTMLDivElement>(null);
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
  const { journey, phase } = useJourneyData();
  const [mintState, setMintState] = useState<STEPPERS>({
    Approve: "pending",
    Mint: "pending",
    Success: "pending",
  });

  const { darkBalance, mintLogic, allowance, faucetCall } = useMinting(
    darkInput,
    setCurrentState,
    setTxLoading,
    setTxError,
    {
      toastOption: {
        position: "bottom-left",
        referencePositionX: heroRef.current?.offsetLeft,
      },
    },
  );

  const multiplier = useMemo(() => {
    if (journey === 1) {
      return 33;
    } else if (journey === 2) {
      return 22;
    } else if (journey === 3) {
      return 11;
    } else return 1;
  }, [journey]);

  const handleMintButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (currentState !== MINTING_STATES.SUCCESS) {
      mintLogic();
    }
  };

  const [nftNotifReveal, setNftNotifReveal] = useState<boolean>(false);
  const [nftNotifData, setNftNotifData] = useState<{
    fuelCells: number;
    points: number;
  }>({ fuelCells: 0, points: 0 });

  const handleNFTNotificationReveal = () => {
    setNftNotifData({
      fuelCells: Number(darkInput),
      points: multiplier * Number(darkInput),
    });
    setNftNotifReveal(true);
    setTimeout(() => {
      setNftNotifReveal(false);
    }, 8000);
  };

  useEffect(() => {
    setCurrentMintState(currentState, setMintState, txLoading);
  }, [currentState, txLoading, txError]);

  useEffect(() => {
    if (currentState === MINTING_STATES.SUCCESS) {
      setTimeout(() => {
        setDarkInput(BigInt(1));
        setCurrentState(MINTING_STATES.INITIAL);
      }, 4000);
    }
  }, [currentState]);

  const buttonConfigs = useMemo(() => {
    return getButtonCofigs(
      Number(darkInput),
      darkBalance,
      currentState,
      txLoading,
      txError,
      handleNFTNotificationReveal,
    );
  }, [currentState, txLoading, txError, darkInput, darkBalance]);

  const buymoreHighlight = useMemo(() => {
    if (buttonConfigs.text === "Insufficient $DARK balance") {
      return true;
    }
    return false;
  }, [buttonConfigs]);

  return (
    <div className="relative w-full min-h-screen h-fit z-10 overflow-hidden">
      <motion.div
        style={{
          backgroundImage: `url(${IMAGEKIT_IMAGES.MINING_PAGE_ERA_3})`,
        }}
        animate={{
          filter: buymoreHighlight
            ? "saturate(0) brightness(0.3)"
            : "saturate(1) brightness(1)",
        }}
        transition={{
          duration: 3,
        }}
        className="absolute top-0 left-0 h-full w-full bg-auto bg-[40%_50%] md:bg-cover"
      ></motion.div>
      <div className="h-fit z-0 ">
        <div className="flex flex-col justify-center items-center w-full h-fit py-[30px] md:pt-[100px] z-0">
          <div
            ref={heroRef}
            className="max-w-full relative flex flex-col lg:flex-row justify-start items-center lg:items-start gap-[24px] lg:gap-[16px] mt-[80px] px-[16px] h-fit"
          >
            <div className="flex flex-col justify-start items-start gap-[16px] w-fit h-full md:max-w-[451px] rounded-[6px]">
              <div className="flex flex-col justify-start items-start gap-[16px] w-fit sm:max-w-[451px] p-[16px] bg-[#FFFFFF4D] rounded-[6px]">
                <H1 className="text-agblack text-[56px] leading-[53.76px] md:text-[64px] md:leading-[64px] sm:text-nowrap text-wrap font-black">
                  Mint Fuel Cells
                </H1>
                <P className="text-agblack text-[14px] font-medium">
                  Minting a fuel cell enters you into the lottery, raises your
                  collective points and rank up. It also secures your treasury
                  yield!
                </P>
              </div>
              <motion.div
                animate={{
                  height: nftNotifReveal ? "fit-content" : 0,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="flex flex-col justify-center items-center gap-0 z-0 overflow-hidden"
              >
                <div className="relative w-full rounded-[6px] bg-gradient-to-bl from-[#5537A5] to-[#BF6841] p-[1px] z-[1] overflow-hidden">
                  <div className="rounded-[inherit] bg-gradient-to-b from-agblack to-[#131A1A] overflow-hidden">
                    <Image
                      src={IMAGEKIT_IMAGES.FUEL_CELL_NFT_GREEN}
                      height={198}
                      width={198}
                      alt="NFT Icon"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div className="relative w-fit rounded-[6px] bg-gradient-to-bl from-[#5537A5] to-[#BF6841] p-[1px] translate-y-[-8px] overflow-hidden">
                  <div className=" grid grid-cols-[1fr_auto_1fr] grid-rows-[1fr_auto_auto] place-items-start gap-y-[16px] gap-x-[8px] p-[16px] pt-[24px] sm:pl-[24px] sm:pt-[16px] rounded-[inherit] bg-gradient-to-bl from-[#3C00DC] to-[#15004C]">
                    <div className="flex flex-col gap-[8px]">
                      <p className="font-general-sans text-agwhite leadign-[14px] text-[14px]">
                        Minted
                      </p>
                      <div className="p-[8px] rounded-[6px] bg-agyellow text-agblack font-sans font-extrabold text-[24px] leading-[24px]">
                        {nftNotifData.fuelCells.toLocaleString()}
                      </div>
                      <p className="font-general-sans text-agwhite leadign-[14px] text-[14px]">
                        Fuel Cells!
                      </p>
                    </div>
                    <div className="h-full bg-gradient-to-bl from-[#3C00DC] via-[#FF5001] to-[#FF5001] w-[1px] rounded-full"></div>
                    <div className="flex flex-col gap-[8px]">
                      <p className="font-general-sans text-agwhite leadign-[14px] text-[14px]">
                        Earned
                      </p>
                      <div className="p-[8px] rounded-[6px] bg-agyellow text-agblack font-sans font-extrabold text-[24px] leading-[24px]">
                        {nftNotifData.points.toLocaleString()}
                      </div>
                      <p className="font-general-sans text-agwhite leadign-[14px] text-[14px]">
                        Points!
                      </p>
                    </div>
                    <div
                      style={{
                        gridColumn: "1 / span 3",
                      }}
                      className="w-full bg-gradient-to-bl from-[#3C00DC] via-[#FF5001] to-[#FF5001] h-[1px] rounded-full"
                    ></div>
                    <p
                      style={{
                        gridColumn: "1 / span 3",
                      }}
                      className="place-self-start font-general-sans text-agwhite leadign-[14px] text-[14px] my-auto"
                    >
                      {`Journey ${journey}`}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="flex flex-col justify-center items-center gap-[8px]">
              <MintingCalculator
                tokenBalance={BigInt(darkBalance || 0)}
                value={darkInput}
                setValue={setDarkInput}
                journey={journey}
                multiplyer={multiplier}
                bonus={1 * multiplier}
                buymoreHighlight={buymoreHighlight}
                buyMoreFn={faucetCall}
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
                    variants={buttonConfigs.variants}
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

              <motion.div
                animate={{
                  filter: buymoreHighlight
                    ? "saturate(0) brightness(.5)"
                    : "saturate(1) brightness(1)",
                }}
                transition={{
                  duration: 1,
                }}
                className="p-[8px] rounded-[6px] bg-[#030404A8] w-full max-w-[350px] md:max-w-[400px] mt-[16px]"
              >
                <ProgressingStates states={mintState} />
              </motion.div>
              <motion.div
                animate={{
                  filter: buymoreHighlight
                    ? "saturate(0) brightness(.5)"
                    : "saturate(1) brightness(1)",
                }}
                transition={{
                  duration: 1,
                }}
                className="p-[8px] rounded-[6px] bg-[#030404A8] w-full max-w-[350px] md:max-w-[400px]"
              >
                <CountdownTimer
                  state={timerState}
                  fontDesktopSize={40}
                  fontMobileSize={48}
                  counterClassName="text-agwhite w-fit mx-auto"
                  counterSubtitleClassName="text-[14px] leading-[17.36px] px-[8px]"
                  containerClassName="text-agwhite text-[14px] leading-[17.36px] pb-[8px]"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
