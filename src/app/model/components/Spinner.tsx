"use client";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import {
	KeyframeOptions,
	animate,
	useInView,
	useIsomorphicLayoutEffect,
} from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import { useSpring, MotionValue, useTransform } from "framer-motion";

type CounterProps = {
	count: number;
	setCount?: Dispatch<SetStateAction<number>>;
	minValue?: number;
	modulo: number;
};

function Counter(props: CounterProps) {
	const { count, setCount, modulo } = props;
	const arrayOfNumbers = Array.from(
		{ length: 11 },
		(_, i) => (count - 5 + i + 1) % modulo
	);
	const animatedValue = useSpring(count);

	// function handleIncrement() {
	// 	animatedValue.set(count + 1);
	// 	setCount(count + 1);
	// }

	// function handleDecrement() {
	// 	if (count === 0 && !props.minValue) return;
	// 	if (props.minValue && count <= props.minValue) return;
	// 	setCount(count - 1);
	// 	animatedValue.set(count - 1);
	// }

	useEffect(() => {
		animatedValue.set(count);
	}, [count, animatedValue]);

	return (
		<>
			<div className="relative overflow-hidden flex flex-col justify-center items-center h-12 w-16">
				{arrayOfNumbers.map((num) => (
					<Count
						num={String(num).padStart(2, "0")}
						mv={animatedValue}
						key={num}
					/>
				))}
			</div>
		</>
	);
}

function Count({ num, mv }: { num: string; mv: MotionValue }) {
	let y = useTransform(mv, (latestValue) => 48 * (Number(num) - latestValue));
	return (
		<motion.span
			style={{ y }}
			key={num}
			className={twMerge(
				"absolute inset-0 w-12 h-12 text-center leading-[3rem]",
				String(num).includes("1") ? "mx-auto" : ""
			)}
		>
			{num}
		</motion.span>
	);
}

type NumberCounterProps = {
	from: number;
	to: number;
	float?: boolean;
	animationOptions?: KeyframeOptions;
	currentCount?: number;
	setCurrentCount?: Dispatch<SetStateAction<number>>;
	classNames?: string;
};

function NumberCounter(props: NumberCounterProps) {
	const ref = useRef<HTMLSpanElement>(null);
	const inView = useInView(ref, { once: true });

	useIsomorphicLayoutEffect(() => {
		const element = ref.current;
		if (!element) return;
		if (!inView) return;

		const controls = animate(props.from, props.to, {
			duration: 1.5,
			ease: "easeInOut",
			...props.animationOptions,
			onUpdate(value) {
				element.textContent = String(
					props.float
						? String(value.toFixed(3)).padStart(2, "0")
						: String(Math.floor(value)).padStart(2, "0")
				);
			},
			onComplete() {
				if (props.setCurrentCount) {
					props.setCurrentCount(props.to);
				}
			},
		});

		return controls.stop;
	}, [props.from, props.to, props.animationOptions, inView, ref]);

	return <span className={twMerge(props.classNames)} ref={ref} />;
}

