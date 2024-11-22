"use client";

import Button from "@/components/Button";
import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import H1 from "@/components/HTML/H1";
import { IMAGEKIT_ICONS, IMAGEKIT_IMAGES } from "@/assets/imageKit";
import Link from "next/link";
import ThreeDHovercardEffect from "@/components/ThreeDHovercardEffect";
import { useUserData } from "@/app/(client)/store";
import imageKitLoader from "@/components/imageKitLoader";
import { client } from "../../../../sanity/lib/client";

export default function NFTReceipt() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { nftURLera2 } = useUserData();
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const [external_links, setExternalLinks] = useState({
    collective_rewards_101: "",
  });

  useEffect(() => {
    client
      .fetch(
        `*[_type=="external_links"][0]{
          collective_rewards_101
        }`,
      )
      .then((externalLinks) => {
        setExternalLinks(externalLinks);
      });
  }, []);

  // const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.25], [150, 0]);

  const textY = useTransform(scrollYProgress, [0, 0.25], [100, 0]);
  return (
    <div
      ref={targetRef}
      className="mx-4 my-32 flex flex-col gap-8 items-center justify-center"
    >
      <motion.div
        style={{
          y: textY,
        }}
      >
        <H1 center className="text-[32px] leading-[32px]">
          Not everyone makes smart decisions.
          <br /> Except you. You badass. Check your wallet for your Live NFT. See Example Below!
        </H1>
      </motion.div>
      <motion.div
        style={{
          y,
        }}
      >
        <ThreeDHovercardEffect ROTATION_RANGE={10}>
          <Image
            src={nftURLera2 ? nftURLera2 : IMAGEKIT_IMAGES.NFT_RECEIPT}
            alt="NFT Receipt"
            width={300}
            height={600}
            className="rounded-[12px]"
            loader={imageKitLoader}
          />
        </ThreeDHovercardEffect>
      </motion.div>
    </div>
  );
}
