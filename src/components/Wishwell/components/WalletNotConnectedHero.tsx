"use client";
import H1 from "@/components/HTML/H1";
import P from "@/components/HTML/P";
import { RegisterButton } from "@/components/Home/components/header/RegisterButton";
import Button from "@/components/Button";
import Image from "next/image";
import { Dispatch } from "react";
import { PublicClient } from "viem";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { IMAGEKIT_ICONS, IMAGEKIT_IMAGES } from "@/assets/imageKit";

// Use a function to get the latest block number
async function getLatestBlockNumber(publicClient: PublicClient) {
	const block = await publicClient.getBlockNumber();
	return block;
}

export default function WalletNotConnectedHero({
	registrationKit,
}: {
	registrationKit: {
		loading: boolean;
		error: boolean;
		registerIdle: boolean;
		setError: Dispatch<React.SetStateAction<boolean>>;
		handleRegister: any;
		isRegistered: boolean;
	};
}) {
	const { openConnectModal } = useConnectModal();
	const handleLogin = (e: React.MouseEvent) => {
		e.preventDefault();
		if (openConnectModal) {
			openConnectModal();
		}
	};

	const {
		loading,
		error,
		setError,
		isRegistered,
		handleRegister,
		registerIdle,
	} = registrationKit;
	return (
		<div className="relative w-screen h-screen">
			<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#000000c0] to-[#00000000] overflow-hidden">
				<div className="absolute bottom-0 left-0 flex flex-col gap-[16px] p-[16px] md:py-[48px] md:px-[96px] z-0">
					<H1 className="text-[56px] leading-[53.76px] md:text-[64px] md:leading-[64px] font-black text-agwhite">
						Make A Wish
					</H1>
					<P>
						Get points + the WishWell NFT in your wallet.
						<br />
						Earn more points while the bonus is still in play!
					</P>
					<div className="flex flex-col md:flex-row justify-start items-start gap-[16px]">
						<RegisterButton
							loading={loading}
							error={error}
							setError={setError}
							handleRegister={handleRegister}
							isRegistered={isRegistered}
							registerIdle={registerIdle}
							handleLogin={handleLogin}
						/>
						<Button
							className="bg-[#030404A8] border-"
							innerText="How to Contribute?"
							iconSrc={IMAGEKIT_ICONS.INFO}
							iconAlt="info icon"
						/>
					</div>
				</div>
				<Image
					src={IMAGEKIT_IMAGES.WISHWELL_BG}
					alt="background"
					height={1080}
					width={1920}
					layout="fixed"
					className="absolute top-0 left-0 -z-[1] w-full h-[120vh] object-[70%_50%] object-none md:w-full md:h-[110vh] md:object-cover"
				/>
			</div>
		</div>
	);
}
