"use client";

import Image from "next/image";
import Spinner from "../components/spinner/Spinner";
import { useEffect, useRef, useState } from "react";
import { MotionStyle, motion, useScroll, useTransform } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import H1 from "../components/HTML/H1";
import P from "../components/HTML/P";

function HeroItemCard({
	title,
	description,
	backgroundImage,
	animateFrom,
	style,
}: {
	title: string;
	description: string;
	backgroundImage: StaticImport;
	style?: React.CSSProperties | MotionStyle;
	animateFrom: "left" | "right" | "bottom";
}) {
	const [hover, setHover] = useState(false);

	const initialState = {
		x:
			animateFrom === "left"
				? "-100%"
				: animateFrom === "right"
					? "100%"
					: 0,
		y: "100%",
		rotate: animateFrom === "left" ? 45 : animateFrom === "right" ? -45 : 0,
	};

	return (
		<motion.div
			style={style}
			animate={{
				x: 0,
				y: 0,
				rotate: 0,
			}}
			initial={initialState}
			transition={{
				duration: 1,
				delay: 0.5,
			}}
			viewport={{ once: true }}
			className="relative w-full h-full bg-agblack z-[0] flex justify-end items-start p-[32px] flex-col gap-4"
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
				className={twMerge(
					"absolute top-0 left-0 object-cover h-full w-full -z-10 transition-opacity duration-500",
					hover ? "opacity-[0.25]" : "opacity-[0.65]"
				)}
			/>
			<H1>{title}</H1>
			<motion.p
				animate={{ height: hover ? "auto" : 0 }}
				initial={{ height: 0 }}
				transition={{ duration: 0.5 }}
				className="overflow-hidden"
			>
				<P>{description}</P>
			</motion.p>
		</motion.div>
	);
}

export default function Hero() {
	const targetRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: targetRef,
		offset: ["start end", "start start"],
	});

	const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

	useEffect(() => {
		console.log(scrollYProgress.get());
	}, [scrollYProgress]);

	return (
		<div ref={targetRef} className="w-full h-full">
			<motion.div
				style={{
					opacity,
				}}
				className="relative grid grid-rows-3 md:grid-cols-3 md:grid-rows-1 w-full h-[180vh] md:h-[60vh] mt-[50vh] md:mt-[40vh] z-0"
			>
				<Spinner scrollYProgress={scrollYProgress} />
				<HeroItemCard
					title="WishWell"
					description="Here is a one or two line short description about this.
				Here is a one or two line short description about this."
					backgroundImage={require("../assets/wishwell.png")}
					animateFrom="left"
					style={{
						opacity,
					}}
				/>
				<HeroItemCard
					title="Mining"
					description="Here is a one or two line short description about this.
				Here is a one or two line short description about this."
					backgroundImage={require("../assets/mining.png")}
					animateFrom="bottom"
					style={{
						opacity,
					}}
				/>
				<HeroItemCard
					title="The Collective"
					description="Here is a one or two line short description about this.
				Here is a one or two line short description about this."
					backgroundImage={require("../assets/minting.png")}
					animateFrom="right"
					style={{
						opacity,
					}}
				/>
			</motion.div>
		</div>
	);
}
