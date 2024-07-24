"use client";

import React, { useState } from "react";
import { animate, motion, stagger } from "framer-motion";

interface AnimatedTextProps {
  /**
   * Text to display
   * @default "Click me"
   **/
  innerText: string;
  /**
   * Size of the text
   * @default "medium"
   **/
  size?: "small" | "medium" | "large";
  /**
   * Whether to start the animation
   * @default false
   **/
  animateText?: boolean;
}

const letterSize = {
  small: 14,
  medium: 16,
  large: 18,
};

const variants = {
  animate: (index: number) => ({
    y: [0, "-100%", "100%", 0],
    transition: {
      repeat: Infinity,
      duration: 2,
      ease: "linear",
      delay: index * 0.1,
    },
  }),
  stop: { rotate: 0 },
};

export default function AnimatedText({
  innerText = "Click me",
  size = "medium",
  animateText = false,
}: AnimatedTextProps) {
  const [isAnimating, setIsAnimating] = useState(animateText);

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
    if (!isAnimating) {
      animate([
        [
          ".letter",
          { y: -letterSize[size] },
          {
            duration: 0.2,
            delay: stagger(0.2 / innerTextStringArray?.length),
          },
        ],
        [".letter", { y: 0 }, { duration: 0.000001, at: 0.5 }],
      ]);
    }
  };

  const innerTextStringArray = innerText.trim().split("");

  return (
    isAnimating ||
    (true && (
      <span
        onClick={toggleAnimation}
        className="text-white flex justify-start items-start overflow-hidden z-10"
      >
        {innerTextStringArray.map((letter, index) => {
          if (letter === " ") {
            return (
              <span
                data-letter={letter}
                className={`letter relative flex flex-col justify-start items-center z-10`}
                key={`${letter}-${index}`}
              >
                <div
                  style={{
                    width: "0.5ch",
                    height: `${letterSize[size]}px`,
                  }}
                >
                  {letter}
                </div>
                <div
                  style={{
                    width: "0.5ch",
                    height: `${letterSize[size]}px`,
                  }}
                >
                  {letter}
                </div>
              </span>
            );
          }
          return (
            <span
              data-letter={letter}
              className={`letter relative flex flex-col justify-start items-center z-10`}
              key={`${letter}-${index}`}
            >
              <div
                style={{
                  height: `${letterSize[size]}px`,
                }}
              >
                {letter}
              </div>
              <div
                style={{
                  height: `${letterSize[size]}px`,
                }}
              >
                {letter}
              </div>
            </span>
          );
        })}
      </span>
    ))
  );
}
