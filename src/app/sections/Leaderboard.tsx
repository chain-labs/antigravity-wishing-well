"use client";

import Button from "@/stories/Button";
import {
	useScroll,
	useTransform,
	motion,
	AnimatePresence,
} from "framer-motion";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import H1 from "../components/HTML/H1";
import H3 from "../components/HTML/H3";
import H2 from "../components/HTML/H2";
import P from "../components/HTML/P";

function TH({
	icon,
	heading,
	className,
}: {
	icon: string | StaticImport;
	heading: string;
	className?: string;
}) {
	return (
		<th
			className={twMerge(
				`relative bg-[#0A0025] border-1 border-transparent bg-clip-padding flex flex-col lg:flex-row justify-between z-0 px-3 py-[10px] w-full
            before:content-[''] before:absolute before:inset-0 before:z-[-10] before:bg-gradient-to-bl before:from-[#3C00DC] before:to-[#FF5001] before:rounded-[inherit] before:overflow-hidden before:m-[-1px]
			after:content-[''] after:absolute after:inset-0 after:z-[-2] after:bg-agblack after:rounded-[inherit] after:overflow-hidden`,
				className
			)}
		>
			<H3>
				<Image
					src={icon}
					alt={`${heading} icon`}
					width={25}
					height={25}
					className="object-cover"
				/>
				{heading}
			</H3>
		</th>
	);
}

function truncatinator(str: string) {
	return (
		str.substring(0, 6) + "..." + str.substring(str.length - 4, str.length)
	);
}

function TD({
	children,
	truncate = false,
	special = false,
	className,
}: {
	children: React.ReactNode;
	truncate?: boolean;
	special?: boolean;
	className?: string;
}) {
	const [truncateHover, setTruncateHover] = useState(false);
	function truncateHoverTrue() {
		setTruncateHover(true);
	}

	function truncateHoverFalse() {
		setTruncateHover(false);
	}

	if (truncate && children && typeof children === "string") {
		return (
			<AnimatePresence>
				<td
					onMouseEnter={truncateHoverTrue}
					onMouseLeave={truncateHoverFalse}
					className={twMerge(
						"text-[14px] relative border-r-2 border-[#8275A5] bg-clip-padding hidden lg:flex flex-col lg:flex-row justify-between z-10 px-[12px] py-[6px] w-full truncate hover:overflow-visible",
						className,
						special && "text-[18px]"
					)}
				>
					{truncateHover ? (
						<>
							<motion.div
								animate={{
									opacity: 1,
								}}
								initial={{
									opacity: 0,
								}}
								transition={{ duration: 0.2, delay: 0.5 }}
								className={twMerge(
									"absolute top-[50%] left-[50%] p-2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white text-center text-agblack z-10",
									special &&
										" text-[18px] text-agyellow bg-gradient-to-b from-[#0A1133] to-[#142266]"
								)}
							>
								{children}
							</motion.div>
							{truncatinator(children)}
						</>
					) : (
						truncatinator(children)
					)}
				</td>
			</AnimatePresence>
		);
	}
	return (
		<td
			className={twMerge(
				"text-[14px] relative border-r-2 border-[#8275A5] bg-clip-padding flex justify-center lg:justify-start lg:items-center gap-1 lg:gap-4 flex-col lg:flex-row z-0 px-[12px] py-[6px]",
				special && "border-none text-[18px] py-[10px]",
				className
			)}
		>
			{children}
		</td>
	);
}

function TR({
	children,
	className,
	special = false,
	empty = false,
	th = false,
}: {
	children: React.ReactNode;
	className?: string;
	special?: boolean;
	empty?: boolean;
	th?: boolean;
}) {
	return (
		<tr
			className={twMerge(
				"relative grid grid-cols-[2fr_1fr] lg:grid-cols-[2fr_1fr_1fr] w-full border-l-2 border-b-2 border-[#8275A5] z-0",
				special && " text-black font-extrabold  border-none",
				empty &&
					"bg-gradient-to-b from-[#142266] via-[#0A1133] to-[#142266] border-r-2",
				th && "border-none",
				className
			)}
		>
			{special && (
				<div className="absolute top-0 left-0 w-[calc(100%_+_24px)] h-full translate-x-[-12px] z-[-1] bg-agyellow rounded-lg"></div>
			)}
			{children}
		</tr>
	);
}

function Badge({
	children,
	special = false,
}: {
	children: React.ReactNode;
	special?: boolean;
}) {
	return (
		<div
			className={twMerge(
				"text-[12px] leading-[12px] relative flex items-center gap-[8px] justify-center font-sans font-extrabold text-white cursor-pointer rounded-full py-[4px] px-[8px] border-2 uppercase tracking-widest w-fit",
				special &&
					"text-agyellow font-extrabold bg-gradient-to-b from-[#0A1133] to-[#142266] border-none"
			)}
		>
			{children}
		</div>
	);
}

