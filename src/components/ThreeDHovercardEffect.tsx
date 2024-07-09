"use client";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef } from "react";

export default function ThreeDHovercardEffect({
  children,
  ROTATION_RANGE = 15,
}: {
  children: React.ReactNode;
  ROTATION_RANGE?: number;
}) {
  const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;
  const ref = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return [0, 0];

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const centerX = width / 2;
    const centerY = height / 2;

    // make mousex and mousey to range from -1 to 1
    const mouseX =
      ((e.clientX - rect.left - centerX) / centerX) * ROTATION_RANGE;
    const mouseY =
      ((e.clientY - rect.top - centerY) / centerY) * ROTATION_RANGE;

    const rX = mouseY;
    const rY = mouseX * -1;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
        transformOrigin: "center",
      }}
    >
      {children}
    </motion.div>
  );
}
