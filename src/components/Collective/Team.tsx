import { IMAGEKIT_ICONS, IMAGEKIT_IMAGES } from "@/assets/imageKit";
import H1 from "../HTML/H1";
import Image from "next/image";
import Link from "next/link";

export default function Team() {
	return (
		<div className="flex flex-col justify-center items-center gap-[48px] max-w-[1000px] mx-auto  p-[16px] my-[75px]">
			<H1 className="text-agwhite" center>
				We&apos;re an amazing team of 3. Here&apos;s some more copy
				about us that will amaze you.
			</H1>
			<div className="flex justify-center flex-wrap items-center gap-[32px] md:gap-[48px]">
				<div className="flex flex-col justify-center items-center gap-[16px]">
					<div
						className="relative w-[145px] h-[145px] bg-agblack rounded-[8px] border-4 border-transparent bg-clip-padding z-0
                    before:content-[''] before:absolute before:inset-0 before:z-[-10] before:bg-gradient-to-bl before:from-[#3C00DC] before:to-[#FF5001] before:rounded-[inherit] before:overflow-hidden before:m-[-4px]
                    after:content-[''] after:absolute after:inset-0 after:z-[-2] after:bg-agblack after:rounded-[inherit] after:overflow-hidden"
					>
						<Image
							src={IMAGEKIT_IMAGES.MAX}
							alt="Collective Event"
							width={145}
							height={145}
							className="object-cover h-full w-full rounded-[4px]"
						/>
					</div>

					<p className="text-agwhite font-sans font-extrabold text-[20px] leading-[19.2px]">
						@PulseRayVision
					</p>
					<div
						className="flex justify-center items-center gap-[16px] w-fit px-[16px] py-[8px] rounded-[8px] relative bg-gradient-to-b from-[#030404BF] to-[#131A1ABF] border-1 border-transparent bg-clip-padding z-0
                    before:content-[''] before:absolute before:inset-0 before:z-[-10] before:bg-gradient-to-bl before:from-[#3C00DC] before:to-[#FF5001] before:rounded-[inherit] before:overflow-hidden before:m-[-1px]
                    after:content-[''] after:absolute after:inset-0 after:z-[-2] after:bg-agblack after:rounded-[inherit] after:overflow-hidden"
					>
						<Link href="/telegram">
							<Image
								src={IMAGEKIT_ICONS.TELEGRAM}
								alt="Claim Icon"
								width={24}
								height={24}
							/>
						</Link>
						<Link href="/telegram">
							<Image
								src={IMAGEKIT_ICONS.TWITTER}
								alt="Claim Icon"
								width={24}
								height={24}
							/>
						</Link>
						<Link href="/telegram">
							<Image
								src={IMAGEKIT_ICONS.YOUTUBE}
								alt="Claim Icon"
								width={24}
								height={24}
							/>
						</Link>
					</div>
				</div>
				<div className="flex flex-col justify-center items-center gap-[16px]">
					<div
						className="relative w-[145px] h-[145px] bg-agblack rounded-[8px] border-4 border-transparent bg-clip-padding z-0
                    before:content-[''] before:absolute before:inset-0 before:z-[-10] before:bg-gradient-to-bl before:from-[#3C00DC] before:to-[#FF5001] before:rounded-[inherit] before:overflow-hidden before:m-[-4px]
                    after:content-[''] after:absolute after:inset-0 after:z-[-2] after:bg-agblack after:rounded-[inherit] after:overflow-hidden"
					>
						<Image
							src={IMAGEKIT_IMAGES.DON}
							alt="Collective Event"
							width={145}
							height={145}
							className="object-cover h-full w-full rounded-[4px]"
						/>
					</div>

					<p className="text-agwhite font-sans font-extrabold text-[20px] leading-[19.2px]">
						@Don
					</p>
					<div
						className="flex justify-center items-center gap-[16px] w-fit px-[16px] py-[8px] rounded-[8px] relative bg-gradient-to-b from-[#030404BF] to-[#131A1ABF] border-1 border-transparent bg-clip-padding z-0
                    before:content-[''] before:absolute before:inset-0 before:z-[-10] before:bg-gradient-to-bl before:from-[#3C00DC] before:to-[#FF5001] before:rounded-[inherit] before:overflow-hidden before:m-[-1px]
                    after:content-[''] after:absolute after:inset-0 after:z-[-2] after:bg-agblack after:rounded-[inherit] after:overflow-hidden"
					>
						<Link href="/telegram">
							<Image
								src={IMAGEKIT_ICONS.TELEGRAM}
								alt="Claim Icon"
								width={24}
								height={24}
							/>
						</Link>
						<Link href="/telegram">
							<Image
								src={IMAGEKIT_ICONS.TWITTER}
								alt="Claim Icon"
								width={24}
								height={24}
							/>
						</Link>
						<Link href="/telegram">
							<Image
								src={IMAGEKIT_ICONS.YOUTUBE}
								alt="Claim Icon"
								width={24}
								height={24}
							/>
						</Link>
					</div>
				</div>
				<div className="flex flex-col justify-center items-center gap-[16px]">
					<div
						className="relative w-[145px] h-[145px] bg-agblack rounded-[8px] border-4 border-transparent bg-clip-padding z-0
                    before:content-[''] before:absolute before:inset-0 before:z-[-10] before:bg-gradient-to-bl before:from-[#3C00DC] before:to-[#FF5001] before:rounded-[inherit] before:overflow-hidden before:m-[-4px]
                    after:content-[''] after:absolute after:inset-0 after:z-[-2] after:bg-agblack after:rounded-[inherit] after:overflow-hidden"
					>
						<Image
							src={IMAGEKIT_IMAGES.CODY}
							alt="Collective Event"
							width={145}
							height={145}
							className="object-cover h-full w-full rounded-[4px]"
						/>
					</div>

					<p className="text-agwhite font-sans font-extrabold text-[20px] leading-[19.2px]">
						Cody Smith
					</p>
					<div
						className="flex justify-center items-center gap-[16px] w-fit px-[16px] py-[8px] rounded-[8px] relative bg-gradient-to-b from-[#030404BF] to-[#131A1ABF] border-1 border-transparent bg-clip-padding z-0
                    before:content-[''] before:absolute before:inset-0 before:z-[-10] before:bg-gradient-to-bl before:from-[#3C00DC] before:to-[#FF5001] before:rounded-[inherit] before:overflow-hidden before:m-[-1px]
                    after:content-[''] after:absolute after:inset-0 after:z-[-2] after:bg-agblack after:rounded-[inherit] after:overflow-hidden"
					>
						<Link href="/telegram">
							<Image
								src={IMAGEKIT_ICONS.TIKTOK}
								alt="Claim Icon"
								width={24}
								height={24}
							/>
						</Link>
						<Link href="/telegram">
							<Image
								src={IMAGEKIT_ICONS.INSTAGRAM}
								alt="Claim Icon"
								width={24}
								height={24}
							/>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
