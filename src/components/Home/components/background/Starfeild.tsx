"use client";
import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  InstancedBufferGeometry,
  InstancedMesh,
  MeshBasicMaterial,
} from "three";

// Function to get a random position within a range
const getRandomPos = (
  xRange: number,
  yRange: number,
  zRange: number,
): [number, number, number] => {
  return [
    Math.random() * xRange - xRange / 2,
    Math.random() * yRange - yRange / 2,
    Math.random() * zRange - zRange / 2,
  ];
};

// Star Field Props
interface StarFieldProps {
  count: number;
  xRange: number;
  yRange: number;
  zRange: number;
  speed: number;
}

// Star Field Component
const StarField: React.FC<StarFieldProps> = ({
  count,
  xRange,
  yRange,
  zRange,
  speed,
}) => {
  const meshRef = useRef<InstancedMesh>(null);
  const dummy = new THREE.Object3D();

  // Memoize the initial positions of the stars
  const initialPositions = React.useMemo<[number, number, number][]>(() => {
    const positions = [];
    for (let i = 0; i < count; i++) {
      positions.push(getRandomPos(xRange, yRange, zRange));
    }
    return positions;
  }, [count, xRange, yRange, zRange]);

  useFrame(() => {
    initialPositions.forEach((pos, i) => {
      // Move stars along the z-axis
      pos[2] += speed;
      if (pos[2] > zRange / 2) pos[2] -= zRange;

      // Update the dummy object position and apply to the instanced mesh
      dummy.position.set(pos[0], pos[1], pos[2]);
      dummy.updateMatrix();
      if (meshRef.current) {
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
    });

    // Update the instance matrix for the instanced mesh
    if (meshRef.current) {
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  // Create buffer geometry for instanced mesh
  const geometry = React.useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const instGeo = new InstancedBufferGeometry();
    instGeo.index = geo.index;
    instGeo.attributes.position = geo.attributes.position;
    return instGeo;
  }, []);

  // Create material for the stars
  const material = React.useMemo(
    () => new MeshBasicMaterial({ color: "#fff" }),
    [],
  );

  return (
    <instancedMesh ref={meshRef} args={[geometry, material, count]}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshBasicMaterial color="#fff" />
    </instancedMesh>
  );
};

// Canvas Component Props
interface StarFieldCanvasProps {
  count: number;
  xRange: number;
  yRange: number;
  zRange: number;
  speed: number;
}

// Canvas Component
const StarFieldCanvas: React.FC<StarFieldCanvasProps> = ({
  count,
  xRange,
  yRange,
  zRange,
  speed,
}) => {
  return (
    <div
      id="canvas-container"
      style={{ width: "100%", height: "100vh" }}
      className="w-full h-[100vh] fixed top-0 left-0 -z-[1]"
    >
      <Suspense fallback={null}>
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <StarField
            count={count}
            xRange={xRange}
            yRange={yRange}
            zRange={zRange}
            speed={speed}
          />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default StarFieldCanvas;
