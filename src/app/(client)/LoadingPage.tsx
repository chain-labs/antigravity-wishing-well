"use client";

import { IMAGEKIT_LOGOS } from "@/assets/imageKit";
import useLoading from "@/hooks/frontend/useLoading";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function LoadingPage({
  contentLoaded,
}: {
  contentLoaded: boolean;
}) {
  const [progress, setProgress] = useState(0);
  const [slideUpProgress, setSlideUpProgress] = useState(0);
  const { setLoadingComplete, loading, strictNoLoading } = useLoading();

  useEffect(() => {
    if (contentLoaded || !loading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 100) {
            return prev + 1;
          }
          return prev;
        });
      }, 10);
      return () => clearInterval(interval);
    } else {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 95) {
            return prev + 1;
          }
          return prev;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [contentLoaded, loading]);

  useEffect(() => {
    if (slideUpProgress > 150) return;
    if (progress === 95) {
    }
    if (progress === 100) {
      const interval = setInterval(() => {
        setSlideUpProgress((prev) => {
          if (prev > 150) return prev;
          if (prev < 100) {
            return prev + 1;
          }
          setLoadingComplete(true);
          return prev + 100;
        });
      }, 1);
      return () => {
        clearInterval(interval);
      };
    }
  }, [progress, contentLoaded]);

  return (
    <div
      style={{
        top: `-${slideUpProgress}%`,
      }}
      className={`fixed left-0 h-screen w-screen overflow-hidden bg-gradient-to-b from-[#030404] to-[#131A1A] z-[10000]`}
    >
      <div className="absolute top-0 left-[50%] md:top-[50%] md:left-0 translate-x-[-50%] md:translate-y-[-50%] md:translate-x-0 flex gap-4 justify-center items-center mx-auto my-16 md:mx-32">
        <Image
          src={IMAGEKIT_LOGOS.LOGO}
          alt="logo"
          width={100}
          height={100}
          className="w-[80px] h-[80px] md:w-[100px] md:h-[100px]"
        />
        <div className="uppercase text-4xl md:text-6xl text-center from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text">
          Antigravity
        </div>
      </div>

      <div
        style={{
          height: `calc(${progress}%)`,
        }}
        className="absolute bottom-0 left-0 w-screen bg-gradient-to-b from-[#142266] to-[#0A1133] md:z-[-1]"
      ></div>

      <div
        style={{
          top: `calc(100% - ${progress}% - ${(100 - progress) * 0.08}rem - ${(100 - progress) * 0.16}px)`,
        }}
        className="absolute right-0 p-4 uppercase text-[8rem] text-center from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text"
      >
        {progress}%
      </div>
    </div>
  );
}
