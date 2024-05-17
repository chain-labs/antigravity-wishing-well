import React from "react";
import IMAGEKIT from "./images";
import Image from "next/image";

type Props = {};

const { HERO_LANDING } = IMAGEKIT;

const MobileView = (props: Props) => {
  return (
    <div
      className={`min-h-screen bg-cover bg-[70%] flex flex-col justify-center`}
      style={{ backgroundImage: `url(${HERO_LANDING})` }}
    >
      <div className="mx-4">
        <div className="flex items-center">
          <Image src={IMAGEKIT.HELMET} alt="icon" width="45" height="45" />
          <p className=" from-white to-gray-500 pl-2 font-sans font-extrabold text-2xl bg-gradient-to-b text-transparent bg-clip-text">
            ANTIGRAVITY
          </p>
        </div>
        <h1 className="font-sans font-black text-[64px] text-agwhite mt-8 leading-[64px]">
          Join Us On Desktop!
        </h1>
        <p className="text-agwhite font-general-sans text-xl font-regular mt-4">
          We currently don't support mobile. Check back in on desktop for the
          best experience.
        </p>
      </div>
    </div>
  );
};

export default MobileView;
