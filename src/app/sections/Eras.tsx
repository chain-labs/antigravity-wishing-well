"use client";

import Image from "next/image";
import Spinner from "../components/spinner/Spinner";
import { useState } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

function HeroItemCard({
	title,
	description,
	backgroundImage,
	animateFrom,
	className,
}: {
	title: string;
	description: string;
	backgroundImage: StaticImport;
	animateFrom: "left" | "right" | "bottom";
	className?: string;
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
				className={twMerge(
					"absolute top-0 left-0 object-cover h-full w-full -z-10 transition-opacity duration-500",
					hover ? "opacity-[0.25]" : "opacity-[0.65]",
					className ?? ""
				)}
			/>
			<h1 className="text-5xl from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text">
				{title}
			</h1>
			<motion.p
				animate={{ height: hover ? "auto" : 0 }}
				initial={{ height: 0 }}
				transition={{ duration: 0.5 }}
				className="text-white text-lg overflow-hidden"
			>
				{description}
			</motion.p>
		</motion.div>
	);
}

export default function Eras() {
	return (
		<div className="relative grid grid-cols-1 grid-rows-3 w-full h-[180vh] md:h-[100vh] z-0 my-32">
			<HeroItemCard
				title="WishWell"
				description="Here is a one or two line short description about this.
				Here is a one or two line short description about this."
				backgroundImage={require("../assets/wishwell.png")}
				animateFrom="left"
                className="object-[50%_55%]"
			/>
			<HeroItemCard
				title="Mining"
				description="Here is a one or two line short description about this.
				Here is a one or two line short description about this."
				backgroundImage={require("../assets/mining.png")}
				animateFrom="right"
			/>
			<HeroItemCard
				title="The Collective"
				description="Here is a one or two line short description about this.
				Here is a one or two line short description about this."
				backgroundImage={require("../assets/minting.png")}
				animateFrom="left"
                className="object-[0px_25%]"
			/>
		</div>
	);
}
