"use client";

import { useEffect, useState } from "react";
import { CSSProperties } from "styled-components";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

type states = "pending" | "progress" | "success" | "failed";

const statesColors: { [key in states]: string } = {
  pending: "#FEFFFFA8",
  progress: "#F5EB00",
  success: "#00B031",
  failed: "red",
};

const statesCircleCSS: { [key in states]: CSSProperties } = {
  pending: {
    boxShadow: "inset 0px 0px 0px 2px #FEFFFFA8",
  },
  progress: {
    backgroundColor: "#F5EB00",
  },
  success: {
    backgroundColor: "#00B031",
    width: "32px",
    height: "32px",
  },
  failed: {
    backgroundColor: "red",
  },
};

function SVGChevron({
  direction,
  color,
  delay,
  state,
}: {
  direction: "up" | "down" | "left" | "right";
  color: string;
  delay: number;
  state?: states;
}) {
  const rotate = {
    up: 90,
    down: 270,
    left: 180,
    right: 0,
  };
  const DEFAULT_SCALE = 0.659411764706;
  return (
    <motion.div
      animate={{
        scale:
          state === "progress"
            ? [DEFAULT_SCALE, DEFAULT_SCALE * 1.2, DEFAULT_SCALE]
            : DEFAULT_SCALE,
      }}
      initial={{ scale: DEFAULT_SCALE }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        repeatType: "reverse",
        delay: (delay || 0) * 0.1,
      }}
      style={{
        transform: `rotate(${rotate[direction]}deg)`,
        margin: "0 -10%",
      }}
    >
      <svg
        width="22"
        height="17"
        viewBox="0 0 22 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.39453 0.682617H9.56884L18.1927 8.19256L9.56884 15.7025H4.39453L13.0184 8.19256L4.39453 0.682617Z"
          fill={color}
          // fill-opacity="0.66"
        />
      </svg>
    </motion.div>
  );
}

function Lines({ state, style }: { state: states; style?: CSSProperties }) {
  return (
    <div style={style} className="flex justify-center items-center w-[58.64px]">
      {/* <svg
        width="22"
        height="17"
        viewBox="0 0 22 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.39453 0.682617H9.56884L18.1927 8.19256L9.56884 15.7025H4.39453L13.0184 8.19256L4.39453 0.682617Z"
          fill={statesColors[state]}
          // fill-opacity="0.66"
        />
      </svg> */}
      <SVGChevron
        direction="right"
        color={statesColors[state]}
        delay={0}
        state={state}
      />
      <SVGChevron
        direction="right"
        color={statesColors[state]}
        delay={1}
        state={state}
      />
      <SVGChevron
        direction="right"
        color={statesColors[state]}
        delay={2}
        state={state}
      />
      <SVGChevron
        direction="right"
        color={statesColors[state]}
        delay={3}
        state={state}
      />
      <div className="scale-[1.5] ml-[-2.5%] origin-center">
        <SVGChevron
          direction="right"
          color={statesColors[state]}
          delay={4}
          state={state}
        />
      </div>
    </div>
  );
}

export default function ProgressingStates({
  states: previeousStates,
}: {
  states: { [key in string]: states };
}) {
  const [states, setStates] = useState<{
    [key in string]: states;
  }>({
    approve: "progress",
    mint: "pending",
    success: "pending",
  });

  useEffect(() => {
    if (previeousStates) {
      setStates(previeousStates);
    }
  }, [previeousStates]);

  return (
    <div className="flex flex-col place-items-center gap-y-[8px] text-[16px] leading-[19.84px] tracking-widest font-extrabold font-sans uppercase w-full">
      <div className="flex justify-between items-center w-full p-[8px]">
        {typeof states === "object" &&
          Object.keys(states).map((userState: string, idx: number) => (
            <>
              <motion.div
                animate={{
                  scale: 1,
                }}
                initial={{ scale: 0 }}
                transition={{
                  duration: 0.5,
                  type: "spring",
                  bounce: 0.25,
                }}
                key={idx}
                style={{
                  // gridColumn: `${idx * 2 + 1}`,
                  // gridRow: "1",
                  marginTop:
                    states[userState] === "success" || idx === 0 ? "0" : "8px",
                  marginBottom:
                    states[userState] === "success" || idx === 0 ? "0" : "8px",
                  ...statesCircleCSS[states[userState]],
                  width:
                    idx === 0 && states[userState] !== "success"
                      ? "32px"
                      : "16px",
                  height:
                    idx === 0 && states[userState] !== "success"
                      ? "32px"
                      : "16px",
                }}
                className="w-[16px] h-[16px] rounded-full py-[8px] mx-auto"
              ></motion.div>
              {
                // if not last state, show lines
                idx !== Object.keys(states).length - 1 && (
                  <Lines
                    state={states[userState]}
                    style={
                      {
                        // gridColumn: `${idx * 2 + 2}`,
                        // gridRow: "1",
                      }
                    }
                  />
                )
              }
            </>
          ))}
      </div>
      <div className="flex justify-between items-center w-full pl-[16px]">
        {typeof states === "object" &&
          Object.keys(states).map((userState: string, idx: number) => (
            <p
              key={idx}
              style={{
                color: statesColors[states[userState]],
                gridColumn: `${idx * 2 + 1}`,
                gridRow: "2",
              }}
            >
              {userState}
            </p>
          ))}
      </div>
    </div>
  );
}
