"use client";

import Spinner from "@/components/Home/components/Spinner";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroItemCard from "@/components/Home/components/HeroItemCard";
import { IMAGEKIT_IMAGES } from "@/assets/imageKit";
import useTimer from "@/hooks/frontend/useTimer";
import useClaim from "@/hooks/sc-fns/useClaim";

export default function Hero() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [1, 0], [0, 1]);
  const translateYHeroItems = useTransform(
    scrollYProgress,
    [0.5, 0],
    [-150, 0],
  );
  const timer = useTimer();
  const { darkBalance } = useClaim();
  return (
    <div ref={targetRef} className="w-full h-full">
      <motion.div
        style={
          {
            "--opacity": opacity,
          } as any
        }
        className="relative grid grid-rows-3 md:grid-cols-3 md:grid-rows-1 w-full h-[180vh] md:h-[60vh] mt-[50vh] md:mt-[40vh] z-0 lg:opacity-[--opacity]"
      >
        <Spinner scrollYProgress={scrollYProgress} />
        <HeroItemCard
          title="WishWell"
          description={
            timer.era !== "wishwell"
              ? "Currently you can access wishwell by invitation only."
              : "Contribute to our WishWell to get the WishWell NFT + points."
          }
          backgroundImage={IMAGEKIT_IMAGES.WISHWELL}
          animateFrom="left"
          cardExternalLink={
            timer.era !== "wishwell"
              ? "#"
              : location.pathname === "/wishwell"
                ? "/wishwell#"
                : "/wishwell"
          }
        />
        <HeroItemCard
          title="Minting"
          description={
            "Here is a one or two line short description about this. Here is a one or two line short description about this."
          }
          backgroundImage={IMAGEKIT_IMAGES.MINING_PAGE_ERA_3}
          className="lg:object-none object-[20%_55%]"
          animateFrom="bottom"
          cardExternalLink="/minting"
        />
        <HeroItemCard
          title="The Collective"
          description="Learn how to leverage points, rank up & earn exciting rewards. Join The Collective!"
          backgroundImage={IMAGEKIT_IMAGES.MINTING}
          animateFrom="right"
          cardExternalLink="/collective"
        />
      </motion.div>
    </div>
  );
}
