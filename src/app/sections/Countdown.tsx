"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import DynamicNumberCounter from "../components/spinner/DynamicNumberCounter";

type stateType = {
	days: number;
	hours: number;
	mins: number;
	secs: number;
	era: "wishwell" | "mining" | "minting";
	phase: 1 | 2 | 3;
};

function checkPhaseCompletedOrActive(
	activeState: stateType,
	currentPhase: stateType["phase"],
	currentEra: stateType["era"]
) {
	if (activeState.era === "wishwell") {
		if (currentEra === "wishwell") {
			return currentPhase <= activeState.phase;
		}
		return false;
	}

	if (activeState.era === "mining") {
		if (currentEra === "mining") {
			return currentPhase <= activeState.phase;
		}
		if (currentEra === "wishwell") {
			return true;
		}
		return false;
	}

	if (activeState.era === "minting") {
		if (currentEra === "minting") {
			return currentPhase <= activeState.phase;
		}
		return true;
	}
}

function Phase({
	activeState,
	era,
	phase,
}: {
	activeState: stateType;
	era: stateType["era"];
	phase: stateType["phase"];
}) {
	return (
		<motion.div
			whileInView={{
				color: checkPhaseCompletedOrActive(activeState, phase, era)
					? "black"
					: "transparent",
			}}
			initial={{ color: "white" }}
			viewport={{ once: true }}
			transition={{ duration: 0.5, delay: 1 }}
			className={twMerge(
				"text-[36px] font-sans font-extrabold text-center",
				checkPhaseCompletedOrActive(activeState, phase, era)
					? "text-black"
					: "from-white to-[#999999] bg-gradient-to-b text-transparent bg-clip-text"
			)}
		>
			{phase}
		</motion.div>
	);
}

function MobilePhase({
	activeState,
	era,
	phase,
}: {
	activeState: stateType;
	era: stateType["era"];
	phase: stateType["phase"];
}) {
	if (activeState.era === era && activeState.phase === phase) {
		return (
			<motion.div
				whileInView={{
					color: "black",
				}}
				initial={{ color: "black" }}
				viewport={{ once: true }}
				transition={{ duration: 0.5, delay: 1 }}
				className={twMerge(
					"relative text-[36px] font-sans font-extrabold text-center bg-agyellow rounded-lg p-4 px-8"
				)}
			>
				{phase}
				<motion.div
					whileInView={{
						width: "100%",
					}}
					initial={{ width: "0%" }}
					transition={{
						duration: 1,
						ease: "easeIn",
					}}
					viewport={{ once: true }}
					className="absolute w-full h-full bottom-0 left-0 translate-y-[35%] translate-x-[2%] flex justify-center items-center "
				>
					<Image
						src={require("@/app/assets/timer-pointer.svg")}
						alt="timer-pointer"
						width={20}
						height={20}
						className="mx-[8px]"
					/>
				</motion.div>
			</motion.div>
		);
	}

	return (
		<motion.div
			className={twMerge(
				"text-5xl font-sans font-extrabold text-center",
				"from-white to-[#999999] bg-gradient-to-b text-transparent bg-clip-text rounded-lg p-4 px-8"
			)}
		>
			{phase}
		</motion.div>
	);
}

function calculateActivePhasesSlider(activeState: stateType) {
	let activePhase = 0;
	if (activeState.era === "wishwell") {
		activePhase = activeState.phase;
	}
	if (activeState.era === "mining") {
		activePhase = activeState.phase + 3;
	}
	if (activeState.era === "minting") {
		activePhase = activeState.phase + 6;
	}
	return activePhase;
}

