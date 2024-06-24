"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Home/components/header/Header";
import Footer from "@/components/Home/sections/Footer";
import Newsletter from "@/components/Home/sections/Newsletter";
import RegisteredHero from "@/components/Wishwell/components/RegisteredHero";
import Image from "next/image";
import StarFieldCanvas from "@/components/Home/components/background/Starfeild";
import CanvasRendering from "@/components/Home/components/saturn/CanvasRendering";
import Leaderboard from "@/components/Home/sections/Leaderboard";
import { IMAGEKIT_IMAGES } from "@/assets/imageKit";

export default function Registered() {
	const [smallerViewPort, setSmallerViewPort] = useState<boolean>(false);

	useEffect(() => {
		if (window === undefined) return;

		window.addEventListener("resize", () => {
			if (window.innerWidth < 1200) {
				console.log("smaller view port detected");
				setSmallerViewPort(true);
			} else {
				console.log("larger view port detected");
				setSmallerViewPort(false);
			}
		});

		window.innerWidth < 1200 && setSmallerViewPort(true);

		return () => {
			window.removeEventListener("resize", () => {});
		};
	}, []);
	return (
		<div className="bg-agblack min-h-[100vh]">
			<div className="flex flex-col min-h-screen min-w-screen overflow-hidden">
				<div className="relative z-0 flex flex-col min-h-screen">
					<div className="fixed top-0 w-full z-50 items-center pt-[16px] md:pt-12 px-4">
						<Header />
					</div>
					<div className="z-100">
						<RegisteredHero />
						<Leaderboard accountIsConnected />
						<Newsletter />
						<Footer />
					</div>
					<div className="w-full h-[100vh] 10 fixed top-0 left-0 -z-[2]">
						{smallerViewPort ? (
							<Image
								src={IMAGEKIT_IMAGES.MOBILE_SATURN}
								alt="Mobile Saturn"
								width={1920}
								height={1080}
								className="fixed top-0 left-0 md:hidden w-[150vw] h-fit -translate-y-1/2 mix-blend-lighten z-0 scale-[1.25] pointer-events-none select-none"
							/>
						) : (
							<CanvasRendering />
						)}

						<StarFieldCanvas
							count={50}
							xRange={100}
							yRange={100}
							zRange={100}
							speed={0.1}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
