import { IMAGEKIT_IMAGES } from "@/assets/imageKit";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
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
  const [minedSuccess, setMinedSuccess] = useState(false);
  const timer = useTimer();

  function handleNFTClose() {
    setNFTHover(false);
  }

  return (
    <div className="relative w-full min-h-screen h-fit z-10 overflow-hidden">
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
      <div className="bg-gradient-to-b from-[#000] h-fit to-[#0000] z-0">
        <div className="flex flex-col justify-center items-center w-full h-fit py-[30px] md:pt-[100px] z-0">
          {timer?.claimTransition ? (
            <ClaimTransitionWait />
          ) : (timer?.claimStarted || timer?.era === "minting") &&
            state !== "Claimed" ? (
            <ContributedHero setState={setState} />
          ) : (timer?.claimStarted || timer?.era === "minting") &&
            state === "Claimed" ? (
            <ClaimedCard setState={setState} />
          ) : (
            <NonContributed
              state={state}
              setNFTHover={setNFTHover}
              setMinedSuccess={setMinedSuccess}
            />
          )}
        </div>
        <AnimatePresence>
          {NFTHover && (
            <NFTPopUp
              minedSuccess={minedSuccess}
              setMinedSuccess={setMinedSuccess}
              handleNFTClose={handleNFTClose}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
