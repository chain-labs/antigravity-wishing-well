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

type TestimonialType = {
	name: string;
	imageUrl?: string;
	shortDescription: string;
	fullDescription: string;
	externalLink: string;
};

const testimonials: TestimonialType[] = [
	{
		name: "RogerPulseBets",
		shortDescription: "is excited by the potential",
		fullDescription:
			"AntiGravity is a great mix of narrative and economics…I can see this being a great success and has the potential to make a significant mark.",
		externalLink: "https://forgenfts.com/project/antigravity",
		imageUrl:
			"https://s3.amazonaws.com/media.forgenfts.com/240508/cSwJ8aDgR73_t.jpg",
	},
	{
		name: "PoNWDev",
		fullDescription:
			"Antigravity is an interesting project with unique aspects that go beyond the typical blockchain project. One thing that differentiates this project from most is that there is a fiction book associated with it, & this book has hints inside it that let its readers know about the potential future of the Antigravity project.",
		shortDescription: "loved the book",
		externalLink: "https://forgenfts.com/project/antigravity",
		imageUrl:
			"https://s3.amazonaws.com/media.forgenfts.com/240411/zSbJ22t--wD_t.jpg",
	},

	{
		name: "Nate McGet-it",
		fullDescription: `The focus of the NFT n Tokens values of "rareness" is fantastic! This is limited supply meaning they become more rare over time which means more expensive, also you can stake them for more rewards while you wait for them to become more expensive.`,
		shortDescription: "appreciates the rarity",
		externalLink: "https://forgenfts.com/project/antigravity",
		imageUrl:
			"https://s3.amazonaws.com/media.forgenfts.com/240430/JOUrN38tHto_t.jpg",
	},
	{
		name: "Michael Ricketts",
		shortDescription: "loves the sci-fi blend",
		fullDescription: `The idea of the "Evil Address" competing for tokens and NFTs is cool. I also love the idea of the "Rapture" feature. This feature acts like a blackhole in space as time goes forward it gets rid of the circulating supply.`,
		externalLink: "https://forgenfts.com/project/antigravity",
	},
	{
		name: "RandyHilarski",
		shortDescription: "adores the web3 tech",
		fullDescription:
			"The idea of Antigravity is grand and bold. I love that it is incorporating NFTs and Tokens.",
		imageUrl:
			"https://s3.amazonaws.com/media.forgenfts.com/240502/MnG32lM60eI_t.jpg",
		externalLink: "https://forgenfts.com/project/antigravity",
	},
	{
		name: "Cryptonite",
		shortDescription: "looks forward to the future",
		fullDescription:
			"I think it is a hidden gem. So cool it's the first of its kind on Pulsechain. Gonna be super interesting to see what happens in the future. 🚀🚀🚀🕺🕺🕺",
		externalLink: "http://t.me/antigravitysaga",
	},
];

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
					{testimonials.map((testimonial, index) => (
						<TesimonialCard
							key={index}
							scrollYProgress={scrollYProgress}
							externalLink={testimonial.externalLink}
							name={testimonial.name}
							shortDescription={testimonial.shortDescription}
							fullDescription={testimonial.fullDescription}
							imageUrl={testimonial.imageUrl}
						/>
					))}
					{/* <TesimonialCard
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
					/> */}
				</Masonry>
			</ResponsiveMasonry>
		</div>
	);
}
