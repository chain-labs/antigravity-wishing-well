import { IMAGEKIT_ICONS } from "@/assets/imageKit";
import Button from "../Button";
import H1 from "../HTML/H1";

export default function Youtube() {
	return (
		<div className="flex justify-end items-end gap-[16px] mx-auto max-w-[992px] my-[150px]">
			<div className="flex flex-col">
				<H1>
					{" "}
					PulseRayVision Kicking Off
					<br />
					Era 2 of Antigravity
				</H1>
				<div className="relative">
					<iframe
						width="662"
						height="370"
						src="https://www.youtube.com/embed/2EXntlJbmzw?si=xT5qv8SQDBVKGQ8q"
						title="YouTube video player"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerPolicy="strict-origin-when-cross-origin"
						allowFullScreen
						className="rounded-[12px]"
					></iframe>
					<iframe
						width="662"
						height="370"
						src="https://www.youtube.com/embed/2EXntlJbmzw?si=xT5qv8SQDBVKGQ8q"
						title="YouTube video player"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerPolicy="strict-origin-when-cross-origin"
						allowFullScreen
						className="absolute top-0 left-0 rounded-[12px] scale-[1.1] blur-xl -z-[1]"
					></iframe>
				</div>
			</div>
			<div className="flex flex-col bg-gradient-to-b from-[#0A1133] to-[#142266] py-[32px] px-[16px] gap-[24px] rounded-[12px]">
				<H1 className="md:text-[40px] md:leading-[40px]">
					Join us on <br /> our journey.
				</H1>
				<div className="flex flex-col gap-[16px]">
					<Button
						innerText="Read DarkPaper"
						iconSrc={IMAGEKIT_ICONS.COPY}
						iconAlt="Dark Paper"
					/>
					<div className="flex gap-[8px]">
						<Button
							innerText="Telegram"
							iconSrc={IMAGEKIT_ICONS.CLAIM}
							iconAlt="Telegram"
							secondary
							className="bg-transparent px-[10px] py-[6px] border-[#FEFFFF40] w-fit"
						/>
						<Button
							innerText="Discord"
							iconSrc={IMAGEKIT_ICONS.CLAIM}
							iconAlt="Discord"
							secondary
							className="bg-transparent px-[10px] py-[6px] border-[#FEFFFF40] shadow-[#FEFFFF40] w-fit"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
