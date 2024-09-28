"use client";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import DynamicNumberCounter from "./DynamicNumberCounter";
import { CountdownType } from "@/hooks/frontend/useTimer";

const eraToNumber = {
  wishwell: 1,
  mining: 2,
  minting: 3,
};

const COUNTDOWN_TITLE: { [key: string]: string[] } = {
  wishwell: [
    "ETA for era 1 phase 2",
    "ETA for era 1 phase 3",
    "ETA for era 2 phase 1",
  ],
  mining: [
    "ETA for era 2 phase 2",
    "ETA for era 2 phase 3",
    "ETA for Journey 1",
  ],
  minting: [],
  journey1: [
    "Minting window ends in",
    "Minting window ends in",
    "ETA for Journey 2",
  ],
  journey2: [
    "Minting window ends in",
    "Minting window ends in",
    "ETA for Journey 3",
  ],
  journey3: [
    "Minting window ends in",
    "Minting window ends in",
    "ETA for Journey 4",
  ],
};

export default function CountdownTimer({
  state,
  fontDesktopSize = 60,
  fontMobileSize = 48,
  containerClassName,
  counterSubtitleClassName,
  counterClassName,
}: {
  fontDesktopSize?: number;
  fontMobileSize?: number;
  state: CountdownType;
  containerClassName?: string;
  counterSubtitleClassName?: string;
  counterClassName?: string;
}) {
  const [phase, setPhase] = useState(1);
  const [era, setEra] = useState(1);

  useEffect(() => {
    if (!state) return;
    if (state.phase === 3) {
      setPhase(1);
      if (state.isMintingActive) {
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
            ? "Public Test goes live in"
            : state.claimStarted
              ? "Claiming ends in"
              : state.mintingTransition
                ? "Minting starts in"
                : state.isJourneyPaused && !state.isMintingActive
                  ? "Journey Paused"
                  : COUNTDOWN_TITLE[
                      state.isMintingActive
                        ? `journey${state.journey}`
                        : state.era
                    ]?.[state.phase - 1]}
      </div>
      <div
        className={twMerge(
          "relative grid grid-flow-col gap-[6px] md:gap-[6px] text-agyellow font-sans",
          counterClassName,
        )}
      >
        <div className="flex items-center justify-center flex-col w-fit mx-auto">
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
        <div className="bg-[currentColor] h-[clac(60px_1.5rem)] lg:full w-[1px] mx-auto"></div>
        <div className="flex items-center justify-center flex-col w-fit mx-auto">
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
        <div className="bg-[currentColor] h-[clac(60px_1.5rem)] lg:full w-[1px] mx-auto"></div>
        <div className="flex items-center justify-center flex-col w-fit mx-auto">
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
        <div className="bg-[currentColor] h-[clac(60px_1.5rem)] lg:full w-[1px] mx-auto"></div>
        <div className="flex items-center justify-center flex-col w-fit mx-auto">
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
