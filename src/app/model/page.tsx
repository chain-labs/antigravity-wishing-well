"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { Saturn } from "./Saturn";
import { OrbitControls, ScrollControls } from "@react-three/drei";
import {
	EffectComposer,
	Bloom,
	ToneMapping,
} from "@react-three/postprocessing";
import { useControls } from 'leva';

export default function Model() {
	const { levels, intensity } = useControls({
		intensity: { value: 0.4, min: 0, max: 15, step: 0.01 },
		levels: { value: 8, min: 1, max: 19, step: 1 },
	});
	return (
		<div className="bg-white min-h-[100vh]">
			<h1>Model</h1>
			{/* camera={{ fov: 45, zoom: 1.5, near: 1.3, far: 100 }} */}
			<div className="w-full h-[100vh] fixed top-0 left-0 bg-black">
				<Canvas
                    camera={{ fov: 45, zoom: 1.5, near: 1.3, far: 100 }}
                >
					<ambientLight intensity={1} />
					<OrbitControls enableZoom={false} />
					<ScrollControls pages={3} damping={0.25}>
						<Saturn />
					</ScrollControls>
                    <EffectComposer>
						<Bloom
							mipmapBlur
							luminanceThreshold={1}
							levels={levels}
							intensity={intensity * 4}
						/>
						{/* <ToneMapping /> */}
					</EffectComposer>
				</Canvas>
			</div>
		</div>
	);
}
