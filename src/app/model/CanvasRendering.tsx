"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { Perf } from 'r3f-perf'

export default function CanvasRendering() {
	return (
		<Canvas
			unselectable="on"
			style={{
				touchAction: "none !important",
				userSelect: "none",
				pointerEvents: "none",
			}}
		>
			{/* <Perf /> */}
			<Experience />
		</Canvas>
	);
}
