import { IMAGEKIT_ICONS, IMAGEKIT_IMAGES } from "@/assets/imageKit";
import Image from "next/image";
import H1 from "../HTML/H1";
import P from "../HTML/P";
import Button from "../Button";

export default function Event() {
	return (
		<div className="h-screen w-full flex justify-center items-center">
			<div className="relative flex w-screen max-w-[992px] h-full max-h-[522.62px]  p-[16px]">
				<div className="flex justify-between items-end gap-[8px] overflow-hidden h-full w-full rounded-[12px] bg-gradient-to-t from-[#000000BF] to-[#00000000] hidden">
					<div className="flex flex-col gap-[8px]">
						<H1>Event Title Goes Here.</H1>
						<div className="flex justify-center items-center gap-[8px] w-fit">
							<Image
								src={IMAGEKIT_ICONS.CLAIM}
								alt="Calendar Icon"
								width={24}
								height={24}
								className="object-cover"
							/>
							<P>July 28th, 2024</P>
						</div>
						<P>
							Event description should go here. It should be
							fairly descriptive, but not too long.
						</P>
					</div>
					<Button
						innerText="Register For Event"
						iconSrc={IMAGEKIT_ICONS.ROCKET}
						iconAlt="Rocket Icon"
					/>
					<Image
						src={IMAGEKIT_IMAGES.COLLECTIVE_EVENT}
						alt="Collective Event"
						width={992}
						height={522.62}
						className="absolute inset-0 -z-[1] object-cover rounded-[12px]"
					/>
				</div>

				<Image
					src={IMAGEKIT_IMAGES.COLLECTIVE_EVENT}
					alt="Collective Event"
					width={992}
					height={522.62}
					className="absolute inset-0 -z-[2] scale-[2] object-cover blur-lg"
				/>
			</div>
		</div>
	);
}
