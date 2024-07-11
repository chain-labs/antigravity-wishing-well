"use client";

import Button from "@/components/Button";
import {
  useScroll,
  useTransform,
  motion,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import { use, useEffect, useRef, useState } from "react";
import H1 from "@/components/HTML/H1";
import H2 from "@/components/HTML/H2";
import P from "@/components/HTML/P";
import Table from "@/components/Table";
import { useAccount } from "wagmi";
import { IMAGEKIT_ICONS, IMAGEKIT_LOGOS } from "@/assets/imageKit";
import AnimatedButton from "@/components/AnimatedButton";
import Link from "next/link";
import GradientBorder from "@/components/GradientBorder";
import { useRestPost } from "@/hooks/useRestClient";
import { client } from "../../../../sanity/lib/client";

function CollectiveLogo() {
  const [hover, setHover] = useState(false);
  return (
    <AnimatePresence>
      <a
        onMouseLeave={() => setHover(false)}
        href="/collective"
        className="flex justify-start items-center gap-2 absolute bottom-0 right-0 lg:left-[10%] lg:top-0 z-[100] lg:translate-y-[-100%] h-fit w-fit"
      >
        <Image
          onMouseEnter={() => setHover(true)}
          src={IMAGEKIT_LOGOS.COLLECTIVE_COLOR_LOGO}
          alt="leaderboard background"
          width={100}
          height={100}
          className="object-cover opacity-25 lg:opacity-100 max-h-[100px] w-auto"
        />

        <motion.div
          animate={{
            width: hover ? "fit-content" : 0,
            padding: hover ? "8px 16px 8px 16px" : "8px 0px 8px 0px",
          }}
          initial={{
            width: "0%",
            padding: "0px 0px 0px 0px",
          }}
          exit={{
            width: "0%",
            padding: "0px 0px 0px 0px",
          }}
          transition={{ duration: 0.2 }}
          className="rounded-[6px] px-[16px] py-[8px] bg-agyellow text-black font-general-sans font-extrabold overflow-hidden whitespace-nowrap hidden lg:block"
        >
          Go to The Collective →
        </motion.div>
      </a>
    </AnimatePresence>
  );
}

type tableDataType = {
  rank: number;
  badge: string;
  wallet: string;
  points: number;
  special?: boolean;
} | null;

const tableDataStatic: tableDataType[] = [
  {
    rank: 1,
    badge: "Specialist Technician",
    wallet: "0x1234567890abcdef1234567890abcdef12345678",
    points: 90000,
  },
  {
    rank: 2,
    badge: "Specialist Technician",
    wallet: "0x1234567890abcdef1234567890abcdef12345678",
    points: 90000,
  },
  {
    rank: 3,
    badge: "Specialist Technician",
    wallet: "0x1234567890abcdef1234567890abcdef12345678",
    points: 90000,
  },
  {
    rank: 4,
    badge: "Specialist Technician",
    wallet: "0x1234567890abcdef1234567890abcdef12345678",
    points: 90000,
  },
  {
    rank: 5,
    badge: "Specialist Technician",
    wallet: "0x1234567890abcdef1234567890abcdef12345678",
    points: 90000,
  },
  null,
  {
    rank: 1234566,
    badge: "Specialist Technician",
    wallet: "0x1234567890abcdef1234567890abcdef12345678",
    points: 90000,
  },
  {
    rank: 1234567,
    badge: "Specialist Technician",
    wallet: "0x1234567890abcdef1234567890abcdef12345678",
    points: 90000,
    special: true,
  },
  {
    rank: 1234568,
    badge: "Specialist Technician",
    wallet: "0x1234567890abcdef1234567890abcdef12345678",
    points: 90000,
  },
];

export default function Leaderboard({
  accountIsConnected,
  typeOfLeaderboard,
}: {
  accountIsConnected: boolean;
  typeOfLeaderboard:
    | "allTimeLeaderboard"
    | "era1Leaderboard"
    | "era2Leaderboard";
}) {
  const [tableData, setTableData] = useState<tableDataType[]>([]);
  const account = useAccount();
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "start start"],
  });

  const [externalLinks, setExternalLinks] = useState<{
    best_way_to_rank_up: string;
  }>();

  useEffect(() => {
    client
      .fetch(
        `*[_type=="external_links"][0]{
          best_way_to_rank_up
        }`,
      )
      .then((externalLinks) => {
        setExternalLinks(externalLinks);
      });
  }, []);

  const { data: leaderboardData, mutate: mutateLeaderboardData } = useRestPost(
    ["leaderboard"],
    "/api/leaderboard",
  );

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  useEffect(() => {
    handleRefresh();
  }, []);

  const handleRefresh = () => {
    mutateLeaderboardData({
      walletAddress: account.address ?? "",
    });
  };

  useEffect(() => {
    if (leaderboardData) {
      // @ts-ignore
      const dataList = leaderboardData["allTimeLeaderboard"];
      if (dataList.length < 10) {
        for (let i = 0; i <= 10 - dataList.length; i++) {
          dataList.push(null);
        }
      }
      setTableData(dataList);
    }
  }, [leaderboardData]);

  if (!accountIsConnected) {
    return <div className="h-screen w-screen hidden lg:block"></div>;
  }

  return (
    <div ref={targetRef}>
      <motion.div
        style={{ opacity }}
        className={
          GradientBorder({
            from: "#5537A5",
            to: "#BF6841",
            direction: "bl",
            borderSize: 4,
          }) +
          "relative max-w-[1200px] p-[16px] lg:p-8 border-t-4 border-b-4 lg:border-4 my-32 lg:mx-auto md:translate-x-0 md:w-4/5 md:mx-auto bg-[#0A0025] rounded-none lg:rounded-xl flex flex-col lg:flex-row justify-between gap-[16px] lg:gap-32"
        }
      >
        <div className="flex flex-col gap-[16px] w-full">
          <div className="flex flex-wrap justify-start items-center gap-[16px]">
            <H1>Leaderboard</H1>
            <AnimatedButton
              innerText="Refresh"
              iconSrc={IMAGEKIT_ICONS.REFRESH}
              iconAlt="refresh icon"
              secondary
              disableSparkels
              onClick={handleRefresh}
              variants={{
                hover: {
                  animation: "spin 1s linear infinite forwards",
                },
              }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 w-full max-w-[100%]">
            <div className="col-span-2 w-full rounded-[4px] border-[2px] border-[#414343] lg:border-none">
              <Table tableData={tableData} />
            </div>

            <div className="relative flex flex-col w-full gap-4 lg:pl-6 place-self-end">
              <CollectiveLogo />
              <div className="flex flex-col gap-[8px] py-[16px] lg:p-[16px]">
                <h2 className="font-general-sans text-[16px] text-agwhite font-medium">
                  Wallet Connected:
                </h2>
                <H2
                  style={{
                    wordWrap: "break-word",
                  }}
                >
                  {account.address}
                </H2>
              </div>

              <div className="relative flex flex-col gap-[8px] p-4 rounded-xl overflow-hidden w-full z-0">
                <div className="bg-[#3C00DC] absolute inset-0 -z-10 opacity-[25%]"></div>
                <motion.div
                  initial={{
                    animationName: "",
                  }}
                  whileHover={{
                    animationName: "wiggle",
                    animationDuration: "1s",
                    animationFillMode: "forwards",
                    animationTimingFunction: "linear",
                  }}
                  className="h-fit w-fit origin-center"
                >
                  <Image
                    src={IMAGEKIT_ICONS.INFO}
                    alt="info icon"
                    width={24}
                    height={24}
                    className="object-cover"
                  />
                </motion.div>

                <P className="font-medium">
                  You&apos;re only 1,500 points away from leveling up. Mine now
                  to rank up!
                </P>
                <Link href="/mining">
                  <Button
                    innerText="Start mining"
                    iconSrc={IMAGEKIT_ICONS.HAMMER}
                    iconAlt="hammer icon"
                    variants={{
                      hover: {
                        scale: 1.35,
                        rotate: 390,
                        transition: {
                          duration: 1,
                          type: "spring",
                        },
                      },
                    }}
                  />
                </Link>
                <a
                  href={externalLinks?.best_way_to_rank_up}
                  target="_blank"
                  rel="noreferrer"
                  className="text-agwhite underline cursor-pointer"
                >
                  <P>Best ways to rank up →</P>
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
