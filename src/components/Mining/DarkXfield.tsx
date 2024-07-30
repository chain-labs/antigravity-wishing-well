import React, { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { InstancedMesh, MeshBasicMaterial } from "three";
import { Perf } from "r3f-perf";

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
interface DarkXProps {
  count: number;
  xRange: number;
  yRange: number;
  zRange: number;
  speed: number;
  texture: THREE.Texture;
}

// Star Field Component
const DarkXField: React.FC<DarkXProps> = ({
  count,
  xRange,
  yRange,
  zRange,
  speed,
  texture,
}) => {
  const meshRef = useRef<InstancedMesh>(null);
  const dummy = new THREE.Object3D();

  // Memoize the initial positions of the stars
  const initialPositions = useMemo<[number, number, number][]>(() => {
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

  // Create material for the stars with the texture
  const material = useMemo(
    () => new MeshBasicMaterial({ map: texture, transparent: true }),
    [texture]
  );

  return (
    <instancedMesh ref={meshRef} args={[new THREE.BufferGeometry(), material, count]}>
      <circleGeometry args={[1.25, 32]} />
    </instancedMesh>
  );
};

// Canvas Component Props
interface DarkXCanvasProps {
  count: number;
  xRange: number;
  yRange: number;
  zRange: number;
  speed: number;
  icon: string;
}

// Canvas Component
const DarkXFieldCanvas: React.FC<DarkXCanvasProps> = ({
  count,
  xRange,
  yRange,
  zRange,
  speed,
  icon
}) => {
  // Load the star texture
  const texture = useMemo(() => new THREE.TextureLoader().load(icon), [icon]);

  return (
    <div
      id="canvas-container"
      style={{ width: "100%", height: "100vh" }}
      className="w-full h-[100vh] fixed top-0 left-0 z-[-1]"
    >
      <Suspense fallback={null}>
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <DarkXField
            count={count}
            xRange={xRange}
            yRange={yRange}
            zRange={zRange}
            speed={speed}
            texture={texture}
          />
          {/* <Perf /> */}
        </Canvas>
      </Suspense>
    </div>
  );
};

export default DarkXFieldCanvas;
