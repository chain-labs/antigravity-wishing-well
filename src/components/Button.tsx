"use client";

import React, { use, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import {
  stagger,
  useAnimate,
  animate,
  motion,
  AnimationProps,
  Variants,
  CustomValueType, // Add this line
} from "framer-motion";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { IMAGEKIT_ICONS } from "@/assets/imageKit";

interface ButtonProps {
  /**
   * Text to display on the button
   * @default "Click me"
   **/
  innerText: string;
  /**
   * Whether the button is a secondary button
   * @default false
   **/
  secondary?: boolean;
  /**
   * Icon to display on the button
   * @default null
   **/
  iconSrc?: string | StaticImport | null;
  /**
   * Alt text for the icon
   * @default "icon"
   **/
  iconAlt?: string;
  /**
   * Position of the icon
   * @default "start"
   **/
  iconPosition?: "start" | "end";
  /**
   * Color of the stars
   * @default "yellow"
   **/
  starsColor?: string;
  /**
   * Number of stars to display
   * @default 20
   **/
  starsCount?: number;
  /**
   * Size of the button
   * @default "medium"
   **/
  size?: "small" | "medium" | "large";
  /**
   * Whether to disable the sparkles animation
   * @default false
   **/
  disableSparkels?: boolean;
  /**
   * Additional classes to apply to the button
   **/
  className?: string;
  /**
   * Whether to animate the button normally
   * @default false
   **/
  animateButton?: boolean;
  /**
   * Type of the button
   * @default "button"
   **/
  type?: "submit" | "reset" | "button";
  /**
   * Function to call when the button is clicked
   **/
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * Children of the button
   **/
  children?: React.ReactNode;
  /**
   * Icon for the hallmark
   **/
  hallmarkIconSrc?: string | StaticImport;
  /**
   * loading state of the button
   * @default false
   * */
  loading?: boolean;
  /**
   * disabled state of the button
   * @default false
   * */
  disabled?: boolean;
  /**
   * motion values for the button
   **/
  variants?: Variants;
}

export default function Button({
  secondary = false,
  innerText = "Click me",
  iconSrc = null,
  iconAlt = "icon",
  iconPosition = "start",
  starsColor = "yellow",
  starsCount = 20,
  size = "medium",
  disableSparkels = false,
  className = "",
  animateButton = false,
  type = "button",
  onClick,
  children,
  hallmarkIconSrc,
  loading = false,
  disabled = false,
  variants = {} as Variants,
  ...props
}: ButtonProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const letterSize = {
    small: 14,
    medium: 16,
    large: 18,
  };

  return (
    <motion.button
      {...props}
      onClick={onClick}
      style={
        {
          flexDirection: iconPosition === "start" ? "row" : "row-reverse",
          transform: isHovered ? "translateY(4px)" : "translateY(0px)",
        } as any
      }
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={twMerge(
        `uppercase tracking-widest w-fit relative flex items-center gap-x-2 justify-center font-sans font-extrabold text-agwhite cursor-pointer text-nowrap
                                rounded-[4px] px-4 py-3 shadow-button hover:translate-y-1 transition-[all_150ms] hover:shadow-none active:bg-agblack bg-blue z-0 overflow-hidden`,
        secondary &&
          "border-[1px] border-[#414343] bg-agblack active:bg-[#414343] box-border",
        `text-[${letterSize[size]}px] leading-[${letterSize[size]}px]`,
        className,
        (loading || disabled) && "cursor-not-allowed bg-[#414343]",
      )}
      disabled={loading || disabled}
    >
      {hallmarkIconSrc && (
        <Image
          src={hallmarkIconSrc}
          alt="Hallmark"
          width={54}
          height={54}
          className="object-cover absolute top-0 left-0 -z-[1] opacity-50 mix-blend-hue"
        />
      )}
      <motion.div
        animate={isHovered ? "hover" : "rest"}
        variants={variants as Variants}
        className="w-[24px] h-[24px]"
      >
        {loading ? (
          <Image
            src={IMAGEKIT_ICONS.REFRESH}
            alt={iconAlt}
            width={24}
            height={24}
            className="object-cover animate-spin"
          />
        ) : (
          iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt}
              width={24}
              height={24}
              className="object-cover w-[24px] h-[24px]"
            />
          )
        )}
      </motion.div>
      <div className="text-nowrap">{innerText}</div>
    </motion.button>
  );
}
