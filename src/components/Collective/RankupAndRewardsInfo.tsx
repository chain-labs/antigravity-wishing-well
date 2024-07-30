"use client";

import H1 from "../HTML/H1";
import P from "../HTML/P";
import { IMAGEKIT_IMAGES } from "@/assets/imageKit";
import Image from "next/image";
import { motion } from "framer-motion";

export default function RankupAndRewardsInfo() {
  return (
    <div className="relative h-fit w-full flex flex-col lg:justify-end lg:items-end overflow-hidden z-0">
      <div className="relative flex flex-col lg:justify-end lg:items-end p-[16px] lg:p-[64px] w-fit">
        <div className="flex flex-col gap-[16px] max-w-[600px]">
          <H1>
            What about Ranks,
            <br />
            Ranking Up & Rewards?
          </H1>

          <P>
            Earning points in each era gives you a rank inside the Collective.
            The more points you accrue, the higher you rank. Higher ranks give
            you access to real world rewards, merch, and swag.
            <br />
            <br />
            Higher ranks also give you access to exclusive online rewards.
          </P>
        </div>
        <motion.div
          whileInView={{ width: "140%" }}
          initial={{ width: "0%" }}
          transition={{ duration: 0.75, type: "spring" }}
          className="hidden xl:block absolute right-0 top-0 h-[100%] [clip-path:polygon(25%_0%,100%_0%,100%_100%,0%_100%)] z-[-1] bg-agblack opacity-50"
        ></motion.div>
      </div>
      <div className="block xl:hidden absolute h-full w-full inset-0 bg-gradient-to-t from-[#000] via-[#000000a0] to-[#00000000] z-[-1]"></div>
      <Image
        src={IMAGEKIT_IMAGES.COLLECTIVE_RANKUP_AND_REWARDS_INFO_BG}
        alt="Mining Background"
        width={1920}
        height={1080}
        className="absolute inset-0 w-[800px] md:w-full h-[250px] md:h-auto z-[-2] origin-top md:origin-center scale-[1.8] md:scale-[1.3] md:translate-y-[10%] object-fill sm:object-cover"
      />
    </div>
  );
}
