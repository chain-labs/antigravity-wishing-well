"use client";

import { useAccount, useSwitchChain } from "wagmi";
import "@rainbow-me/rainbowkit/styles.css";
import { useEffect, useState } from "react";
import { TEST_NETWORK } from "@/constants";
import { base, pulsechain, baseSepolia } from "viem/chains";
import dynamic from "next/dynamic";
import ReactLenis from "lenis/react";
import Lenis from "lenis";

const MiningPage = dynamic(() => import("./MiningPage"), {
	ssr: false,
	loading: () => <>{console.log("loading homepage")}</>,
});

const LoadingPage = dynamic(() => import("../LoadingPage"), {
	ssr: false,
	loading: () => <>{console.log("loading loading page")}</>,
});

export default function Mining() {
	const account = useAccount();
	const switchChain = useSwitchChain();
	const [loading, setLoading] = useState(true);
	const [state, setState] = useState<"No NFT" | "NFT Present" | "Claiming">(
		"No NFT"
	);
	useEffect(() => {
		if (window !== undefined) {
			window.addEventListener("load", () => {
				console.log("window loaded page");
				setLoading(false);
			});
		}
	}, []);

	return (
		<main className="min-h-screen">
			<div className="z-[0]">
				<div className="z-[100]">
					<LoadingPage contentLoaded={!loading} />
				</div>
				<MiningPage />
			</div>
		</main>
	);
}
