"use client";

import Button from "@/components/Button";
import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import H1 from "@/components/HTML/H1";
import { IMAGEKIT_ICONS, IMAGEKIT_IMAGES } from "@/assets/imageKit";
import Link from "next/link";

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
				<H1 center className="text-[32px] leading-[32px]">
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
					src={IMAGEKIT_IMAGES.NFT_RECEIPT}
					alt="NFT Receipt"
					width={300}
					height={600}
					className="rounded-lg"
				/>
			</motion.div>
			<Link target="_blank" href={process.env.NEXT_PUBLIC_WHITEPAPER || "/"}>
				<Button
					innerText="Claim collective rewards"
					iconSrc={IMAGEKIT_ICONS.HAMMER}
					iconAlt="hammer icon"
				/>
			</Link>
		</div>
	);
}
