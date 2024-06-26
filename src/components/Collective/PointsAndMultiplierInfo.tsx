import Link from "next/link";
import H1 from "../HTML/H1";
import P from "../HTML/P";
import { IMAGEKIT_ICONS, IMAGEKIT_IMAGES } from "@/assets/imageKit";
import Image from "next/image";

export default function PointsAndMultiplierInfo() {
	return (
		<div className="relative h-fit w-full flex flex-col p-[16px] lg:p-[64px] gap-[16px] overflow-hidden z-0">
			<P>(our intern forgot to add this)</P>
			<H1>How do Points & Multipliers Work?</H1>
			<P>Earn Points by participating in the 3 launch Eras:</P>
			<div className="flex gap-[8px]">
				<Link href="/wishwell">
					<div
						className={`relative flex justify-center items-center gap-[8px] rounded-[6px] bg-gradient-to-b from-[#0A1133] to-[#142266] px-[16px] py-[8px] border-1 border-transparent bg-clip-padding z-0
							before:content-[''] before:absolute before:inset-0 before:z-[-10] before:bg-gradient-to-b before:from-[#B4EBF8] before:to-[#789DFA] before:rounded-[inherit] before:overflow-hidden before:m-[-1px]
                    		after:content-[''] after:absolute after:inset-0 after:z-[-2]  after:bg-gradient-to-b after:from-[#0A1133] after:to-[#142266] after:rounded-[inherit] after:overflow-hidden`}
					>
						<Image
							src={IMAGEKIT_ICONS.HALF_CIRCLE_FILL}
							alt="Wishwell"
							width={24}
							height={24}
						/>
						<P className="text-[14px] leading-[20.3px]">Wishwell</P>
					</div>
				</Link>
				<Link href="/mining">
					<div
						className={`relative flex justify-center items-center gap-[8px] rounded-[6px] bg-gradient-to-b from-[#0A1133] to-[#142266] px-[16px] py-[8px] border-1 border-transparent bg-clip-padding z-0
							before:content-[''] before:absolute before:inset-0 before:z-[-10] before:bg-gradient-to-b before:from-[#B4EBF8] before:to-[#789DFA] before:rounded-[inherit] before:overflow-hidden before:m-[-1px]
                    		after:content-[''] after:absolute after:inset-0 after:z-[-2]  after:bg-gradient-to-b after:from-[#0A1133] after:to-[#142266] after:rounded-[inherit] after:overflow-hidden`}
					>
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
					<div
						className={`relative flex justify-center items-center gap-[8px] rounded-[6px] bg-gradient-to-b from-[#0A1133] to-[#142266] px-[16px] py-[8px] border-1 border-transparent bg-clip-padding z-0
							before:content-[''] before:absolute before:inset-0 before:z-[-10] before:bg-gradient-to-b before:from-[#B4EBF8] before:to-[#789DFA] before:rounded-[inherit] before:overflow-hidden before:m-[-1px]
                    		after:content-[''] after:absolute after:inset-0 after:z-[-2]  after:bg-gradient-to-b after:from-[#0A1133] after:to-[#142266] after:rounded-[inherit] after:overflow-hidden`}
					>
						<Image
							src={IMAGEKIT_ICONS.CUBE}
							alt="Wishwell"
							width={24}
							height={24}
						/>
						<P className="text-[14px] leading-[20.3px]">Minting</P>
					</div>
				</Link>
			</div>
			<P className="max-w-[600px]">
				There are bonuses for each Era and Multipliers on top of the
				bonuses if you participate in more than 1 Era.
				<br />
				<br />
				The multipliers double if you participate in all 3 Eras.
			</P>
			<div className="hidden xl:block absolute left-0 top-0 w-[70%] h-[100%] [clip-path:polygon(0%_0%,100%_0%,75%_100%,0%_100%)] z-[-1] bg-agblack opacity-50"></div>
			<div className="block xl:hidden absolute h-full w-full inset-0 bg-gradient-to-b from-[#000] to-[#00000000] z-[-1]"></div>
			<Image
				src={IMAGEKIT_IMAGES.COLLECTIVE_POINTS_AND_MULTIPLIER_INFO_BG}
				alt="Points and multiplier Background"
				width={1920}
				height={1080}
				className="absolute inset-0 w-full  h-full md:h-[700px] z-[-2] md:translate-y-[-18%] object-none md:object-fill object[10%_30%]"
			/>
		</div>
	);
}
