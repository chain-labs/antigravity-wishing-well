import Link from "next/link";
import H1 from "../HTML/H1";
import P from "../HTML/P";
import { IMAGEKIT_ICONS, IMAGEKIT_IMAGES } from "@/assets/imageKit";
import Image from "next/image";

export default function PointsAndMultiplierInfo() {
	return (
		<div className="relative flex flex-col p-[64px] gap-[16px] overflow-hidden">
			<P>(our intern forgot to add this)</P>
			<H1>How do Points & Multipliers Work?</H1>
			<P>Earn Points by participating in the 3 launch Eras:</P>
			<div className="flex gap-[8px]">
				<Link href="/wishwell">
					<div className="flex justify-center items-center gap-[8px] rounded-[6px] bg-gradient-to-b from-[#0A1133] to-[#142266] px-[16px] py-[8px]">
						<Image
							src={IMAGEKIT_ICONS.HAMMER}
							alt="Wishwell"
							width={24}
							height={24}
						/>
						<P className="text-[14px] leading-[20.3px]">Wishwell</P>
					</div>
				</Link>
				<Link href="/mining">
					<div className="flex justify-center items-center gap-[8px] rounded-[6px] bg-gradient-to-b from-[#0A1133] to-[#142266] px-[16px] py-[8px]">
						<Image
							src={IMAGEKIT_ICONS.HAMMER}
							alt="Wishwell"
							width={24}
							height={24}
						/>
						<P className="text-[14px] leading-[20.3px]">Mining</P>
					</div>
				</Link>
				<Link href="/minting">
					<div className="flex justify-center items-center gap-[8px] rounded-[6px] bg-gradient-to-b from-[#0A1133] to-[#142266] px-[16px] py-[8px]">
						<Image
							src={IMAGEKIT_ICONS.HAMMER}
							alt="Wishwell"
							width={24}
							height={24}
						/>
						<P className="text-[14px] leading-[20.3px]">Minting</P>
					</div>
				</Link>
			</div>
			<P>
				There are bonuses for each Era and Multipliers on top of the
				bonuses if you participate in more than 1 Era.
				<br />
				<br />
				The multipliers double if you participate in all 3 Eras.
			</P>
            <Image
                src={IMAGEKIT_IMAGES.MINING_BG}
                alt="Mining Background"
                width={1920}
                height={1080}
                className="absolute inset-0 object-cover z-[-1]"
            />
		</div>
	);
}