function Rank({
	rank,
	wallet,
	special = false,
}: {
	rank: number;
	wallet: string;
	special?: boolean;
}) {
	return (
		<TD special={special}>
			#{rank} <Badge special={special}>Specialist Technician</Badge>
			<div className="flex gap-2 justify-start items-center lg:hidden">
				<Image
					src={require(
						`@/app/assets/icons/${special ? "wallet-black.svg" : "wallet.svg"}`
					)}
					alt="hammer icon"
					width={25}
					height={25}
					className={twMerge(
						"object-cover",
						special && "filter-invert"
					)}
				/>
				{truncatinator(wallet)}
			</div>
		</TD>
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
	null,
	{
		rank: 1234566,
		badge: "Specialist Technician",
		wallet: "0x1234567890abcdef1234567890abcdef12345678",
		points: 90000,
	},
	{
		rank: 1234567,
		badge: "Specialist Technician",
		wallet: "0x1234567890abcdef1234567890abcdef12345678",
		points: 90000,
		special: true,
	},
	{
		rank: 1234568,
		badge: "Specialist Technician",
		wallet: "0x1234567890abcdef1234567890abcdef12345678",
		points: 90000,
	},
];

export default function Leaderboard() {
	const targetRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: targetRef,
		offset: ["start end", "start start"],
	});

	const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

	return (
		<div ref={targetRef}>
			<motion.div
				style={{ opacity }}
				className="relative w-[110%] translate-x-[-7.5%] md:translate-x-0 md:w-4/5 mx-4 my-32 md:mx-auto bg-[#0A0025] rounded-xl p-8 border-4 border-transparent bg-clip-padding flex flex-col lg:flex-row justify-between gap-10 z-0
            before:content-[''] before:absolute before:inset-0 before:z-[-10] before:bg-gradient-to-bl before:from-[#5537A5] before:to-[#BF6841] before:rounded-[inherit] before:overflow-hidden before:m-[-2px]
			after:content-[''] after:absolute after:inset-0 after:z-[-2] after:bg-agblack after:rounded-[inherit] after:overflow-hidden
        "
			>
				<div className="flex flex-col gap-[16px]">
					<div className="flex flex-wrap justify-start items-center gap-[16px]">
						<H1>Leaderboard</H1>
						{/* <button
							className={`relative flex items-center gap-x-2 justify-center font-sans uppercase font-extrabold tracking-widest text-agwhite cursor-pointer rounded-lg px-4 py-3 shadow-button shadow-[#414343] border-[#414343] border-2 hover:translate-y-1 transition-[all_150ms] hover:shadow-none active:bg-[rgba(255,255,255,0.25)]`}
						>
							<Image
								src={require("@/app/assets/icons/refresh.svg")}
								alt="leaderboard icon"
								width={25}
								height={25}
								className="object-cover"
							/>
							Refresh
						</button> */}
						<Button
							innerText="Refresh"
							iconSrc={require("@/app/assets/icons/refresh.svg")}
							iconAlt="refresh icon"
							size="small"
							secondary
							disableSparkels
							animateButton
						/>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 w-full max-w-[100%] pt-6">
						<table className="col-span-2 w-full bg-gradient-to-b from-[#0A1133] to-[#142266] h-fit">
							<thead className="w-full">
								<TR th>
									<TH
										icon={require("@/app/assets/icons/leaderboard.svg")}
										heading="Rank"
									/>
									<TH
										icon={require("@/app/assets/icons/wallet.svg")}
										heading="Wallet"
										className="hidden lg:flex"
									/>
									<TH
										icon={require("@/app/assets/icons/points.svg")}
										heading="Points"
									/>
								</TR>
							</thead>
							<tbody className="text-lg font-medium font-general-sans text-white">
								{tableData.map((data, idx) =>
									data !== null ? (
										<TR
											key={idx}
											special={data.special ?? false}
										>
											<Rank
												rank={data.rank}
												wallet={data.wallet}
												special={data.special ?? false}
											/>
											<TD
												truncate
												special={data.special ?? false}
											>
												{data.wallet}
											</TD>
											<TD special={data.special ?? false}>
												{data.points}
											</TD>
										</TR>
									) : (
										<TR
											key={idx}
											className="h-[2.5rem]"
											empty
										>
											<></>
										</TR>
									)
								)}
							</tbody>
						</table>

						<div className="relative flex flex-col w-full gap-4 lg:pl-6 place-self-end">
							<Image
								src={require("@/app/assets/collective-color-logo.svg")}
								alt="leaderboard background"
								width={100}
								height={100}
								className="object-cover absolute bottom-0 right-0 lg:left-[10%] lg:top-0 lg:translate-y-[-100%] z-[100] opacity-[50%]"
							/>
							<div className="flex flex-col gap-[8px] p-[16px]">
								<h2 className="font-general-sans text-[16px] text-white font-medium">
									Wallet Connected:
								</h2>
								<H2
									style={{
										wordWrap: "break-word",
									}}
								>
									0x1234567890abcdef1234567890abcdef12345678
								</H2>
							</div>

							<div className="relative flex flex-col gap-[8px] p-4 rounded-xl overflow-hidden w-full z-0">
								<div className="bg-[#3C00DC] absolute inset-0 -z-10 opacity-[25%]"></div>
								<Image
									src={require("@/app/assets/icons/info.svg")}
									alt="info icon"
									width={24}
									height={24}
									className="object-cover"
								/>

								<P className="font-medium">
									You&apos;re only 1,500 points away from
									leveling up. Mine now to rank up!
								</P>

								{/* <button
									className={`uppercase tracking-widest w-fit relative flex items-center gap-x-2 justify-center font-sans font-bold text-agwhite cursor-pointer
                                rounded-lg px-4 py-3 shadow-button hover:translate-y-1 transition-[all_150ms] hover:shadow-none active:bg-agblack bg-blue`}
								>
									<Image
										src={require("@/app/assets/icons/hammer.svg")}
										alt="hammer icon"
										width={25}
										height={25}
										className="object-cover"
									/>
									Start mining
								</button> */}
								<Button
									innerText="Start mining"
									iconSrc={require("@/app/assets/icons/hammer.svg")}
									iconAlt="hammer icon"
								/>
								<a href="/" className="text-white underline">
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
