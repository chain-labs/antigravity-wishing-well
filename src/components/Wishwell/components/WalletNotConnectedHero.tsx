"use client";
import H1 from "@/components/HTML/H1";
import P from "@/components/HTML/P";
import { RegisterButton } from "@/components/Home/components/header/RegisterButton";
import Button from "@/components/Button";
import Image from "next/image";
import { Dispatch, useEffect, useRef, useState } from "react";
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
	const [openYoutubeModel, setOpenYoutubeModel] = useState(false);
	const youtubeModelRef = useRef<HTMLDivElement>(null);
	const youtubeModelContainerRef = useRef<HTMLDivElement>(null);
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

	useEffect(() => {
		if (openYoutubeModel) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}

		document.addEventListener("click", (e) => {
			if (!openYoutubeModel) return;
			console.log('click event listener');
			setOpenYoutubeModel(false);
		});

		return () => {
			document.removeEventListener("click", () => {});
		};
	}, [openYoutubeModel]);

	return (
		<div className="relative w-screen h-screen">
			<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#000000c0] to-[#00000000] overflow-hidden">
				<div className="absolute bottom-0 left-0 flex flex-col gap-[16px] p-[16px] md:py-[48px] md:px-[96px] z-0">
					<div className="flex flex-col">
						<H1 className="text-[56px] leading-[53.76px] md:text-[64px] md:leading-[64px] font-black text-agwhite">
							Make A Wish
						</H1>
						<P>
							Get points + the WishWell NFT in your wallet.
							<br />
							Earn more points while the bonus is still in play!
						</P>
					</div>
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
							onClick={() => setOpenYoutubeModel(true)}
						/>
					</div>
				</div>

				{openYoutubeModel && (
					<div
						ref={youtubeModelContainerRef}
						className="absolute inset-0 bg-[#030404A8] flex justify-center items-center"
					>
						<div ref={youtubeModelRef}>
							<iframe
								width="560"
								height="315"
								src="https://www.youtube.com/embed/OV24J11ByTk?si=AlVV13C9_Jn5VcON"
								title="YouTube video player"
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								referrerPolicy="strict-origin-when-cross-origin"
								allowFullScreen
							></iframe>
						</div>
					</div>
				)}

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
