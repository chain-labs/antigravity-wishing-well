"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Homepage = dynamic(() => import("./HomePage"), {
	ssr: false,
	loading: () => <>{console.log("loading homepage")}</>,
});

const LoadingPage = dynamic(() => import("./LoadingPage"), {
	ssr: false,
	loading: () => <>{console.log("loading loading page")}</>,
});

export default function Home() {
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		if (window !== undefined) {
			window.addEventListener("load", () => {
				console.log("window loaded page");
				setLoading(false);
			});
		}
	}, []);
	return (
		<div className="z-[0]">
			<div className="z-[100]">
				<LoadingPage contentLoaded={!loading} />
			</div>
			<Homepage />
		</div>
	);
}
