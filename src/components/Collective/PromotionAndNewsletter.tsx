import { IMAGEKIT_ICONS, IMAGEKIT_IMAGES } from "@/assets/imageKit";
import Button from "../Button";
import H1 from "../HTML/H1";
import P from "../HTML/P";
import Image from "next/image";
import { useState } from "react";

export default function PromotionAndNewsletter() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	return (
		<div
			className="flex flex-col justify-center items-center gap-[48px] w-fit p-[32px] m-[16px] mb-[100px] rounded-[12px] relative bg-agblack border-1 border-transparent bg-clip-padding
                    before:content-[''] before:absolute before:inset-0 before:z-[-10] before:bg-gradient-to-bl before:from-[#5537A5] before:to-[#BF6841] before:rounded-[inherit] before:overflow-hidden before:m-[-1px]
                    after:content-[''] after:absolute after:inset-0 after:z-[-2] after:bg-agblack after:rounded-[inherit] after:overflow-hidden"
		>
			<div className="flex justify-between items-center gap-[16px]">
				<div className="flex flex-col gap-[16px]">
					<H1 className="agwhite">Check Out Our Book!</H1>
					<P>
						Dive into the story and the lore behind Antigravity. Our
						books often have hidden easter eggs for our hardcore
						community members.
					</P>
					<Button
						innerText="Get Book"
						iconSrc={IMAGEKIT_ICONS.CLAIM}
						iconAlt="Get Book"
					/>
				</div>
				<Image
					src={IMAGEKIT_IMAGES.COLLECTIVE_HERO_BG}
					alt="Book"
					width={523.81}
					height={275}
					className="h-[275px] rounded-[12px]"
				/>
			</div>
			<div className="flex gap-[32px] w-full rounded-[12px] p-[32px] bg-[#3C00DC80]">
				<div className="flex flex-col text-nowrap">
					<H1 className="text-agwhite">Ignite Your Boosters.</H1>
					<P>Get all Antigravity updates in your inbox.</P>
				</div>
				<form className="flex flex-col gap-[16px] w-full" action="">
					<div className="flex gap-[16px]">
						<input
							type="text"
							name="name"
							id="name"
							placeholder="Your Name"
							className="text-agblack p-3 rounded-[8px] w-full font-sans font-semibold text-lg"
							required
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<input
							type="email"
							name="email"
							id="email"
							placeholder="your@email.com"
							className="text-agblack p-3 rounded-[8px] w-full font-sans font-semibold text-lg"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<Button
						innerText="Submit"
						iconSrc={IMAGEKIT_ICONS.SEND}
						iconAlt="send"
						type="submit"
					/>
				</form>
			</div>
		</div>
	);
}
