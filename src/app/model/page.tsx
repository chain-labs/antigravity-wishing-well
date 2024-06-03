"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Saturn } from "./Saturn";
import {
	Html,
	OrbitControls,
	ScrollControls,
	useProgress,
} from "@react-three/drei";
import {
	EffectComposer,
	Bloom,
	ToneMapping,
} from "@react-three/postprocessing";
import { useControls } from "leva";
import { motion } from "framer-motion-3d";
import Header from "../home/Header";

const Loader = () => {
	const { progress } = useProgress();
	return (
		<Html center>
			<div className="fixed top-0 left-0 w-full h-full bg-black flex items-center justify-center">
				<h1 className="text-white text-4xl">
					{progress.toFixed(1)}% Loading...
				</h1>
			</div>
		</Html>
	);
};

export default function Model() {
	return (
		<div className="bg-white min-h-[100vh]">
			<div className="flex flex-col min-h-screen min-w-screen overflow-hidden">
				<div className="relative z-0 flex flex-col min-h-screen">
					<div className="fixed top-0 w-full z-50 items-center pt-12 px-4">
						<Header />
					</div>
					{/* camera={{ fov: 45, zoom: 1.5, near: 1.3, far: 100 }} */}
					<div className="w-full h-[100vh] fixed top-0 left-0 bg-black -z-10">
						<Canvas
							camera={{ fov: 45, zoom: 1.5, near: 1.3, far: 100 }}
						>
							{/* <ambientLight intensity={1} /> */}
							<motion.directionalLight
								animate={{ x: 15 }}
								initial={{ x: 0 }}
								transition={{ duration: 2, ease: "linear" }}
								intensity={1}
							/>
							<motion.directionalLight
								animate={{ x: -15 }}
								initial={{ x: -1 }}
								transition={{ duration: 2, ease: "linear" }}
								intensity={1}
							/>

							<motion.directionalLight
								animate={{ y: -1 }}
								initial={{ y: -10 }}
								transition={{ duration: 2, ease: "linear" }}
								intensity={0.25}
							/>

							<motion.directionalLight
								animate={{ y: 1 }}
								initial={{ y: 10 }}
								transition={{ duration: 2, ease: "linear" }}
								intensity={0.25}
							/>

							<OrbitControls enableZoom={false} />
							<Suspense fallback={<Loader />}>
								<Saturn />
							</Suspense>
							<EffectComposer>
								<Bloom
									mipmapBlur
									luminanceThreshold={1}
									levels={15}
									intensity={180}
								/>
								<ToneMapping />
							</EffectComposer>
						</Canvas>
					</div>

                    <div className="w-full h-[100vh] z-0"> </div>
                    <div className="w-full h-[100vh] z-0"> </div>
                    <div className="w-full h-[100vh] z-0"> </div>

				</div>
			</div>
		</div>
	);
}
