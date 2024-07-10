"use client";

import Button from "@/components/Button";
import {
  useScroll,
  useTransform,
  motion,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import H1 from "@/components/HTML/H1";
import H2 from "@/components/HTML/H2";
import P from "@/components/HTML/P";
import Table from "@/components/Table";
import { useAccount } from "wagmi";
import { IMAGEKIT_ICONS, IMAGEKIT_LOGOS } from "@/assets/imageKit";
import AnimatedButton from "../AnimatedButton";
import Link from "next/link";
import GradientBorder from "../GradientBorder";

function CollectiveLogo() {
  return (
    <div className="flex justify-start items-center gap-2 absolute bottom-0 right-0 lg:left-[10%] lg:top-[-10%] z-[100] lg:translate-y-[-100%] h-fit w-fit">
      <Image
        src={IMAGEKIT_LOGOS.COLLECTIVE_COLOR_LOGO}
        alt="leaderboard background"
        width={294}
        height={382}
        className="object-fit opacity-25 lg:opacity-50 w-[100px] lg:w-[294px] h-[100px] lg:h-[342px]"
      />
    </div>
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
  {
    rank: 6,
    badge: "Specialist Technician",
    wallet: "0x1234567890abcdef1234567890abcdef12345678",
    points: 90000,
  },
  {
    rank: 7,
    badge: "Specialist Technician",
    wallet: "0x1234567890abcdef1234567890abcdef12345678",
    points: 90000,
  },
  {
    rank: 8,
    badge: "Specialist Technician",
    wallet: "0x1234567890abcdef1234567890abcdef12345678",
    points: 90000,
  },
  {
    rank: 9,
    badge: "Specialist Technician",
    wallet: "0x1234567890abcdef1234567890abcdef12345678",
    points: 90000,
  },
  {
    rank: 10,
    badge: "Specialist Technician",
    wallet: "0x1234567890abcdef1234567890abcdef12345678",
    points: 90000,
  },
];

export default function Leaderboard({
  accountIsConnected,
}: {
  accountIsConnected: boolean;
}) {
  const account = useAccount();
  const [tableData, setTableData] = useState<tableDataType[]>(tableDataStatic);
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "start start"],
  });

  useEffect(() => {
    handleRefresh();
  }, [accountIsConnected]);

  const handleRefresh = () => {
    //randomize only one index
    fetch("http://3.90.153.171:3000/api/leaderboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        walletAddress: account.address ?? "",
      }),
    }).then((res) =>
      res.json().then((data) => {
        const dataList = data["allTimeLeaderboard"];
        if(dataList.length < 10) {
          for(let i = 0; i <= 10 - dataList.length; i++) {
            dataList.push(null);
          }
        }
        setTableData(dataList);
      }),
    );
  };

  return (
    <div ref={targetRef}>
      <motion.div
        className={
          GradientBorder({
            from: "#5537A5",
            to: "#BF6841",
            direction: "bl",
            borderSize: 4,
          }) +
          "relative w-full max-w-[1200px] border-t-4 border-b-4 md:border-4 p-[16px] md:p-[32px] bg-agblack md:rounded-xl z-0"
        }
      >
        <div className="flex flex-col gap-[16px] w-full">
          <div className="flex flex-col md:flex-row flex-wrap justify-start items-start md:items-center gap-[16px]">
            <H1>Leaderboard</H1>
            <AnimatedButton
              innerText="Refresh"
              iconSrc={IMAGEKIT_ICONS.REFRESH}
              iconAlt="refresh icon"
              secondary
              disableSparkels
              variants={{
                hover: {
                  animation: "spin 1s linear infinite forwards",
                },
              }}
              onClick={handleRefresh}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 w-full max-w-[100%]">
            <div className="col-span-2 w-full rounded-[4px] border-[2px] border-[#414343] lg:border-none">
              <Table tableData={tableData} />
            </div>

            <div className="relative flex flex-col w-full gap-4 lg:pl-6 place-self-end">
              <CollectiveLogo />
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

                <P className="font-medium">Mine now to rank up!</P>
                <Link href={"/mining"}>
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
                <a href="/" className="text-agwhite underline">
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
