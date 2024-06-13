import { twMerge } from "tailwind-merge";

export default function P({
	children,
	className,
	uppercase = false,
	gradient = false,
	extrabold = false,
	sans = false,
}: {
	children: React.ReactNode;
	className?: string;
	uppercase?: boolean;
	gradient?: boolean;
	extrabold?: boolean;
	sans?: boolean;
}) {
	return (
		<p
			className={twMerge(
				"text-[16px] font-general-sans text-white font-medium",
				uppercase ? "uppercase tracking-widest" : "",
				gradient
					? "bg-gradient-to-b from-white to-[#999999] text-transparent bg-clip-text"
					: "",
				extrabold ? "font-extrabold" : "",
				sans ? "font-sans" : "",
				className ?? ""
			)}
		>
			{children}
		</p>
	);
}
