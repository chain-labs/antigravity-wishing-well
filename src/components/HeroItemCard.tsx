"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

/**
 * Primary UI component for user interaction
 */

type HeroItemCardProps = {
    /**
     * Title of the card
     */
	title: string;
    /**
     * Description of the card
     */
	description: string;
    /**
     * Background image of the card
     */
	backgroundImage: StaticImport | string;
    /**
     * Animation direction of the card when it enters the viewport
     */
	animateFrom: "left" | "right" | "bottom" | "none";
    /**
     * range[0, 1] opacity of the background image when not hovered
     */
	defaultImageOpacity?: number;
    /**
     * range[0, 1] opacity of the background image when hovered
     */
	hoverImageOpacity?: number;
    /**
     * Duration of the enter animation in seconds 
     */
	enterAnimationDuration?: number;
    /**
     * Delay of the enter animation in seconds
     */
	enterAnimationDelay?: number;
    /**
     * Duration of the description reveal animation in seconds
     */
	descriptionRevealAnimationDuration?: number;
    /**
     * Additional classes
     */
	className?: string;
};

export default function HeroItemCard({
	title,
	description,
	backgroundImage,
	animateFrom = "none",
	defaultImageOpacity = 0.65,
	hoverImageOpacity = 0.25,
	enterAnimationDuration = 1,
	enterAnimationDelay = 0.5,
	descriptionRevealAnimationDuration = 0.5,
	className,
}: HeroItemCardProps) {
	const [hover, setHover] = useState(false);

	const initialState = {
		x:
			animateFrom === "left"
				? "-100%"
				: animateFrom === "right"
					? "100%"
					: 0,
		y: animateFrom === "none" ? 0 : "100%",
		rotate: animateFrom === "left" ? 45 : animateFrom === "right" ? -45 : 0,
	};

	return (
		<motion.div
			animate={{
				x: 0,
				y: 0,
				rotate: 0,
			}}
			initial={initialState}
			transition={{
				duration: enterAnimationDuration,
				delay: enterAnimationDelay,
			}}
			viewport={{ once: true }}
			className="relative w-full h-full bg-agblack z-[0] flex justify-end items-start px-4 py-8 flex-col gap-4"
			onMouseLeave={() => setHover(false)}
			onMouseOver={() => setHover(true)}
			onMouseDown={() => setHover(true)}
			onMouseMove={() => setHover(true)}
			onMouseEnter={() => setHover(true)}
		>
			<Image
				src={backgroundImage}
				alt="Wishing Well"
				quality={100}
				height={1136}
				width={1024}
				style={{
					opacity: hover ? hoverImageOpacity : defaultImageOpacity,
				}}
				className={twMerge(
					"absolute top-0 left-0 object-cover h-full w-full -z-10 transition-opacity duration-500",
					className ?? ""
				)}
			/>
			<h1 className="text-5xl from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text">
				{title}
			</h1>
			<motion.p
				animate={{ height: hover ? "auto" : 0 }}
				initial={{ height: 0 }}
				transition={{ duration: descriptionRevealAnimationDuration }}
				className="text-agwhite text-lg overflow-hidden"
			>
				{description}
			</motion.p>
		</motion.div>
	);
}
