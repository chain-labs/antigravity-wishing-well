"use client";

import H1 from "@/components/HTML/H1";
import H2 from "@/components/HTML/H2";
import P from "@/components/HTML/P";
import Button from "@/components/Button";
import Image from "next/image";
import { IMAGEKIT_ICONS, IMAGEKIT_IMAGES } from "@/assets/imageKit";
import { successToast } from "@/hooks/frontend/toast";
import { useState } from "react";
import BaseSepoliaAG from "@/abi/wishwell/BaseSepolia";
import BaseAG from "@/abi/wishwell/Base";
import SepoliaAG from "@/abi/wishwell/Sepolia";
import PulsechainAG from "@/abi/wishwell/Pulsechain";
import ThreeDHovercardEffect from "@/components/ThreeDHovercardEffect";
import { TEST_NETWORK } from "@/constants";
import useUserData from "@/app/(client)/store";
import imageKitLoader from "@/components/imageKitLoader";

export default function ContributedHero() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    successToast("Copied to clipboard!");
  };

  const { nftURLera1 } = useUserData();

  return (
    <div className="relative w-full min-h-screen overflow-hidden z-0">
      <div className="relative bg-gradient-to-b from-[#0000] to-[#000] overflow-hidden min-h-screen h-fit flex flex-col md:justify-between">
        <div className="flex flex-col justify-center items-center gap-[32px] mx-[16px] pt-[108px] md:pt-[164px] h-fit ">
          <div className="flex flex-col gap-[8px] justify-center items-center">
            <H1 className="text-[52px] leading-[53.76px] md:text-[72px] md:leading-[69.12px] text-agwhite">
              Success!
            </H1>
            <P>Here&apos;s your NFT:</P>
          </div>
          <div className="relative max-h-[500px] h-fit w-[294.76px]">
            <ThreeDHovercardEffect ROTATION_RANGE={10}>
              <Image
                src={nftURLera1}
                alt="nft"
                width={500}
                height={592}
                className="max-w-[349px] max-h-[592px] min-h-[400px] w-full h-auto md:max-w-[500px] md:w-full md:h-auto object-contain"
                loader={imageKitLoader}
              />
            </ThreeDHovercardEffect>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-start gap-[64px] px-[16px] py-[32px] md:py-[64px] md:px-[32px] z-0 h-fit">
          <div className="flex flex-col justify-start items-start gap-[8px]">
            <H2 className="text-[56px] leading-[53.76px] md:text-[48px] md:leading-[46.08px] font-black text-agyellow">
              Get 10x Points Now!
            </H2>
            <div className="flex flex-col md:flex-row gap-[16px]">
              <Button
                innerText="Wishwell.eth"
                iconSrc={IMAGEKIT_ICONS.COPY}
                iconAlt="info icon"
                iconPosition="end"
                hallmarkIconSrc={IMAGEKIT_ICONS.ETH}
                onClick={() =>
                  copyToClipboard(
                    TEST_NETWORK ? BaseSepoliaAG.address : BaseAG.address,
                  )
                }
              />
              <Button
                innerText="Wishwell.pls"
                iconSrc={IMAGEKIT_ICONS.COPY}
                iconAlt="info icon"
                iconPosition="end"
                hallmarkIconSrc={IMAGEKIT_ICONS.PLS}
                onClick={() =>
                  copyToClipboard(
                    TEST_NETWORK ? SepoliaAG.address : PulsechainAG.address,
                  )
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-[32px] md:gap-[8px] max-w-[50ch]">
            <div className="flex justify-start items-center gap-[16px]">
              <Image
                src={IMAGEKIT_ICONS.PLS}
                alt="pls"
                width={48}
                height={48}
              />
              <Image
                src={IMAGEKIT_ICONS.ETH}
                alt="eth"
                width={48}
                height={48}
              />
              <Image
                src={IMAGEKIT_ICONS.USDT}
                alt="usdt"
                width={48}
                height={48}
              />
              <Image
                src={IMAGEKIT_ICONS.USDC}
                alt="usdc"
                width={48}
                height={48}
              />
            </div>
            <P>
              As you contribute more, your ERC-721 NFT above will uniquely
              update with future contributions.
            </P>
          </div>
        </div>
        <Image
          src={IMAGEKIT_IMAGES.WISHWELL_BG}
          height={1080}
          width={1920}
          alt="background"
          layout="cover"
          objectFit="cover"
          className="absolute top-0 left-0 -z-[1] w-full h-[120%] object-[70%_50%] object-cover md:w-full md:h-[110%] md:object-cover"
        />
      </div>
    </div>
  );
}
