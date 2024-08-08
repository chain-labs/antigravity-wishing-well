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
import Image from "next/image";
import P from "../HTML/P";
import H1 from "../HTML/H1";
import { motion } from "framer-motion";
import { errorToast } from "@/hooks/frontend/toast";

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
    {
      toastOption: {
        position: "bottom-left",
        referencePositionX: heroRef.current?.offsetLeft,
      },
    },
  );

  const handleMintButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mintLogic();
  };

  useEffect(() => {});

  const [nftNotifReveal, setNftNotifReveal] = useState<boolean>(false);
  const handleNFTNotificationReveal = () => {
    setNftNotifReveal(true);
    setTimeout(() => {
      setNftNotifReveal(false);
    }, 8000);
  };

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
          Approve: "progress",
          Mint: "pending",
          Success: "pending",
        });

        return;

      case MINTING_STATES.MINT:
        setMintState({
          Approve: "success",
          Mint: txLoading ? "progress" : "pending",
          Success: "pending",
        });

        return;

      case MINTING_STATES.RECEIPT:
        setMintState({
          Approve: "success",
          Mint: "success",
          Success: "progress",
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
        variants: {
          hover: {
            animationName: "wiggle",
            animationDuration: "1s",
            animationFillMode: "forwards",
            animationTimingFunction: "linear",
          },
        },
      };
    }
    switch (currentState) {
      case MINTING_STATES.INITIAL:
        return {
          text: "Approve Contract",
          loading: false,
          disabled: false,
          icon: IMAGEKIT_ICONS.TICK,
          variants: {
            hover: {
              rotate: 360,
              transition: {
                duration: 1,
                type: "spring",
              },
            },
          },
        };
      case MINTING_STATES.APPROVAL:
        return {
          text: "Approving",
          loading: true,
          disabled: true,
          icon: IMAGEKIT_ICONS.CUBE,
          variants: {
            hover: {
              scale: 1.2,
              transition: {
                duration: 1,
                type: "spring",
              },
            },
          },
        };
      case MINTING_STATES.MINT:
        return {
          text: txLoading ? "Minting" : "Mint Now",
          loading: txLoading,
          disabled: txLoading,
          icon: IMAGEKIT_ICONS.CUBE,
          variants: {
            hover: {
              scale: 1.2,
              transition: {
                duration: 1,
                type: "spring",
              },
            },
          },
        };

      case MINTING_STATES.RECEIPT:
        return {
          text: "BUILDING FUEL CELLS",
          loading: true,
          disabled: true,
          icon: IMAGEKIT_ICONS.CUBE,
          variants: {
            hover: {
              scale: 1.2,
              transition: {
                duration: 1,
                type: "spring",
              },
            },
          },
        };

      case MINTING_STATES.SUCCESS: {
        handleNFTNotificationReveal();
        return {
          text: "Minted Fuel Cells!",
          loading: false,
          disabled: false,
          icon: IMAGEKIT_ICONS.CUBE,
          variants: {
            hover: {
              scale: 1.2,
              transition: {
                duration: 1,
                type: "spring",
              },
            },
          },
        };
      }
      default:
        return {
          text: "Approve Contract",
          loading: false,
          disabled: false,
          icon: IMAGEKIT_ICONS.CUBE,
          variants: {
            hover: {
              scale: 1.2,
              transition: {
                duration: 1,
                type: "spring",
              },
            },
          },
        };
    }
  }, [currentState, txLoading, txError]);

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
                        200,000
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
                        50,000
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
                      Journey 1
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
