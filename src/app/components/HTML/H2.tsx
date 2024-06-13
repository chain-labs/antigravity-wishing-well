import { CSSProperties } from "react";

export default function H2({
	children,
	style,
}: {
	children: React.ReactNode;
	style: CSSProperties;
}) {
	return (
		<h2
			style={style}
			className="text-[32px] leading-[32px] from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text"
		>
			{children}
		</h2>
	);
}
