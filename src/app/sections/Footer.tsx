import Image from "next/image";
import P from "../components/HTML/P";

export default function Footer() {
	return (
		<div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center px-4 md:px-16 py-4 bg-agblack gap-4">
			<div className="flex gap-4 justify-center items-center">
				<Image
					src={require("@/app/assets/logo.svg")}
					alt="logo"
					width={45}
					height={45}
				/>
				<P extrabold gradient sans className="text-[24px] uppercase">
					Antigravity
				</P>
			</div>
			<P uppercase extrabold gradient>
				2024 ©️ Copyrights Reserved
			</P>
		</div>
	);
}
