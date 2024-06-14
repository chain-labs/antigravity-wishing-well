import { twMerge } from "tailwind-merge";

export default function Badge({
	children,
	special = false,
    
}: {
	children: React.ReactNode;
	special?: boolean;
}) {
	return (
		<div
			className={twMerge(
				"text-[12px] leading-[12px] relative flex items-center gap-[8px] justify-center font-sans font-extrabold text-agwhite cursor-pointer rounded-full py-[4px] px-[8px] border-2 uppercase tracking-widest w-fit",
				special &&
					"text-agyellow font-extrabold bg-gradient-to-b from-[#0A1133] to-[#142266] border-none"
			)}
		>
			{children}
		</div>
	);
}
