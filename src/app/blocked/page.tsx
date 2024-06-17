import Image from "next/image";
import H1 from "@/components/HTML/H1";
import P from "@/components/HTML/P";
import Button from "@/components/Button";
import Link from "next/link";

export default function GeoBlocked() {
	return (
		<div
			className={`fixed left-0 h-screen w-screen overflow-hidden bg-gradient-to-b from-[#030404] to-[#131A1A] z-[10000] `}
		>
			<div className="absolute top-0 left-0 flex justify-center items-center gap-[16px] px-[16px] py-[32px] md:py-[48px] md:px-[96px] w-full md:w-fit">
				<Image
					src={require("@/assets/logos/logo.svg")}
					alt="logo"
					width={45.19}
					height={45.19}
					className="w-[53.51px] h-[53.51px] md:w-[45.19px] md:h-[45.19px]"
				/>
				<H1 className="uppercase text-[24px] leading-[24px] md:text-[19px]">
					Antigravity
				</H1>
			</div>

			<div className="absolute bottom-0 left-0 flex flex-col justify-start items-start gap-[8px] p-[16px] md:py-[48px] md:px-[96px]">
				<H1 className="text-[48px] leading-[46.08px] md:text-[64px] md:leading-[61.44px] text-agwhite">
					Antigravity isn&apos;t
					<br className="hidden md:block" /> available in your
					country.
				</H1>
				<P>
					Sorry! We are not available in USA, Virgin Islands, Puerto
					Rico and Guam right now.
					<br /> Should you be in an available country and still be
					running into issues, please follow this link to learn how to
					use a VPN to navigate.
				</P>
				<Link href="/" className="w-full">
					<Button
						innerText="How to use vpn"
						iconSrc={require("@/assets/icons/info.svg")}
						iconAlt="info icon"
						className="w-full md:w-fit"
					/>
				</Link>
			</div>

			<Image
				src={require("@/assets/geoblocked.png")}
				alt="404 background"
				height={1080}
				width={1920}
				layout="fixed"
				className="absolute top-0 left-0 -z-[2] w-[110vw] h-screen object-[50%_50%] object-none md:object-cover"
			/>

			<div className="absolute inset-0 bg-gradient-to-b from-[#000] via-[#00000000] to-[#000] -z-[1] opacity-70"></div>
		</div>
	);
}
