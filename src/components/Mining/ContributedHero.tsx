import H1 from "@/components/HTML/H1";
import H2 from "@/components/HTML/H2";
import P from "@/components/HTML/P";
import Button from "@/components/Button";
import Image from "next/image";
import {
	IMAGEKIT_ICONS,
	IMAGEKIT_IMAGES,
	IMAGEKIT_LOGOS,
} from "@/assets/imageKit";
import MiningCalculator, {
	Card,
	pointsConverterToUSCommaseparated,
} from "./MiningCalculator";
import { useEffect } from "react";
import { miningNotif } from "@/hooks/frontend/toast";

export default function ContributedHero() {
	useEffect(() => {
		const interval = setInterval(() => {
			miningNotif("0x...5678 just mined 2,000 DarkX tokens!");
		}, 5000);

		return () => clearInterval(interval);
	}, []);
	return (
		<div className="relative w-full min-h-screen overflow-hidden">
			<div className="bg-gradient-to-b from-[#000] h-fit to-[#0000] overflow-hidden">
				<div className="flex flex-col justify-center items-center w-full h-[120vh] md:h-screen md:pt-[80px]">
					<div className="relative flex flex-col justify-center items-center gap-[24px]">
						<div className="flex flex-col justify-center items-center gap-[16px] p-[16px] md:p-0">
							<H1 className="text-agwhite text-[64px] leading-[64px] md:text-[64px] md:leading-[64px]">
								Claim $DARK
							</H1>
							<P>You can now get your $DARK tokens.</P>
						</div>
						<div className="relative flex flex-col gap-[8px] h-fit w-[400px]">
							<Card
								value={pointsConverterToUSCommaseparated(42000)}
								conversion={`$${pointsConverterToUSCommaseparated(0)}`}
								multiplyer={pointsConverterToUSCommaseparated(
									0
								)}
								pillIconAlt="points"
								pillIconSrc={IMAGEKIT_ICONS.PILL_POINTS}
								pillText="Points"
                                onlyValue
							/>
							<div
								style={{
									gap: "11px",
								}}
								className="flex justify-center items-center"
							>
								<div
									style={{
										width: "100%",
										height: "1px",
										backgroundColor: "#FF5001",
										borderRadius: "100px",
									}}
								></div>
								<div className="text-agwhite uppercase tracking-wider text-nowrap font-bold">
									So you get:
								</div>
								<div
									style={{
										width: "100%",
										height: "1px",
										backgroundColor: "#FF5001",
										borderRadius: "100px",
									}}
								></div>
							</div>
							<Card
								value={pointsConverterToUSCommaseparated(
									4200.41
								)}
								conversion={`$${pointsConverterToUSCommaseparated(0)}`}
								multiplyer={pointsConverterToUSCommaseparated(
									0
								)}
								pillIconAlt="dark x"
								pillIconSrc={IMAGEKIT_ICONS.PILL_DARK_X}
								pillText="DARK X"
                                onlyValue
							/>
						</div>
						<Button
							innerText="Claim Now"
							iconSrc={IMAGEKIT_ICONS.CLAIM}
							iconAlt="claim"
						/>
					</div>
				</div>
				<Image
					src={IMAGEKIT_IMAGES.MINING_BG}
					height={1080}
					width={1920}
					alt="background"
					layout="cover"
					objectFit="cover"
					className="absolute top-0 left-0 -z-[1] w-full h-[120%] object-[15%_50%] object-none md:w-full md:h-[110%] md:object-cover"
				/>
			</div>
		</div>
	);
}
