"use client";
import { IMAGEKIT_IMAGES } from "@/assets/imageKit";
import HeroItemCard from "@/components/Home/components/HeroItemCard";
import useTimer from "@/hooks/frontend/useTimer";
import useClaim from "@/hooks/sc-fns/useClaim";

export default function Eras() {
  const timer = useTimer();
  const { darkBalance } = useClaim();
  return (
    <div className="relative grid grid-cols-1 grid-rows-3 w-full h-[180vh] md:h-[100vh] z-0 my-32">
      <HeroItemCard
        title="WishWell"
        description={
          timer.era !== "wishwell"
            ? "Currently you can access wishwell by invitation only."
            : "Contribute to our WishWell to get the WishWell NFT + points."
        }
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
        defaultImageOpacity={0.5}
        hoverImageOpacity={0.35}
      />
      <HeroItemCard
        title="Minting"
        description={
          "Here is a one or two line short description about this. Here is a one or two line short description about this."
        }
        backgroundImage={IMAGEKIT_IMAGES.MINING_PAGE_ERA_3}
        animateFrom="right"
        cardExternalLink="/minting"
        defaultImageOpacity={0.35}
        hoverImageOpacity={0.35}
      />
      <HeroItemCard
        title="The Collective"
        description="Learn how to leverage points, rank up & earn exciting rewards. Join The Collective!"
        backgroundImage={IMAGEKIT_IMAGES.MINTING}
        animateFrom="left"
        className="object-[0px_25%]"
        cardExternalLink="/collective"
        defaultImageOpacity={0.5}
        hoverImageOpacity={0.35}
      />
    </div>
  );
}
