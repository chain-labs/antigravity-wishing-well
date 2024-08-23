"use client";

import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Saturn } from "./Saturn";
import { scroll } from "framer-motion";
import { useFrame } from "@react-three/fiber";

const LINE_NB_POINTS = 4000;
const SMALLER_VIEWPORT = 768;

export default function Experience() {
  const curve = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0), //homepage
      new THREE.Vector3(-4, -4, -2), //leaderboard
      new THREE.Vector3(-4, -3, -5), //testimonials
      new THREE.Vector3(0, -3, -5), //nft receipt
      new THREE.Vector3(-5, -3, 0), //eras
      new THREE.Vector3(-5, -4, 0), //countdown
      new THREE.Vector3(-5, -4, 0), //newsletter
    ]);
    curve.curveType = "catmullrom";
    curve.closed = false;
    return curve;
  }, []);

  const linePoints = useMemo(() => curve.getPoints(LINE_NB_POINTS), [curve]);

  const cameraGroup = useRef<any>();
  const saturn = useRef<any>();

  const [progress, setProgress] = useState(0);
  const [smallerViewPort, setSmallerViewPort] = useState(false);

  scroll((progress) => setProgress(smallerViewPort ? 0 : progress));

  useEffect(() => {
    if (window === undefined) return;

    window.addEventListener("resize", () => {
      if (window.innerWidth < SMALLER_VIEWPORT) {
        setSmallerViewPort(true);
        setProgress(0);
      } else {
        setSmallerViewPort(false);
      }
    });

    window.innerWidth < SMALLER_VIEWPORT && setSmallerViewPort(true);

    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);

  useFrame((_state, delta) => {
    if (smallerViewPort) return;

    const scrollOffset = Number(progress.toFixed(2));
    const curIndex = Math.min(
      Math.round(scrollOffset * linePoints?.length),
      linePoints.length - 1,
    );
    const curPoint = linePoints[curIndex];
    const pointAhead =
      linePoints[Math.min(curIndex + 1, linePoints?.length - 1)];
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
      ),
    );

    // saturn.current.rotation.setFromQuaternion(targetQuaternion);
    // cameraGroup.current.position.lerp(curPoint, delta * 0.5);
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
          // zoom={3}
          // near={1.3}
          // far={100}
        />

        {/* <Line points={linePoints} color="white" /> */}
        <group ref={saturn}>
          <Suspense fallback={<></>}>
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
          position={[3.74, 6.56, -10]}
          args={[undefined, 119.72, 0]}
          color={"#ffdfc2"}
          visible={true}
          distance={-0.04}
        />
        <pointLight
          position={[-7.64, -1.38, -8.5]}
          args={[undefined, 96.82]}
          visible={true}
          color={"#ffdac2"}
        />

        <hemisphereLight
          position={[-1.8, -0.72, 8.54]}
          args={[undefined, undefined, 0]}
          visible={true}
          color={"#3d2f1f"}
          intensity={1.4}
        />
        {/* <EffectComposer>
					<Bloom
						luminanceThreshold={0.5}
						luminanceSmoothing={0.28}
						height={400}
						mipmapBlur={false}
						radius={1.2}
						opacity={1}
						levels={1.02}
					/>
				</EffectComposer> */}
      </group>
    </>
  );
}
