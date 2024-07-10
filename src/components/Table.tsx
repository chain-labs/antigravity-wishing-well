"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import H1 from "@/components/HTML/H1";
import H3 from "@/components/HTML/H3";
import H2 from "@/components/HTML/H2";
import P from "@/components/HTML/P";
import { IMAGEKIT_ICONS } from "@/assets/imageKit";
import { shuffle } from "lodash";
import { duration } from "moment";

function TH({
  icon,
  heading,
  className,
  variants = {} as Variants,
}: {
  icon: string | StaticImport;
  heading: string;
  className?: string;
  variants?: Variants;
}) {
  const [hover, setHover] = useState(false);
  return (
    <motion.th
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      className={twMerge(
        `relative bg-[#0A0025] border-[2px] lg:border-[2px] border-transparent bg-clip-padding flex flex-col lg:flex-row justify-between z-0 px-3 py-[10px] w-full
            before:content-[''] before:absolute before:inset-0 before:z-[-10] before:bg-gradient-to-bl before:from-[#3C00DC] before:to-[#FF5001] before:rounded-[inherit] before:overflow-hidden before:mb-[-1px] before:ml-[-1px] lg:before:m-[-1px]
			after:content-[''] after:absolute after:inset-0 after:z-[-2] after:bg-agblack after:rounded-[inherit] after:overflow-hidden`,
        className,
      )}
    >
      <H3>
        <motion.div animate={hover ? "hover" : ""} variants={variants}>
          <Image
            src={icon}
            alt={`${heading} icon`}
            width={25}
            height={25}
            className="object-cover"
          />
        </motion.div>
        {heading}
      </H3>
    </motion.th>
  );
}

function truncatinator(str: string) {
  return (
    str.substring(0, 6) + "..." + str.substring(str.length - 4, str.length)
  );
}

function TD({
  children,
  truncate = false,
  special = false,
  className,
  border = false,
}: {
  children: React.ReactNode;
  truncate?: boolean;
  special?: boolean;
  className?: string;
  border?: boolean;
}) {
  const [truncateHover, setTruncateHover] = useState(false);
  function truncateHoverTrue() {
    setTruncateHover(true);
  }

  function truncateHoverFalse() {
    setTruncateHover(false);
  }

  if (truncate && children && typeof children === "string") {
    return (
      <AnimatePresence>
        <td
          onMouseEnter={truncateHoverTrue}
          onMouseLeave={truncateHoverFalse}
          className={twMerge(
            "text-[14px] relative border-r-2 border-[#414343] lg:border-[#8275A5] bg-clip-padding hidden lg:flex flex-col lg:flex-row justify-start items-center z-10 px-[12px] py-[6px] w-full truncate hover:overflow-visible",
            special && "text-[18px]",
            className,
          )}
        >
          {truncateHover ? (
            <>
              <motion.div
                animate={{
                  opacity: 1,
                }}
                initial={{
                  opacity: 0,
                }}
                transition={{ duration: 0.2, delay: 0.5 }}
                className={twMerge(
                  "absolute top-[50%] left-[50%] p-2 -translate-x-1/2 -translate-y-1/2 rounded-[4px] bg-blue text-center text-agwhite z-10 shadow-[0_0_4px_0_#000]",
                  special && " text-[18px] bg-agyellow text-black ",
                )}
              >
                {children}
              </motion.div>
              {truncatinator(children)}
            </>
          ) : (
            truncatinator(children)
          )}
        </td>
      </AnimatePresence>
    );
  }
  return (
    <td
      className={twMerge(
        "text-[14px] relative border-r-2 border-[#414343] lg:border-[#8275A5] bg-clip-padding flex flex-col justify-center lg:justify-start lg:items-center gap-[4px] lg:gap-4 lg:flex-row z-0 p-[8px] lg:px-[12px] lg:py-[6px]",
        special && !border && "border-none text-[18px] py-[10px]",
        border && special && "border-r-2 text-[18px] py-[10px]",
        className,
      )}
    >
      {children}
    </td>
  );
}

function TR({
  children,
  className,
  special = false,
  empty = false,
  th = false,
  position,
}: {
  children: React.ReactNode;
  className?: string;
  special?: boolean;
  empty?: boolean;
  th?: boolean;
  position?: number;
}) {
  return (
    <motion.tr
      layout
      animate={{
        y: "0",
        opacity: 1,
      }}
      initial={{
        y: "100%",
        opacity: 0,
      }}
      exit={{
        y: "100%",
        opacity: 0,
      }}
      transition={{
        duration: 5,
        type: "spring",
        bounce: 0.25,
        stiffness: 100,
      }}
      className={twMerge(
        "relative grid grid-cols-[2fr_1fr] lg:grid-cols-[2fr_1fr_1fr] w-full lg:border-l-2 border-b-2 border-[#414343] lg:border-[#8275A5] z-0",
        special && " text-black font-extrabold  border-none",
        empty &&
          "bg-gradient-to-b from-[#142266] via-[#0A1133] to-[#142266] border-r-2",
        th && "border-none",
        className,
      )}
    >
      {special && (
        <div className="absolute top-0 left-0 w-[calc(100%_+_24px)] h-full translate-x-[-12px] z-[-1] bg-agyellow rounded-lg"></div>
      )}
      {children}
    </motion.tr>
  );
}

