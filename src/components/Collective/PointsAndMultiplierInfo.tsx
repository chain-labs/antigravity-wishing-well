import Link from "next/link";
import H1 from "../HTML/H1";
import P from "../HTML/P";
import { IMAGEKIT_ICONS, IMAGEKIT_IMAGES } from "@/assets/imageKit";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import useTimer from "@/hooks/frontend/useTimer";
import { useState } from "react";

export default function PointsAndMultiplierInfo() {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const timer = useTimer();
  return (
    <div className="relative h-fit w-full  overflow-hidden z-0">
      <div className="relative flex flex-col p-[16px] lg:p-[64px] gap-[16px] w-fit">
        <P>(our intern forgot to add this)</P>
        <H1>How do Points & Multipliers Work?</H1>
        <P>Earn Points by participating in the 3 launch Eras:</P>
        <div className="flex flex-wrap gap-[8px]">
          <>
            {timer.era === "wishwell" ? (
              <Link href="/wishwell">
                <div
                  className={`relative flex justify-center items-center gap-[8px] rounded-[6px] bg-gradient-to-b from-[#0A1133] to-[#142266] px-[16px] py-[8px] border-1 border-transparent bg-clip-padding z-0
                    before:content-[''] before:absolute before:inset-0 before:z-[-10] before:bg-gradient-to-b before:from-[#B4EBF8] before:to-[#789DFA] before:rounded-[inherit] before:overflow-hidden before:m-[-1px]
                              after:content-[''] after:absolute after:inset-0 after:z-[-2]  after:bg-gradient-to-b after:from-[#0A1133] after:to-[#142266] after:rounded-[inherit] after:overflow-hidden`}
                >
                  <motion.div
                    whileHover={{
                      scale: 1.1,
                      rotate: 360,
                      transition: { duration: 1, type: "spring" },
                    }}
                  >
                    <Image
                      src={IMAGEKIT_ICONS.HALF_CIRCLE_FILL}
                      alt="Wishwell"
                      width={24}
                      height={24}
                    />
                  </motion.div>
                  <P className="text-[14px] leading-[20.3px]">Wishwell</P>
                </div>
              </Link>
            ) : (
              <div
                onMouseEnter={() =>
                  timer.era !== "wishwell" ? setTooltipOpen(true) : null
                }
                onMouseLeave={() =>
                  timer.era !== "wishwell" ? setTooltipOpen(false) : null
                }
                className="select-none relative z-10"
              >
                <div
                  className={`relative flex justify-center items-center gap-[8px] rounded-[6px] bg-gradient-to-b from-[#0A1133] to-[#142266] px-[16px] py-[8px] border-1 border-transparent bg-clip-padding z-0
                    before:content-[''] before:absolute before:inset-0 before:z-[-10] before:bg-gradient-to-b before:from-[#B4EBF8] before:to-[#789DFA] before:rounded-[inherit] before:overflow-hidden before:m-[-1px]
                              after:content-[''] after:absolute after:inset-0 after:z-[-2]  after:bg-gradient-to-b after:from-[#0A1133] after:to-[#142266] after:rounded-[inherit] after:overflow-hidden`}
                >
                  <motion.div
                    whileHover={{
                      scale: 1.1,
                      rotate: 360,
                      transition: { duration: 1, type: "spring" },
                    }}
                  >
                    <Image
                      src={IMAGEKIT_ICONS.HALF_CIRCLE_FILL}
                      alt="Wishwell"
                      width={24}
                      height={24}
                    />
                  </motion.div>
                  <P className="text-[14px] leading-[20.3px]">Wishwell</P>
                </div>
                <AnimatePresence>
                  {tooltipOpen && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "fit-content",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      className="absolute top-[calc(100%+16px)] left-1/2 -translate-x-1/2 flex text-agwhite w-fit rounded-[4px] bg-gradient-to-tr from-brred to-blue p-[1px]"
                    >
                      <div className="w-fit h-fit bg-gradient-to-b from-[#030404] to-[#131A1A] flex items-center justify-between rounded-[inherit] gap-6 px-[16px] py-[8px] text-[16px] text-nowrap">
                        Currently by invitation only.
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </>

          <Link href="/mining">
            <div
              className={`relative flex justify-center items-center gap-[8px] rounded-[6px] bg-gradient-to-b from-[#0A1133] to-[#142266] px-[16px] py-[8px] border-1 border-transparent bg-clip-padding z-0
							before:content-[''] before:absolute before:inset-0 before:z-[-10] before:bg-gradient-to-b before:from-[#B4EBF8] before:to-[#789DFA] before:rounded-[inherit] before:overflow-hidden before:m-[-1px]
                    		after:content-[''] after:absolute after:inset-0 after:z-[-2]  after:bg-gradient-to-b after:from-[#0A1133] after:to-[#142266] after:rounded-[inherit] after:overflow-hidden`}
            >
              <motion.div
                whileHover={{
                  scale: 1.2,
                  rotate: 390,
                  transition: {
                    duration: 1,
                    type: "spring",
                  },
                }}
              >
                <Image
                  src={IMAGEKIT_ICONS.HAMMER}
                  alt="Wishwell"
                  width={24}
                  height={24}
                />
              </motion.div>
              <P className="text-[14px] leading-[20.3px]">Mining</P>
            </div>
          </Link>
          <div>
            <div
              className={`relative flex justify-center items-center gap-[8px] rounded-[6px] bg-gradient-to-b from-[#0A1133] to-[#142266] px-[16px] py-[8px] border-1 border-transparent bg-clip-padding z-0
							before:content-[''] before:absolute before:inset-0 before:z-[-10] before:bg-gradient-to-b before:from-[#B4EBF8] before:to-[#789DFA] before:rounded-[inherit] before:overflow-hidden before:m-[-1px]
                    		after:content-[''] after:absolute after:inset-0 after:z-[-2]  after:bg-gradient-to-b after:from-[#0A1133] after:to-[#142266] after:rounded-[inherit] after:overflow-hidden`}
            >
              <motion.div
                whileHover={{
                  scale: 1.5,
                  transition: { duration: 1, type: "spring" },
                }}
              >
                <Image
                  src={IMAGEKIT_ICONS.CUBE}
                  alt="Wishwell"
                  width={24}
                  height={24}
                />
              </motion.div>
              <P className="text-[14px] leading-[20.3px]">Minting</P>
            </div>
          </div>
        </div>
        <P className="relative max-w-[600px]">
          There are bonuses for each Era and Multipliers on top of the bonuses
          if you participate in more than 1 Era.
          <br />
          <br />
          The multipliers double if you participate in all 3 Eras.
        </P>
        <motion.div
          whileInView={{ width: "120%" }}
          initial={{ width: "0%" }}
          transition={{ duration: 0.75, type: "spring" }}
          className="hidden xl:block absolute left-0 top-0 h-[100%] [clip-path:polygon(0%_0%,100%_0%,75%_100%,0%_100%)] z-[-1] bg-agblack opacity-50"
        ></motion.div>
      </div>
      <div className="block xl:hidden absolute h-full w-full inset-0 bg-gradient-to-b from-[#000] to-[#00000000] z-[-1]"></div>
      <Image
        src={IMAGEKIT_IMAGES.COLLECTIVE_POINTS_AND_MULTIPLIER_INFO_BG}
        alt="Points and multiplier Background"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full md:h-auto z-[-2] md:translate-y-[-18%] object-none md:object-fill object[10%_30%] sm:object-cover"
      />
    </div>
  );
}
