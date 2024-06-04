import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { BufferGeometry } from "three";

const Star = ({
	color,
	position,
	zRange,
	depth,
	speed,
}: {
	color: string;
	position: { start: number[]; end: number[] };
	zRange: number;
	depth: number;
	speed: number;
}) => {
	const points = React.useMemo(() => {
		const start = new THREE.Vector3(
			position.start[0],
			position.start[1],
			position.start[2]
		);
		const end = new THREE.Vector3(
			position.end[0],
			position.end[1],
			position.end[2]
		);
		return [start, end];
	}, [position.start, position.end]);

	const lineGeometry = React.useMemo(() => {
		return new BufferGeometry().setFromPoints(points);
	}, [points]);

	return (
        // @ts-ignore
		<line geometry={lineGeometry}>
			<lineBasicMaterial
				color={color}
				linewidth={10}
				linecap={"round"}
				linejoin={"round"}
			/>
		</line>
	);
};

const getRandomPos = (xRange: number, yRange: number, zRange: number) => {
	return [
		Math.random() * xRange - xRange / 2,
		Math.random() * yRange - yRange / 2,
		Math.random() * zRange - zRange / 2,
	];
};

const getStarFieldProps = ({
	count,
	xRange,
	yRange,
	zRange,
}: {
	count: number;
	xRange: number;
	yRange: number;
	zRange: number;
}) => {
	const props = [];
	for (let i = 0; i < count; i++) {
		const initPos = getRandomPos(xRange, yRange, zRange);
		props.push({
			position: {
				start: initPos,
				end: initPos,
			},
			color: "#fff",
			scale: 0.01,
			speed: 1,
			depth: zRange,
		});
	}
	return props;
};

const StarField = ({
	count,
	xRange,
	yRange,
	zRange,
}: {
	count: number;
	xRange: number;
	yRange: number;
	zRange: number;
}) => {
	const [starProps, setStarProps] = useState(
		getStarFieldProps({ count, xRange, yRange, zRange })
	);

	useFrame((state, delta) => {
		setStarProps((prev) => {
			const newProps = prev.map((props) => {
				const { position, depth, speed } = props;
				const newEndZ =
					position.end[2] < depth / 2
						? position.end[2] + speed
						: position.end[2] - depth;
				const newStartZ =
					position.start[2] > newEndZ ? newEndZ : position.end[2];
				const newStart = [
					position.start[0],
					position.start[1],
					newStartZ,
				];
				const newEnd = [position.end[0], position.end[1], newEndZ];

				return {
					...props,
					position: {
						start: newStart,
						end: newEnd,
					},
				};
			});

			return newProps;
		});
	});

	//update the position of the stars every frame
	return starProps.map(({ position, ...props }, i) => (
		<Star key={i} position={position} zRange={zRange} {...props} />
	));
};

export default function StarFieldCanvas(){
	return (
		<div
			id="canvas-container"
			style={{ width: "100%", height: "100vh", backgroundColor: "#000" }}
            className="w-full h-[100vh] 10 fixed top-0 left-0 -z-[1]"
		>
			<Canvas>
				<PerspectiveCamera />
				<OrbitControls position={[0, 100, -100]} />
				<StarField count={100} xRange={100} yRange={100} zRange={500} />
			</Canvas>
		</div>
	);
};
