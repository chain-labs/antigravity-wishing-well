"use client";

import {
	Environment,
	Html,
	Line,
	OrbitControls,
	PerspectiveCamera,
	useProgress,
	useScroll,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { Saturn } from "./Saturn";

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

const LINE_NB_POINTS = 1200;

export default function Experience() {
	const curve = useMemo(() => {
		const curve = new THREE.CatmullRomCurve3([
			new THREE.Vector3(0, 0, 0),
			new THREE.Vector3(0, 2, 0),
			new THREE.Vector3(-5, 0, 0),
			new THREE.Vector3(5, -0.5, 0),
			new THREE.Vector3(-3, -2, 0),
		]);
		curve.curveType = "catmullrom";
		curve.closed = false;
		return curve;
	}, []);

	const linePoints = useMemo(() => curve.getPoints(LINE_NB_POINTS), [curve]);

	const cameraGroup = useRef<any>();
	const saturn = useRef<any>();

	const scroll = useScroll();

	useFrame((_state, delta) => {
		const scrollOffset = Number(scroll.offset.toFixed(2));
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
                angleRotation,
            )
		);

        saturn.current.rotation.setFromQuaternion(targetQuaternion);
        cameraGroup.current.rotation.setFromQuaternion(targetQuaternion);
		cameraGroup.current.position.lerp(curPoint, delta * 50);
	});
	return (
		<>
			<OrbitControls enableZoom={false} />

			<group ref={cameraGroup}>
				<PerspectiveCamera
					makeDefault
					position={[0, 0, 10]}
					fov={30}
					// zoom={1.5}
					// near={1.3}
					// far={100}
				/>
				<Environment preset="city" />

				<Line points={linePoints} color="white" />
				<group ref={saturn}>
					<Suspense fallback={<Loader />}>
						<Saturn sectionRefs={[]} scale={3} />
					</Suspense>
				</group>
			</group>
		</>
	);
}
