import { IMAGEKIT_IMAGES } from "@/assets/imageKit";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import ContributedHero from "./Hero/ContributedHero";
import NFTPopUp from "./Hero/NFTPopUp";
import { StateType } from "./types";
import NonContributed from "./Hero/NonContributed";
import ClaimedCard from "./Hero/ClaimedCard";
import useTimer from "@/hooks/frontend/useTimer";
import ClaimTransitionWait from "./Hero/ClaimingTransitionWait";
import useClaim from "@/hooks/sc-fns/useClaim";

export default function MiningHero() {
  const [state, setState] = useState<StateType>("Claiming");
  const [NFTHover, setNFTHover] = useState(false);
  const NFTRef = useRef<HTMLDivElement>(null);
  const NFTContainerRef = useRef<HTMLDivElement>(null);
  const [minedSuccess, setMinedSuccess] = useState(false);
  const timer = useTimer();

  return (
    <div className="relative w-full min-h-screen h-fit z-0">
      <Image
        src={IMAGEKIT_IMAGES.MINING_BG}
        height={1080}
        width={1920}
        alt="background"
        layout="cover"
        objectFit="cover"
        className="absolute top-0 left-0 w-full h-[120%] object-[15%_50%] object-none md:w-full md:h-[110%] md:object-cover z-[-1]
              after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-red-500 after:from-[#000000BF] after:to-[#00000000] after:z-[10]
            "
      />
      <div className="bg-gradient-to-b from-[#000] h-fit to-[#0000]">
        <div className="flex flex-col justify-center items-center w-full h-fit pt-[30px] md:pt-[100px]">
          {timer.claimTransition ? (
            <ClaimTransitionWait />
          ) : (timer.claimStarted || timer.era === "minting") && state !== "Claimed" ? (
            <ContributedHero setState={setState} />
          ) : (timer.claimStarted || timer.era === "minting") && state === "Claimed" ? (
            <ClaimedCard />
          ) : (
            <NonContributed
              state={state}
              NFTContainerRef={NFTContainerRef}
              NFTRef={NFTRef}
              NFTHover={NFTHover}
              setNFTHover={setNFTHover}
              setMinedSuccess={setMinedSuccess}
            />
          )}
        </div>
        <AnimatePresence>
          {NFTHover && (
            <NFTPopUp
              NFTContainerRef={NFTContainerRef}
              NFTRef={NFTRef}
              minedSuccess={minedSuccess}
              setMinedSuccess={setMinedSuccess}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
