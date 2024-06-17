import H1 from "@/components/Home/components/HTML/H1";
import P from "@/components/Home/components/HTML/P";
import Button from "@/components/Button";
import Image from "next/image";

export default function RegisteredHero() {
	return (
		<div className="relative w-screen h-screen">
			<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#000] to-[#00000000] overflow-hidden">
				<div className="absolute bottom-0 left-0 flex flex-col gap-[16px] p-[16px] md:py-[48px] md:px-[96px] z-0">
					<div className="flex-col md:gap-[16px]">
						<H1 className="text-[56px] leading-[53.76px] md:text-[64px] md:leading-[64px] font-black text-agwhite">
							Contribute to WishWell!
						</H1>
						<P>
							Contribute now on Ethereum or PulseChain to either
							of our addresses below.
						</P>
					</div>
					<div className="flex flex-col md:flex-row justify-start items-start gap-[16px]">
						<Button
							innerText="Wishwell.eth"
							iconSrc={require("@/assets/icons/copy.svg")}
							iconAlt="info icon"
							iconPosition="end"
						/>
						<Button
							innerText="Wishwell.pls"
							iconSrc={require("@/assets/icons/copy.svg")}
							iconAlt="info icon"
							iconPosition="end"
						/>
					</div>

					<div className="flex flex-col py-[16px] md:py-[32px] gap-[8px]">
						<P>
							Here are some tokens that we encourage for
							contribution:
						</P>
						<div className="flex justify-start items-center gap-[16px]">
							<Image
								src={require("@/assets/icons/pls.svg")}
								alt="pls"
								width={32}
								height={32}
							/>
							<Image
								src={require("@/assets/icons/eth.svg")}
								alt="eth"
								width={32}
								height={32}
							/>
							<Image
								src={require("@/assets/icons/usdt.svg")}
								alt="usdt"
								width={32}
								height={32}
							/>
							<Image
								src={require("@/assets/icons/usdc.svg")}
								alt="usdc"
								width={32}
								height={32}
							/>
						</div>
					</div>
				</div>
				<Image
					src={require("@/assets/wishwell-background.png")}
					alt="background"
					layout="cover"
					objectFit="cover"
					className="absolute top-0 left-0 -z-[1] w-full h-[120vh] object-[70%_50%] object-none md:w-full md:h-[110vh] md:object-cover"
				/>
			</div>
		</div>
	);
}
