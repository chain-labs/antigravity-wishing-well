import H1 from "@/components/HTML/H1";
import H2 from "@/components/HTML/H2";
import P from "@/components/HTML/P";
import Button from "@/components/Button";
import Image from "next/image";
import { IMAGEKIT_ICONS, IMAGEKIT_IMAGES } from "@/assets/imageKit";
import MiningCalculator from "./MiningCalculator";
import CountdownTimer from "../CountdownTimer";
import { miningNotif } from "@/hooks/frontend/toast";
import { useEffect } from "react";
import useTimer from "@/hooks/frontend/useTimer";

export default function NoNFTHero() {
	useEffect(() => {
		const interval = setInterval(() => {
			miningNotif("0x...5678 just mined 2,000 DarkX tokens!");
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	const timerState = useTimer();
	return (
		<div className="relative w-full min-h-screen overflow-hidden">
			<div className="bg-gradient-to-b from-[#000] h-fit to-[#0000] overflow-hidden">
				<div className="flex flex-col justify-center items-center w-full h-[130vh] md:h-screen md:pt-[80px]">
					<div className="relative flex flex-col justify-center items-center gap-[8px]">
						<div className="md:absolute top-0 left-0 md:translate-x-[calc(-100%-48px)] flex flex-col justify-start items-start gap-[16px] md:max-w-[220px] p-[16px] md:p-0">
							<H1 className="text-agwhite text-[56px] leading-[53.76px] md:text-[64px] md:leading-[64px]">
								Mining
							</H1>
							<P>
								Everyone is going to say you got lucky!
								<br />
								<br />
								Start mining with the recommended tokens and get
								Points and $DARKX tokens.
								<br />
								<br />
								Try the interactive demo! ➡️
							</P>
						</div>
						<MiningCalculator
							value={40000}
							conversionRateToUSD={0.245}
							era={2}
							phase={1}
							multiplyer={33}
							inputOptions={[
								{
									label: "ETH",
									value: 0.25,
									darkIcon: IMAGEKIT_ICONS.ETH_BLACK,
									lightIcon: IMAGEKIT_ICONS.ETH,
								},
								{
									label: "PLS",
									value: 0.345,
									darkIcon: IMAGEKIT_ICONS.PLS_BLACK,
									lightIcon: IMAGEKIT_ICONS.PLS,
								},
								{
									label: "USDT",
									value: 0.4,
									darkIcon: IMAGEKIT_ICONS.USDT_BLACK,
									lightIcon: IMAGEKIT_ICONS.USDT,
								},
								{
									label: "USDC",
									value: 0.6,
									darkIcon: IMAGEKIT_ICONS.USDC_BLACK,
									lightIcon: IMAGEKIT_ICONS.USDC,
								},
							]}
						/>
						<Button
							innerText="Mine Now"
							iconSrc={IMAGEKIT_ICONS.HAMMER}
							iconAlt="hammer"
						/>

						<div className="p-[8px] rounded-[6px] bg-[#030404A8]">
							<CountdownTimer state={timerState} fontDesktopSize={56} />
						</div>
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
