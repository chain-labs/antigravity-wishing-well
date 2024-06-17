"use client";

import React, { use, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { stagger, useAnimate, animate } from "framer-motion";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

interface ButtonProps {
	/**
	 * Text to display on the button
	 * @default "Click me"
	 **/
	innerText: string;
	/**
	 * Whether the button is a secondary button
	 * @default false
	 **/
	secondary?: boolean;
	/**
	 * Icon to display on the button
	 * @default null
	 **/
	iconSrc?: string | StaticImport | null;
	/**
	 * Alt text for the icon
	 * @default "icon"
	 **/
	iconAlt?: string;
	/**
	 * Position of the icon
	 * @default "start"
	 **/
	iconPosition?: "start" | "end";
	/**
	 * Color of the stars
	 * @default "yellow"
	 **/
	starsColor?: string;
	/**
	 * Number of stars to display
	 * @default 20
	 **/
	starsCount?: number;
	/**
	 * Size of the button
	 * @default "medium"
	 **/
	size?: "small" | "medium" | "large";
	/**
	 * Whether to disable the sparkles animation
	 * @default false
	 **/
	disableSparkels?: boolean;
	/**
	 * Additional classes to apply to the button
	 **/
	className?: string;
	/**
	 * Whether to animate the button normally
	 * @default false
	 **/
	animateButton?: boolean;
	/**
	 * Type of the button
	 * @default "button"
	 **/
	type?: "submit" | "reset" | "button";
	/**
	 * Function to call when the button is clicked
	 **/
	onClick?: (args0: React.MouseEvent) => void;
	/**
	 * Children of the button
	 **/
	children?: React.ReactNode;
}

/**
 * Primary UI component for user interaction
 */

const randomNumberBetween = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

type AnimationSequence = Parameters<typeof animate>[0];

export default function Button({
	secondary = false,
	innerText = "Click me",
	iconSrc = null,
	iconAlt = "icon",
	iconPosition = "start",
	starsColor = "yellow",
	starsCount = 20,
	size = "medium",
	disableSparkels = false,
	className = "",
	animateButton = false,
	type = "button",
	onClick,
	children,
}: ButtonProps) {
	const [scope, animate] = useAnimate();
	const [isAnimating, setIsAnimating] = React.useState(false);
	const innerTextStringArray = innerText.trim().split("");
	const [isHovered, setIsHovered] = React.useState(false);

	const letterSize = {
		small: 14,
		medium: 16,
		large: 18,
	};

	const iconSize = {
		small: 20,
		medium: 25,
		large: 30,
	};

	const onButtonClick = () => {
		if (isAnimating) return;
		setIsAnimating(true);

		const sparkles = Array.from({ length: starsCount });
		const sparklesAnimation: AnimationSequence = sparkles.map(
			(_, index) => [
				`.sparkle-${index}`,
				{
					x: randomNumberBetween(-100, 100),
					y: randomNumberBetween(-100, 100),
					scale: randomNumberBetween(1.5, 2.5),
					opacity: 1,
				},
				{
					duration: 0.4,
					at: "<",
				},
			]
		);

		const sparklesFadeOut: AnimationSequence = sparkles.map((_, index) => [
			`.sparkle-${index}`,
			{
				opacity: 0,
				scale: 0,
			},
			{
				duration: 0.3,
				at: "<",
			},
		]);

		const sparklesReset: AnimationSequence = sparkles.map((_, index) => [
			`.sparkle-${index}`,
			{
				x: 0,
				y: 0,
				opacity: 0,
				scale: 0,
			},
			{
				duration: 0.000001,
			},
		]);

		if (disableSparkels) {
			animate([
				[
					".letter",
					{ y: -letterSize[size] },
					{
						duration: 0.2,
						delay: stagger(0.2 / innerTextStringArray.length),
					},
				],
				[".letter", { y: 0 }, { duration: 0.000001, at: 0.5 }],
			]).then(() => {
				setIsAnimating(false);
			});
		} else {
			animate([
				...sparklesReset,
				[
					".letter",
					{ y: -letterSize[size] },
					{
						duration: 0.2,
						delay: stagger(0.2 / innerTextStringArray.length),
					},
				],
				...sparklesAnimation,
				[".letter", { y: 0 }, { duration: 0.000001 }],
				...sparklesFadeOut,
			]).then(() => {
				setIsAnimating(false);
			});
		}
	};

	if (animateButton) {
		return (
			<div ref={scope}>
				<button
					type={type}
					onClick={onButtonClick}
					style={
						{
							flexDirection:
								iconPosition === "start"
									? "row"
									: "row-reverse",
							transform: isHovered
								? "translateY(4px)"
								: "translateY(0px)",
							boxShadow: isHovered
								? `0px 0px 0px 0px ${secondary ? "#414343" : "#000"}`
								: `0px 4px 0px 0px ${secondary ? "#414343" : "#000"}`,
							padding: secondary ? "6px 10px" : "12px 16px",
						} as any
					}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
					className={twMerge(
						`uppercase tracking-widest w-fit relative flex items-center gap-x-2 justify-center font-sans font-bold text-agwhite cursor-pointer rounded-[4px] transition-[all_150ms] hover:shadow-none`,
						secondary
							? "border-2 border-[#414343] bg-agblack active:bg-[#414343]"
							: "bg-blue text-agblack active:bg-agblack",

						className
					)}
				>
					{iconSrc !== null && (
						<Image
							src={iconSrc}
							alt={iconAlt}
							width={iconSize[size]}
							height={iconSize[size]}
							className="object-cover"
						/>
					)}
					<span
						className="sr-only"
						style={{
							position: "absolute",
							width: "1px",
							height: "1px",
							padding: "0",
							margin: "-1px",
							overflow: "hidden",
							clip: "rect(0, 0, 0, 0)",
							whiteSpace: "nowrap",
							borderWidth: "0",
						}}
					>
						{innerText}
					</span>
					<span
						style={{
							height: `${letterSize[size]}px`,
							lineHeight: `${letterSize[size]}px`,
							fontSize: `${letterSize[size]}px`,
						}}
						className={twMerge(
							`flex justify-start items-start overflow-hidden z-10`
						)}
						aria-hidden
					>
						{innerTextStringArray.map((letter, index) => {
							if (letter === " ") {
								return (
									<span
										data-letter={letter}
										className={`letter relative flex flex-col justify-start items-center z-10`}
										key={`${letter}-${index}`}
									>
										<div
											style={{
												width: "0.5ch",
												height: `${letterSize[size]}px`,
											}}
										>
											{letter}
										</div>
										<div
											style={{
												width: "0.5ch",
												height: `${letterSize[size]}px`,
											}}
										>
											{letter}
										</div>
									</span>
								);
							}
							return (
								<span
									data-letter={letter}
									className={`letter relative flex flex-col justify-start items-center z-10`}
									key={`${letter}-${index}`}
								>
									<div
										style={{
											height: `${letterSize[size]}px`,
										}}
									>
										{letter}
									</div>
									<div
										style={{
											height: `${letterSize[size]}px`,
										}}
									>
										{letter}
									</div>
								</span>
							);
						})}
					</span>
					<span
						aria-hidden
						className="pointer-events-none absolute inset-0 flex justify-center items-center z-[-1]"
					>
						{Array.from({ length: starsCount }).map((_, index) => (
							<svg
								className={`absolute left-1/2 top-1/2 opacity-0 sparkle-${index}`}
								key={index}
								viewBox="0 0 122 117"
								width="10"
								height="10"
								style={{
									opacity: 0,
								}}
							>
								<path
									className="fill-blue-600"
									fill={starsColor}
									d="M64.39,2,80.11,38.76,120,42.33a3.2,3.2,0,0,1,1.83,5.59h0L91.64,74.25l8.92,39a3.2,3.2,0,0,1-4.87,3.4L61.44,96.19,27.09,116.73a3.2,3.2,0,0,1-4.76-3.46h0l8.92-39L1.09,47.92A3.2,3.2,0,0,1,3,42.32l39.74-3.56L58.49,2a3.2,3.2,0,0,1,5.9,0Z"
								/>
							</svg>
						))}
					</span>
				</button>
			</div>
		);
	} else {
		return (
			<button
				onClick={onClick}
				style={
					{
						flexDirection:
							iconPosition === "start" ? "row" : "row-reverse",
						transform: isHovered
							? "translateY(4px)"
							: "translateY(0px)",
						boxShadow: isHovered
							? `0px 0px 0px 0px ${secondary ? "#414343" : "#000"}`
							: `0px 4px 0px 0px ${secondary ? "#414343" : "#000"}`,
					} as any
				}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				className={twMerge(
					`uppercase tracking-widest w-fit relative flex items-center gap-x-2 justify-center font-sans font-extrabold text-agwhite cursor-pointer
                                rounded-[4px] px-4 py-3 shadow-button hover:translate-y-1 transition-[all_150ms] hover:shadow-none active:bg-agblack bg-blue`,
					secondary &&
						"border-2 border-[#414343] bg-agblack active:bg-[#414343]",
					`text-[${letterSize[size]}px]`,
					className
				)}
			>
				{iconSrc && (
					<Image
						src={iconSrc}
						alt={iconAlt}
						width={24}
						height={24}
						className="object-cover"
					/>
				)}
				{innerText}
			</button>
		);
	}
}
