import Image from "next/image";

export default function Footer() {
	return (
		<div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center px-4 md:px-16 py-4 bg-agblack">
			<div className="flex gap-4 justify-center items-center">
				<Image
					src={require("@/app/model/assets/logo.svg")}
					alt="logo"
					width={45}
					height={45}
				/>
				<div className="uppercase text-xl text-center from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text">
					Antigravity
				</div>
			</div>
			<div className="uppercase tracking-widest text-lg md:text-center from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text">
				2024 ©️ Copyrights Reserved
			</div>
		</div>
	);
}
