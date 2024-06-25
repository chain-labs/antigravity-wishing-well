"use client";

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

export default function Pill({
	iconSrc,
	iconAlt,
	text,
}: {
	iconSrc?: string | StaticImport;
	iconAlt?: string;
	text: string;
}) {
	return (
		<div className="grid grid-cols-[24px_auto] place-items-center gap-1 py-[4px] px-[8px] rounded-full bg-gradient-to-b from-[#B4EBF8] to-[#789DFA] text-agblack font-general-sans font-semibold text-[16px] leading-[16px] h-fit w-full text-nowrap">
			{iconSrc && iconAlt && (
				<Image
					src={iconSrc}
					alt={iconAlt}
					width={24}
					height={24}
					className="rounded-full w-[24px] h-[24px]"
				/>
			)}
			{text}
		</div>
	);
}
