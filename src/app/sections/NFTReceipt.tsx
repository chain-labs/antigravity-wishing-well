"use client";

import Button from "@/stories/Button";
import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import H1 from "../components/HTML/H1";

export default function NFTReceipt() {
	const targetRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: targetRef,
		offset: ["start end", "end start"],
	});

	// const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
	const y = useTransform(scrollYProgress, [0, 0.25], [150, 0]);

	const textY = useTransform(scrollYProgress, [0, 0.25], [100, 0]);
	return (
		<div
			ref={targetRef}
			className="mx-4 my-32 flex flex-col gap-8 items-center justify-center"
		>
			<motion.div
				style={{
					y: textY,
				}}
			>
				<H1 center>
					Not everyone makes smart decisions.
					<br /> Except you. You badass. Here&apos;s your NFT.
				</H1>
			</motion.div>
			<motion.div
				style={{
					y,
				}}
			>
				<Image
					src={require("@/app/assets/nft-receipt.svg")}
					alt="NFT Receipt"
					width={300}
					height={600}
					className="rounded-lg"
				/>
			</motion.div>
			{/* <button
				className={`uppercase tracking-widest w-fit relative flex items-center gap-x-2 justify-center font-sans font-bold text-agwhite cursor-pointer
                                rounded-lg px-4 py-3 shadow-button hover:translate-y-1 transition-[all_150ms] hover:shadow-none active:bg-agblack bg-blue`}
			>
				<Image
					src={require("@/app/assets/icons/claim.svg")}
					alt="hammer icon"
					width={25}
					height={25}
					className="object-cover"
				/>
				Claim collective rewards
			</button> */}

			<Button
				innerText="Claim collective rewards"
				iconSrc={require("@/app/assets/icons/claim.svg")}
				iconAlt="hammer icon"
				size="small"
				className="font-bold"
			/>
		</div>
	);
}
