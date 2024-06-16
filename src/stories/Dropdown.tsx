"use client";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function Dropdown({
	iconSrc,
	iconAlt,
	options,
	selected,
	setSelected,
}: {
	iconSrc: StaticImport | string;
	iconAlt: string;
	options: {
		label: string;
		value: number;
	}[];
	selected: string;
	setSelected: Dispatch<SetStateAction<number>>;
}) {
	useEffect(() => {
		console.log('selected', selected);
	}, [selected]);

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelected(Number(event.target.value));
	};
	return (
		<div className="grid grid-cols-[24px_auto] place-items-center gap-1 py-[4px] px-[8px] rounded-full bg-gradient-to-b from-[#B4EBF8] to-[#789DFA] tex-agblack font-general-sans font-semibold text-[16px] leading-[16px] h-fit w-full text-nowrap">
			<Image src={iconSrc} alt={iconAlt} width={24} height={24} />
			<select
				name=""
				className="bg-transparent outline-none"
				defaultValue={selected}
				onChange={handleChange}
			>
				{options.map((option, idx) => (
					<option key={option.label} value={idx}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
}
