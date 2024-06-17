import Image from "next/image";
import H1 from "@/components/HTML/H1";
import P from "@/components/HTML/P";
import Button from "@/components/Button";
import Link from "next/link";

export default function NotFound() {
	return (
		<div
			className={`fixed left-0 h-screen w-screen overflow-hidden bg-gradient-to-b from-[#030404] to-[#131A1A] z-[10000] `}
		>
			<div className="absolute top-0 left-0 flex justify-center items-center gap-[16px] px-[16px] py-[32px] md:py-[48px] md:px-[96px] w-full md:w-fit">
				<Image
					src={require("@/assets/logo.svg")}
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
					Oops!
					<br className="hidden md:block" /> Looks like you&apos;re
					lost in space.
				</H1>
				<P>
					Sorry! The page you were trying to access doesn&apos;t
					exist. Let&apos;s take you back home.
				</P>
				<Link href="/" className="w-full">
					<Button
						innerText="Go Home"
						iconSrc={require("@/assets/icons/rocket.svg")}
						iconAlt="rocket icon"
						className="w-full md:w-fit"
					/>
				</Link>
			</div>

			<Image
				src={require("@/assets/404-not-found.png")}
				alt="404 background"
				height={1080}
				width={1920}
				layout="fixed"
				className="absolute top-0 left-0 -z-[2] w-[110vw] h-screen object-[70%_50%] object-none md:object-cover"
			/>

			<div className="absolute inset-0 bg-gradient-to-b from-[#000] via-[#00000000] to-[#000] -z-[1] opacity-70"></div>
		</div>
	);
}