export default function Countdown() {
	const [state, setState] = useState<stateType>({
		days: 4,
		hours: 14,
		mins: 48,
		secs: 56,
		era: "mining",
		phase: 1,
	});

	useEffect(() => {
		const interval = setInterval(() => {
			setState((prev) => {
				if (prev.secs > 0) {
					return {
						...prev,
						secs: prev.secs - 1,
					};
				}
				if (prev.mins > 0) {
					return {
						...prev,
						secs: 59,
						mins: prev.mins - 1,
					};
				}
				if (prev.hours > 0) {
					return {
						...prev,
						secs: 59,
						mins: 59,
						hours: prev.hours - 1,
					};
				}
				if (prev.days > 0) {
					return {
						...prev,
						secs: 59,
						mins: 59,
						hours: 23,
						days: prev.days - 1,
					};
				}
				return prev;
			});
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div
			className="relative w-[calc(100%+3px)] border-t-4 border-b-4 max-w-[1200px] lg:translate-x-0 lg:w-full 2xl:w-4/5 md:mx-auto bg-[#0A0025] lg:rounded-xl p-[8px] lg:p-8 border-transparent bg-clip-padding flex flex-col lg:flex-row justify-between gap-10 z-0
            before:content-[''] before:absolute before:inset-0 before:z-[-10] before:bg-gradient-to-bl before:from-[#5537A5] before:to-[#BF6841] before:rounded-[inherit] before:overflow-hidden before:m-[-1.5px]
			after:content-[''] after:absolute after:inset-0 after:z-[-2] after:bg-[#0A0025] after:rounded-[inherit] after:overflow-hidden
        "
		>
			<Image
				src={require("@/app/assets/countdown-bg-grid.svg")}
				alt="countdown bg grid"
				width={800}
				height={800}
				className="absolute inset-0 z-[-1] w-full h-full object-cover user-select-none pointer-events-none opacity-[66%]"
			/>
			<div className="flex justify-start items-start flex-col gap-4">
				<div className="tracking-widest uppercase text-2xl text-center from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text">
					ETA for phase 2
				</div>
				<div className="relative flex gap-2 md:gap-3 text-agyellow font-sans">
					<div className="flex items-center justify-center flex-col">
						<h1 className="hidden md:flex text-6xl font-extrabold">
							<DynamicNumberCounter
								count={state.days}
								setCount={() => {}}
								modulo={10000}
								boxPixelSize={60}
							/>
						</h1>
						<h1 className="md:hidden text-5xl font-extrabold">
							<DynamicNumberCounter
								count={state.days}
								setCount={() => {}}
								modulo={10000}
								boxPixelSize={48}
							/>
						</h1>
						<p className="text-lg md:text-xl uppercase font-extrabold tracking-widest">
							Days
						</p>
					</div>
					<div className="bg-agyellow h-[clac(60px_1.5rem)] lg:full w-[1px]"></div>
					<div className="flex items-center justify-center flex-col">
						<h1 className="hidden md:flex text-6xl font-extrabold">
							<DynamicNumberCounter
								count={state.hours}
								setCount={() => {}}
								modulo={24}
								boxPixelSize={60}
							/>
						</h1>
						<h1 className="md:hidden text-5xl font-extrabold">
							<DynamicNumberCounter
								count={state.hours}
								setCount={() => {}}
								modulo={24}
								boxPixelSize={48}
							/>
						</h1>
						<p className="text-xl uppercase font-extrabold tracking-widest">
							Hours
						</p>
					</div>
					<div className="bg-agyellow h-[clac(60px_1.5rem)] lg:full w-[1px]"></div>
					<div className="flex items-center justify-center flex-col">
						<h1 className="hidden md:flex text-6xl font-extrabold">
							<DynamicNumberCounter
								count={state.mins}
								setCount={() => {}}
								modulo={60}
								boxPixelSize={60}
							/>
						</h1>
						<h1 className="md:hidden text-5xl font-extrabold">
							<DynamicNumberCounter
								count={state.mins}
								setCount={() => {}}
								modulo={60}
								boxPixelSize={48}
							/>
						</h1>
						<p className="text-lg md:text-xl uppercase font-extrabold tracking-widest">
							Mins
						</p>
					</div>
					<div className="bg-agyellow h-[clac(60px_1.5rem)] lg:full w-[1px]"></div>
					<div className="flex items-center justify-center flex-col">
						<h1 className="hidden md:flex text-6xl font-extrabold">
							<DynamicNumberCounter
								count={state.secs}
								setCount={() => {}}
								modulo={60}
								boxPixelSize={60}
							/>
						</h1>
						<h1 className="md:hidden text-5xl font-extrabold">
							<DynamicNumberCounter
								count={state.secs}
								setCount={() => {}}
								modulo={60}
								boxPixelSize={48}
							/>
						</h1>
						<p className="text-lg md:text-xl uppercase font-extrabold tracking-widest">
							Secs
						</p>
					</div>
				</div>
			</div>

			<div className="relative flex lg:hidden flex-col rounded bg-gradient-to-b from-[#5730BF] to-[#15004C] p-4 z-0 overflow-hidden">
				<div className="grid grid-cols-1 gap-4">
					<div className="relative h-full flex flex-col gap-2 p-2">
						<motion.div
							whileInView={{
								height: "calc(100%)",
							}}
							initial={{ height: "0%" }}
							style={{
								width: "calc(100%)",
							}}
							transition={{ duration: 1 }}
							viewport={{ once: true }}
							className="absolute top-0 left-0 bg-gradient-to-b from-[#030404] to-[#131A1A] rounded-xl -z-10 opacity-[30%]"
						></motion.div>
						<div className="text-[36px] text-center from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text">
							Wishwell
						</div>
						<div className="tracking-widest uppercase text-[14px] text-center from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text">
							Phase
						</div>
						<div className="flex justify-center items-center gap-2 relative z-0 px-auto">
							<MobilePhase
								activeState={state}
								era="wishwell"
								phase={1}
							/>
							<MobilePhase
								activeState={state}
								era="wishwell"
								phase={2}
							/>
							<MobilePhase
								activeState={state}
								era="wishwell"
								phase={3}
							/>
						</div>
					</div>
					<div className="flex flex-col gap-2 p-2">
						<div className="text-[36px] text-center font-sans font-extrabold text-agyellow">
							Mining
						</div>
						<div className="tracking-widest uppercase text-[14px] text-center from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text">
							Phase
						</div>
						<div className="flex justify-center items-center gap-2 relative z-0 px-auto">
							<MobilePhase
								activeState={state}
								era="mining"
								phase={1}
							/>
							<MobilePhase
								activeState={state}
								era="mining"
								phase={2}
							/>
							<MobilePhase
								activeState={state}
								era="mining"
								phase={3}
							/>
						</div>
					</div>
					<div className="relative flex flex-col gap-2 p-2">
						<motion.div
							whileInView={{
								height: "calc(100%)",
							}}
							initial={{ height: "0%" }}
							style={{
								width: "calc(100%)",
							}}
							transition={{ duration: 1 }}
							viewport={{ once: true }}
							className="absolute bottom-0 right-0 bg-gradient-to-b from-[#030404] to-[#131A1A] rounded-xl -z-10 opacity-[30%]"
						></motion.div>
						<div className="text-[36px] text-center from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text">
							Minting
						</div>
						<div className="tracking-widest uppercase text-[14px] text-center from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text">
							Phase
						</div>
						<div className="flex justify-center items-center gap-2 relative z-0 px-auto">
							<MobilePhase
								activeState={state}
								era="minting"
								phase={1}
							/>
							<MobilePhase
								activeState={state}
								era="minting"
								phase={2}
							/>
							<MobilePhase
								activeState={state}
								era="minting"
								phase={3}
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="hidden relative lg:flex flex-col rounded-[5px] bg-gradient-to-b from-[#5730BF] to-[#15004C] px-[12px] py-[8px] z-0 overflow-hidden">
				<div className="grid grid-cols-3 gap-14">
					<div className="h-full flex flex-col gap-2">
						<div className="text-[36px] leading-[36px] text-center from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text">
							Wishwell
						</div>
						<div className="tracking-widest uppercase text-[14px] text-center from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text">
							Phase
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<div className="text-[36px] leading-[36px] text-center font-sans font-extrabold text-agyellow">
							Mining
						</div>
						<div className="tracking-widest uppercase text-[14px] text-center from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text">
							Phase
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<div className="text-[36px] leading-[36px] text-center from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text">
							Minting
						</div>
						<div className="tracking-widest uppercase text-[14px] text-center from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text">
							Phase
						</div>
					</div>
				</div>
				<div className="grid grid-cols-9 relative z-0">
					<Phase activeState={state} era="wishwell" phase={1} />
					<Phase activeState={state} era="wishwell" phase={2} />
					<Phase activeState={state} era="wishwell" phase={3} />
					<Phase activeState={state} era="mining" phase={1} />
					<Phase activeState={state} era="mining" phase={2} />
					<Phase activeState={state} era="mining" phase={3} />
					<Phase activeState={state} era="minting" phase={1} />
					<Phase activeState={state} era="minting" phase={2} />
					<Phase activeState={state} era="minting" phase={3} />
					<motion.div
						whileInView={{
							width: `calc(${(100 / 9) * calculateActivePhasesSlider(state)}% + 16px)`,
						}}
						// viewport={{ once: true }}
						initial={{ width: "1%" }}
						transition={{ duration: 1 }}
						style={{
							height: "calc(100% + 8px)",
							left: `calc(0% - 16px)`,
						}}
						className="absolute w-[calc((50*9)%/100%)] h-full bg-agyellow rounded z-[-1]"
					>
						<motion.div
							whileInView={{
								width: "100%",
							}}
							initial={{ width: "0%" }}
							transition={{
								duration: 1,
								ease: "easeIn",
							}}
							viewport={{ once: true }}
							className="w-full h-full flex justify-end items-end px-[16px]"
						>
							<Image
								src={require("@/app/assets/timer-pointer.svg")}
								alt="timer-pointer"
								width={14}
								height={14}
								className="mx-[5px] my-[10px]"
							/>
						</motion.div>
					</motion.div>
				</div>
				<motion.div
					whileInView={{
						width: "calc(33.33%)",
						boxShadow: "5px 0px 0px 0px rgba(0,0,0,1)",
					}}
					initial={{
						width: "0%",
						boxShadow: "0px 0px 0px 0px rgba(0,0,0,1)",
					}}
					style={{
						height: "calc(100%)",
					}}
					transition={{ duration: 1 }}
					viewport={{ once: true }}
					className="absolute top-0 left-0 bg-gradient-to-b from-[#03040430] to-[#131a1a30] rounded-br-xl rounded-tr-xl z-1000"
				></motion.div>
				<motion.div
					whileInView={{
						width: "calc(33.33%)",
						boxShadow: "-5px 0px 0px 0px rgba(0,0,0,1)",
					}}
					initial={{
						width: "0%",
						boxShadow: "0px 0px 0px 0px rgba(0,0,0,1)",
					}}
					style={{
						height: "calc(100%)",
					}}
					transition={{ duration: 1 }}
					viewport={{ once: true }}
					className="absolute top-0 right-0 bg-gradient-to-b from-[#03040430] to-[#131a1a30] rounded-bl-xl rounded-tl-xl z-1000"
				></motion.div>
			</div>
		</div>
	);
}
