"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { MotionValue, motion, useTransform } from "framer-motion";
import DynamicNumberCounter from "./DynamicNumberCounter";
import AutomaticIncreamentalNumberCounter from "./AutomaticIncreamentalNumberCounter";
import useTimer from "@/hooks/frontend/useTimer";
import { IMAGEKIT_IMAGES } from "@/assets/imageKit";

let globalDelay = 1.5;

type SpinnerProps = {
  era: "wishwell" | "mining" | "minting";
  stage: 1 | 2 | 3;
  bonus: number;
  days: number;
  hours: number;
  mins: number;
  secs: number;
};

const styles = {
  "era-styles": {
    parent:
      "absolute flex justify-center items-center top-0 left-[50%] translate-x-[-50%] translate-y-[-50%] origin-bottom h-[470px] w-[2em] z-10 pt-24",
    active: "uppercase text-center text-black font-sans font-black text-3xl",
    passive:
      "uppercase text-center from-white to-[#999999] bg-gradient-to-b text-transparent bg-clip-text font-sans font-black text-3xl",
  },
  "border-styles": {
    era: "absolute top-0 left-[50%] translate-x-[-50%] translate-y-[-50%] origin-bottom w-[3px] h-[490px] bg-black",
    stage:
      "absolute top-0 left-[50%] translate-x-[-50%] translate-y-[-50%] origin-bottom h-[300px] w-[3px] bg-black z-10",
  },
  "stage-styles": {
    parent:
      "absolute top-0 left-[50%] translate-x-[-50%] translate-y-[-50%] origin-bottom h-[180px] w-[2em] z-10",
    active: "uppercase text-center bg-clip-text font-sans font-black text-4xl",
    passive:
      "uppercase text-center from-white to-[#999999] bg-gradient-to-b text-transparent bg-clip-text font-sans font-black text-4xl",
  },
  "timer-styles": {
    parent: "flex-col justify-center items-center gap-0",
    number: "font-sans text-agyellow text-5xl font-extrabold text-center",
    label:
      "uppercase text-sm text-center from-white to-[#999999] font-sans font-extrabold bg-gradient-to-b text-transparent bg-clip-text",
  },
};

function H1({
  className,
  era,
  stage,
  parentClassName,
  isEraLetter,
}: {
  className?: string;
  era: SpinnerProps["era"];
  stage: SpinnerProps["stage"];
  parentClassName: string;
  isEraLetter?: string;
}) {
  const timer = useTimer();
  const currentEra = timer.era;
  const currentPhase = timer.phase;
  const active = currentEra === era && currentPhase === stage;

  return (
    <>
      {isEraLetter !== undefined ? (
        <div className={twMerge(styles["era-styles"].parent, parentClassName)}>
          {currentEra === era ? (
            <motion.h1
              whileInView={{
                color: "black",
              }}
              initial={{
                color: "white",
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: globalDelay + 1,
              }}
              className={twMerge(styles["era-styles"].active)}
            >
              {isEraLetter}
            </motion.h1>
          ) : (
            <h1 className={twMerge(styles["era-styles"].passive)}>
              {isEraLetter}
            </h1>
          )}
        </div>
      ) : (
        <div
          className={twMerge(parentClassName, styles["stage-styles"].parent)}
        >
          {active ? (
            <motion.h1
              whileInView={{
                color: "black",
              }}
              initial={{
                color: "white",
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: globalDelay + 1,
              }}
              className={twMerge(styles["stage-styles"].active, className)}
            >
              {stage}
            </motion.h1>
          ) : (
            <h1 className={twMerge(styles["stage-styles"].passive, className)}>
              {stage}
            </h1>
          )}
        </div>
      )}
    </>
  );
}

function Border({
  eraBorder,
  className,
}: {
  eraBorder: boolean;
  className: string;
}) {
  return (
    <div
      className={twMerge(
        eraBorder ? styles["border-styles"].era : styles["border-styles"].stage,
        className,
      )}
    ></div>
  );
}

function decideActiveStageLocation({
  activePhase,
  activeEra,
}: {
  activePhase: SpinnerProps["stage"];
  activeEra: SpinnerProps["era"];
}) {
  switch (activeEra) {
    case "wishwell":
      switch (activePhase) {
        case 1:
          return -100;
        case 2:
          return -75;
        case 3:
          return -50;
      }
    case "mining":
      switch (activePhase) {
        case 1:
          return -25;
        case 2:
          return 0;
        case 3:
          return 25;
      }
    case "minting":
      switch (activePhase) {
        case 1:
          return 50;
        case 2:
          return 75;
        case 3:
          return 100;
      }
  }
}

