import { IMAGEKIT_ICONS } from "@/assets/imageKit";
import Button from "../Button";
import H1 from "../HTML/H1";

export default function Youtube() {
	return (
		<div className="flex flex-col md:flex-row justify-end items-end gap-[16px] mx-auto max-w-[992px] my-[150px] p-[16px]">
			<div className="flex flex-col gap-[16px]">
				<H1>
					{" "}
					PulseRayVision Kicking Off {" "}
					<br className="hidden md:block" />
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
						className="rounded-[12px] w-full md:w-[662px] h-[370px] z-[1]"
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
			<div
				className={`relative w-full md:w-fit flex flex-col bg-gradient-to-b from-[#0A1133] to-[#142266] py-[32px] px-[16px] gap-[24px] rounded-[12px] border-1 border-transparent bg-clip-padding z-0
							before:content-[''] before:absolute before:inset-0 before:z-[-10] before:bg-gradient-to-b before:from-[#B4EBF8] before:to-[#789DFA] before:rounded-[inherit] before:overflow-hidden before:m-[-1px]
                    		after:content-[''] after:absolute after:inset-0 after:z-[-2]  after:bg-gradient-to-b after:from-[#0A1133] after:to-[#142266] after:rounded-[inherit] after:overflow-hidden`}
			>
				<H1 className="md:text-[40px] md:leading-[40px]">
					Join us on <br /> our journey.
				</H1>
				<div className="flex flex-col gap-[16px]">
					<Button
						innerText="Read DarkPaper"
						iconSrc={IMAGEKIT_ICONS.DOCUMENT}
						iconAlt="Dark Paper"
					/>
					<div className="flex gap-[8px]">
						<Button
							innerText="Telegram"
							iconSrc={IMAGEKIT_ICONS.TELEGRAM}
							iconAlt="Telegram"
							secondary
							className="bg-transparent border-[#FEFFFF40] shadow-[0_4px_0px_#FEFFFF40] px-[10px] py-[6px]"
						/>
						<Button
							innerText="Discord"
							iconSrc={IMAGEKIT_ICONS.DISCORD}
							iconAlt="Discord"
							secondary
							className="bg-transparent border-[#FEFFFF40] shadow-[0_4px_0px_#FEFFFF40] px-[10px] py-[6px]"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
