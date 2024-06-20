import {
	IMAGEKIT_ICONS,
	IMAGEKIT_IMAGES,
	IMAGEKIT_LOGOS,
} from "@/assets/imageKit";
import Button from "@/components/Button";
import CountdownTimer from "@/components/CountdownTimer";
import H1 from "@/components/HTML/H1";
import P from "@/components/HTML/P";
import MiningCalculator, {
	pointsConverterToUSCommaseparated,
} from "@/components/Mining/MiningCalculator";
import useTimer from "@/hooks/frontend/useTimer";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Pill from "../Pill";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type StateType = "No NFT" | "NFT Present" | "Claiming";

const dropdownOptions = [
	{
		label: "ETH",
		value: 0.25,
		darkIcon: IMAGEKIT_ICONS.ETH_BLACK,
		lightIcon: IMAGEKIT_ICONS.ETH,
	},
	{
		label: "PLS",
		value: 0.345,
		darkIcon: IMAGEKIT_ICONS.PLS_BLACK,
		lightIcon: IMAGEKIT_ICONS.PLS,
	},
	{
		label: "USDT",
		value: 0.4,
		darkIcon: IMAGEKIT_ICONS.USDT_BLACK,
		lightIcon: IMAGEKIT_ICONS.USDT,
	},
	{
		label: "USDC",
		value: 0.6,
		darkIcon: IMAGEKIT_ICONS.USDC_BLACK,
		lightIcon: IMAGEKIT_ICONS.USDC,
	},
];

function NoNFTHero() {
	return (
		<div className="md:absolute top-0 left-0 md:translate-x-[calc(-100%-48px)] flex flex-col justify-start items-start gap-[16px] md:max-w-[220px] p-[16px] md:p-0">
			<H1 className="text-agwhite text-[56px] leading-[53.76px] md:text-[64px] md:leading-[64px]">
				Mining
			</H1>
			<P>
				Everyone is going to say you got lucky!
				<br />
				<br />
				Start mining with the recommended tokens and get Points and
				$DARKX tokens.
				<br />
				<br />
				Try the interactive demo! ➡️
			</P>
		</div>
	);
}

function NFTHero({
	NFTHover,
	setNFTHover,
}: {
	NFTHover: boolean;
	setNFTHover: Dispatch<SetStateAction<boolean>>;
}) {
	console.log("NFTHover", NFTHover);
	return (
		<>
			<div className="md:absolute top-0 left-0 md:translate-x-[calc(-100%-48px)] flex flex-col justify-start items-start gap-[16px] md:max-w-[220px] p-[16px] md:p-0 z-10">
				<H1 className="text-agwhite text-[56px] leading-[53.76px] md:text-[64px] md:leading-[64px]">
					Mining
				</H1>
				<P>
					Everyone is going to say you got lucky!
					<br />
					<br />
					Start mining with the recommended tokens and get Points and
					$DARKX tokens.
				</P>
				<div className="flex justify-center items-center gap-[16px] z-50">
					<div className="hidden md:block">
						<Image
							onMouseEnter={() => setNFTHover(true)}
							src={IMAGEKIT_LOGOS.WISHWELL_LOGO}
							height={80}
							width={80}
							alt="wishwell logo hidden md:block"
						/>
					</div>
					<div className="flex justify-center items-center gap-[16px] md:hidden">
						<Image
							src={IMAGEKIT_LOGOS.WISHWELL_LOGO}
							height={80}
							width={80}
							alt="wishwell logo"
						/>
						<Button
							onClick={() => setNFTHover(true)}
							innerText="View Your NFT"
							iconSrc={IMAGEKIT_ICONS.ROCKET}
							iconAlt="rocket"
							className="bg-[#030404A8] md:hidden"
						/>
					</div>
				</div>
			</div>
		</>
	);
}