export default function Spinner() {
	const [activeState, setActiveState] = useState({
		era: "mining",
		stage: 3,
		bonus: 22,
		days: 4,
		hours: 14,
		mins: 48,
		secs: 6,
	});

	useEffect(() => {
		// decreade the timer every second
		const timer = setInterval(() => {
			setActiveState((prev) => {
				if (prev.secs === 0) {
					if (prev.mins === 0) {
						if (prev.hours === 0) {
							if (prev.days === 0) {
								return prev;
							} else {
								return {
									...prev,
									days: prev.days - 1,
									hours: 23,
									mins: 59,
									secs: 59,
								};
							}
						} else {
							return {
								...prev,
								hours: prev.hours - 1,
								mins: 59,
								secs: 59,
							};
						}
					} else {
						return {
							...prev,
							mins: prev.mins - 1,
							secs: 59,
						};
					}
				} else {
					return {
						...prev,
						secs: prev.secs - 1,
					};
				}
			});
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const styles = {
		"era-styles": {
			parent: "absolute flex justify-center items-center top-0 left-[50%] translate-x-[-50%] translate-y-[-50%] origin-bottom h-[470px] w-[2em] z-10 shadow-sm pt-24",
			active: "uppercase text-center text-black font-sans font-black text-3xl",
			passive:
				"uppercase text-center from-white to-[#999999] bg-gradient-to-b text-transparent bg-clip-text font-sans font-black text-3xl",
		},
		"border-styles": {
			era: "absolute top-0 left-[50%] translate-x-[-50%] translate-y-[-50%] origin-bottom w-[2px] h-[490px] bg-black",
			stage: "absolute top-0 left-[50%] translate-x-[-50%] translate-y-[-50%] origin-bottom h-[300px] w-[2px] shadow-sm bg-black",
		},
		"stage-styles": {
			parent: "absolute top-0 left-[50%] translate-x-[-50%] translate-y-[-50%] origin-bottom h-[180px] w-[2em] z-10 shadow-sm",
			active: "uppercase text-center text-black bg-clip-text font-sans font-black text-4xl",
			passive:
				"uppercase text-center from-white to-[#999999] bg-gradient-to-b text-transparent bg-clip-text font-sans font-black text-4xl",
		},
		"timer-styles": {
			parent: "flex-col justify-center items-center gap-0",
			number: "font-sans text-agyellow text-5xl font-extrabold text-center",
			label: "uppercase text-sm text-center from-white to-[#999999] pl-2 font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text",
		},
	};

	function decideActiveStageLocation() {
		switch (activeState.era) {
			case "wishwell":
				switch (activeState.stage) {
					case 1:
						return -100;
					case 2:
						return -75;
					case 3:
						return -50;
				}
			case "mining":
				switch (activeState.stage) {
					case 1:
						return -25;
					case 2:
						return 0;
					case 3:
						return 25;
				}
			case "minting":
				switch (activeState.stage) {
					case 1:
						return 50;
					case 2:
						return 75;
					case 3:
						return 100;
				}
		}
	}

	return (
		<div className="absolute top-0 left-[50%] translate-x-[-50%] translate-y-[50%] w-[500px] h-[500px] bg-black rounded-full flex justify-center items-center">
			<div className="relative w-[470px] h-[470px] bg-[radial-gradient(circle_at_center,#B7A4EA,#1C0068_65%)] rounded-full flex justify-center items-center overflow-hidden">
				<motion.div
					animate={{
						x: "-50%",
						y: "-50%",
						rotate:
							activeState.era === "wishwell"
								? -75
								: activeState.era === "minting"
									? 75
									: 0,
					}}
					initial={{
						x: "-50%",
						y: "-50%",
						rotate: 180,
					}}
					transition={{ duration: 1 }}
					className={twMerge(
						"absolute top-0 left-[50%] translate-x-[-50%] translate-y-[-50%] origin-bottom h-[490px] w-[190px] shadow-sm bg-agyellow z-10",
						`rotate-[${activeState.era === "wishwell" ? -75 : activeState.era === "minting" ? 75 : 0}deg]`
					)}
				>
					<div className="absolute bottom-0 left-[50%] translate-x-[calc(-100%_-_10px)] origin-bottom rotate-[37.5deg] h-[490px] w-[90px] shadow-sm bg-agyellow z-20"></div>
					<div className="absolute bottom-0 left-[50%] translate-x-[calc(11px)] origin-bottom rotate-[-37.5deg] h-[490px] w-[90px] shadow-sm bg-agyellow z-20"></div>
				</motion.div>
				<div id="wishwell">
					<div
						className={twMerge(
							styles["era-styles"].parent,
							"rotate-[-96deg]"
						)}
					>
						<h1
							className={twMerge(
								activeState.era === "wishwell"
									? styles["era-styles"].active
									: styles["era-styles"].passive
							)}
						>
							W
						</h1>
					</div>
					<div
						className={twMerge(
							styles["era-styles"].parent,
							"rotate-[-90deg]"
						)}
					>
						<h1
							className={twMerge(
								activeState.era === "wishwell"
									? styles["era-styles"].active
									: styles["era-styles"].passive
							)}
						>
							i
						</h1>
					</div>
					<div
						className={twMerge(
							styles["era-styles"].parent,
							"rotate-[-85deg]"
						)}
					>
						<h1
							className={twMerge(
								activeState.era === "wishwell"
									? styles["era-styles"].active
									: styles["era-styles"].passive
							)}
						>
							s
						</h1>
					</div>
					<div
						className={twMerge(
							styles["era-styles"].parent,
							"rotate-[-78deg]"
						)}
					>
						<h1
							className={twMerge(
								activeState.era === "wishwell"
									? styles["era-styles"].active
									: styles["era-styles"].passive
							)}
						>
							h
						</h1>
					</div>
					<div
						className={twMerge(
							styles["era-styles"].parent,
							"rotate-[-70deg]"
						)}
					>
						<h1
							className={twMerge(
								activeState.era === "wishwell"
									? styles["era-styles"].active
									: styles["era-styles"].passive
							)}
						>
							W
						</h1>
					</div>
					<div
						className={twMerge(
							styles["era-styles"].parent,
							"rotate-[-62deg]"
						)}
					>
						<h1
							className={twMerge(
								activeState.era === "wishwell"
									? styles["era-styles"].active
									: styles["era-styles"].passive
							)}
						>
							e
						</h1>
					</div>
					<div
						className={twMerge(
							styles["era-styles"].parent,
							"rotate-[-56deg]"
						)}
					>
						<h1
							className={twMerge(
								activeState.era === "wishwell"
									? styles["era-styles"].active
									: styles["era-styles"].passive
							)}
						>
							l
						</h1>
					</div>
					<div
						className={twMerge(
							styles["era-styles"].parent,
							"rotate-[-50deg]"
						)}
					>
						<h1
							className={twMerge(
								activeState.era === "wishwell"
									? styles["era-styles"].active
									: styles["era-styles"].passive
							)}
						>
							l
						</h1>
					</div>
				</div>
				<div
					className={twMerge(
						styles["border-styles"].era,
						"rotate-[-37.5deg]"
					)}
				></div>
				<div id="mining">
					<div
						className={twMerge(
							styles["era-styles"].parent,
							"rotate-[-12deg]"
						)}
					>
						<h1
							className={twMerge(
								activeState.era === "mining"
									? styles["era-styles"].active
									: styles["era-styles"].passive
							)}
						>
							M
						</h1>
					</div>
					<div
						className={twMerge(
							styles["era-styles"].parent,
							"rotate-[-6deg]"
						)}
					>
						<h1
							className={twMerge(
								activeState.era === "mining"
									? styles["era-styles"].active
									: styles["era-styles"].passive
							)}
						>
							i
						</h1>
					</div>
					<div
						className={twMerge(
							styles["era-styles"].parent,
							"rotate-[-1deg]"
						)}
					>
						<h1
							className={twMerge(
								activeState.era === "mining"
									? styles["era-styles"].active
									: styles["era-styles"].passive
							)}
						>
							n
						</h1>
					</div>
					<div
						className={twMerge(
							styles["era-styles"].parent,
							"rotate-[4deg]"
						)}
					>
						<h1
							className={twMerge(
								activeState.era === "mining"
									? styles["era-styles"].active
									: styles["era-styles"].passive
							)}
						>
							i
						</h1>
					</div>
					<div
						className={twMerge(
							styles["era-styles"].parent,
							"rotate-[9deg]"
						)}
					>
						<h1
							className={twMerge(
								activeState.era === "mining"
									? styles["era-styles"].active
									: styles["era-styles"].passive
							)}
						>
							n
						</h1>
					</div>
					<div
						className={twMerge(
							styles["era-styles"].parent,
							"rotate-[16deg]"
						)}
					>
						<h1
							className={twMerge(
								activeState.era === "mining"
									? styles["era-styles"].active
									: styles["era-styles"].passive
							)}
						>
							g
						</h1>
					</div>
				</div>
				<div
					className={twMerge(
						styles["border-styles"].era,
						"rotate-[37.5deg]"
					)}
				></div>
				<div id="minting">
					<div className="absolute flex justify-center items-center top-0 left-[50%] translate-x-[-50%] translate-y-[-50%] origin-bottom rotate-[96deg] h-[470px] w-[2em] z-10 shadow-sm pt-24">
						<h1
							className={twMerge(
								activeState.era === "minting"
									? styles["era-styles"].active
									: styles["era-styles"].passive
							)}
						>
							g
						</h1>
					</div>
					<div className="absolute flex justify-center items-center top-0 left-[50%] translate-x-[-50%] translate-y-[-50%] origin-bottom rotate-[89deg] h-[470px] w-[2em] z-10 shadow-sm pt-24">
						<h1
							className={twMerge(
								activeState.era === "minting"
									? styles["era-styles"].active
									: styles["era-styles"].passive
							)}
						>
							n
						</h1>
					</div>
					<div className="absolute flex justify-center items-center top-0 left-[50%] translate-x-[-50%] translate-y-[-50%] origin-bottom rotate-[84deg] h-[470px] w-[2em] z-10 shadow-sm pt-24">
						<h1
							className={twMerge(
								activeState.era === "minting"
									? styles["era-styles"].active
									: styles["era-styles"].passive
							)}
						>
							i
						</h1>
					</div>
					<div className="absolute flex justify-center items-center top-0 left-[50%] translate-x-[-50%] translate-y-[-50%] origin-bottom rotate-[79deg] h-[470px] w-[2em] z-10 shadow-sm pt-24">
						<h1
							className={twMerge(
								activeState.era === "minting"
									? styles["era-styles"].active
									: styles["era-styles"].passive
							)}
						>
							t
						</h1>
					</div>
					<div className="absolute flex justify-center items-center top-0 left-[50%] translate-x-[-50%] translate-y-[-50%] origin-bottom rotate-[73deg] h-[470px] w-[2em] z-10 shadow-sm pt-24">
						<h1
							className={twMerge(
								activeState.era === "minting"
									? styles["era-styles"].active
									: styles["era-styles"].passive
							)}
						>
							n
						</h1>
					</div>
					<div className="absolute flex justify-center items-center top-0 left-[50%] translate-x-[-50%] translate-y-[-50%] origin-bottom rotate-[67.5deg] h-[470px] w-[2em] z-10 shadow-sm pt-24">
						<h1
							className={twMerge(
								activeState.era === "minting"
									? styles["era-styles"].active
									: styles["era-styles"].passive
							)}
						>
							i
						</h1>
					</div>
					<div className="absolute flex justify-center items-center top-0 left-[50%] translate-x-[-50%] translate-y-[-50%] origin-bottom rotate-[61deg] h-[470px] w-[2em] z-10 shadow-sm pt-24">
						<h1
							className={twMerge(
								activeState.era === "minting"
									? styles["era-styles"].active
									: styles["era-styles"].passive
							)}
						>
							m
						</h1>
					</div>
				</div>
				<div className="relative w-[300px] h-[300px] bg-[radial-gradient(circle_at_center,#B7A4EA,#1C0068_65%)] rounded-full border-[10px] border-agblack flex justify-center items-center overflow-hidden z-10">
					<motion.div
						animate={{
							x: "-50%",
							y: "-50%",
							rotate: decideActiveStageLocation(),
						}}
						initial={{
							x: "-50%",
							y: "-50%",
							rotate: 180,
						}}
						transition={{ duration: 1 }}
						className={twMerge(
							"absolute top-0 left-[50%] translate-x-[-50%] translate-y-[-50%] origin-bottom h-[300px] w-[40px] shadow-sm bg-agyellow z-10",
							`rotate-[${decideActiveStageLocation()}deg]`
						)}
					>
						<div className="absolute bottom-0 left-[50%] translate-x-[calc(-100%)] origin-bottom rotate-[12.5deg] h-[300px] w-[20px] shadow-sm bg-agyellow z-20"></div>
						<div className="absolute bottom-0 left-[50%] translate-x-[calc(100%_-_20px)] origin-bottom rotate-[-12.5deg] h-[300px] w-[20px] shadow-sm bg-agyellow z-20"></div>
					</motion.div>
					<div>
						<div
							className={twMerge(
								styles["border-styles"].stage,
								"rotate-[-87.5deg]"
							)}
						></div>
						<div
							className={twMerge(
								styles["border-styles"].stage,
								"rotate-[-62.5deg]"
							)}
						></div>
						<div
							className={twMerge(
								styles["border-styles"].stage,
								"rotate-[-37.5deg]"
							)}
						></div>
						<div
							className={twMerge(
								styles["border-styles"].stage,
								"rotate-[-12.5deg]"
							)}
						></div>
						<div
							className={twMerge(
								styles["border-styles"].stage,
								"rotate-[12.5deg]"
							)}
						></div>
						<div
							className={twMerge(
								styles["border-styles"].stage,
								"rotate-[37.5deg]"
							)}
						></div>
						<div
							className={twMerge(
								styles["border-styles"].stage,
								"rotate-[62.5deg]"
							)}
						></div>
						<div
							className={twMerge(
								styles["border-styles"].stage,
								"rotate-[87.5deg]"
							)}
						></div>
					</div>
					<div className="relative w-[180px] h-[180px] bg-[#1C0068] rounded-full border-[10px] border-agblack flex justify-center items-center z-10">
						<div>
							<div
								className={twMerge(
									"rotate-[-100deg] pt-12",
									styles["stage-styles"].parent
								)}
							>
								<h1
									className={twMerge(
										activeState.era === "wishwell" &&
											activeState.stage === 1
											? styles["stage-styles"].active
											: styles["stage-styles"].passive
									)}
								>
									1
								</h1>
							</div>
							<div
								className={twMerge(
									"rotate-[-75deg] pt-11",
									styles["stage-styles"].parent
								)}
							>
								<h1
									className={twMerge(
										activeState.era === "wishwell" &&
											activeState.stage === 2
											? styles["stage-styles"].active
											: styles["stage-styles"].passive
									)}
								>
									2
								</h1>
							</div>
							<div
								className={twMerge(
									"rotate-[-50deg] pt-10",
									styles["stage-styles"].parent
								)}
							>
								<h1
									className={twMerge(
										activeState.era === "wishwell" &&
											activeState.stage === 3
											? styles["stage-styles"].active
											: styles["stage-styles"].passive
									)}
								>
									3
								</h1>
							</div>
							<div
								className={twMerge(
									"rotate-[-25deg] pt-9",
									styles["stage-styles"].parent
								)}
							>
								<h1
									className={twMerge(
										activeState.era === "mining" &&
											activeState.stage === 1
											? styles["stage-styles"].active
											: styles["stage-styles"].passive
									)}
								>
									1
								</h1>
							</div>
							<div
								className={twMerge(
									"rotate-[0deg] pt-8",
									styles["stage-styles"].parent
								)}
							>
								<h1
									className={twMerge(
										activeState.era === "mining" &&
											activeState.stage === 2
											? styles["stage-styles"].active
											: styles["stage-styles"].passive
									)}
								>
									2
								</h1>
							</div>
							<div
								className={twMerge(
									"rotate-[25deg] pt-9",
									styles["stage-styles"].parent
								)}
							>
								<h1
									className={twMerge(
										activeState.era === "mining" &&
											activeState.stage === 3
											? styles["stage-styles"].active
											: styles["stage-styles"].passive
									)}
								>
									3
								</h1>
							</div>
							<div
								className={twMerge(
									"rotate-[50deg] pt-10",
									styles["stage-styles"].parent
								)}
							>
								<h1
									className={twMerge(
										activeState.era === "minting" &&
											activeState.stage === 1
											? styles["stage-styles"].active
											: styles["stage-styles"].passive
									)}
								>
									1
								</h1>
							</div>
							<div
								className={twMerge(
									"rotate-[75deg] pt-11",
									styles["stage-styles"].parent
								)}
							>
								<h1
									className={twMerge(
										activeState.era === "minting" &&
											activeState.stage === 2
											? styles["stage-styles"].active
											: styles["stage-styles"].passive
									)}
								>
									2
								</h1>
							</div>
							<div
								className={twMerge(
									"rotate-[100deg] pt-12",
									styles["stage-styles"].parent
								)}
							>
								<h1
									className={twMerge(
										activeState.era === "minting" &&
											activeState.stage === 3
											? styles["stage-styles"].active
											: styles["stage-styles"].passive
									)}
								>
									3
								</h1>
							</div>
						</div>
						<div className="relative w-[100px] h-[100px] bg-agyellow rounded-full flex justify-center items-center">
							<div className="flex flex-col justify-center items-center">
								<motion.div
									animate={{
										x: "-50%",
										y: "-50%",
										rotate: decideActiveStageLocation(),
									}}
									initial={{
										x: "-50%",
										y: "-50%",
										rotate: 180,
									}}
									transition={{ duration: 1 }}
									className={twMerge(
										"absolute top-0 left-[50%] translate-x-[-50%] translate-y-[-50%] origin-bottom h-[100px] w-[30px] z-10 shadow-sm pt-6",
										`rotate-[${decideActiveStageLocation()}deg]`
									)}
								>
									<Image
										src={require("./counter-pointer.svg")}
										width={25}
										height={25}
										layout="fixed"
										alt="Counter Pointer"
									/>
								</motion.div>
								<h1 className="font-sans font-black text-4xl">
									<NumberCounter
										from={0}
										to={activeState.bonus}
									/>
									x
								</h1>
								<div className="uppercase text-sm font-bold">
									Bonus
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* <div className="absolute flex justify-center items-center h-[200px] w-[400px] bg-[radial-gradient(circle_at_top_right,#5537A5,#BF6841)] rounded-bl-full rounded-br-full translate-y-[50%]"></div> */}
				{/* after:content-[''] after:absolute after:top-0 after:left-0 after:-z-[1] after:p-[20px] after:h-[190px] after:w-[380px] after:rounded-[inherit] after:bg-[radial-gradient(circle_at_bottom,#15004C,#3C00DC)] after:origin-top */}

				{/* <div
					className="
				absolute flex flex-col justify-start items-center gap-6
				h-[225px] w-[450px] bg-[radial-gradient(circle_at_top_right,#5537A5,#BF6841)] rounded-bl-full rounded-br-full bg-clip-padding border-transparent border-[10px] z-0 origin-center translate-y-[100%]
				before:content-[''] before:absolute before:inset-0 before:-z-[1] before:-m-2 before:rounded-[inherit] before:bg-[radial-gradient(circle_at_bottom,#15004C,#3C00DC)] before:origin-top before:scale-[0.9]
				after:content-[''] after:absolute after:top-0 after:left-0 after:-z-[4] after:p-[20px] after:h-[220px] after:w-[440px] after:rounded-[inherit] after:bg-[radial-gradient(circle_at_top_right,#5537A5,#BF6841)] after:origin-top after:scale-[1] after:-translate-y-[10%] after:-translate-x-[1.5%]
				"
				> */}
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
								<NumberCounter from={0} to={activeState.days} />
							</div>
							<div className={styles["timer-styles"].label}>
								Days
							</div>
						</div>
						<div className={styles["timer-styles"].parent}>
							<div className={styles["timer-styles"].number}>
								<Counter
									count={activeState.hours}
									setCount={() => {}}
									modulo={24}
								/>
							</div>
							<div className={styles["timer-styles"].label}>
								Hours
							</div>
						</div>
						<div className={styles["timer-styles"].parent}>
							<div className={styles["timer-styles"].number}>
								<Counter
									count={activeState.mins}
									setCount={() => {}}
									modulo={60}
								/>
							</div>
							<div className={styles["timer-styles"].label}>
								Mins
							</div>
						</div>
						<div className={styles["timer-styles"].parent}>
							<div className={styles["timer-styles"].number}>
								{/* <NumberCounter
									from={activeState.secs}
									to={activeState.secs - 1}
								/> */}
								<Counter
									count={activeState.secs}
									setCount={() => {}}
									modulo={60}
								/>
							</div>
							<div className={styles["timer-styles"].label}>
								Secs
							</div>
						</div>
					</div>
					<div className="font-sans text-agyellow text-2xl font-bold text-center uppercase tracking-widest">
						Till Phase 2
					</div>
				</div>
			</div>
		</div>
	);
}