function StageHighlighter() {
  const activeState = useTimer();
  const rotation = decideActiveStageLocation({
    activeEra: activeState.era,
    activePhase: activeState.phase,
  });
  return (
    <motion.div
      whileInView={{
        x: "-50%",
        y: "-50%",
        rotate: `${rotation}deg`,
      }}
      initial={{
        x: "-50%",
        y: "-50%",
        rotate: "180deg",
      }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: globalDelay }}
      className={twMerge(
        "absolute top-0 left-[50%] translate-x-[-50%] translate-y-[-50%] origin-bottom h-[300px] w-[40px] bg-agyellow z-10",
        `rotate-[${rotation}deg]`,
      )}
    >
      <div className="absolute bottom-0 left-[50%] translate-x-[calc(-100%)] origin-bottom rotate-[12.5deg] h-[300px] w-[20px] bg-agyellow z-20"></div>
      <div className="absolute bottom-0 left-[50%] translate-x-[calc(100%_-_20px)] origin-bottom rotate-[-12.5deg] h-[300px] w-[20px] bg-agyellow z-20"></div>
    </motion.div>
  );
}

function EraHighlighter() {
  const activeEra = useTimer().era;
  return (
    <motion.div
      whileInView={{
        x: "-50%",
        y: "-50%",
        rotate:
          activeEra === "wishwell" ? -75 : activeEra === "minting" ? 75 : 0,
      }}
      initial={{
        x: "-50%",
        y: "-50%",
        rotate: -180,
      }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: globalDelay }}
      className={twMerge(
        "absolute top-0 left-[50%] translate-x-[-50%] translate-y-[-50%] origin-bottom h-[490px] w-[190px] bg-agyellow z-10",
        `rotate-[${activeEra === "wishwell" ? -75 : activeEra === "minting" ? 75 : 0}deg]`,
      )}
    >
      <div className="absolute bottom-0 left-[50%] translate-x-[calc(-100%_-_10px)] origin-bottom rotate-[37.5deg] h-[490px] w-[90px] bg-agyellow z-20"></div>
      <div className="absolute bottom-0 left-[50%] translate-x-[calc(11px)] origin-bottom rotate-[-37.5deg] h-[490px] w-[90px] bg-agyellow z-20"></div>
    </motion.div>
  );
}

function Era() {
  const activePhase = useTimer().phase;
  return (
    <>
      <EraHighlighter />
      <div id="wishwell">
        <H1
          era="wishwell"
          stage={activePhase}
          parentClassName="rotate-[-96deg]"
          isEraLetter={"W"}
        />
        <H1
          era="wishwell"
          stage={activePhase}
          parentClassName="rotate-[-90deg]"
          isEraLetter={"i"}
        />
        <H1
          era="wishwell"
          stage={activePhase}
          parentClassName="rotate-[-85deg]"
          isEraLetter={"s"}
        />
        <H1
          era="wishwell"
          stage={activePhase}
          parentClassName="rotate-[-78deg]"
          isEraLetter={"h"}
        />
        <H1
          era="wishwell"
          stage={activePhase}
          parentClassName="rotate-[-70deg]"
          isEraLetter={"w"}
        />
        <H1
          era="wishwell"
          stage={activePhase}
          parentClassName="rotate-[-62deg]"
          isEraLetter={"e"}
        />
        <H1
          era="wishwell"
          stage={activePhase}
          parentClassName="rotate-[-56deg]"
          isEraLetter={"l"}
        />
        <H1
          era="wishwell"
          stage={activePhase}
          parentClassName="rotate-[-50deg]"
          isEraLetter={"l"}
        />
      </div>
      <Border eraBorder className="rotate-[-37.5deg]" />
      <div id="mining">
        <H1
          era="mining"
          stage={activePhase}
          parentClassName="rotate-[-12deg]"
          isEraLetter={"M"}
        />
        <H1
          era="mining"
          stage={activePhase}
          parentClassName="rotate-[-6deg]"
          isEraLetter={"i"}
        />
        <H1
          era="mining"
          stage={activePhase}
          parentClassName="rotate-[-1deg]"
          isEraLetter={"n"}
        />
        <H1
          era="mining"
          stage={activePhase}
          parentClassName="rotate-[4deg]"
          isEraLetter={"i"}
        />
        <H1
          era="mining"
          stage={activePhase}
          parentClassName="rotate-[9deg]"
          isEraLetter={"n"}
        />
        <H1
          era="mining"
          stage={activePhase}
          parentClassName="rotate-[16deg]"
          isEraLetter={"g"}
        />
      </div>
      <Border eraBorder className="rotate-[37.5deg]" />
      <div id="minting">
        <H1
          era="minting"
          stage={activePhase}
          parentClassName="rotate-[61deg]"
          isEraLetter={"M"}
        />
        <H1
          era="minting"
          stage={activePhase}
          parentClassName="rotate-[67deg]"
          isEraLetter={"i"}
        />
        <H1
          era="minting"
          stage={activePhase}
          parentClassName="rotate-[73deg]"
          isEraLetter={"n"}
        />
        <H1
          era="minting"
          stage={activePhase}
          parentClassName="rotate-[79deg]"
          isEraLetter={"t"}
        />
        <H1
          era="minting"
          stage={activePhase}
          parentClassName="rotate-[84deg]"
          isEraLetter={"i"}
        />
        <H1
          era="minting"
          stage={activePhase}
          parentClassName="rotate-[89deg]"
          isEraLetter={"n"}
        />
        <H1
          era="minting"
          stage={activePhase}
          parentClassName="rotate-[96deg]"
          isEraLetter={"g"}
        />
      </div>
    </>
  );
}

