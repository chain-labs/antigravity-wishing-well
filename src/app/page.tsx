"use client";

import { useAccount, useSwitchChain } from "wagmi";
// import HomeContainer from "./home/HomeContainer";
import "@rainbow-me/rainbowkit/styles.css";
import { useEffect, useState } from "react";
import { TEST_NETWORK } from "@/constants";
import { base, pulsechain, baseSepolia } from "viem/chains";
import dynamic from "next/dynamic";
import ReactLenis from "lenis/react";
import Lenis from "lenis";

const Homepage = dynamic(() => import("./HomePage"), {
	ssr: false,
	loading: () => <>{console.log("loading homepage")}</>,
});

const LoadingPage = dynamic(() => import("./LoadingPage"), {
	ssr: false,
	loading: () => <>{console.log("loading loading page")}</>,
});

export default function Home() {
	const account = useAccount();
	const switchChain = useSwitchChain();
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		if (window !== undefined) {
			window.addEventListener("load", () => {
				console.log("window loaded page");
				setLoading(false);
			});
		}
	}, []);

	useEffect(() => {
		if (account.chainId) {
			const chainId = account.chainId;

			if (TEST_NETWORK) {
				if (chainId !== baseSepolia.id && chainId !== pulsechain.id) {
					switchChain.switchChain({ chainId: pulsechain.id });
				}
			} else {
				if (chainId !== base.id && chainId !== pulsechain.id) {
					switchChain.switchChain({ chainId: pulsechain.id });
				}
			}
		}
	}, [account.chainId]);

	// useEffect(() => {
	// 	const lenis = new Lenis();

	// 	lenis.on("scroll", (e: any) => {
	// 		console.log(e);
	// 	});

	// 	// function raf(time: any) {
	// 	// 	lenis.raf(time);
	// 	// 	requestAnimationFrame(raf);
	// 	// }

	// 	// requestAnimationFrame(raf);
	// }, []);

	return (
		<main className="min-h-screen">
			<div className="z-[0]">
				<div className="z-[100]">
					<LoadingPage contentLoaded={!loading} />
				</div>
				<Homepage />
			</div>
		</main>
	);
}
