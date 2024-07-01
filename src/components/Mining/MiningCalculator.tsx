"use client";

import P from "@/components/HTML/P";
import { twMerge } from "tailwind-merge";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IMAGEKIT_ICONS } from "@/assets/imageKit";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Dropdown from "@/components/Dropdown";
import Badge from "@/components/Badge";
import Pill from "@/components/Pill";
import { TokenDropdownTypes } from "./types";
import Image from "next/image";

export function InputCard({
	inputValue,
	setCurrentInputValue,
	conversion,
	dropdownOptions,
	dropDownSelected,
	setDropDownSelected,
}: {
	inputValue: string;
	setCurrentInputValue: Dispatch<SetStateAction<string>>;
	conversion: string;
	dropdownOptions: TokenDropdownTypes[];
	dropDownSelected: number;
	setDropDownSelected: Dispatch<SetStateAction<number>>;
}) {
	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		let inputCurrentValue = e.target.value;

		// Remove any non-numeric characters except the decimal point
		inputCurrentValue = inputCurrentValue.replace(/[^0-9.]/g, "");

		// Ensure only one decimal point
		const parts = inputCurrentValue.split(".");
		if (parts.length > 2) {
			inputCurrentValue = parts[0] + "." + parts.slice(1).join("");
		}

		// Handle empty input
		if (inputCurrentValue === "") {
			setCurrentInputValue("0");
			return;
		}

		// Allow input ending with a decimal point
		if (inputCurrentValue.endsWith(".")) {
			setCurrentInputValue(inputCurrentValue);
			return;
		}

		// Validate the number
		const numberValue = parseFloat(inputCurrentValue);

		if (!isNaN(numberValue) && numberValue >= 0) {
			setCurrentInputValue(inputCurrentValue);
		}
	}
	return (
		<div className="flex justify-between bg-gradient-to-b from-[#0A1133] to-[#142266] rounded-[6px] px-[12px] py-[16px] w-full border-[1px] border-agyellow">
			<div className="flex flex-col justify-start items-start gap-[8px] w-full">
				<input
					className="text-agwhite font-extrabold font-sans bg-transparent w-full h-full"
					type="text"
					value={inputValue}
					style={{
						fontSize:
							fontsizeClamping(inputValue, 7, 16, 32) + "px",
						lineHeight: 32 + "px",
					}}
					onChange={handleInputChange}
					autoFocus
				/>
				<P
					style={{
						// fontSize: fontsizeClamping(inputValue, 7, 8, 16) + "px",
						fontSize: 16 + "px",
						lineHeight: 16 + "px",
					}}
					extrabold
					className="opacity-75 h-full flex justify-start items-center w-fit"
				>
					{conversion}
				</P>
			</div>
			<div className="flex flex-col gap-[8px]">
				<div
					className={twMerge(
						"flex justify-center items-center gap-[8px] h-full w-fit"
					)}
				>
					<button className="flex justify-center items-center bg-gradient-to-b from-[#B4EBF8] rounded-full to-[#789DFA] p-[1px] box-padding w-fit h-fit">
						<div className="bg-[#0A1133] rounded-full w-fit h-fit">
							<div className="rounded-full text-[16px] leading-[16px] px-[8px] py-[4px] from-[#B4EBF8] to-[#789DFA] font-general-sans font-semibold bg-gradient-to-b text-transparent bg-clip-text">
								MAX
							</div>
						</div>
					</button>
					<Dropdown
						options={dropdownOptions ?? []}
						selected={dropDownSelected}
						setSelected={setDropDownSelected}
					/>
				</div>
				<div
					className={`flex gap-[4px] justify-end items-center text-[16px] leading-[16px] text-agwhite opacity-75 font-general-sans font-semibold`}
				>
					<Image
						src={IMAGEKIT_ICONS.WALLET_WHITE}
						alt="hammer icon"
						width={24}
						height={24}
						className={twMerge("object-cover")}
					/>
					1,245.0000 PLS
				</div>
			</div>
		</div>
	);
}

function fontsizeClamping(
	value: string,
	maxLengthForClamping: number,
	minFontSize: number,
	maxFontSize: number
) {
	return value.length >= maxLengthForClamping
		? maxFontSize - (value.length - maxLengthForClamping) >= minFontSize
			? maxFontSize - (value.length - maxLengthForClamping)
			: minFontSize
		: maxFontSize;
}

