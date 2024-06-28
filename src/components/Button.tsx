"use client";

import React, { use, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { stagger, useAnimate, animate } from "framer-motion";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { IMAGEKIT_ICONS } from "@/assets/imageKit";

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
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	/**
	 * Children of the button
	 **/
	children?: React.ReactNode;
	/**
	 * Icon for the hallmark
	 **/
	hallmarkIconSrc?: string | StaticImport;
	/**
	 * loading state of the button
	 * @default false
	 * */
	loading?: boolean;
	/**
	 * disabled state of the button
	 * @default false
	 * */
	disabled?: boolean;
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
	hallmarkIconSrc,
	loading = false,
	disabled = false,
	...props
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
    const sparklesAnimation: AnimationSequence = sparkles.map((_, index) => [
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
    ]);

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
					{...props}
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
						`uppercase tracking-widest w-fit relative flex items-center gap-x-2 justify-center font-sans font-bold text-agwhite cursor-pointer rounded-[4px] transition-[all_150ms] hover:shadow-none overflow-hidden`,
						secondary
							? "border-[1px] border-[#414343] bg-agblack active:bg-[#414343] box-border"
							: "bg-blue text-agblack active:bg-agblack",

						className
					)}
				>
					{hallmarkIconSrc && (
						<Image
							src={hallmarkIconSrc}
							alt="Hallmark"
							width={54}
							height={54}
							className="object-cover absolute top-0 left-0 -z-[1] opacity-50 mix-blend-hue"
						/>
					)}
					{iconSrc !== null && (
						<Image
							src={iconSrc}
							alt={iconAlt}
							width={24}
							height={24}
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
				</button>
			</div>
		);
	} else {
		return (
			<button
				{...props}
				onClick={onClick}
				style={
					{
						flexDirection:
							iconPosition === "start" ? "row" : "row-reverse",
						transform: isHovered
							? "translateY(4px)"
							: "translateY(0px)",
					} as any
				}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				className={twMerge(
					`uppercase tracking-widest w-fit relative flex items-center gap-x-2 justify-center font-sans font-extrabold text-agwhite cursor-pointer text-nowrap
                                rounded-[4px] px-4 py-3 shadow-button hover:translate-y-1 transition-[all_150ms] hover:shadow-none active:bg-agblack bg-blue z-0 overflow-hidden`,
					secondary &&
						"border-[1px] border-[#414343] bg-agblack active:bg-[#414343] box-border",
					`text-[${letterSize[size]}px] leading-[${letterSize[size]}px]`,
					className,
					(loading || disabled) && "cursor-not-allowed bg-[#414343]"
				)}
				disabled={loading || disabled}
			>
				{hallmarkIconSrc && (
					<Image
						src={hallmarkIconSrc}
						alt="Hallmark"
						width={54}
						height={54}
						className="object-cover absolute top-0 left-0 -z-[1] opacity-50 mix-blend-hue"
					/>
				)}
				<div className="w-[24px] h-[24px]">
					{loading ? (
						<Image
							src={IMAGEKIT_ICONS.REFRESH}
							alt={iconAlt}
							width={24}
							height={24}
							className="object-cover animate-spin"
						/>
					) : (
						iconSrc && (
							<Image
								src={iconSrc}
								alt={iconAlt}
								width={24}
								height={24}
								className="object-cover w-[24px] h-[24px]"
							/>
						)
					)}
				</div>
				<div className="text-nowrap">{innerText}</div>
			</button>
		);
	}
}
