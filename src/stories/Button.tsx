"use client";

import React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
	/**
	 * Is this the principal call to action on the page?
	 */
	primary?: boolean;
	/**
	 * What background color to use
	 */
	backgroundColor?: string;
	/**
	 * How large should the button be?
	 */
	size?: "small" | "medium" | "large";
	/**
	 * Button contents
	 */
	label: string;
	/**
	 * Square button
	 */
	square?: boolean;
	/**
	 * Additional classes
	 */
	className?: string;
	/**
	 * Optional click handler
	 */
	onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
	primary = false,
	size = "medium",
	backgroundColor,
	label,
	square = false,
	className = "",
	...props
}: ButtonProps) => {
	const defaultStyling =
		"relative flex items-center gap-x-2 justify-center font-sans font-bold text-agwhite cursor-pointer rounded-lg px-4 py-3 shadow-button hover:translate-y-1 transition-[all_150ms] hover:shadow-none active:bg-agblack";
	const mode = primary ? "bg-blue" : "bg-agblack bg-opacity-65";
	const modeSize =
		size == "small" ? "text-sm" : size == "medium" ? "text-xl" : "text-2xl";
	const modeSquare = square
		? "text-xl text-primary h-8 w-8 px-0 py-0 leading-4"
		: "";
	return (
		<button
			type="button"
			className={twMerge(defaultStyling, modeSize, mode, modeSquare, className)}
			{...props}
		>
			{label}
		</button>
	);
};