function Badge({
  children,
  special = false,
}: {
  children: React.ReactNode;
  special?: boolean;
}) {
  return (
    <div
      className={twMerge(
        "text-[12px] leading-[12px] relative flex items-center gap-[8px] justify-center font-sans font-extrabold text-agwhite rounded-full py-[4px] px-[8px] border-2 uppercase tracking-widest w-fit",
        special &&
          "text-[12px] leading-[13.88px] pt-[5px] text-agyellow font-extrabold bg-gradient-to-b from-[#0A1133] to-[#142266] border-none",
      )}
    >
      {children}
    </div>
  );
}

function Rank({
  rank,
  wallet,
  special = false,
  badge,
}: {
  rank: number;
  wallet: string;
  special?: boolean;
  badge: string;
}) {
  const iconLink = `@/assets/icons/${special ? "wallet-black.svg" : "wallet.svg"}`;
  return (
    <TD special={special} border>
      #{rank} <Badge special={special}>{badge}</Badge>
      <div
        className={`flex gap-[4px] justify-start items-center lg:hidden ${
          special
            ? "text-[22px] leading-[28.6px] md:text-[18px] md:leading-[23.6px]"
            : "text-[18px] leading-[23.4px]"
        }`}
      >
        {special ? (
          <Image
            src={IMAGEKIT_ICONS.WALLET_BLACK}
            alt="wallet icon"
            width={25}
            height={25}
            className="object-cover"
          />
        ) : (
          <Image
            src={IMAGEKIT_ICONS.WALLET_WHITE}
            alt="hammer icon"
            width={25}
            height={25}
            className={twMerge("object-cover")}
          />
        )}
        {truncatinator(wallet)}
      </div>
    </TD>
  );
}

function pointsConverterToUSCommaseparated(points: number) {
  const [integerPart, decimalPart] = points.toString().split(".");
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ",",
  );

  return decimalPart
    ? `${formattedIntegerPart}.${decimalPart}`
    : formattedIntegerPart;
}

type tableDataType = {
  rank: number;
  badge: string;
  wallet: string;
  points: number;
  special?: boolean;
} | null;

type tableHeaderType = {
  icon: string | StaticImport;
  heading: string;
  className?: string;
};

export default function Table({ tableData }: { tableData: tableDataType[] }) {
  // useEffect(() => {
  //   // detect change in position of data and animate accordingly
  //   // const newTableData: tableDataType[] = [];
  //   // currentTableData.forEach((data, idx) => {
  //   //   if (tableData[idx] !== data) {
  //   //     newTableData.push(data);
  //   //   } else {
  //   //     newTableData.push(null);
  //   //   }
  //   // });
  //   // swap random index data
  //   setTimeout(() => setTableData(shuffle(tableData)), 1000);
  // }, [tableData]);

  return (
    <table className="w-full bg-gradient-to-b from-[#0A1133] to-[#142266] h-fit">
      <thead className="w-full">
        <TR th position={1555}>
          {/* {
                        tableHeader.map((header, idx) => (
                            <TH key={idx} icon={header.icon} heading={header.heading} className={header.className} />
                        ))
                    } */}
          <TH
            icon={IMAGEKIT_ICONS.LEADERBOARD}
            heading="Rank"
            variants={{
              hover: {
                scale: 1.25,
                transition: {
                  duration: 0.5,
                  type: "spring",
                },
              },
            }}
          />
          <TH
            icon={IMAGEKIT_ICONS.WALLET_WHITE}
            heading="Wallet"
            className="hidden lg:flex"
            variants={{
              hover: {
                animationName: "wiggle",
                animationDuration: "1s",
                animationFillMode: "forwards",
                animationTimingFunction: "linear",
              },
            }}
          />
          <TH
            icon={IMAGEKIT_ICONS.POINTS}
            heading="Points"
            variants={{
              hover: {
                rotate: 120,
                transition: { duration: 1, type: "spring" },
              },
            }}
          />
        </TR>
      </thead>
      <motion.tbody
        layout
        layoutRoot
        className="text-lg font-medium font-general-sans text-agwhite"
      >
        {tableData.map((data, idx) =>
          data !== null ? (
            <motion.tr
              layout
              transition={{ type: "spring", duration: 2 }}
              key={idx}
            >
              <AnimatePresence>
                <TR
                  key={idx}
                  special={data.special ?? false}
                  position={data.rank}
                >
                  <Rank
                    rank={data.rank}
                    wallet={data.wallet}
                    special={data.special ?? false}
                    badge={data.badge}
                  />
                  <TD truncate special={data.special ?? false}>
                    {data.wallet}
                  </TD>
                  <TD
                    special={data.special ?? false}
                    className={
                      data.special
                        ? "text-[22px] leading-[28.6px] md:text-[18px] md:leading-[23.6px]"
                        : "md:text-[14px] md:leading-[18.2px] text-[18px] leading-[23.6px]"
                    }
                  >
                    {pointsConverterToUSCommaseparated(
                      String(data.points).includes(".")
                        ? parseFloat(data.points.toFixed(4))
                        : data.points,
                    )}
                  </TD>
                </TR>
              </AnimatePresence>
            </motion.tr>
          ) : (
            <motion.tr
              layout
              transition={{ type: "spring", duration: 2 }}
              key={idx}
            >
              <TR key={idx} className="h-[2.5rem]" empty>
                <></>
              </TR>
            </motion.tr>
          ),
        )}
      </motion.tbody>
    </table>
  );
}
