"use client";

import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import H1 from "../components/HTML/H1";
import P from "../components/HTML/P";

function TesimonialCard({
	name,
	imageUrl,
	shortDescription,
	fullDescription,
	externalLink,
	scrollYProgress,
}: {
	name: string;
	imageUrl?: string | StaticImport;
	shortDescription: string;
	fullDescription: string;
	externalLink: string;
	scrollYProgress: MotionValue<number>;
}) {
	const [smallerViewPort, setSmallerViewPort] = useState(false);

	useEffect(() => {
		if (window === undefined) return;

		window.addEventListener("resize", () => {
			if (window.innerWidth < 1200) {
				console.log("smaller view port detected");
				setSmallerViewPort(true);
			} else {
				console.log("larger view port detected");
				setSmallerViewPort(false);
			}
		});

		window.innerWidth < 1200 && setSmallerViewPort(true);

		return () => {
			window.removeEventListener("resize", () => {});
		};
	}, []);

	const gapX = useTransform(
		scrollYProgress,
		[0, smallerViewPort ? 0 : 0.25],
		["2rem", "0.5rem"]
	);
	const gapY = useTransform(scrollYProgress, [0, 0.25], ["2rem", "0.5rem"]);
	return (
		<motion.a
			style={
				{
					"--gap": gapX,
				} as any
			}
			href={externalLink}
			className=" cursor-pointer hover:scale-[1.05] my-[calc(var(--gap))] mx-[calc(var(--gap)*6)] md:m-[--gap] hover:z-20 transition-all duration-300 relative w-fit h-fit bg-[#0A0025] rounded-xl border-4 border-transparent bg-clip-padding flex flex-col justify-start gap-[16px] z-0 py-[24px] px-[16px]
            before:content-[''] before:absolute before:inset-0 before:z-[-10] before:bg-gradient-to-b before:from-[#B4EBF8] before:to-[#789DFA] before:rounded-[inherit] before:overflow-hidden before:m-[-2px]
            after:content-[''] after:absolute after:inset-0 after:z-[-2] after:bg-gradient-to-b after:from-[#0A1133] after:to-[#142266] after:rounded-[inherit] after:overflow-hidden"
		>
			<div className="flex gap-2 justify-start items-center w-fit overflow-hidden">
				{imageUrl ? (
					<Image
						src={imageUrl}
						alt={name}
						width={50}
						height={50}
						className="rounded-full w-[50px] h-[50px] object-cover"
					/>
				) : (
					<Image
						src={require("@/app/assets/community-logo.svg")}
						alt={name}
						width={50}
						height={50}
						className="rounded-full object-cover"
					/>
				)}
				<div className="flex flex-col gap-[4px]">
					<h1 className="relative flex gap-3 text-agyellow font-sans text-[20px] leading-[20px] font-extrabold">
						@{name}
					</h1>
					<p className="text-[14px] from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text">
						{shortDescription}
					</p>
				</div>
			</div>
			<div className="w-full h-[1px] bg-[#FEFFFF]"></div>
			<P>&quot; {fullDescription} &quot;</P>
		</motion.a>
	);
}

export default function Testimonials() {
	const targetRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: targetRef,
		offset: ["start end", "end start"],
	});

	// const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
	const y = useTransform(scrollYProgress, [0, 0.25], [100, 0]);
	return (
		<div
			ref={targetRef}
			className="flex flex-col gap-8 items-center justify-center mt-[9rem] md:mt-0"
		>
			<motion.div style={{ y }}>
				<H1 center>The Galactic Tea...</H1>
			</motion.div>
			<ResponsiveMasonry
				columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
				className="w-full max-w-[1200px] mx-auto"
			>
				<Masonry>
					<TesimonialCard
						scrollYProgress={scrollYProgress}
						externalLink="/"
						name="JohnDoeTheGreat"
						shortDescription="loves our community!"
						fullDescription="This is the best community I've been a part of. Max literally welcomes everyone on Telegram."
						imageUrl={require("@/app/assets/dummy-testimonial-image.jpg")}
					/>
					<TesimonialCard
						scrollYProgress={scrollYProgress}
						externalLink="/"
						name="Jane"
						shortDescription="fell in love with the story!"
						fullDescription="What a fantastic story! Cole is a great protagonist. I can't wait to see how this unfolds. There is so much more to the story than you think. And all it all culminates in the Era finale across the trilogy."
					/>
					<TesimonialCard
						scrollYProgress={scrollYProgress}
						externalLink="/"
						name="JohnDoeTheGreat"
						shortDescription="loves our community!"
						fullDescription="This is the best community I've been a part of. Max literally welcomes everyone on Telegram."
						imageUrl={require("@/app/assets/dummy-testimonial-image.jpg")}
					/>
					<TesimonialCard
						scrollYProgress={scrollYProgress}
						externalLink="/"
						name="Jane"
						shortDescription="fell in love with the story!"
						fullDescription="What a fantastic story! Cole is a great protagonist. I can't wait to see how this unfolds. There is so much more to the story than you think. And all it all culminates in the Era finale across the trilogy."
					/>
					<TesimonialCard
						scrollYProgress={scrollYProgress}
						externalLink="/"
						name="JohnDoeTheGreat"
						shortDescription="loves our community!"
						fullDescription="This is the best community I've been a part of. Max literally welcomes everyone on Telegram."
						imageUrl={require("@/app/assets/dummy-testimonial-image.jpg")}
					/>
					<TesimonialCard
						scrollYProgress={scrollYProgress}
						externalLink="/"
						name="Jane"
						shortDescription="fell in love with the story!"
						fullDescription="What a fantastic story! Cole is a great protagonist. I can't wait to see how this unfolds. There is so much more to the story than you think. And all it all culminates in the Era finale across the trilogy."
					/>
				</Masonry>
			</ResponsiveMasonry>
		</div>
	);
}
