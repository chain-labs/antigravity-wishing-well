"use client";

import React from "react";
import dynamic from "next/dynamic";
import ReactLenis from "@studio-freight/react-lenis";
import Spinner from "./components/Spinner";

const CanvasRendering = dynamic(() => import("./CanvasRendering"), {
	ssr: false,
});

const Header = dynamic(() => import("../home/Header"), {
	ssr: false,
});

export default function Model() {
	return (
		// <ReactLenis
		// 	root
		// 	options={{ lerp: 0.1, duration: 0.5,  }}
		// >
			<div className="bg-black min-h-[100vh]">
				<div className="flex flex-col min-h-screen min-w-screen overflow-hidden">
					<div className="relative z-0 flex flex-col min-h-screen">
						<div className="fixed top-0 w-full z-50 items-center pt-12 px-4">
							<Header />
						</div>
						<div className="w-full h-[100vh] 10 fixed top-0 left-0">
							{/* <CanvasRendering /> */}
						</div>
							<Spinner />
						{/* <div className="w-full h-[300vh] bg-gradient-to-b from-[#0b0b0b] to-black">
						</div> */}
					</div>
				</div>
			</div>
		// </ReactLenis>
	);
}
