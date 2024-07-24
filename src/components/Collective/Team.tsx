import { IMAGEKIT_ICONS, IMAGEKIT_IMAGES } from "@/assets/imageKit";
import H1 from "../HTML/H1";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { client } from "../../../sanity/lib/client";
import { Image as IImage } from "sanity";
import { urlForImage } from "../../../sanity/lib/image";

interface ITeamMember {
  handle: string;
  image: IImage;
  socials: {
    type: string;
    url: string;
  }[];
}

export default function Team() {
  const [metadata, setMetadata] = useState<{
    team_header: string[];
    team_members: ITeamMember[];
  }>();

  useEffect(() => {
    client
      .fetch(
        `*[_type=="collective"][0]{
			team_header, team_members
		}`,
      )
      .then((metadata) => {
        setMetadata(metadata);
      });
  }, []);

  const iconManage = (platform: string) => {
    switch (platform) {
      case "Telegram":
        return IMAGEKIT_ICONS.TELEGRAM;
      case "Twitter":
        return IMAGEKIT_ICONS.TWITTER;
      case "Youtube":
        return IMAGEKIT_ICONS.YOUTUBE;
      case "TikTok":
        return IMAGEKIT_ICONS.TIKTOK;
      case "Instagram":
        return IMAGEKIT_ICONS.INSTAGRAM;
      default:
        return IMAGEKIT_ICONS.INSTAGRAM;
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-[48px] max-w-[1000px] mx-auto  p-[16px] my-[75px] [text-shadow:_0_2px_2px_rgb(0_0_0_/_60%)]">
      <H1 className="text-agwhite" center>
        {metadata?.team_header
          ? metadata.team_header?.map((text) => (
              <React.Fragment key={text}>
                {text}
                <br className="hidden md:block" />{" "}
              </React.Fragment>
            ))
          : null}
      </H1>
      <div className="flex justify-center flex-wrap items-center gap-[32px] md:gap-[48px]">
        {metadata?.team_members.map((member) => (
          <div
            className="flex flex-col justify-center items-center gap-[16px]"
            key={member.handle}
          >
            <div
              className="relative w-[145px] h-[145px] bg-agblack rounded-[8px] border-4 border-transparent bg-clip-padding z-0
                    before:content-[''] before:absolute before:inset-0 before:z-[-10] before:bg-gradient-to-bl before:from-[#3C00DC] before:to-[#FF5001] before:rounded-[inherit] before:overflow-hidden before:m-[-4px]
                    after:content-[''] after:absolute after:inset-0 after:z-[-2] after:bg-agblack after:rounded-[inherit] after:overflow-hidden"
            >
              <Image
                src={urlForImage(member.image)}
                alt="Collective Event"
                width={145}
                height={145}
                className="object-cover h-full w-full rounded-[4px]"
              />
            </div>

            <p className="text-agwhite font-sans font-extrabold text-[20px] leading-[19.2px] [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
              {member.handle}
            </p>
            <div
              className="flex justify-center items-center gap-[16px] w-fit px-[16px] py-[8px] rounded-[8px] relative bg-gradient-to-b from-[#030404BF] to-[#131A1ABF] border-1 border-transparent bg-clip-padding z-0
                    before:content-[''] before:absolute before:inset-0 before:z-[-10] before:bg-gradient-to-bl before:from-[#3C00DC] before:to-[#FF5001] before:rounded-[inherit] before:overflow-hidden before:m-[-1px]
                    after:content-[''] after:absolute after:inset-0 after:z-[-2] after:bg-agblack after:rounded-[inherit] after:overflow-hidden"
            >
              {member.socials.map((social) => (
                <motion.a
                  href={social.url}
                  target="_blank"
                  key={social.url}
                  rel="noreferrer"
                  whileHover={{ scale: 1.2 }}
                >
                  <Image
                    src={iconManage(social.type)}
                    alt="Claim Icon"
                    width={24}
                    height={24}
                  />
                </motion.a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
