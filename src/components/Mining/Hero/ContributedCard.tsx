"use client";

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import H1 from "@/components/HTML/H1";
import Pill from "@/components/Pill";
import AutomaticIncreamentalNumberCounterWithString from "../AutomaticIncreamentalNumberCounterWithString";
import { AnimatePresence } from "framer-motion";
import pointsConverterToUSCommaseparated from "@/components/pointsConverterToUSCommaseparated";
import { twMerge } from "tailwind-merge";

export default function ContributedCard({
  value,
  pillText,
  pillIconSrc,
  pillIconAlt,
  animateNumber = false,
  from = 0,
  to = 0,
  addToWalletLink,
}: {
  value: number;
  pillText: string;
  pillIconSrc: string | StaticImport;
  pillIconAlt: string;
  animateNumber?: boolean;
  from?: number;
  to?: number;
  addToWalletLink?: string;
}) {
  return (
    <div
      className="relative flex justify-between items-center flex-wrap gap-[4px] z-0 text-agwhite transition-all duration-300 ease-in-out bg-gradient-to-b from-[#0A1133] to-[#142266] rounded-[6px] px-[12px] py-[16px] w-full max-full border-[1px] border-agyellow"
    >
      {animateNumber ? (
        <H1 className="text-[32px] leading-[32px] md:text-[32px] md:leading-[32px] [word-wrap:break-word] max-w-full">
          <AnimatePresence>
            <AutomaticIncreamentalNumberCounterWithString
              from={from + ""}
              to={to + ""}
              float={String(to).includes(".")}
              classNames="[word-wrap:break-word] max-w-full"
            />
          </AnimatePresence>
        </H1>
      ) : (
        <H1 className="text-[32px] leading-[32px] md:text-[32px] md:leading-[32px] [word-wrap:break-word] max-w-full">
          {String(value).includes(".") ? (
            <>
              {pointsConverterToUSCommaseparated(
                Number(value.toString().split(".")[0]),
              )}
              <span className={twMerge("text-[0.6em] opacity-[0.66]")}>
                .{value.toString().split(".")[1]}
              </span>
            </>
          ) : (
            pointsConverterToUSCommaseparated(value)
          )}
        </H1>
      )}
      <div className="flex flex-col justify-end gap-[8px] items-end w-fit h-fit my-auto">
        <Pill text={pillText} iconSrc={pillIconSrc} iconAlt={pillIconAlt} />
        {addToWalletLink && (
          <a
            href={addToWalletLink}
            target="_blank"
            className="flex justify-center items-center bg-gradient-to-b from-[#B4EBF8] rounded-full to-[#789DFA] p-[1px] box-padding w-fit h-fit"
          >
            <div className="bg-[#142266] rounded-full w-fit h-fit">
              <div className="uppercase text-nowrap rounded-full text-[12px] leading-[12px] px-[8px] py-[4px] from-[#B4EBF8] to-[#789DFA] font-general-sans font-semibold bg-gradient-to-b text-transparent bg-clip-text">
                Add to wallet
              </div>
            </div>
          </a>
        )}
      </div>
    </div>
  );
}
