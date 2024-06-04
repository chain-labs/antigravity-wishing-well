"use client";

import React from "react";
import Header from "../home/Header";
import dynamic from "next/dynamic";

const CanvasRendering = dynamic(() => import("./CanvasRendering"), {
	ssr: false,
});

export default function Model() {
	return (
		<div className="bg-black min-h-[100vh]">
			<div className="flex flex-col min-h-screen min-w-screen overflow-hidden">
				<div className="relative z-0 flex flex-col min-h-screen">
					<div className="fixed top-0 w-full z-50 items-center pt-12 px-4">
						<Header />
					</div>
					<div className="w-full h-[100vh] -z-10">
						<CanvasRendering />
					</div>
				</div>
			</div>
		</div>
	);
}
