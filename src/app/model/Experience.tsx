"use client";

import {
	Environment,
	Html,
	Line,
	OrbitControls,
	PerspectiveCamera,
	Sphere,
	useProgress,
} from "@react-three/drei";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Saturn } from "./Saturn";
import { scroll } from "framer-motion";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Gradient, LayerMaterial } from "lamina";
import { useFrame } from "@react-three/fiber";

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

const LINE_NB_POINTS = 4000;

export default function Experience() {
	const curve = useMemo(() => {
		const curve = new THREE.CatmullRomCurve3([
			new THREE.Vector3(0, 0, 0),
			new THREE.Vector3(0, -5, 0),
			new THREE.Vector3(-5, -2, -2),
			new THREE.Vector3(0, -5, -5),
			new THREE.Vector3(-10, -3, 2),
			new THREE.Vector3(-5, -4, 0),
		]);
		curve.curveType = "catmullrom";
		curve.closed = false;
		return curve;
	}, []);

	const linePoints = useMemo(() => curve.getPoints(LINE_NB_POINTS), [curve]);

	const cameraGroup = useRef<any>();
	const saturn = useRef<any>();

	const [progress, setProgress] = useState(0);

	scroll((progress) => setProgress(progress));

	useFrame((_state, delta) => {
		const scrollOffset = Number(progress.toFixed(2));
		const curIndex = Math.min(
			Math.round(scrollOffset * linePoints.length),
			linePoints.length - 1
		);
		const curPoint = linePoints[curIndex];
		const pointAhead =
			linePoints[Math.min(curIndex + 1, linePoints.length - 1)];
		const xDisplacement = (pointAhead.x - curPoint.x) * 80;
		// MATH.PI / 2 -> left
		// -MATH.PI / 2 -> right

		const angleRotation =
			(xDisplacement < 0 ? -1 : 1) *
			Math.min(Math.abs(xDisplacement), Math.PI / 6);

		const targetQuaternion = new THREE.Quaternion().setFromEuler(
			new THREE.Euler(
				saturn.current.rotation.x,
				saturn.current.rotation.y,
				angleRotation
			)
		);

		// saturn.current.rotation.setFromQuaternion(targetQuaternion);
		// cameraGroup.current.rotation.setFromQuaternion(targetQuaternion, delta * 0.5);
		saturn.current.position.lerp(curPoint, delta);
	});
	return (
		<>
			<OrbitControls enableZoom={false} enabled={false} />

			<group ref={cameraGroup}>
				<PerspectiveCamera
					makeDefault
					position={[-11, -1.22, -4.58]}
					fov={30}
					// zoom={1.5}
					// near={1.3}
					// far={100}
				/>
				<Environment
					preset={"night"}
					backgroundIntensity={0}
					environmentIntensity={0}
				/>

				{/* <Line points={linePoints} color="white" /> */}
				<group ref={saturn}>
					<Suspense fallback={<Loader />}>
						{/* <Sphere scale={[100, 100, 100]}>
							<LayerMaterial
								lighting="physical"
								transmission={1}
								side={THREE.BackSide}
							>
								<Gradient
									colorA={"#000000"}
									colorB={"#0b0b0b"}
								/>
							</LayerMaterial>
						</Sphere> */}
						<Saturn sectionRefs={[]} scale={3} />
					</Suspense>
				</group>

				<pointLight
					position={[3.74,6.56,-10]}
					args={[undefined, 208.18, 0]}
					color={"#ffdfc2"}
					receiveShadow={false}
					castShadow={true}
					visible={true}
					distance={-0.04}
				/>
				<pointLight
					position={[-7.64, -1.38, -8.5]}
					args={[undefined,23.6]}
					castShadow={true}
					visible={true}
					color={"#ffdac2"}
				/>

				<hemisphereLight
					position={[-1.8, -0.72, 8.54]}
					args={[undefined,undefined,0]}
					castShadow={true}
					receiveShadow={false}
					visible={true}
					color={"#fec686"} intensity={0}
				/>
				<EffectComposer>
					<Bloom
						luminanceThreshold={0}
						luminanceSmoothing={0.28}
						height={400}
						mipmapBlur={false}
						radius={1.2}
						opacity={1}
						intensity={2.22}
						levels={7.02}
						resolutionScale={6.28}
					/>
				</EffectComposer>
			</group>
		</>
	);
}