function StageNumber() {
  return (
    <div>
      <H1 era="wishwell" stage={1} parentClassName="rotate-[-100deg] pt-12" />
      <H1 era="wishwell" stage={2} parentClassName="rotate-[-75deg] pt-11" />
      <H1 era="wishwell" stage={3} parentClassName="rotate-[-50deg] pt-10" />
      <H1 era="mining" stage={1} parentClassName="rotate-[-25deg] pt-9" />
      <H1 era="mining" stage={2} parentClassName="rotate-[0deg] pt-9" />
      <H1 era="mining" stage={3} parentClassName="rotate-[25deg] pt-9" />
      <H1 era="minting" stage={1} parentClassName="rotate-[50deg] pt-10" />
      <H1 era="minting" stage={2} parentClassName="rotate-[75deg] pt-11" />
      <H1 era="minting" stage={3} parentClassName="rotate-[100deg] pt-12" />
    </div>
  );
}

function StageInBetweenBorders() {
  return (
    <div>
      <Border eraBorder={false} className="rotate-[-87.5deg]" />
      <Border eraBorder={false} className="rotate-[-62.5deg]" />
      <Border eraBorder={false} className="rotate-[-37.5deg]" />
      <Border eraBorder={false} className="rotate-[-12.5deg]" />
      <Border eraBorder={false} className="rotate-[12.5deg]" />
      <Border eraBorder={false} className="rotate-[37.5deg]" />
      <Border eraBorder={false} className="rotate-[62.5deg]" />
      <Border eraBorder={false} className="rotate-[87.5deg]" />
    </div>
  );
}

function Pointer() {
  const activeState = useTimer();
  const rotation = decideActiveStageLocation({
    activeEra: activeState.era,
    activePhase: activeState.phase,
  });
  return (
    <motion.div
      animate={{
        rotate: `${rotation}deg`,
      }}
      whileInView={{
        x: "-50%",
        y: "-50%",
        rotate: `${rotation}deg`,
      }}
      initial={{
        x: "-50%",
        y: "-50%",
        rotate: "-180deg",
      }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: globalDelay }}
      className={twMerge(
        "absolute top-0 left-[50%] translate-x-[-50%] translate-y-[-50%] origin-bottom h-[100px] w-[50px] z-10 pt-0",
        `rotate-[${rotation}deg]`,
      )}
    >
      <Image
        src={IMAGEKIT_IMAGES.COUNTER_POINTER}
        width={50}
        height={50}
        layout="fixed"
        alt="Counter Pointer"
      />
    </motion.div>
  );
}