export function Card({
	value,
	conversion,
	multiplyer,
	pillIconSrc,
	pillText,
	pillIconAlt,
	onlyValue = false,
}: {
	isEditable?: boolean;
	value: string;
	conversion: string;
	multiplyer?: string;
	pillIconSrc: string | StaticImport;
	pillText: string;
	dropDownSelected?: number;
	pillIconAlt: string;
	onlyValue?: boolean;
}) {
	return (
		<div className="flex justify-between gap-[16px] bg-gradient-to-b from-[#0A1133] to-[#142266] rounded-[6px] px-[12px] py-[16px] w-full min-w-full border-[1px] border-agyellow">
			<div className="flex flex-col justify-start items-start gap-[8px] w-full">
				<div
					style={{
						fontSize: fontsizeClamping(value, 7, 16, 32) + "px",
						lineHeight: 32 + "px",
					}}
					className={` text-agwhite font-extrabold font-sans`}
				>
					{value}
				</div>
				{onlyValue ? null : (
					<div className="flex justify-center items-center opacity-75 gap-[8px]">
						<P
							style={{
								fontSize:
									fontsizeClamping(conversion, 7, 10, 16) + "px",
								lineHeight: 16 + "px",
							}}
							extrabold
						>
							{conversion}
						</P>
						<P extrabold>x</P>
						<P extrabold>{multiplyer}</P>
						<Badge>Multiplied!</Badge>
					</div>
				)}
			</div>
			<div className="flex flex-col justify-center items-center">
				<Pill
					text={String(pillText)}
					iconSrc={pillIconSrc}
					iconAlt={pillIconAlt}
				/>
			</div>
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
			<div className="relative flex flex-col justify-start items-start p-[8px] rounded-[6px] border border-agyellow overflow-hidden w-fit min-w-[80px] z-0">
				<div className="absolute inset-0 opacity-[0.66] bg-agblack -z-[1]"></div>
				<div className="text-[16px] leading-[19.2px] text-agwhite font-extrabold font-sans">
					Era
				</div>
				<div className="text-[32px] leading-[32px] text-agwhite font-extrabold font-sans">
					{era}
				</div>
			</div>
			<div className="relative flex flex-col justify-start items-start p-[8px] rounded-[6px] border border-agyellow overflow-hidden w-fit min-w-[80px] z-0">
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
			<div className="relative flex flex-col justify-start items-start p-[8px] rounded-[6px] border border-agyellow overflow-hidden w-[80%] z-0">
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

export function pointsConverterToUSCommaseparated(points: number): string {
	const [integerPart, decimalPart] = points.toString().split(".");
	const formattedIntegerPart = integerPart.replace(
		/\B(?=(\d{3})+(?!\d))/g,
		","
	);

	return decimalPart
		? `${formattedIntegerPart}.${decimalPart}`
		: formattedIntegerPart;
}

export default function MiningCalculator({
	value,
	setValue,
	conversionRateToUSD,
	era,
	phase,
	multiplyer,
	inputOptions,
	setSelectedToken,
}: {
	value: number;
	setValue: Dispatch<SetStateAction<number>>;
	conversionRateToUSD: number;
	era: 1 | 2 | 3;
	phase: 1 | 2 | 3;
	multiplyer: number;
	inputOptions: TokenDropdownTypes[];
	setSelectedToken: Dispatch<SetStateAction<number>>;
}) {
	const [currentValue, setCurrentValue] = useState<string>(
		pointsConverterToUSCommaseparated(value)
	);
	const [selectedOption, setSelectedOption] = useState<number>(0);
	const [USDValue, setUSDValue] = useState(value * inputOptions[0].USDvalue);

	useEffect(() => {
		console.log(selectedOption);
		const value = Number(currentValue.replace(/,/g, ""));
		if (!isNaN(value) && value >= 0) {
			const usdValue = value * inputOptions[selectedOption].USDvalue;
			setUSDValue(Number(usdValue));
			setValue(value);
		}
	}, [currentValue, conversionRateToUSD, selectedOption, inputOptions]);

	useEffect(() => {
		setCurrentValue(pointsConverterToUSCommaseparated(value));
	}, [value]);

	return (
		<div className="relative flex flex-col gap-[8px] h-fit max-w-[400px]">
			<InputCard
				inputValue={currentValue}
				setCurrentInputValue={setCurrentValue}
				conversion={`$${pointsConverterToUSCommaseparated(USDValue)}`}
				dropdownOptions={inputOptions}
				dropDownSelected={selectedOption}
				setDropDownSelected={setSelectedOption}
			/>
			<Multiplyer era={era} phase={phase} multiplyer={multiplyer} />
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
				value={pointsConverterToUSCommaseparated(
					Number(USDValue * multiplyer)
				)}
				conversion={`$${pointsConverterToUSCommaseparated(USDValue)}`}
				multiplyer={pointsConverterToUSCommaseparated(multiplyer)}
				pillIconAlt="points"
				pillIconSrc={IMAGEKIT_ICONS.PILL_POINTS}
				pillText="Points"
			/>
			<Card
				value={pointsConverterToUSCommaseparated(
					Number(USDValue * multiplyer)
				)}
				conversion={`$${pointsConverterToUSCommaseparated(USDValue)}`}
				multiplyer={pointsConverterToUSCommaseparated(multiplyer)}
				pillIconAlt="dark x"
				pillIconSrc={IMAGEKIT_ICONS.PILL_DARK_X}
				pillText="DARKX"
			/>
		</div>
	);
}
