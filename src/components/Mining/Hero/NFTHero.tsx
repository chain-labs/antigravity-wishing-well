"use client";

import {
  IMAGEKIT_ICONS,
  IMAGEKIT_IMAGES,
  IMAGEKIT_LOGOS,
} from "@/assets/imageKit";
import Button from "@/components/Button";
import H1 from "@/components/HTML/H1";
import P from "@/components/HTML/P";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function NFTHero({
  setNFTHover,
}: {
  setNFTHover: Dispatch<SetStateAction<boolean>>;
}) {
  const [mouseHover, setMouseHover] = useState(false);
  useEffect(() => {
    if (mouseHover) {
      const timeout = setTimeout(() => {
        setNFTHover(true);
      }, 500);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [mouseHover]);
  return (
    <div className="flex flex-col justify-between items-start gap-[16px] w-fit h-full md:max-w-[451px]">
      <div className="flex flex-col justify-start items-start gap-[16px] w-fit sm:max-w-[451px] p-[16px] bg-[#FFFFFF4D]">
        <H1 className="text-agblack text-[56px] leading-[53.76px] md:text-[64px] md:leading-[64px] sm:text-nowrap text-wrap font-black">
          Mint Fuel Cells
        </H1>
        <P className="text-agblack text-[14px] font-medium">
          Minting a fuel cell enters you into the lottery, raises your
          collective points and rank up. It also secures your treasury yield!
        </P>
      </div>
      <div className="flex flex-col sm:flex-row mx-auto justify-center items-center gap-0 z-0">
        <div className="relative w-full rounded-[6px] bg-gradient-to-bl from-[#5537A5] to-[#BF6841] p-[1px] z-[1]">
          <div className="rounded-[inherit] bg-gradient-to-b from-agblack to-[#131A1A] overflow-hidden">
            <Image
              src={IMAGEKIT_IMAGES.FUEL_CELL_NFT_GREEN}
              height={198}
              width={198}
              alt="NFT Icon"
              className="object-cover md:w-full md:h-full w-[281px] h-[198px]"
            />
          </div>
        </div>
        <div className="relative w-fit rounded-[6px] bg-gradient-to-bl from-[#5537A5] to-[#BF6841] p-[1px] translate-y-[-8px] sm:translate-x-[-8px]">
          <div className=" grid grid-flow-col sm:grid-flow-row justify-center items-start gap-[16px] p-[16px] pt-[24px] sm:pl-[24px] sm:pt-[16px] rounded-[inherit] bg-gradient-to-bl from-[#3C00DC] to-[#15004C]">
            <div className="grid flex-col gap-[8px]">
              <p className="font-general-sans text-agwhite leadign-[14px] text-[14px]">
                Minted
              </p>
              <div className="p-[8px] rounded-[6px] bg-agyellow text-agblack font-sans font-extrabold text-[32px] leading-[32px]">
                200,000
              </div>
              <p className="font-general-sans text-agwhite leadign-[14px] text-[14px]">
                Fuel Cells!
              </p>
            </div>
            <div className="w-[1px] sm:w-full h-full sm:h-[1px] bg-[#3C00DC]"></div>
            <p className="font-general-sans text-agwhite leadign-[14px] text-[14px] my-auto">
              Journey 1
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
