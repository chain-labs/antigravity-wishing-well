"use client";

import {
  KeyframeOptions,
  animate,
  useInView,
  useIsomorphicLayoutEffect,
} from "framer-motion";
import { Dispatch, SetStateAction, useRef } from "react";
import { twMerge } from "tailwind-merge";
import pointsConverterToUSCommaseparated from "../pointsConverterToUSCommaseparated";
import USFormatToNumber from "../USFormatToNumber";

type NumberCounterProps = {
  from: string;
  to: string;
  float?: boolean;
  animationOptions?: KeyframeOptions;
  currentCount?: number;
  setCurrentCount?: Dispatch<SetStateAction<string>>;
  classNames?: string;
};

export default function AutomaticIncreamentalNumberCounterWithString(
  props: NumberCounterProps,
) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!inView) return;

    const controls = animate(
      USFormatToNumber(props.from),
      USFormatToNumber(props.to),
      {
        duration: 0.25,
        ease: "easeInOut",
        ...props.animationOptions,
        onUpdate(value) {
          element.innerHTML = props.float
            ? `${pointsConverterToUSCommaseparated(Number(value.toString().split(".")[0]))}<span class="text-[0.6em] text-agwhite opacity-[0.66] pt-[0.4em]">.${Number(value.toString().split(".")[1])}</span>`
            : `${pointsConverterToUSCommaseparated(Math.floor(Number(value.toString().split(".")[0])))}`;
        },
        onComplete() {
          if (props.setCurrentCount) {
            props.setCurrentCount(props.to);
          }
        },
      },
    );

    return controls.stop;
  }, [props.from, props.to, props.animationOptions, inView, ref]);

  return <span className={twMerge(props.classNames)} ref={ref} />;
}
