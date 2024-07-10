"use client";

import Image from "next/image";
import H1 from "@/components/HTML/H1";
import P from "@/components/HTML/P";
import Button from "@/components/Button";
import {
  IMAGEKIT_ICONS,
  IMAGEKIT_IMAGES,
  IMAGEKIT_LOGOS,
} from "@/assets/imageKit";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";

export default function GeoBlocked() {
  const [openYoutubeModel, setOpenYoutubeModel] = useState(false);
  const youtubeModelRef = useRef<HTMLDivElement>(null);
  const youtubeModelContainerRef = useRef<HTMLDivElement>(null);

  function openYoutubeModelHandler() {
    setOpenYoutubeModel(true);
    document.body.style.overflow = "hidden";
  }

  function closeYoutubeModelHandler() {
    setOpenYoutubeModel(false);
    document.body.style.overflow = "auto";
  }

  return (
    <div
      className={`fixed left-0 h-screen w-screen overflow-hidden bg-gradient-to-b from-[#030404] to-[#131A1A] z-[10000] `}
    >
      <div className="absolute top-0 left-0 flex justify-center items-center gap-[16px] px-[16px] py-[32px] md:py-[48px] md:px-[96px] w-full md:w-fit">
        <Image
          src={IMAGEKIT_LOGOS.LOGO}
          alt="logo"
          width={45.19}
          height={45.19}
          className="w-[53.51px] h-[53.51px] md:w-[45.19px] md:h-[45.19px]"
        />
        <H1 className="uppercase text-[24px] leading-[24px] md:text-[19px]">
          Antigravity
        </H1>
      </div>

      <div className="absolute bottom-0 left-0 flex flex-col justify-start items-start gap-[8px] p-[16px] md:py-[48px] md:px-[96px]">
        <H1 className="text-[48px] leading-[46.08px] md:text-[64px] md:leading-[61.44px] text-agwhite">
          Antigravity isn&apos;t
          <br className="hidden md:block" /> available in your country.
        </H1>
        <P>
          Sorry! We are not available in USA, Virgin Islands, Puerto Rico and
          Guam right now.
          <br /> Should you be in an available country and still be running into
          issues, please follow this link to learn how to use a VPN to navigate.
        </P>
        <Button
          innerText="How to use vpn"
          iconSrc={IMAGEKIT_ICONS.INFO}
          iconAlt="info icon"
          className="w-full md:w-fit"
          variants={{
            hover: {
              animationName: "wiggle",
              animationDuration: "1s",
              animationFillMode: "forwards",
              animationTimingFunction: "linear",
            },
          }}
          onClick={openYoutubeModelHandler}
        />
      </div>

      <Image
        src={IMAGEKIT_IMAGES.GEOBLOCKED}
        alt="blocked background"
        height={1080}
        width={1920}
        layout="fixed"
        className="absolute top-0 left-0 -z-[2] w-[110vw] h-screen object-[50%_50%] object-none md:object-cover"
      />

      <AnimatePresence>
        {openYoutubeModel && (
          <motion.div
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            ref={youtubeModelContainerRef}
            className="fixed inset-0 bg-[#030404A8] flex justify-center items-center p-[16px] w-full h-full z-30 backdrop-blur-sm"
          >
            <motion.div
              exit={{ y: "100vh" }}
              animate={{ y: 0 }}
              initial={{ y: "100vh" }}
              transition={{ duration: 0.5, type: "spring" }}
              ref={youtubeModelRef}
              className="w-full h-full flex justify-center items-center"
            >
              <div
                className="absolute inset-0 h-full w-full z-[-1]"
                onMouseDown={closeYoutubeModelHandler}
              ></div>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/pCkOdfJUQE8?si=7KwrF4rfQpKgdFQt"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                className="rounded-[12px] w-full h-fit aspect-video max-w-[800px] mx-auto"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-[#000] via-[#00000000] to-[#000] -z-[1] opacity-70"></div>
    </div>
  );
}
