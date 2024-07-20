"use client";

import { IMAGEKIT_IMAGES } from "@/assets/imageKit";
import CanvasRendering from "@/components/Home/components/saturn/CanvasRendering";
import Image from "next/image";
import { useEffect, useState } from "react";

const SMALLER_VIEWPORT = 768;

export default function SaturnCanvasORImage() {
  const [smallerViewPort, setSmallerViewPort] = useState<boolean>(false);

  useEffect(() => {
    if (window === undefined) return;

    window.addEventListener("resize", () => {
      if (window.innerWidth < SMALLER_VIEWPORT) {
        setSmallerViewPort(true);
      } else {
        setSmallerViewPort(false);
      }
    });

    window.innerWidth < SMALLER_VIEWPORT && setSmallerViewPort(true);

    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);
  return (
    <>
      {smallerViewPort ? (
        <Image
          src={IMAGEKIT_IMAGES.MOBILE_SATURN}
          alt="Mobile Saturn"
          width={1920}
          height={1080}
          className="fixed top-0 left-0 w-[150vw] h-fit -translate-y-1/2 mix-blend-lighten z-0 scale-[1.25] pointer-events-none select-none"
        />
      ) : (
        <CanvasRendering />
      )}
    </>
  );
}
