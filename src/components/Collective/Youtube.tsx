import { IMAGEKIT_ICONS } from "@/assets/imageKit";
import Button from "../Button";
import H1 from "../HTML/H1";
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { client } from "../../../sanity/lib/client";
import { twMerge } from "tailwind-merge";

export default function Youtube() {
  const [metadata, setMetadata] = useState<{
    video_title: string;
    video_url: string;
  }>();

  const [externalLinks, setExternalLinks] = useState<{
    twitter: string;
    discord: string;
    telegram: string;
    darkpaper: string;
  }>();

  useEffect(() => {
    client
      .fetch(
        `*[_type=="external_links"][0]{
          twitter, discord, telegram, darkpaper
        }`,
      )
      .then((externalLinks) => {
        setExternalLinks(externalLinks);
      });
  }, []);

  useEffect(() => {
    client
      .fetch(
        `*[_type=="collective"][0]{
		  video_title, video_url
		}`,
      )
      .then((metadata) => {
        setMetadata(metadata);
      });
  }, []);
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const gap = useTransform(scrollYProgress, [0, 0.5], ["100px", "16px"]);

  return (
    <motion.div
      style={
        {
          "--gap": gap,
        } as any
      }
      ref={targetRef}
      className={`flex flex-col lg:flex-row justify-end items-end gap-[--gap] mx-auto max-w-[992px] mb-[50px] p-[16px]`}
    >
      <div className="flex flex-col gap-[16px] mx-auto">
        <H1>
          {metadata?.video_title}
          {/* {" "}
          PulseRayVision Kicking Off <br className="hidden md:block" />
          Era 2 of Antigravity */}
        </H1>
        <div className="relative">
          <iframe
            width="662"
            height="370"
            src={metadata?.video_url}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="rounded-[12px] w-full md:w-[662px] h-auto md:h-[370px] z-[1] aspect-video"
          ></iframe>
          <iframe
            width="662"
            height="370"
            src={metadata?.video_url}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute top-0 left-0 rounded-[12px] scale-[1.1] blur-xl w-full md:w-[662px] h-auto md:h-[370px] -z-[1] aspect-video"
          ></iframe>
        </div>
      </div>
      <div
        className={`relative w-full lg:w-fit flex flex-col bg-gradient-to-b from-[#0A1133] to-[#142266] py-[32px] px-[16px] gap-[24px] rounded-[12px] border-1 border-transparent bg-clip-padding z-0
							before:content-[''] before:absolute before:inset-0 before:z-[-10] before:bg-gradient-to-b before:from-[#B4EBF8] before:to-[#789DFA] before:rounded-[inherit] before:overflow-hidden before:m-[-1px]
                    		after:content-[''] after:absolute after:inset-0 after:z-[-2]  after:bg-gradient-to-b after:from-[#0A1133] after:to-[#142266] after:rounded-[inherit] after:overflow-hidden`}
      >
        <H1 className="md:text-[40px] md:leading-[40px]">
          Join us on <br className="hidden lg:block" /> our journey.
        </H1>
        <div className="flex flex-col gap-[16px]">
          {externalLinks?.darkpaper ? (
            <a href={externalLinks?.darkpaper} target="_blank" rel="noreferrer">
              <Button
                innerText="Read DarkPaper"
                iconSrc={IMAGEKIT_ICONS.DOCUMENT}
                iconAlt="Dark Paper"
                className="w-full lg:w-fit"
                variants={{
                  hover: {
                    scale: 1.5,
                    rotate: -11,
                    transition: {
                      duration: 0.5,
                      type: "spring",
                    },
                  },
                }}
              />
            </a>
          ) : null}
          <div className={twMerge("flex flex-col gap-[16px]", !(!!externalLinks?.telegram === !!externalLinks?.discord) && "lg:flex-row gap-[8px]" )}>
            <div className="flex flex-wrap md:flex-nowrap gap-[8px] w-full">
              {externalLinks?.telegram ? (
                <a
                  href={externalLinks?.telegram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full lg:w-fit"
                >
                  <Button
                    variants={{
                      hover: {
                        animationName: "flyingPlane",
                        animationDuration: "0.5s",
                        animationFillMode: "forwards",
                        animationTimingFunction: "linear",
                        animationDelay: "0.25s",
                      },
                      rest: {
                        animationName: "restflyingPlane",
                      },
                    }}
                    innerText="Telegram"
                    iconSrc={IMAGEKIT_ICONS.TELEGRAM}
                    iconAlt="Telegram"
                    secondary
                    className="bg-transparent origin-center border-[#FEFFFF40] shadow-[0_4px_0px_#FEFFFF40_!important] hover:shadow-[0_0px_0px_#FEFFFF40_!important] px-[10px] py-[6px] w-full lg:w-fit"
                  />
                </a>
              ) : null}
              {externalLinks?.discord ? (
                <a
                  href={externalLinks?.discord}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full lg:w-fit"
                >
                  <Button
                    variants={{
                      hover: {
                        animationName: "wiggle",
                        animationDuration: "1s",
                        animationFillMode: "forwards",
                        animationTimingFunction: "linear",
                      },
                    }}
                    innerText="Discord"
                    iconSrc={IMAGEKIT_ICONS.DISCORD}
                    iconAlt="Discord"
                    secondary
                    className="bg-transparent origin-bottom border-[#FEFFFF40] shadow-[0_4px_0px_#FEFFFF40_!important] hover:shadow-[0_0px_0px_#FEFFFF40_!important] px-[10px] py-[6px] w-full lg:w-fit"
                  />
                </a>
              ) : null}
            </div>
            {externalLinks?.twitter ? (
              <a href={externalLinks?.twitter} target="_blank" rel="noreferrer">
                <Button
                  variants={{
                    hover: {
                      animationName: "wiggle",
                      animationDuration: "1s",
                      animationFillMode: "forwards",
                      animationTimingFunction: "linear",
                    },
                  }}
                  innerText="Twitter"
                  iconSrc={IMAGEKIT_ICONS.TWITTER}
                  iconAlt="Discord"
                  secondary
                  className="w-full bg-transparent origin-bottom border-[#FEFFFF40] shadow-[0_4px_0px_#FEFFFF40_!important] hover:shadow-[0_0px_0px_#FEFFFF40_!important] px-[10px] py-[6px]"
                />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
