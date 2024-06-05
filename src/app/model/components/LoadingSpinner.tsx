"use client";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import {
	motion,
	useSpring,
	MotionValue,
	useTransform,
	KeyframeOptions,
	animate,
	useInView,
	useIsomorphicLayoutEffect,
} from "framer-motion";
import { useProgress } from "@react-three/drei";

type SpinnerProps = {
	era: "wishwell" | "mining" | "minting";
	stage: 1 | 2 | 3;
	bonus: number;
	days: number;
	hours: number;
	mins: number;
	secs: number;
};

const styles = {
	"era-styles": {
		parent: "absolute flex justify-center items-center top-0 left-[50%] translate-x-[-50%] translate-y-[-50%] origin-bottom h-[470px] w-[2em] z-10 pt-24",
		active: "uppercase text-center text-black font-sans font-black text-3xl",
		passive:
			"uppercase text-center from-white to-[#999999] bg-gradient-to-b text-transparent bg-clip-text font-sans font-black text-3xl",
	},
	"border-styles": {
		era: "absolute top-0 left-[50%] translate-x-[-50%] translate-y-[-50%] origin-bottom w-[3px] h-[490px] bg-black",
		stage: "absolute top-0 left-[50%] translate-x-[-50%] translate-y-[-50%] origin-bottom h-[300px] w-[3px] bg-black z-10",
	},
	"stage-styles": {
		parent: "absolute top-0 left-[50%] translate-x-[-50%] translate-y-[-50%] origin-bottom h-[180px] w-[2em] z-10",
		active: "uppercase text-center bg-clip-text font-sans font-black text-4xl",
		passive:
			"uppercase text-center from-white to-[#999999] bg-gradient-to-b text-transparent bg-clip-text font-sans font-black text-4xl",
	},
	"timer-styles": {
		parent: "flex-col justify-center items-center gap-0",
		number: "font-sans text-agyellow text-5xl font-extrabold text-center",
		label: "uppercase text-sm text-center from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text",
	},
};

function H1({
	className,
	era,
	stage,
	parentClassName,
	currentState,
	isEraLetter,
}: {
	className?: string;
	era: SpinnerProps["era"];
	stage: SpinnerProps["stage"];
	parentClassName: string;
	currentState: SpinnerProps;
	isEraLetter?: string;
}) {
	const active = currentState.era === era && currentState.stage === stage;

	return (
		<>
			{isEraLetter !== undefined ? (
				<div
					className={twMerge(
						styles["era-styles"].parent,
						parentClassName
					)}
				>
					{currentState.era === era ? (
						<motion.h1
							animate={{
								color: "black",
							}}
							initial={{
								color: "white",
							}}
							transition={{ duration: 0.5, delay: 1 }}
							className={twMerge(styles["era-styles"].active)}
						>
							{isEraLetter}
						</motion.h1>
					) : (
						<h1 className={twMerge(styles["era-styles"].passive)}>
							{isEraLetter}
						</h1>
					)}
				</div>
			) : (
				<div
					className={twMerge(
						parentClassName,
						styles["stage-styles"].parent
					)}
				>
					{active ? (
						<motion.h1
							animate={{
								color: "black",
							}}
							initial={{
								color: "white",
							}}
							transition={{ duration: 0.5, delay: 1 }}
							className={twMerge(
								styles["stage-styles"].active,
								className
							)}
						>
							{stage}
						</motion.h1>
					) : (
						<h1
							className={twMerge(
								styles["stage-styles"].passive,
								className
							)}
						>
							{stage}
						</h1>
					)}
				</div>
			)}
		</>
	);
}

function Border({
	eraBorder,
	className,
}: {
	eraBorder: boolean;
	className: string;
}) {
	return (
		<div
			className={twMerge(
				eraBorder
					? styles["border-styles"].era
					: styles["border-styles"].stage,
				className
			)}
		></div>
	);
}

