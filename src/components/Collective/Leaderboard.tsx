"use client";

import Button from "@/components/Button";
import {
	useScroll,
	useTransform,
	motion,
	AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import H1 from "@/components/HTML/H1";
import H2 from "@/components/HTML/H2";
import P from "@/components/HTML/P";
import Table from "@/components/Table";
import { useAccount } from "wagmi";
import { IMAGEKIT_ICONS, IMAGEKIT_LOGOS } from "@/assets/imageKit";

function CollectiveLogo() {
	return (
		<div className="flex justify-start items-center gap-2 absolute bottom-0 right-0 lg:left-[10%] lg:top-0 z-[100] lg:translate-y-[-100%] h-fit w-fit">
			<Image
				src={IMAGEKIT_LOGOS.COLLECTIVE_COLOR_LOGO}
				alt="leaderboard background"
				width={294}
				height={382}
				className="object-fit opacity-25 lg:opacity-50 w-[100px] lg:w-[294px] h-[100px] lg:h-[382px]"
			/>
		</div>
	);
}

type tableDataType = {
	rank: number;
	badge: string;
	wallet: string;
	points: number;
	special?: boolean;
} | null;

const tableData: tableDataType[] = [
	{
		rank: 1,
		badge: "Specialist Technician",
		wallet: "0x1234567890abcdef1234567890abcdef12345678",
		points: 90000,
	},
	{
		rank: 2,
		badge: "Specialist Technician",
		wallet: "0x1234567890abcdef1234567890abcdef12345678",
		points: 90000,
	},
	{
		rank: 3,
		badge: "Specialist Technician",
		wallet: "0x1234567890abcdef1234567890abcdef12345678",
		points: 90000,
	},
	{
		rank: 4,
		badge: "Specialist Technician",
		wallet: "0x1234567890abcdef1234567890abcdef12345678",
		points: 90000,
	},
	{
		rank: 5,
		badge: "Specialist Technician",
		wallet: "0x1234567890abcdef1234567890abcdef12345678",
		points: 90000,
	},
	{
		rank: 6,
		badge: "Specialist Technician",
		wallet: "0x1234567890abcdef1234567890abcdef12345678",
		points: 90000,
	},
	{
		rank: 7,
		badge: "Specialist Technician",
		wallet: "0x1234567890abcdef1234567890abcdef12345678",
		points: 90000,
	},
	{
		rank: 8,
		badge: "Specialist Technician",
		wallet: "0x1234567890abcdef1234567890abcdef12345678",
		points: 90000,
	},
	{
		rank: 9,
		badge: "Specialist Technician",
		wallet: "0x1234567890abcdef1234567890abcdef12345678",
		points: 90000,
	},
	{
		rank: 10,
		badge: "Specialist Technician",
		wallet: "0x1234567890abcdef1234567890abcdef12345678",
		points: 90000,
	},
];

export default function Leaderboard({
	accountIsConnected,
}: {
	accountIsConnected: boolean;
}) {
	const account = useAccount();
	const targetRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: targetRef,
		offset: ["start end", "start start"],
	});

	const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

	if (!accountIsConnected) {
		return <div className="h-screen w-screen hidden lg:block"></div>;
	}

	return (
		<div ref={targetRef}>
			<motion.div
				className="relative md:absolute md:bottom-0 md:left-1/2 md:translate-x-[-50%] md:translate-y-[50%] w-full max-w-[1200px] border-t-4 border-b-4 md:border-4  mt-[30px] bg-clip-padding border-transparent p-[16px] md:p-[32px] bg-agblack md:rounded-xl z-0
            before:content-[''] before:absolute before:inset-0 before:z-[-10] before:bg-gradient-to-bl before:from-[#5537A5] before:to-[#BF6841] before:rounded-[inherit] before:overflow-hidden before:m-[-2px]
			after:content-[''] after:absolute after:inset-0 after:z-[-2] after:bg-agblack after:rounded-[inherit] after:overflow-hidden
        "
			>
				<div className="flex flex-col w-full">
					<div className="flex flex-col md:flex-row flex-wrap justify-start items-start md:items-center gap-[16px]">
						<H1>Leaderboard</H1>
						<Button
							innerText="Refresh"
							iconSrc={IMAGEKIT_ICONS.REFRESH}
							iconAlt="refresh icon"
							secondary
							disableSparkels
							animateButton
						/>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 w-full max-w-[100%] pt-6">
						<div className="col-span-2 w-full rounded-[4px] border-[2px] border-[#414343] lg:border-none">
							<Table tableData={tableData} />
						</div>

						<div className="relative flex flex-col w-full gap-4 lg:pl-6 place-self-end">
							<CollectiveLogo />
							<div className="h-full w-full"></div>
							<div className="relative flex flex-col gap-[8px] p-4 rounded-xl overflow-hidden w-full z-0">
								<div className="bg-[#3C00DC] absolute inset-0 -z-10 opacity-[25%]"></div>
								<Image
									src={IMAGEKIT_ICONS.INFO}
									alt="info icon"
									width={24}
									height={24}
									className="object-cover"
								/>

								<P className="font-medium">
									Mine now to rank up!
								</P>
								<Button
									innerText="Start mining"
									iconSrc={IMAGEKIT_ICONS.HAMMER}
									iconAlt="hammer icon"
								/>
								<a href="/" className="text-agwhite underline">
									<P>Best ways to rank up →</P>
								</a>
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		</div>
	);
}
