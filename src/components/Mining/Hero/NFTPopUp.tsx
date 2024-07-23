import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { AnimatePresence, motion } from "framer-motion";
import DarkXFieldCanvas from "@/components/Mining/DarkXfield";
import ThreeDHovercardEffect from "@/components/ThreeDHovercardEffect";
import Image from "next/image";
import { IMAGEKIT_ICONS, IMAGEKIT_IMAGES } from "@/assets/imageKit";
import H1 from "@/components/HTML/H1";
import P from "@/components/HTML/P";
import AutomaticIncreamentalNumberCounter from "@/components/Home/components/spinner/AutomaticIncreamentalNumberCounter";
import useUserData from "@/app/(client)/store";
import imageKitLoader from "@/components/imageKitLoader";

export default function NFTPopUp({
  minedSuccess = false,
  setMinedSuccess,
  handleNFTClose,
}: {
  minedSuccess?: boolean;
  setMinedSuccess: Dispatch<SetStateAction<boolean>>;
  handleNFTClose: () => void;
}) {
  // const points = {
  //   wishwell: 41415.65,
  //   mining: 41415.65,
  //   total: 82831.3,
  //   conversion: 10,
  //   badge: "Specialist Technician",
  // };
  const account = useAccount();
  const [points, setPoints] = useState<null | {
    wishwell: number;
    mining: number;
    total: number;
    conversion: number;
    badge: string;
    nftURL: string;
  }>(null);
  const [completeAnimationComplete, setCompleteAnimationComplete] =
    useState(false);
  const [starfieldAnimationComplete, setStarfieldAnimationComplete] =
    useState(false);
  const { nftURLera2, wishwellPoints, miningPoints, totalPoints, rank } =
    useUserData();

  useEffect(() => {
    if (account.address) {
      console.log({ nftURLera2 });

      setPoints({
        wishwell: wishwellPoints,
        mining: miningPoints,
        total: totalPoints,
        conversion: 10,
        badge: rank,
        nftURL: nftURLera2,
      });
    }
  }, [nftURLera2, wishwellPoints, miningPoints, totalPoints, rank]);

  useEffect(() => {
    setTimeout(() => {
      setCompleteAnimationComplete(true);
      setMinedSuccess(false);
    }, 3000);
  }, []);

  return (
    <motion.div
      exit={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      initial={{
        opacity: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="fixed top-0 left-0 w-screen h-screen bg-[#0000001f] flex justify-center items-center z-10 backdrop-blur-lg cursor-not-allowed"
    >
      <div
        className="absolute inset-0 top-0 left-0 h-full w-full z-[-1]"
        onMouseDown={handleNFTClose}
      ></div>
      <AnimatePresence>
        {!starfieldAnimationComplete && (
          <motion.div
            exit={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            initial={{ opacity: 0 }}
            transition={{
              duration: 2,
            }}
            onAnimationComplete={() => setStarfieldAnimationComplete(true)}
            className="absolute inset-0 h-full w-full"
            onMouseDown={handleNFTClose}
          >
            <DarkXFieldCanvas
              count={100}
              xRange={100}
              yRange={100}
              zRange={100}
              speed={0.75}
              icon={IMAGEKIT_ICONS.PILL_DARK_X}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        exit={{
          scale: 0,
        }}
        animate={{
          scale: 1,
        }}
        initial={{
          scale: 0,
        }}
        transition={{
          duration: 0.5,
          type: "spring",
        }}
        className="z-0 cursor-pointer"
      >
        {points && minedSuccess && (
          <AnimatePresence>
            {!completeAnimationComplete && (
              <ThreeDHovercardEffect ROTATION_RANGE={10}>
                <motion.div
                  exit={{
                    opacity: 0,
                    scale: 0,
                  }}
                  initial={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{ duration: 2 }}
                  className="relative w-fit min-w-[265px] h-fit flex flex-col justify-center items-center gap-[8px] p-[16px] rounded-[12px] bg-agblack border-[6px] z-0
              before:content-[''] before:absolute before:inset-0 before:z-[-10] before:bg-gradient-to-tr before:from-[#3C00DC] before:to-[#FF5001] before:rounded-[inherit] before:overflow-hidden before:m-[-6px]
              after:content-[''] after:absolute after:inset-0 after:z-[-2] after:bg-agblack after:rounded-[inherit] after:overflow-hidden
          "
                >
                  <Image
                    src={IMAGEKIT_IMAGES.COUNTDOWN_BG_GRID}
                    alt="countdown bg grid"
                    width={800}
                    height={800}
                    className="absolute inset-0 z-[-1] w-full h-full object-cover user-select-none pointer-events-none"
                  />
                  <H1 className="uppercase text-[36px] leading-[36px] md:text-[36px] md:leading-[36px]">
                    ANTIGRAVITY
                  </H1>
                  <div className="h-[2.796px] w-full bg-gradient-to-r from-[#FF5001] to-[#3C00DC]"></div>
                  <div className="p-[12px] bg-[rgba(60,0,220,0.33)] w-full h-fit">
                    <P
                      uppercase
                      className="text-agwhite opacity-[0.66] text-[16px] leading-normal md:text-[16px] md:leading-normal tracking-normal font-normal font-sans"
                    >
                      Your Rank
                    </P>
                    <div className="overflow-hidden">
                      <motion.div
                        animate={{
                          y: 0,
                        }}
                        initial={{
                          y: 100,
                        }}
                        transition={{
                          duration: 1,
                          type: "spring",
                          bounce: 0.25,
                        }}
                      >
                        <P
                          uppercase
                          className="text-transparent text-[26px] leading-[26px] md:text-[26px] md:leading-[26px] bg-clip-text bg-gradient-to-b from-[#B4EBF8] to-[#789DFA] font-black tracking-normal font-sans"
                        >
                          {points.badge}
                          {/* <BadgeIncrementalCounter badge="Cheif Navigator" /> */}
                        </P>
                      </motion.div>
                    </div>
                  </div>
                  <div className="p-[12px] bg-[rgba(60,0,220,0.33)] w-full h-fit">
                    <P
                      uppercase
                      className="text-agwhite opacity-[0.66] text-[16px] leading-normal md:text-[16px] md:leading-normal tracking-normal font-normal font-sans"
                    >
                      Wishwell Era Points
                    </P>
                    <P
                      uppercase
                      className="text-agwhite text-[26px] leading-[26px] md:text-[26px] md:leading-[26px] font-black tracking-normal font-sans"
                    >
                      <AutomaticIncreamentalNumberCounter
                        from={0}
                        to={points.wishwell}
                        float={true}
                        floatingPoint={
                          points.wishwell
                            ? String(points.wishwell).split(".")[1].length
                            : 0
                        }
                      />
                    </P>
                  </div>
                  <div className="p-[12px] bg-[rgba(60,0,220,0.33)] w-full h-fit">
                    <P
                      uppercase
                      className="text-agwhite opacity-[0.66] text-[16px] leading-normal md:text-[16px] md:leading-normal tracking-normal font-normal font-sans"
                    >
                      Mining Era Points
                    </P>
                    <P
                      uppercase
                      className="text-agwhite text-[26px] leading-[26px] md:text-[26px] md:leading-[26px] font-black tracking-normal font-sans"
                    >
                      <AutomaticIncreamentalNumberCounter
                        from={0}
                        to={points.mining}
                        float={true}
                        floatingPoint={
                          points.mining
                            ? String(points.mining).split(".")[1].length
                            : 0
                        }
                      />
                    </P>
                  </div>
                  <div className="p-[12px] bg-[rgba(60,0,220,0.33)] w-full h-fit">
                    <P
                      uppercase
                      className="text-agwhite opacity-[0.66] text-[16px] leading-normal md:text-[16px] md:leading-normal tracking-normal font-normal font-sans"
                    >
                      Total Points
                    </P>
                    <P
                      uppercase
                      className="text-agyellow text-[26px] leading-[26px] md:text-[26px] md:leading-[26px] font-black tracking-normal font-sans"
                    >
                      <AutomaticIncreamentalNumberCounter
                        from={0}
                        to={points.total}
                        float={true}
                        floatingPoint={
                          points.total
                            ? String(points.total).split(".")[1].length
                            : 0
                        }
                      />
                    </P>
                  </div>
                  <P
                    uppercase
                    className="ml-auto text-agwhite opacity-[0.66] text-[16px] leading-normal md:text-[16px] md:leading-normal tracking-normal font-bold font-sans"
                  >
                    {points.conversion} Points / $1
                  </P>
                </motion.div>
              </ThreeDHovercardEffect>
            )}
            {completeAnimationComplete && (
              <ThreeDHovercardEffect ROTATION_RANGE={10}>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <Image
                    src={points.nftURL}
                    alt="nft card"
                    width={265}
                    height={400}
                    className="w-[265px] h-auto object-cover z-[-1]"
                    loader={imageKitLoader}
                  />
                </motion.div>
              </ThreeDHovercardEffect>
            )}
          </AnimatePresence>
        )}
        {points && !minedSuccess && (
          <ThreeDHovercardEffect ROTATION_RANGE={10}>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <Image
                src={points.nftURL}
                alt="nft card"
                width={265}
                height={400}
                onLoadingComplete={() => console.log('image loaded')}
                className="w-[265px] h-auto object-cover z-[-1]"
                loader={imageKitLoader}
              />
            </motion.div>
          </ThreeDHovercardEffect>
        )}
      </motion.div>
    </motion.div>
  );
}