function ContributedCard({
	value,
	pillText,
	pillIconSrc,
	pillIconAlt,
}: {
	value: number;
	pillText: string;
	pillIconSrc: string | StaticImport;
	pillIconAlt: string;
}) {
	return (
		<div
			className="relative flex justify-between z-0 text-agwhite transition-all duration-300 ease-in-out bg-agblack rounded-[6px] px-[12px] py-[16px] w-full border-[1px]
		before:content-[''] before:absolute before:inset-0 before:z-[-10] md:before:bg-gradient-to-bl before:from-[#5537A5] before:to-[#BF6841] before:rounded-[inherit] before:overflow-hidden before:m-[-1px]
		after:content-[''] after:absolute after:inset-0 after:z-[-2] after:bg-gradient-to-b after:from-[#0A1133] after:to-[#142266] after:rounded-[inherit] after:overflow-hidden"
		>
			<H1 className="text-[32px] leading-[32px] md:text-[32px] md:leading-[32px]">
				{pointsConverterToUSCommaseparated(value)}
			</H1>
			<div className="flex flex-col justify-center items-center">
				<Pill
					text={pillText}
					iconSrc={pillIconSrc}
					iconAlt={pillIconAlt}
				/>
			</div>
		</div>
	);
}

function ContributedHero() {
	return (
		<div className="relative flex flex-col justify-center items-center gap-[24px] -mt-[50px]">
			<div className="flex flex-col justify-center items-center gap-[8px]">
				<H1 className="text-[64px] leading-[64px] md:text-[64px] md:leading-[64px]">
					Claim $DARK
				</H1>
				<P className="text-[14px] leading-[20.3px]">
					You can now get your $DARK tokens.
				</P>
			</div>
			<div className="flex flex-col justify-center items-center gap-[8px] w-full">
				<ContributedCard
					value={42000}
					pillText="Points"
					pillIconSrc={IMAGEKIT_ICONS.PILL_POINTS}
					pillIconAlt="points"
				/>
				<div
					style={{
						gap: "11px",
					}}
					className="flex justify-center items-center w-full"
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
						So you get:
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
				<ContributedCard
					value={4200.41}
					pillText="DARK"
					pillIconSrc={IMAGEKIT_ICONS.PILL_DARK_X}
					pillIconAlt="dark x"
				/>
				<Button
					innerText="Claim Now"
					iconSrc={IMAGEKIT_ICONS.CLAIM}
					iconAlt="Claim Now"
				/>
			</div>
		</div>
	);
}

function NonContributed({
	state,
	NFTHover,
	setNFTHover,
	NFTContainerRef,
	NFTRef,
}: {
	state: StateType;
	NFTHover: boolean;
	setNFTHover: Dispatch<SetStateAction<boolean>>;
	NFTContainerRef: React.RefObject<HTMLDivElement>;
	NFTRef: React.RefObject<HTMLDivElement>;
}) {
	const [value, setValue] = useState(40000);
	const timerState = useTimer();
	useEffect(() => {
		if (!NFTHover) return;
		if (!NFTContainerRef.current) return;
		NFTContainerRef.current.addEventListener("click", (e) => {
			// if e.currentTarget is not the NFTRef and button
			if (NFTRef.current && !NFTRef.current.contains(e.target as Node)) {
				setNFTHover(false);
			}
		});

		return () => {
			document.removeEventListener("click", () => {});
		};
	}, [NFTHover, NFTContainerRef, NFTRef]);

	useEffect(() => {
		document.body.style.overflow = NFTHover ? "hidden" : "auto";
	}, [NFTHover]);

	return (
		<div className="relative flex flex-col justify-center items-center gap-[8px] mt-[50px]">
			{
				{
					"No NFT": <NoNFTHero />,
					"NFT Present": (
						<NFTHero
							NFTHover={NFTHover}
							setNFTHover={setNFTHover}
						/>
					),
					Claiming: <></>,
				}[state]
			}
			<MiningCalculator
				value={value}
				setValue={setValue}
				conversionRateToUSD={0.245}
				era={2}
				phase={1}
				multiplyer={33}
				inputOptions={dropdownOptions}
			/>
			<Button
				innerText="Mine Now"
				iconSrc={IMAGEKIT_ICONS.HAMMER}
				iconAlt="hammer"
			/>

			<div className="p-[8px] rounded-[6px] bg-[#030404A8]">
				<CountdownTimer state={timerState} fontDesktopSize={56} />
			</div>
		</div>
	);
}

export default function MiningHero() {
	const [state, setState] = useState<StateType>("NFT Present");
	const [NFTHover, setNFTHover] = useState(false);
	const NFTRef = useRef<HTMLDivElement>(null);
	const NFTContainerRef = useRef<HTMLDivElement>(null);

	return (
		<div className="relative w-full min-h-screen overflow-hidden">
			<div className="bg-gradient-to-b from-[#000] h-fit to-[#0000] overflow-hidden">
				<div className="flex flex-col justify-center items-center w-full h-[130vh] md:h-screen md:pt-[80px]">
					{state === "Claiming" ? (
						<ContributedHero />
					) : (
						<NonContributed
							state={state}
							NFTContainerRef={NFTContainerRef}
							NFTRef={NFTRef}
							NFTHover={NFTHover}
							setNFTHover={setNFTHover}
						/>
					)}
				</div>
				{NFTHover && (
					<div
						ref={NFTContainerRef}
						className="fixed top-0 left-0 w-screen h-screen bg-gradient-to-b from-[#ffffff1f] to-[#ffffff1f] flex justify-center items-center z-10 backdrop-blur-sm"
					>
						<div ref={NFTRef}>
							<Image
								src={IMAGEKIT_IMAGES.NFT_RECEIPT}
								width={265}
								height={481}
								alt="NFT receipt"
								className="object-cover w-[250px] md:w-[290px]"
							/>
						</div>
					</div>
				)}
				<Image
					src={IMAGEKIT_IMAGES.MINING_BG}
					height={1080}
					width={1920}
					alt="background"
					layout="cover"
					objectFit="cover"
					className="absolute top-0 left-0 -z-[1] w-full h-[120%] object-[15%_50%] object-none md:w-full md:h-[110%] md:object-cover"
				/>
			</div>
		</div>
	);
}
