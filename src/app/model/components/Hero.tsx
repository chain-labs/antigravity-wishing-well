"use client";

import Image from "next/image";
import Spinner from "./Spinner";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Hero() {
	const [hover, setHover] = useState<
		"wishwell" | "mining" | "minting" | null
	>(null);

	return (
		<div className="relative grid grid-cols-3 w-full h-[60vh] mt-[40vh] z-0">
			<Spinner />
			<div
				className="relative w-full h-full bg-slate-500 z-[0] flex justify-end items-start px-4 py-8 flex-col gap-4"
				onMouseLeave={() => setHover(null)}
				onMouseOver={() => setHover("wishwell")}
				onMouseDown={() => setHover("wishwell")}
				onMouseMove={() => setHover("wishwell")}
				onMouseEnter={() => setHover("wishwell")}
			>
				<Image
					src={require("./wishwell.png")}
					alt="Wishing Well"
					quality={100}
					height={1136}
					width={1024}
					className="absolute top-0 left-0 object-cover h-full w-full -z-10"
				/>
                <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-[-8]"></div>
				<h1 className="text-5xl from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text">
					WishWell
				</h1>
				<motion.p
					animate={{ height: hover === "wishwell" ? "auto" : 0 }}
					initial={{ height: 0 }}
					transition={{ duration: 0.5 }}
					className="text-white text-lg overflow-hidden"
				>
					Here is a one or two line short description about this. Here
					is a one or two line short description about this.
				</motion.p>
			</div>
			<div
				className="relative w-full h-full bg-slate-500 z-[0] flex justify-end items-start px-4 py-8 flex-col gap-4"
				onMouseOver={() => setHover("mining")}
				onMouseDown={() => setHover("mining")}
				onMouseMove={() => setHover("mining")}
				onMouseEnter={() => setHover("mining")}
				onMouseLeave={() => setHover(null)}
			>
				<Image
					src={require("./mining.png")}
					alt="Wishing Well"
					quality={100}
					height={1136}
					width={1024}
					className="absolute top-0 left-0 object-cover h-full w-full -z-10"
				/>
                <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-[-8]"></div>
				<h1 className="text-5xl from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text">
					Mining
				</h1>
				<motion.p
					animate={{ height: hover === "mining" ? "auto" : 0 }}
					initial={{ height: 0 }}
					transition={{ duration: 0.5 }}
					className="text-white text-lg overflow-hidden"
				>
					Here is a one or two line short description about this. Here
					is a one or two line short description about this.
				</motion.p>
			</div>
			<div
				className="relative w-full h-full bg-slate-500 z-[0] flex justify-end items-start px-4 py-8 flex-col gap-4"
				onMouseOver={() => setHover("minting")}
				onMouseDown={() => setHover("minting")}
				onMouseMove={() => setHover("minting")}
				onMouseEnter={() => setHover("minting")}
				onMouseLeave={() => setHover(null)}
			>
				<Image
					src={require("./minting.png")}
					alt="Wishing Well"
					quality={100}
					height={1136}
					width={1024}
					className="absolute top-0 left-0 object-cover h-full w-full -z-10"
				/>
                <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-[-8]"></div>
				<h1 className="text-5xl from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text">
					Minting
				</h1>
				<motion.p
					animate={{ height: hover === "minting" ? "auto" : 0 }}
					initial={{ height: 0 }}
					transition={{ duration: 0.5 }}
					className="text-white text-lg overflow-hidden"
				>
					Here is a one or two line short description about this. Here
					is a one or two line short description about this.
				</motion.p>
			</div>
		</div>
	);
}
