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
				"text-5xl font-sans font-extrabold text-center",
				checkPhaseCompletedOrActive(activeState, phase, era)
					? "text-black"
					: "from-white to-[#999999] bg-gradient-to-b text-transparent bg-clip-text"
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
			className="relative mx-auto bg-[#0A0025] rounded-xl p-8 border-4 border-transparent bg-clip-padding flex flex-col lg:flex-row justify-between gap-10
            before:content-[''] before:absolute before:inset-0 before:z-[-1] before:bg-gradient-to-bl before:from-[#5537A5] before:to-[#BF6841] before:rounded-[inherit] before:overflow-hidden before:m-[-4px]
        "
		>
			<div className="flex justify-start items-start flex-col gap-4">
				<div className="tracking-widest uppercase text-3xl text-center from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text">
					ETA for phase 2
				</div>
				<div className="relative flex gap-3 text-agyellow font-sans">
					<div className="flex items-center justify-center flex-col">
						<h1 className="text-6xl font-extrabold">
							<DynamicNumberCounter
								count={state.days}
								setCount={() => {}}
								modulo={10000}
                                boxPixelSize={60}
							/>
						</h1>
						<p className="text-xl uppercase font-extrabold tracking-widest">
							Days
						</p>
					</div>
					<div className="bg-agyellow h-full w-[1px]"></div>
					<div className="flex items-center justify-center flex-col">
						<h1 className="text-6xl font-extrabold">
							<DynamicNumberCounter
                                count={state.hours}
                                setCount={() => {}}
                                modulo={24}
                                boxPixelSize={60}
                            />
						</h1>
						<p className="text-xl uppercase font-extrabold tracking-widest">
							Hours
						</p>
					</div>
					<div className="bg-agyellow h-full w-[1px]"></div>
					<div className="flex items-center justify-center flex-col">
						<h1 className="text-6xl font-extrabold">
							<DynamicNumberCounter
                                count={state.mins}
                                setCount={() => {}}
                                modulo={60}
                                boxPixelSize={60}
                            />
						</h1>
						<p className="text-xl uppercase font-extrabold tracking-widest">
							Mins
						</p>
					</div>
					<div className="bg-agyellow h-full w-[1px]"></div>
					<div className="flex items-center justify-center flex-col">
						<h1 className="text-6xl font-extrabold">
							<DynamicNumberCounter
                                count={state.secs}
                                setCount={() => {}}
                                modulo={60}
                                boxPixelSize={60}
                            />
						</h1>
						<p className="text-xl uppercase font-extrabold tracking-widest">
							Secs
						</p>
					</div>
				</div>
			</div>

			<div className="relative flex flex-col rounded bg-gradient-to-b from-[#5730BF] to-[#15004C] p-4 z-0 overflow-hidden">
				<div className="grid grid-cols-3 gap-14">
					<div className="h-full flex flex-col gap-2">
						<div className="text-5xl text-center from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text">
							Wishwell
						</div>
						<div className="tracking-widest uppercase text-lg text-center from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text">
							Phase
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<div className="text-5xl text-center font-sans font-extrabold text-agyellow">
							Mining
						</div>
						<div className="tracking-widest uppercase text-lg text-center from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text">
							Phase
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<div className="text-5xl text-center from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text">
							Minting
						</div>
						<div className="tracking-widest uppercase text-lg text-center from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text">
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
						viewport={{ once: true }}
						initial={{ width: "0%" }}
						transition={{ duration: 1 }}
						style={{
							height: "calc(100% + 16px)",
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
								src={require("@/app/model/assets/timer-pointer.svg")}
								alt="timer-pointer"
								width={24}
								height={24}
								className="mx-[8px]"
							/>
						</motion.div>
					</motion.div>
				</div>
				<motion.div
					whileInView={{
						width: "calc(33.33%)",
					}}
					initial={{ width: "0%" }}
					style={{
						height: "calc(100%)",
					}}
					transition={{ duration: 1 }}
					viewport={{ once: true }}
					className="absolute top-0 left-0 bg-gradient-to-b from-[#030404] to-[#131A1A] rounded-br-xl rounded-tr-xl  z-1000 opacity-[30%]"
				></motion.div>
				<motion.div
					whileInView={{
						width: "calc(33.33%)",
					}}
					initial={{ width: "0%" }}
					style={{
						height: "calc(100%)",
					}}
					transition={{ duration: 1 }}
					viewport={{ once: true }}
					className="absolute top-0 right-0 bg-gradient-to-b from-[#030404] to-[#131A1A] rounded-bl-xl rounded-tl-xl  z-1000 opacity-[30%]"
				></motion.div>
			</div>
		</div>
	);
}