export default function LoadingSpinner() {
	const activeState: SpinnerProps = {
		era: "wishwell",
		stage: 1,
		bonus: 0,
		days: 0,
		hours: 0,
		mins: 0,
		secs: 0,
	};
    const { progress } = useProgress();

	return (
		<motion.div
			animate={{
				filter: "saturate(1)",
			}}
			initial={{
				filter: "saturate(0)",
			}}
			transition={{ duration: 1 }}
			className="absolute top-0 left-[50%] translate-x-[-50%] translate-y-[-40%] w-[500px] h-[500px] bg-black rounded-full flex justify-center items-center scale-[0.8] sm:scale-[1] overflow-hidden z-[100]"
		>
			<div className="relative w-[470px] h-[470px] bg-[radial-gradient(circle_at_center,#B7A4EA,#1C0068_65%)] rounded-full flex justify-center items-center overflow-hidden">
				<div id="wishwell">
					<H1
						era="wishwell"
						stage={activeState.stage}
						parentClassName="rotate-[-96deg]"
						currentState={activeState}
						isEraLetter={"W"}
					/>
					<H1
						era="wishwell"
						stage={activeState.stage}
						parentClassName="rotate-[-90deg]"
						currentState={activeState}
						isEraLetter={"i"}
					/>
					<H1
						era="wishwell"
						stage={activeState.stage}
						parentClassName="rotate-[-85deg]"
						currentState={activeState}
						isEraLetter={"s"}
					/>
					<H1
						era="wishwell"
						stage={activeState.stage}
						parentClassName="rotate-[-78deg]"
						currentState={activeState}
						isEraLetter={"h"}
					/>
					<H1
						era="wishwell"
						stage={activeState.stage}
						parentClassName="rotate-[-70deg]"
						currentState={activeState}
						isEraLetter={"w"}
					/>
					<H1
						era="wishwell"
						stage={activeState.stage}
						parentClassName="rotate-[-62deg]"
						currentState={activeState}
						isEraLetter={"e"}
					/>
					<H1
						era="wishwell"
						stage={activeState.stage}
						parentClassName="rotate-[-56deg]"
						currentState={activeState}
						isEraLetter={"l"}
					/>
					<H1
						era="wishwell"
						stage={activeState.stage}
						parentClassName="rotate-[-50deg]"
						currentState={activeState}
						isEraLetter={"l"}
					/>
				</div>
				<Border eraBorder className="rotate-[-37.5deg]" />
				<div id="mining">
					<H1
						era="mining"
						stage={activeState.stage}
						parentClassName="rotate-[-12deg]"
						currentState={activeState}
						isEraLetter={"M"}
					/>
					<H1
						era="mining"
						stage={activeState.stage}
						parentClassName="rotate-[-6deg]"
						currentState={activeState}
						isEraLetter={"i"}
					/>
					<H1
						era="mining"
						stage={activeState.stage}
						parentClassName="rotate-[-1deg]"
						currentState={activeState}
						isEraLetter={"n"}
					/>
					<H1
						era="mining"
						stage={activeState.stage}
						parentClassName="rotate-[4deg]"
						currentState={activeState}
						isEraLetter={"i"}
					/>
					<H1
						era="mining"
						stage={activeState.stage}
						parentClassName="rotate-[9deg]"
						currentState={activeState}
						isEraLetter={"n"}
					/>
					<H1
						era="mining"
						stage={activeState.stage}
						parentClassName="rotate-[16deg]"
						currentState={activeState}
						isEraLetter={"g"}
					/>
				</div>
				<Border eraBorder className="rotate-[37.5deg]" />
				<div id="minting">
					<H1
						era="minting"
						stage={activeState.stage}
						parentClassName="rotate-[61deg]"
						currentState={activeState}
						isEraLetter={"M"}
					/>
					<H1
						era="minting"
						stage={activeState.stage}
						parentClassName="rotate-[67deg]"
						currentState={activeState}
						isEraLetter={"i"}
					/>
					<H1
						era="minting"
						stage={activeState.stage}
						parentClassName="rotate-[73deg]"
						currentState={activeState}
						isEraLetter={"n"}
					/>
					<H1
						era="minting"
						stage={activeState.stage}
						parentClassName="rotate-[79deg]"
						currentState={activeState}
						isEraLetter={"t"}
					/>
					<H1
						era="minting"
						stage={activeState.stage}
						parentClassName="rotate-[84deg]"
						currentState={activeState}
						isEraLetter={"i"}
					/>
					<H1
						era="minting"
						stage={activeState.stage}
						parentClassName="rotate-[89deg]"
						currentState={activeState}
						isEraLetter={"n"}
					/>
					<H1
						era="minting"
						stage={activeState.stage}
						parentClassName="rotate-[96deg]"
						currentState={activeState}
						isEraLetter={"g"}
					/>
				</div>
				<div className="relative w-[300px] h-[300px] bg-[radial-gradient(circle_at_center,#B7A4EA,#1C0068_65%)] rounded-full border-[10px] border-agblack flex justify-center items-center overflow-hidden z-10">
					<div>
						<Border
							eraBorder={false}
							className="rotate-[-87.5deg]"
						/>
						<Border
							eraBorder={false}
							className="rotate-[-62.5deg]"
						/>
						<Border
							eraBorder={false}
							className="rotate-[-37.5deg]"
						/>
						<Border
							eraBorder={false}
							className="rotate-[-12.5deg]"
						/>
						<Border
							eraBorder={false}
							className="rotate-[12.5deg]"
						/>
						<Border
							eraBorder={false}
							className="rotate-[37.5deg]"
						/>
						<Border
							eraBorder={false}
							className="rotate-[62.5deg]"
						/>
						<Border
							eraBorder={false}
							className="rotate-[87.5deg]"
						/>
					</div>
					<div className="relative w-[180px] h-[180px] bg-[#1C0068] rounded-full border-[10px] border-agblack flex justify-center items-center z-10">
						<div>
							<H1
								currentState={activeState}
								era="wishwell"
								stage={1}
								parentClassName="rotate-[-100deg] pt-12"
							/>
							<H1
								currentState={activeState}
								era="wishwell"
								stage={2}
								parentClassName="rotate-[-75deg] pt-11"
							/>
							<H1
								currentState={activeState}
								era="wishwell"
								stage={3}
								parentClassName="rotate-[-50deg] pt-10"
							/>
							<H1
								currentState={activeState}
								era="mining"
								stage={1}
								parentClassName="rotate-[-25deg] pt-9"
							/>
							<H1
								currentState={activeState}
								era="mining"
								stage={2}
								parentClassName="rotate-[0deg] pt-9"
							/>
							<H1
								currentState={activeState}
								era="mining"
								stage={3}
								parentClassName="rotate-[25deg] pt-9"
							/>
							<H1
								currentState={activeState}
								era="minting"
								stage={1}
								parentClassName="rotate-[50deg] pt-10"
							/>
							<H1
								currentState={activeState}
								era="minting"
								stage={2}
								parentClassName="rotate-[75deg] pt-11"
							/>
							<H1
								currentState={activeState}
								era="minting"
								stage={3}
								parentClassName="rotate-[100deg] pt-12"
							/>
						</div>
						<div className="relative w-[100px] h-[100px] bg-agyellow rounded-full flex justify-center items-center">
							<div className="flex flex-col justify-center items-center">
								<h1 className="font-sans font-black text-4xl">
									{progress}% 
								</h1>
								<div className="uppercase text-sm font-sans font-bold">
									Bonus
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="absolute flex flex-col justify-center items-center gap-2 z-[100] w-[400px] h-[200px] translate-y-[60%]">
					<Image
						src={require("./counter-background.svg")}
						width={450}
						height={225}
						layout="fixed"
						alt="Counter Background"
						className="absolute top-0 left-0 h-[220px] -z-[1]"
					/>
					<div className="flex gap-4">
						<div className={styles["timer-styles"].parent}>
							<div className={styles["timer-styles"].number}>
								Loading...
							</div>
							<div className={styles["timer-styles"].label}>
								Please wait for mining to complete
							</div>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
