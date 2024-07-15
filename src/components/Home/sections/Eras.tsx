"use client";
import { IMAGEKIT_IMAGES } from "@/assets/imageKit";
import HeroItemCard from "@/components/HeroItemCard";
import useTimer from "@/hooks/frontend/useTimer";

export default function Eras() {
  const timer = useTimer();
  return (
    <div className="relative grid grid-cols-1 grid-rows-3 w-full h-[180vh] md:h-[100vh] z-0 my-32">
      <HeroItemCard
        title="WishWell"
        description="Contribute to our WishWell to get the WishWell NFT + points."
        backgroundImage={IMAGEKIT_IMAGES.WISHWELL}
        animateFrom="left"
        className="object-[50%_55%]"
        cardExternalLink={
          timer.era != "wishwell"
            ? "#"
            : location.pathname === "/wishwell"
              ? "/wishwell#"
              : "/wishwell"
        }
      />
      <HeroItemCard
        title="Mining"
        description="Start mining with supported tokens to get points + $DARKX tokens + the new Antigravity NFT."
        backgroundImage={IMAGEKIT_IMAGES.MINING}
        animateFrom="right"
        cardExternalLink="/mining"
      />
      <HeroItemCard
        title="The Collective"
        description="Learn how to leverage points, rank up & earn exciting rewards. Join The Collective!"
        backgroundImage={IMAGEKIT_IMAGES.MINTING}
        animateFrom="left"
        className="object-[0px_25%]"
        cardExternalLink="/collective"
      />
    </div>
  );
}
