"use client";

import { IMAGEKIT_IMAGES } from "@/assets/imageKit";
import Image from "next/image";

export default function AnimatedNebulaBG() {
  return (
    <Image
      src={IMAGEKIT_IMAGES.NEBULA_BG}
      alt="nebula"
      height={1080}
      width={1920}
      className="absolute inset-0 top-0 left-0 w-[200vw] h-[200vh] object-cover z-[-1] mix-blend-multiply opacity-30"
    />
  );
}
