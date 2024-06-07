"use client";

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

function TH({
	icon,
	heading,
}: {
	icon: string | StaticImport;
	heading: string;
}) {
	return (
		<th
			className="relative bg-[#0A0025] border-1 border-transparent bg-clip-padding flex flex-col lg:flex-row justify-between z-0 px-3 py-[10px] w-full
            before:content-[''] before:absolute before:inset-0 before:z-[-10] before:bg-gradient-to-bl before:from-[#3C00DC] before:to-[#FF5001] before:rounded-[inherit] before:overflow-hidden before:m-[-1px]
			after:content-[''] after:absolute after:inset-0 after:z-[-2] after:bg-agblack after:rounded-[inherit] after:overflow-hidden"
		>
			<div className="flex items-center gap-2 uppercase tracking-widest text-xl from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text">
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

function TD({
	children,
	truncate = false,
	special = false,
}: {
	children: React.ReactNode;
	truncate?: boolean;
	special?: boolean;
}) {
	if (truncate && children && typeof children === "string") {
		return (
			<td className="elative border-r-2 border-[#8275A5] bg-clip-padding flex flex-col lg:flex-row justify-between z-0 px-3 py-[10px] w-full truncate">
				{children.substring(0, 6) +
					"..." +
					children.substring(children.length - 4, children.length)}
			</td>
		);
	}
	return (
		<td
			className={twMerge(
				"relative border-r-2 border-[#8275A5] bg-clip-padding flex justify-start items-center gap-4 flex-col lg:flex-row z-0 px-3 py-[10px]",
				special && "border-none"
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
				"grid grid-cols-[2fr_1fr_1fr] w-full border-l-2 border-b-2 border-[#8275A5]",
				special &&
					"bg-agyellow text-black font-extrabold w-[calc(100%_+_24px)] translate-x-[-12px] border-none rounded-lg",
				empty &&
					"bg-gradient-to-b from-[#142266] via-[#0A1133] to-[#142266] border-r-2",
				th && "border-none",
				className
			)}
		>
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
				"relative flex items-center gap-2 justify-center font-sans font-extrabold text-white cursor-pointer rounded-full p-1 px-2 border-2 text-sm uppercase tracking-widest",
				special &&
					"text-agyellow font-extrabold bg-gradient-to-b from-[#0A1133] to-[#142266] border-none"
			)}
		>
			{children}
		</div>
	);
}

export default function Leaderboard() {
	return (
		<div
			className="relative md:w-4/5 mx-4 md:mx-auto bg-[#0A0025] rounded-xl p-8 border-4 border-transparent bg-clip-padding flex flex-col lg:flex-row justify-between gap-10 z-0
            before:content-[''] before:absolute before:inset-0 before:z-[-10] before:bg-gradient-to-bl before:from-[#5537A5] before:to-[#BF6841] before:rounded-[inherit] before:overflow-hidden before:m-[-2px]
			after:content-[''] after:absolute after:inset-0 after:z-[-2] after:bg-agblack after:rounded-[inherit] after:overflow-hidden
        "
		>
			<div className="flex flex-col">
				<div className="flex justify-start items-center gap-6">
					<h1 className="text-6xl from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text">
						Leaderboard
					</h1>
					<button
						className={`relative flex items-center gap-x-2 justify-center font-sans uppercase font-extrabold tracking-widest text-agwhite cursor-pointer rounded-lg px-4 py-3 shadow-button shadow-[#414343] border-[#414343] border-2 hover:translate-y-1 transition-[all_150ms] hover:shadow-none active:bg-agblack`}
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

				<div className="grid grid-cols-3 w-full max-w-[100%] pt-6">
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
								/>
								<TH
									icon={require("@/app/model/assets/icons/points.svg")}
									heading="Points"
								/>
							</TR>
						</thead>
						<tbody className="text-lg font-medium font-general-sans text-white">
							<TR>
								<TD>
									#1 <Badge>Specialist Technician</Badge>
								</TD>
								<TD truncate>
									0x1234567890abcdef1234567890abcdef12345678
								</TD>
								<TD>90,000</TD>
							</TR>
							<TR>
								<TD>
									#2 <Badge>Specialist Technician</Badge>
								</TD>
								<TD truncate>
									0x1234567890abcdef1234567890abcdef12345678
								</TD>
								<TD>90,000</TD>
							</TR>
							<TR>
								<TD>
									#3 <Badge>Specialist Technician</Badge>
								</TD>
								<TD truncate>
									0x1234567890abcdef1234567890abcdef12345678
								</TD>
								<TD>90,000</TD>
							</TR>
							<TR>
								<TD>
									#4 <Badge>Specialist Technician</Badge>
								</TD>
								<TD truncate>
									0x1234567890abcdef1234567890abcdef12345678
								</TD>
								<TD>90,000</TD>
							</TR>
							<TR>
								<TD>
									#5 <Badge>Specialist Technician</Badge>
								</TD>
								<TD truncate>
									0x1234567890abcdef1234567890abcdef12345678
								</TD>
								<TD>90,000</TD>
							</TR>

							<TR className="h-[3rem]" empty>
								<></>
							</TR>
							<TR>
								<TD>
									#1234566 <Badge>Specialist Technician</Badge>
								</TD>
								<TD truncate>
									0x1234567890abcdef1234567890abcdef12345678
								</TD>
								<TD>90,000</TD>
							</TR>
							<TR special>
								<TD>
									#1234567{" "}
									<Badge special>Specialist Technician</Badge>
								</TD>
								<TD truncate>
									0x1234567890abcdef1234567890abcdef12345678
								</TD>
								<TD special>90,000</TD>
							</TR>
							<TR>
								<TD>
									#1234568 <Badge>Specialist Technician</Badge>
								</TD>
								<TD truncate>
									0x1234567890abcdef1234567890abcdef12345678
								</TD>
								<TD>90,000</TD>
							</TR>
						</tbody>
					</table>

					<div className="relative flex flex-col w-full gap-4 pl-6 place-self-end">
						<Image
							src={require("@/app/model/assets/collective-color-logo.svg")}
							alt="leaderboard background"
							width={100}
							height={100}
							className="object-cover absolute left-[10%] top-0 translate-y-[-100%] z-[-1] opacity-[50%]"
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
