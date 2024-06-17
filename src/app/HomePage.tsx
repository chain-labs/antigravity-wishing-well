"use client";

import React, { Suspense, useEffect, useLayoutEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ReactLenis, useLenis } from "lenis/react";
import Hero from "./sections/Hero";
import Header from "./components/header/Header";
import CanvasRendering from "./components/saturn/CanvasRendering";
import StarFieldCanvas from "./components/background/Starfeild";
import Countdown from "./sections/Countdown";
import Newsletter from "./sections/Newsletter";
import Footer from "./sections/Footer";
import Testimonials from "./sections/Testimonials";
import Eras from "./sections/Eras";
import Leaderboard from "./sections/Leaderboard";
import NFTReceipt from "./sections/NFTReceipt";
import { useAccount } from "wagmi";
import Image from "next/image";
import useWishwellContract from "@/abi/wishwell";

// const Hero = dynamic(() => import("./sections/Hero"), {
// 	ssr: false,
// 	loading: () => <>{console.log("loading hero")}</>,
// });

export default function HomePage() {
	const account = useAccount();
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
					<div className="fixed top-0 w-full z-50 items-center pt-12 px-4">
						<Header />
					</div>
					<div className="z-100">
						<Hero />
						<Leaderboard accountIsConnected={account.isConnected} />
						<Testimonials />
						<NFTReceipt />
						<Eras />
						<Countdown />
						<Newsletter />
						<Footer />
					</div>
					<div className="w-full h-[100vh] 10 fixed top-0 left-0 -z-[1]">
						{smallerViewPort ? (
							<Image
								src={require("@/app/assets/mobile-saturn.png")}
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
