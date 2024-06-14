"use client";

import P from "@/app/components/HTML/P";
import Pill from "./Pill";
import { twMerge } from "tailwind-merge";

function Card({
	isEditable,
	value,
	conversion,
	multiplyer,
	pillIconSrc,
	pillText,
	pillIconAlt,
}: {
	isEditable?: boolean;
	value: string;
	conversion: string;
	multiplyer?: string;
	pillIconSrc: string;
	pillText: string;
	pillIconAlt: string;
}) {
	if (isEditable) {
		return (
			<div className="flex justify-between bg-gradient-to-b from-[#0A1133] to-[#142266] rounded-[6px] px-[12px] py-[16px] w-full border-[1px] border-agyellow">
				<div className="flex flex-col justify-start items-start gap-[8px] w-full">
					<div
						className="text-[32px] leading-[32px] text-agwhite font-extrabold font-sans"
						contentEditable
					>
						{value}
					</div>
					<P
						style={{
							opacity: 0.75,
						}}
						extrabold
					>
						{conversion}
					</P>
				</div>
				<div
					className={twMerge(
						"flex flex-col justify-start items-center",
						!isEditable && "justify-center items-center h-full"
					)}
				>
					<Pill
						text={pillText}
						iconSrc={pillIconSrc}
						iconAlt={pillIconAlt}
					/>
				</div>
			</div>
		);
	}
	return (
		<div className="flex justify-between bg-gradient-to-b from-[#0A1133] to-[#142266] rounded-[6px] px-[12px] py-[16px] w-full border-[1px] border-agyellow">
			<div className="flex flex-col justify-start items-start gap-[8px] w-full">
				<div className="text-[32px] leading-[32px] text-agwhite font-extrabold font-sans">
					{value}
				</div>
				<div className="flex opacity-75 gap-[8px]">
					<P extrabold>{conversion}</P>
					<P extrabold>x</P>
					<P extrabold>{multiplyer}</P>
				</div>
			</div>
			<Pill
				text={pillText}
				iconSrc={pillIconSrc}
				iconAlt={pillIconAlt}
			/>
		</div>
	);
}

function Multiplyer({
	era = 2,
	phase = 1,
	multiplyer = 33,
}: {
	era: 1 | 2 | 3;
	phase: 1 | 2 | 3;
	multiplyer: number;
}) {
	return (
		<div className="flex justify-center items-center gap-[8px]">
			<div className="relative flex flex-col justify-start items-start p-[8px] rounded-[6px] border border-agyellow overflow-hidden w-fit min-w-[80px]">
				<div className="absolute inset-0 opacity-[0.66] bg-agblack -z-[1]"></div>
				<div className="text-[16px] leading-[19.2px] text-agwhite font-extrabold font-sans">
					Era
				</div>
				<div className="text-[32px] leading-[32px] text-agwhite font-extrabold font-sans">
					{era}
				</div>
			</div>
			<div className="relative flex flex-col justify-start items-start p-[8px] rounded-[6px] border border-agyellow overflow-hidden w-fit min-w-[80px]">
				<div className="absolute inset-0 opacity-[0.66] bg-agblack -z-[1]"></div>
				<div className="text-[16px] leading-[19.2px] text-agwhite font-extrabold font-sans">
					Phase
				</div>
				<div className="text-[32px] leading-[32px] text-agwhite font-extrabold font-sans">
					{phase}
				</div>
			</div>
			<div className="flex flex-col justify-start items-start p-[8px] overflow-hidden text-agwhite text-[16px] font-semibold font-general-sans">
				=
			</div>
			<div className="relative flex flex-col justify-start items-start p-[8px] rounded-[6px] border border-agyellow overflow-hidden w-[80%]">
				<div className="absolute inset-0 opacity-[0.66] bg-agblack -z-[1]"></div>
				<div className="text-[16px] leading-[19.2px] text-agwhite font-extrabold font-sans">
					Current Multiplier
				</div>
				<div className="text-[32px] leading-[32px] text-agyellow font-extrabold font-sans">
					{multiplyer}x
				</div>
			</div>
		</div>
	);
}

export default function MiningCalculator() {
	return (
		<div className="relative flex flex-col gap-[8px] h-fit w-[400px]">
			<Card
				isEditable
				value="40,000"
				conversion="$9,800"
				pillIconAlt="pls"
				pillIconSrc={require("@/app/assets/icons/pill-pls.svg")}
				pillText="PLS"
			/>
			<Multiplyer era={2} phase={1} multiplyer={33} />
			<div
				style={{
					gap: "11px",
				}}
				className="flex justify-center items-center"
			>
				<div
					style={{
						width: "100%",
						height: "1px",
						backgroundColor: "#FF5001",
						borderRadius: "100px",
					}}
				></div>
				<div className="text-agwhite uppercase tracking-wider text-nowrap font-bold">
					So you get both:
				</div>
				<div
					style={{
						width: "100%",
						height: "1px",
						backgroundColor: "#FF5001",
						borderRadius: "100px",
					}}
				></div>
			</div>
			<Card
				value="82,560"
				conversion="$9,800"
				multiplyer="33"
				pillIconAlt="points"
				pillIconSrc={require("@/app/assets/icons/pill-points.svg")}
				pillText="Points"
			/>
			<Card
				value="65,156"
				conversion="$9,800"
				multiplyer="33"
				pillIconAlt="dark x"
				pillIconSrc={require("@/app/assets/icons/pill-dark-x.png")}
				pillText="DARK X"
			/>
		</div>
	);
}
