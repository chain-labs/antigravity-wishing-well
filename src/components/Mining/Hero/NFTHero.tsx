import { IMAGEKIT_ICONS, IMAGEKIT_LOGOS } from "@/assets/imageKit";
import Button from "@/components/Button";
import H1 from "@/components/HTML/H1";
import P from "@/components/HTML/P";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

export default function NFTHero({
    NFTHover,
    setNFTHover,
  }: {
    NFTHover: boolean;
    setNFTHover: Dispatch<SetStateAction<boolean>>;
  }) {
    return (
      <>
        <div className="md:absolute top-0 left-0 md:translate-x-[calc(-100%-48px)] flex flex-col justify-start items-start gap-[16px] md:max-w-[220px] p-[16px] md:p-0 z-10">
          <H1 className="text-agwhite text-[56px] leading-[53.76px] md:text-[64px] md:leading-[64px]">
            Mining
          </H1>
          <P>
            Everyone is going to say you got lucky!
            <br />
            <br />
            Start mining with the recommended tokens and get Points and $DARKX
            tokens.
          </P>
          <div className="flex justify-center items-center gap-[16px] z-50">
            <div className="hidden md:block">
              <Image
                onMouseEnter={() => setNFTHover(true)}
                src={IMAGEKIT_LOGOS.WISHWELL_LOGO}
                height={80}
                width={80}
                alt="wishwell logo hidden md:block"
              />
            </div>
            <div className="flex justify-center items-center gap-[16px] md:hidden">
              <Image
                src={IMAGEKIT_LOGOS.WISHWELL_LOGO}
                height={80}
                width={80}
                alt="wishwell logo"
              />
              <Button
                onClick={() => setNFTHover(true)}
                innerText="View Your NFT"
                iconSrc={IMAGEKIT_ICONS.ROCKET}
                iconAlt="rocket"
                className="bg-[#030404A8] md:hidden"
                variants={{
                  hover: {
                    animationName: "rocketLaunch",
                    animationDuration: "0.5s",
                    animationFillMode: "forwards",
                    animationTimingFunction: "linear",
                  },
                  rest: {
                    animationName: "rocketLaunchRest",
                    animationDuration: "0.5s",
                    animationFillMode: "forwards",
                    animationTimingFunction: "linear",
                  },
                }}
              />
            </div>
          </div>
        </div>
      </>
    );
  }