function Timer() {
  const timer = useTimer();
  return (
    <div className="absolute flex flex-col justify-center items-center gap-2 z-[100] w-[400px] h-[200px] translate-y-[60%]">
      <Image
        src={IMAGEKIT_IMAGES.COUNTER_BG}
        width={450}
        height={225}
        layout="fixed"
        alt="Counter Background"
        className="absolute top-0 left-0 h-[220px] -z-[1]"
      />
      <div className="flex gap-4">
        <div className={styles["timer-styles"].parent}>
          <div className={styles["timer-styles"].number}>
            <DynamicNumberCounter
              count={timer.days}
              setCount={() => {}}
              modulo={100000000}
            />
          </div>
          <div className={styles["timer-styles"].label}>Days</div>
        </div>
        <div className={styles["timer-styles"].parent}>
          <div className={styles["timer-styles"].number}>
            <DynamicNumberCounter
              count={timer.hours}
              setCount={() => {}}
              modulo={24}
            />
          </div>
          <div className={styles["timer-styles"].label}>Hours</div>
        </div>
        <div className={styles["timer-styles"].parent}>
          <div className={styles["timer-styles"].number}>
            <DynamicNumberCounter
              count={timer.mins}
              setCount={() => {}}
              modulo={60}
            />
          </div>
          <div className={styles["timer-styles"].label}>Mins</div>
        </div>
        <div className={styles["timer-styles"].parent}>
          <div className={styles["timer-styles"].number}>
            {/* <NumberCounter
				from={activeState.secs}
				to={activeState.secs - 1}
			/> */}
            <DynamicNumberCounter
              count={timer.secs}
              setCount={() => {}}
              modulo={60}
            />
          </div>
          <div className={styles["timer-styles"].label}>Secs</div>
        </div>
      </div>
      <div className="font-sans text-agyellow text-2xl font-bold text-center uppercase tracking-widest">
        Till Phase {(timer.phase + 1) % 4 ? timer.phase + 1 : 1}
      </div>
    </div>
  );
}

function Bonus({ activeState }: { activeState: SpinnerProps }) {
  return (
    <>
      <h1 className="font-sans font-black text-4xl">
        <AutomaticIncreamentalNumberCounter from={0} to={activeState.bonus} />x
      </h1>
      <div className="uppercase text-sm font-sans font-bold">Bonus</div>
    </>
  );
}

export default function Spinner({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const [activeState, setActiveState] = useState<SpinnerProps>({
    era: "mining",
    stage: 1,
    bonus: 22,
    days: 4,
    hours: 14,
    mins: 48,
    secs: 20,
  });

  useEffect(() => {
    // decreade the timer every second
    const timer = setInterval(() => {
      setActiveState((prev) => {
        if (prev.secs === 0) {
          if (prev.mins === 0) {
            if (prev.hours === 0) {
              if (prev.days === 0) {
                return prev;
              } else {
                return {
                  ...prev,
                  days: prev.days - 1,
                  hours: 23,
                  mins: 59,
                  secs: 59,
                };
              }
            } else {
              return {
                ...prev,
                hours: prev.hours - 1,
                mins: 59,
                secs: 59,
              };
            }
          } else {
            return {
              ...prev,
              mins: prev.mins - 1,
              secs: 59,
            };
          }
        } else {
          return {
            ...prev,
            secs: prev.secs - 1,
          };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const opacity = useTransform(scrollYProgress, [1, 0], [0, 1]);

  useEffect(() => {
    setTimeout(() => {
      globalDelay = 0;
    }, 2000);
  }, []);

  return (
    <motion.div
      style={{ opacity }}
      whileInView={{
        filter: "saturate(1)",
      }}
      initial={{
        filter: "saturate(0)",
      }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: globalDelay }}
      className="absolute top-0 left-[50%] translate-x-[-50%] translate-y-[-60%] md:translate-y-[-37%] w-[500px] h-[500px] bg-black rounded-full flex justify-center items-center scale-[0.7] sm:scale-[0.8] overflow-hidden z-[100]"
    >
      <div className="relative w-[470px] h-[470px] bg-[radial-gradient(circle_at_center,#B7A4EA,#1C0068_65%)] rounded-full flex justify-center items-center overflow-hidden">
        <Era />

        <div className="relative w-[300px] h-[300px] bg-[radial-gradient(circle_at_center,#B7A4EA,#1C0068_65%)] rounded-full border-[10px] border-agblack flex justify-center items-center overflow-hidden z-10">
          <StageHighlighter />
          <StageInBetweenBorders />
          <div className="relative w-[180px] h-[180px] bg-[#1C0068] rounded-full border-[10px] border-agblack flex justify-center items-center z-10">
            <StageNumber />

            <div className="relative w-[100px] h-[100px] bg-agyellow rounded-full flex justify-center items-center">
              <div className="flex flex-col justify-center items-center">
                <Pointer />
                <Bonus activeState={activeState} />
              </div>
            </div>
          </div>
        </div>

        <Timer />
      </div>
    </motion.div>
  );
}
