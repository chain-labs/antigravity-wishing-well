"use client";

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

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
			<div className="flex items-center gap-2 uppercase tracking-widest text-lg md:text-xl from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text">
				<Image
					src={icon}
					alt={`${heading} icon`}
					width={25}
					height={25}
					className="object-cover"
				/>
				{heading}
			</div>
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
	if (truncate && children && typeof children === "string") {
		return (
			<td
				className={twMerge(
					"elative border-r-2 border-[#8275A5] bg-clip-padding hidden lg:flex flex-col lg:flex-row justify-between z-0 px-3 py-[10px] w-full truncate",
					className
				)}
			>
				{truncatinator(children)}
			</td>
		);
	}
	return (
		<td
			className={twMerge(
				"relative border-r-2 border-[#8275A5] bg-clip-padding flex justify-center lg:justify-start lg:items-center gap-1 lg:gap-4 flex-col lg:flex-row z-0 px-3 py-[10px]",
				special && "border-none",
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
				special &&
					" text-black font-extrabold  border-none",
				empty &&
					"bg-gradient-to-b from-[#142266] via-[#0A1133] to-[#142266] border-r-2",
				th && "border-none",
				className
			)}
		>
			{
				special && (
					<div className="absolute top-0 left-0 w-[calc(100%_+_24px)] h-full translate-x-[-12px] z-[-1] bg-agyellow rounded-lg"></div>)
			}
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
				"relative flex items-center gap-2 justify-center font-sans font-extrabold text-white cursor-pointer rounded-full p-1 px-2 border-2 text-xs lg:text-sm uppercase tracking-widest w-fit",
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
		<TD>
			#{rank} <Badge special={special}>Specialist Technician</Badge>
			<div className="flex gap-2 justify-start items-center lg:hidden">
				<Image
					src={require("@/app/model/assets/icons/wallet.svg")}
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

export default function Leaderboard() {
	return (
		<div
			className="relative w-[110%] translate-x-[-7.5%] md:w-4/5 mx-4 my-32 md:mx-auto bg-[#0A0025] rounded-xl p-8 border-4 border-transparent bg-clip-padding flex flex-col lg:flex-row justify-between gap-10 z-0
            before:content-[''] before:absolute before:inset-0 before:z-[-10] before:bg-gradient-to-bl before:from-[#5537A5] before:to-[#BF6841] before:rounded-[inherit] before:overflow-hidden before:m-[-2px]
			after:content-[''] after:absolute after:inset-0 after:z-[-2] after:bg-agblack after:rounded-[inherit] after:overflow-hidden
        "
		>
			<div className="flex flex-col">
				<div className="flex flex-wrap justify-start items-center gap-6">
					<h1 className="text-6xl from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text">
						Leaderboard
					</h1>
					<button
						className={`relative flex items-center gap-x-2 justify-center font-sans uppercase font-extrabold tracking-widest text-agwhite cursor-pointer rounded-lg px-4 py-3 shadow-button shadow-[#414343] border-[#414343] border-2 hover:translate-y-1 transition-[all_150ms] hover:shadow-none active:bg-[rgba(255,255,255,0.25)]`}
					>
						<Image
							src={require("@/app/model/assets/icons/refresh.svg")}
							alt="leaderboard icon"
							width={25}
							height={25}
							className="object-cover"
						/>
						Refresh
					</button>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 w-full max-w-[100%] pt-6">
					<table className="col-span-2 w-full bg-gradient-to-b from-[#0A1133] to-[#142266] h-fit">
						<thead className="w-full">
							<TR th>
								<TH
									icon={require("@/app/model/assets/icons/leaderboard.svg")}
									heading="Rank"
								/>
								<TH
									icon={require("@/app/model/assets/icons/wallet.svg")}
									heading="Wallet"
									className="hidden lg:flex"
								/>
								<TH
									icon={require("@/app/model/assets/icons/points.svg")}
									heading="Points"
								/>
							</TR>
						</thead>
						<tbody className="text-lg font-medium font-general-sans text-white">
							<TR>
								<Rank
									rank={1}
									wallet="0x1234567890abcdef1234567890abcdef12345678"
								/>
								<TD truncate>
									0x1234567890abcdef1234567890abcdef12345678
								</TD>
								<TD>90,000</TD>
							</TR>
							<TR>
								<Rank
									rank={2}
									wallet="0x1234567890abcdef1234567890abcdef12345678"
								/>
								<TD truncate>
									0x1234567890abcdef1234567890abcdef12345678
								</TD>
								<TD>90,000</TD>
							</TR>
							<TR>
								<Rank
									rank={3}
									wallet="0x1234567890abcdef1234567890abcdef12345678"
								/>
								<TD truncate>
									0x1234567890abcdef1234567890abcdef12345678
								</TD>
								<TD>90,000</TD>
							</TR>
							<TR>
								<Rank
									rank={4}
									wallet="0x1234567890abcdef1234567890abcdef12345678"
								/>
								<TD truncate>
									0x1234567890abcdef1234567890abcdef12345678
								</TD>
								<TD>90,000</TD>
							</TR>
							<TR>
								<Rank
									rank={5}
									wallet="0x1234567890abcdef1234567890abcdef12345678"
								/>
								<TD truncate>
									0x1234567890abcdef1234567890abcdef12345678
								</TD>
								<TD>90,000</TD>
							</TR>

							<TR className="h-[3rem]" empty>
								<></>
							</TR>
							<TR>
								<Rank
									rank={1234566}
									wallet="0x1234567890abcdef1234567890abcdef12345678"
								/>
								<TD truncate>
									0x1234567890abcdef1234567890abcdef12345678
								</TD>
								<TD>90,000</TD>
							</TR>
							<TR special>
								<Rank
									rank={1234567}
									wallet="0x1234567890abcdef1234567890abcdef12345678"
									special
								/>
								<TD truncate special>
									0x1234567890abcdef1234567890abcdef12345678
								</TD>
								<TD special>90,000</TD>
							</TR>
							<TR>
								<Rank
									rank={1234568}
									wallet="0x1234567890abcdef1234567890abcdef12345678"
								/>
								<TD truncate>
									0x1234567890abcdef1234567890abcdef12345678
								</TD>
								<TD>90,000</TD>
							</TR>
						</tbody>
					</table>

					<div className="relative flex flex-col w-full gap-4 lg:pl-6 place-self-end">
						<Image
							src={require("@/app/model/assets/collective-color-logo.svg")}
							alt="leaderboard background"
							width={100}
							height={100}
							className="object-cover absolute bottom-0 right-0 lg:left-[10%] lg:top-0 lg:translate-y-[-100%] z-[100] opacity-[50%]"
						/>
						<div className="flex flex-col gap-4 p-4">
							<h2 className="font-general-sans text-xl text-white font-medium">
								Wallet Connected:
							</h2>
							<h1
								style={{
									wordWrap: "break-word",
								}}
								className="text-4xl w-full from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text break-words"
							>
								0x1234567890abcdef1234567890abcdef12345678
							</h1>
						</div>

						<div className="relative flex flex-col gap-4 p-4 rounded-xl overflow-hidden w-full z-0">
							<div className="bg-[#3C00DC] absolute inset-0 -z-10 opacity-[25%]"></div>
							<Image
								src={require("@/app/model/assets/icons/info.svg")}
								alt="info icon"
								width={25}
								height={25}
								className="object-cover"
							/>

							<p className="font-general-sans text-lg text-white font-medium">
								You&apos;re only 1,500 points away from leveling
								up. Mine now to rank up!
							</p>

							<button
								className={`uppercase tracking-widest w-fit relative flex items-center gap-x-2 justify-center font-sans font-bold text-agwhite cursor-pointer
                                rounded-lg px-4 py-3 shadow-button hover:translate-y-1 transition-[all_150ms] hover:shadow-none active:bg-agblack bg-blue`}
							>
								<Image
									src={require("@/app/model/assets/icons/hammer.svg")}
									alt="hammer icon"
									width={25}
									height={25}
									className="object-cover"
								/>
								Start mining
							</button>

							<a
								href="/"
								className="font-general-sans text-lg underline text-white"
							>
								Best ways to rank up →
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
