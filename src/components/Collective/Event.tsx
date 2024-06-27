import { IMAGEKIT_ICONS, IMAGEKIT_IMAGES } from "@/assets/imageKit";
import Image from "next/image";
import H1 from "../HTML/H1";
import P from "../HTML/P";
import Button from "../Button";
import { motion } from "framer-motion";

export default function Event() {
	const ImageLink = IMAGEKIT_IMAGES.COLLECTIVE_EVENT;
	return (
		<div className=" my-[50px] md:my-0 h-fit w-full flex justify-center items-center">
			<div className="relative flex w-screen max-w-[992px] h-[523px] z-0">
				<div className="flex flex-col md:flex-row justify-end md:justify-between items-end gap-[8px] overflow-hidden h-full w-full md:rounded-[12px] bg-gradient-to-t from-[#000000BF] to-[#00000000] p-[16px]">
					<div className="flex flex-col gap-[8px]">
						<div className="overflow-hidden">
							<motion.div
								whileInView={{ y: 0 }}
								initial={{ y: "100%" }}
								transition={{
									duration: 0.5,
									type: "spring",
									bounce: 0.25,
								}}
							>
								<H1>Event Title Goes Here.</H1>
							</motion.div>
						</div>
						<div className="overflow-hidden">
							<motion.div
								whileInView={{ y: 0 }}
								initial={{ y: "100%" }}
								transition={{
									duration: 0.75,
									type: "spring",
									bounce: 0.25,
								}}
							>
								<div className="flex justify-center items-center gap-[8px] w-fit">
									<Image
										src={IMAGEKIT_ICONS.CALENDAR}
										alt="Calendar Icon"
										width={24}
										height={24}
										className="object-cover"
									/>
									<P>July 28th, 2024</P>
								</div>
							</motion.div>
						</div>
						<div className="overflow-hidden">
							<motion.div
								whileInView={{ y: 0 }}
								initial={{ y: "100%" }}
								transition={{
									duration: 1,
									type: "spring",
									bounce: 0.25,
								}}
							>
								<P>
									Event description should go here. It should
									be fairly descriptive, but not too long.
								</P>
							</motion.div>
						</div>
					</div>
					<Button
						innerText="Register For Event"
						iconSrc={IMAGEKIT_ICONS.ROCKET}
						iconAlt="Rocket Icon"
						className="w-full md:w-fit"
						initialIconMotionValues={{
							y: 0,
							scale: 1,
						}}
						whileHoverIconMotionValues={{
							y: "-1000%",
							scale: 1.1,
						}}
						transitionIconMotionValues={{
							duration: 0.25,
							type: "spring",
						}}
					/>
					<Image
						src={ImageLink}
						alt="Collective Event"
						width={992}
						height={522.62}
						className="absolute inset-0 -z-[1] h-full object-none md:object-cover md:rounded-[12px]"
					/>
				</div>

				<Image
					src={ImageLink}
					alt="Collective Event"
					width={992}
					height={522.62}
					className="absolute inset-0 -z-[2] scale-[1.15] object-cover blur-[50px]"
				/>
			</div>
		</div>
	);
}
