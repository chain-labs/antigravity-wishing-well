export default function P({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<p
			className={
				"text-[16px] font-general-sans text-white font-medium" +
				className ?? ""
			}
		>
			{children}
		</p>
	);
}
