"use client";

import {
  KeyframeOptions,
  animate,
  useInView,
  useIsomorphicLayoutEffect,
} from "framer-motion";
import { Dispatch, SetStateAction, useRef } from "react";
import { twMerge } from "tailwind-merge";

type NumberCounterProps = {
  from: string;
  to: string;
  float?: boolean;
  animationOptions?: KeyframeOptions;
  currentCount?: number;
  setCurrentCount?: Dispatch<SetStateAction<string>>;
  classNames?: string;
};

export function pointsConverterToUSCommaseparated(points: number): string {
  const [integerPart, decimalPart] = points.toString().split(".");
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ",",
  );

  return decimalPart
    ? `${formattedIntegerPart}.${decimalPart}`
    : formattedIntegerPart;
}

export function USFormatToNumber(value: string): number {
  return Number(value.replace(/[$,]/g, ""));
}

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
          element.textContent = String(
            props.float
              ? pointsConverterToUSCommaseparated(value)
              : pointsConverterToUSCommaseparated(Math.floor(value)),
          );
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
