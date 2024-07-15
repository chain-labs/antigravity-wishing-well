"use client";

import DynamicNumberCounter from "@/components/Home/components/spinner/DynamicNumberCounter";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

const eraToNumber = {
  wishwell: 1,
  mining: 2,
  minting: 3,
};

export default function CountdownTimer({
  state,
  fontDesktopSize = 60,
  fontMobileSize = 48,
  containerClassName,
  counterSubtitleClassName,
}: {
  fontDesktopSize?: number;
  fontMobileSize?: number;
  state: {
    days: number;
    hours: number;
    mins: number;
    secs: number;
    phase: 1 | 2 | 3;
    era: "wishwell" | "mining" | "minting";
    claimStarted: boolean;
    claimTransition: boolean;
  };
  containerClassName?: string;
  counterSubtitleClassName?: string;
}) {
  const [phase, setPhase] = useState(1);
  const [era, setEra] = useState(1);

  useEffect(() => {
    if (!state) return;
    if (state.phase === 3) {
      setPhase(1);
      if (state.era === "minting") {
        setEra(1);
      } else {
        setEra(eraToNumber[state.era] + 1);
      }
    } else {
      setEra(eraToNumber[state.era]);
      setPhase(state.phase + 1);
    }
  }, [state]);

  if (!state) return null;

  return (
    <>
      <div
        className={twMerge(
          "tracking-widest uppercase text-2xl text-center from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text",
          containerClassName,
        )}
      >
        {state.era === "mining" &&
        state.phase === 3 &&
        !state.claimStarted &&
        !state.claimTransition
          ? "Mining ends in"
          : state.claimTransition
            ? "Claiming starts in"
            : state.claimStarted
              ? "Claiming ends in"
              : `ETA for era ${era} phase ${phase}`}
      </div>
      <div className="relative flex gap-2 md:gap-3 text-agyellow font-sans">
        <div className="flex items-center justify-center flex-col">
          <h1
            style={{ fontSize: fontDesktopSize }}
            className="hidden md:flex font-extrabold"
          >
            <DynamicNumberCounter
              count={state.days}
              setCount={() => {}}
              modulo={10000}
              boxPixelSize={fontDesktopSize}
            />
          </h1>
          <h1
            style={{ fontSize: fontMobileSize }}
            className="md:hidden font-extrabold"
          >
            <DynamicNumberCounter
              count={state.days}
              setCount={() => {}}
              modulo={10000}
              boxPixelSize={fontMobileSize}
            />
          </h1>
          <p
            className={twMerge(
              "text-lg md:text-xl uppercase font-extrabold tracking-widest",
              counterSubtitleClassName,
            )}
          >
            Days
          </p>
        </div>
        <div className="bg-agyellow h-[clac(60px_1.5rem)] lg:full w-[1px]"></div>
        <div className="flex items-center justify-center flex-col">
          <h1
            style={{ fontSize: fontDesktopSize }}
            className="hidden md:flex font-extrabold"
          >
            <DynamicNumberCounter
              count={state.hours}
              setCount={() => {}}
              modulo={24}
              boxPixelSize={fontDesktopSize}
            />
          </h1>
          <h1
            style={{ fontSize: fontMobileSize }}
            className="md:hidden font-extrabold"
          >
            <DynamicNumberCounter
              count={state.hours}
              setCount={() => {}}
              modulo={24}
              boxPixelSize={fontMobileSize}
            />
          </h1>
          <p
            className={twMerge(
              "text-lg md:text-xl uppercase font-extrabold tracking-widest",
              counterSubtitleClassName,
            )}
          >
            Hours
          </p>
        </div>
        <div className="bg-agyellow h-[clac(60px_1.5rem)] lg:full w-[1px]"></div>
        <div className="flex items-center justify-center flex-col">
          <h1
            style={{ fontSize: fontDesktopSize }}
            className="hidden md:flex font-extrabold"
          >
            <DynamicNumberCounter
              count={state.mins}
              setCount={() => {}}
              modulo={60}
              boxPixelSize={fontDesktopSize}
            />
          </h1>
          <h1
            style={{ fontSize: fontMobileSize }}
            className="md:hidden font-extrabold"
          >
            <DynamicNumberCounter
              count={state.mins}
              setCount={() => {}}
              modulo={60}
              boxPixelSize={fontMobileSize}
            />
          </h1>
          <p
            className={twMerge(
              "text-lg md:text-xl uppercase font-extrabold tracking-widest",
              counterSubtitleClassName,
            )}
          >
            Mins
          </p>
        </div>
        <div className="bg-agyellow h-[clac(60px_1.5rem)] lg:full w-[1px]"></div>
        <div className="flex items-center justify-center flex-col">
          <h1
            style={{ fontSize: fontDesktopSize }}
            className="hidden md:flex font-extrabold"
          >
            <DynamicNumberCounter
              count={state.secs}
              setCount={() => {}}
              modulo={60}
              boxPixelSize={fontDesktopSize}
            />
          </h1>
          <h1
            style={{ fontSize: fontMobileSize }}
            className="md:hidden font-extrabold"
          >
            <DynamicNumberCounter
              count={state.secs}
              setCount={() => {}}
              modulo={60}
              boxPixelSize={fontMobileSize}
            />
          </h1>
          <p
            className={twMerge(
              "text-lg md:text-xl uppercase font-extrabold tracking-widest",
              counterSubtitleClassName,
            )}
          >
            Secs
          </p>
        </div>
      </div>
    </>
  );
}
