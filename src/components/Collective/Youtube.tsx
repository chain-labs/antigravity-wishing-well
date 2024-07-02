import { IMAGEKIT_ICONS } from "@/assets/imageKit";
import Button from "../Button";
import H1 from "../HTML/H1";
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { client } from "../../../sanity/lib/client";

export default function Youtube() {
  const [metadata, setMetadata] = useState<{
    video_title: string;
    video_url: string;
  }>();

  useEffect(() => {
    client
      .fetch(
        `*[_type=="collective"][0]{
		  video_title, video_url
		}`
      )
      .then((metadata) => {
        console.log({ metadata });
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
      className={`flex flex-col md:flex-row justify-end items-end gap-[--gap] mx-auto max-w-[992px] mb-[50px] p-[16px]`}
    >
      <div className="flex flex-col gap-[16px]">
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
        className={`relative w-full md:w-fit flex flex-col bg-gradient-to-b from-[#0A1133] to-[#142266] py-[32px] px-[16px] gap-[24px] rounded-[12px] border-1 border-transparent bg-clip-padding z-0
							before:content-[''] before:absolute before:inset-0 before:z-[-10] before:bg-gradient-to-b before:from-[#B4EBF8] before:to-[#789DFA] before:rounded-[inherit] before:overflow-hidden before:m-[-1px]
                    		after:content-[''] after:absolute after:inset-0 after:z-[-2]  after:bg-gradient-to-b after:from-[#0A1133] after:to-[#142266] after:rounded-[inherit] after:overflow-hidden`}
      >
        <H1 className="md:text-[40px] md:leading-[40px]">
          Join us on <br className="hidden md:block" /> our journey.
        </H1>
        <div className="flex flex-col gap-[16px]">
          <Button
            innerText="Read DarkPaper"
            iconSrc={IMAGEKIT_ICONS.DOCUMENT}
            iconAlt="Dark Paper"
            className="w-full md:w-fit"
            initialIconMotionValues={{
              rotate: 0,
              scale: 1,
            }}
            whileHoverIconMotionValues={{
              rotate: -15,
              scale: 1.1,
            }}
            transitionIconMotionValues={{
              duration: 0.25,
              type: "spring",
            }}
          />
          <div className="flex gap-[8px]">
            <Button
              innerText="Telegram"
              iconSrc={IMAGEKIT_ICONS.TELEGRAM}
              iconAlt="Telegram"
              secondary
              className="bg-transparent origin-center border-[#FEFFFF40] shadow-[0_4px_0px_#FEFFFF40_!important] hover:shadow-[0_0px_0px_#FEFFFF40_!important] px-[10px] py-[6px] w-full md:w-fit"
            />
            <Button
              initialIconMotionValues={{
                rotate: 0,
                scale: 1,
              }}
              whileHoverIconMotionValues={{
                rotate: -30,
                scale: 1.1,
              }}
              transitionIconMotionValues={{
                duration: 0.25,
                type: "spring",
                bounce: 1,
              }}
              innerText="Discord"
              iconSrc={IMAGEKIT_ICONS.DISCORD}
              iconAlt="Discord"
              secondary
              className="bg-transparent origin-bottom border-[#FEFFFF40] shadow-[0_4px_0px_#FEFFFF40_!important] hover:shadow-[0_0px_0px_#FEFFFF40_!important] px-[10px] py-[6px] w-full md:w-fit"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
