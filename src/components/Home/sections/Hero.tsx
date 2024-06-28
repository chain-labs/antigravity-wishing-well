"use client";

import Spinner from "../components/spinner/Spinner";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroItemCard from "@/components/HeroItemCard";
import { IMAGEKIT_IMAGES } from "@/assets/imageKit";

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
		[-150, 0]
	);

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
					description="Contribute to our WishWell to get the WishWell NFT + points."
					backgroundImage={IMAGEKIT_IMAGES.WISHWELL}
					animateFrom="left"
					cardExternalLink="/wishwell"
				/>
				<HeroItemCard
					title="Mining"
					description="Start mining with supported tokens to get points + $DARKX tokens + the new Antigravity NFT."
					backgroundImage={IMAGEKIT_IMAGES.MINING}
					animateFrom="bottom"
					cardExternalLink="/mining"
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
