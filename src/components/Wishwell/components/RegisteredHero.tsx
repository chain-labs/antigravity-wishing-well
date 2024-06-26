import H1 from "@/components/HTML/H1";
import P from "@/components/HTML/P";
import Button from "@/components/Button";
import Image from "next/image";
import { IMAGEKIT_ICONS, IMAGEKIT_IMAGES, IMAGEKIT_LOGOS } from "@/assets/imageKit";
import { successToast } from "@/hooks/frontend/toast";

export default function RegisteredHero() {
	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
		successToast("Copied to clipboard!");
	};

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
							iconSrc={IMAGEKIT_ICONS.COPY}
							iconAlt="info icon"
							iconPosition="end"
							hallmarkIconSrc={IMAGEKIT_ICONS.ETH}
							onClick={() => copyToClipboard("Wishwell.eth")}
						/>
						<Button
							innerText="Wishwell.pls"
							iconSrc={IMAGEKIT_ICONS.COPY}
							iconAlt="info icon"
							iconPosition="end"
							hallmarkIconSrc={IMAGEKIT_ICONS.PLS}
							onClick={() => copyToClipboard("Wishwell.pls")}
						/>
					</div>

					<div className="flex flex-col py-[16px] md:py-[32px] gap-[8px]">
						<P>
							Here are some tokens that we encourage for
							contribution:
						</P>
						<div className="flex justify-start items-center gap-[16px]">
							<Image
								src={IMAGEKIT_ICONS.PLS}
								alt="pls"
								width={32}
								height={32}
							/>
							<Image
								src={IMAGEKIT_ICONS.ETH}
								alt="eth"
								width={32}
								height={32}
							/>
							<Image
								src={IMAGEKIT_ICONS.USDT}
								alt="usdt"
								width={32}
								height={32}
							/>
							<Image
								src={IMAGEKIT_ICONS.USDC}
								alt="usdc"
								width={32}
								height={32}
							/>
						</div>
					</div>
				</div>
				<Image
					src={IMAGEKIT_IMAGES.WISHWELL_BG}
					height={1080}
					width={1920}
					alt="background"
					layout="cover"
					objectFit="cover"
					className="absolute top-0 left-0 -z-[1] w-full h-[120vh] object-[70%_50%] object-none md:w-full md:h-[110vh] md:object-cover"
				/>
			</div>
		</div>
	);
}
