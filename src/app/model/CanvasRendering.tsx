"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import Experience from "./Experience";

export default function CanvasRendering() {
	return <Canvas>
		<ScrollControls pages={4} damping={0.3}>
			<Experience />
		</ScrollControls>
	</Canvas>;
}
