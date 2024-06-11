export default function H1({
	children,
	center = false,
}: {
	children: React.ReactNode;
	center?: boolean;
}) {
	return (
		<h1
			style={{
				textAlign: center ? "center" : "left",
			}}
			className="text-[48px] leading-[48px] from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text"
		>
			{children}
		</h1>
	);
}
