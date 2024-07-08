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
  from: number;
  to: number;
  float?: boolean;
  animationOptions?: KeyframeOptions;
  currentCount?: number;
  setCurrentCount?: Dispatch<SetStateAction<number>>;
  classNames?: string;
  floatingPoint?: number;
};

export default function AutomaticIncreamentalNumberCounter(
  props: NumberCounterProps,
) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!inView) return;

    const controls = animate(props.from, props.to, {
      duration: 1.5,
      ease: "easeInOut",
      ...props.animationOptions,
      onUpdate(value) {
        element.textContent = String(
          props.float
            ? String(value.toFixed(props.floatingPoint ?? 3)).padStart(2, "0")
            : String(Math.floor(value)).padStart(2, "0"),
        );
      },
      onComplete() {
        if (props.setCurrentCount) {
          props.setCurrentCount(props.to);
        }
      },
    });

    return controls.stop;
  }, [props.from, props.to, props.animationOptions, inView, ref]);

  return <span className={twMerge(props.classNames)} ref={ref} />;
}
