import Link from "next/link";
import H1 from "../HTML/H1";
import P from "../HTML/P";
import { IMAGEKIT_ICONS, IMAGEKIT_IMAGES } from "@/assets/imageKit";
import Image from "next/image";

export default function RankupAndRewardsInfo() {
	return (
		<div className="relative flex flex-col justify-end items-end p-[64px] pt-[84px] overflow-hidden">
			<div className="flex flex-col gap-[16px] max-w-[600px]">
				<H1>
					What about Ranks,
					<br />
					Ranking Up & Rewards?
				</H1>

				<P>
					Earning points in each era gives you a rank inside the
					Collective. The more points you accrue, the higher you rank.
					Higher ranks give you access to real world rewards, merch,
					and swag.
					<br />
					<br />
					Higher ranks also give you access to exclusive online
					rewards.
				</P>
			</div>
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
