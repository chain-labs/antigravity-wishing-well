"use client";

import React from "react";
import dynamic from "next/dynamic";
import ReactLenis from "@studio-freight/react-lenis";
import Hero from "./sections/Hero";

const CanvasRendering = dynamic(() => import("./components/saturn/CanvasRendering"), {
	ssr: false,
});

const Header = dynamic(() => import("../home/Header"), {
	ssr: false,
});

const StarFieldCanvas = dynamic(() => import("./components/background/Starfeild"), {
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

					<div className="z-100">
						<Hero />
						<div className="flex flex-col justify-center items-center gap-8 w-full max-h-[100vh] py-[20vh]">
							<h1 className="text-5xl text-white">Leaderboard</h1>
							<div className="grid grid-cols-3 gap-2 h-[60vh] w-[80%]">
								<div className="w-full h-full bg-slate-500"></div>
								<div className="w-full h-full bg-slate-500"></div>
								<div className="w-full h-full bg-slate-500"></div>
								<div className="w-full h-full bg-slate-500"></div>
								<div className="w-full h-full bg-slate-500"></div>
								<div className="w-full h-full bg-slate-500"></div>
							</div>
						</div>

						<div className="flex flex-col justify-center items-center gap-8 w-full max-h-[100vh] py-[20vh]">
							<h1 className="text-5xl text-white">
								Here&apos;s what folks have to say!
							</h1>
							<div className="grid grid-cols-3 gap-2 h-[60vh] w-[80%]">
								<div className="w-full h-full bg-slate-500"></div>
								<div className="w-full h-full bg-slate-500"></div>
								<div className="w-full h-full bg-slate-500"></div>
								<div className="w-full h-full bg-slate-500"></div>
								<div className="w-full h-full bg-slate-500"></div>
								<div className="w-full h-full bg-slate-500"></div>
							</div>
						</div>

						<div className="flex flex-col justify-center items-center gap-8 w-full h-[100vh]"></div>

						<div className="flex flex-col justify-center items-center gap-8 w-full max-h-[100vh]  my-[40vh]">
							<h1 className="text-5xl text-white">
								Next Section
							</h1>
							<div className="grid grid-cols-3 gap-2 h-[60vh] w-[80%]">
								<div className="w-full h-full bg-slate-500"></div>
								<div className="w-full h-full bg-slate-500"></div>
								<div className="w-full h-full bg-slate-500"></div>
								<div className="w-full h-full bg-slate-500"></div>
								<div className="w-full h-full bg-slate-500"></div>
								<div className="w-full h-full bg-slate-500"></div>
							</div>
						</div>
					</div>

					<div className="w-full h-[100vh] 10 fixed top-0 left-0 -z-[1]">
						<CanvasRendering />
						<StarFieldCanvas
							count={100}
							xRange={100}
							yRange={100}
							zRange={100}
							speed={0.1}
						/>
					</div>
				</div>
			</div>
		</div>
		// </ReactLenis>
	);
}
