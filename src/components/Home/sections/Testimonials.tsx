"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import H1 from "@/components/HTML/H1";
import TesimonialCard from "@/components/TestimonialCard";

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
	const [smallerViewPort, setSmallerViewPort] = useState(false);

	useEffect(() => {
		if (window === undefined) return;

		window.addEventListener("resize", () => {
			if (window.innerWidth < 1200) {
				setSmallerViewPort(true);
			} else {
				setSmallerViewPort(false);
			}
		});

		window.innerWidth < 1200 && setSmallerViewPort(true);

		return () => {
			window.removeEventListener("resize", () => {});
		};
	}, []);

	// const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
	const y = useTransform(scrollYProgress, [0, 0.25], [100, 0]);
	const marginTestimonial = useTransform(
		scrollYProgress,
		[0, smallerViewPort ? 0 : 0.25],
		["2rem", "0.5rem"]
	);
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
							externalLink={testimonial.externalLink}
							name={testimonial.name}
							shortDescription={testimonial.shortDescription}
							fullDescription={testimonial.fullDescription}
							imageUrl={testimonial.imageUrl}
							marginTestimonial={marginTestimonial}
						/>
					))}
				</Masonry>
			</ResponsiveMasonry>
		</div>
	);
}
