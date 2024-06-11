export default function H1({ children }: { children: React.ReactNode }) {
	return (
		<h1 className="text-[48px] leading-[48px] from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text">
			{children}
		</h1>
	);
}
