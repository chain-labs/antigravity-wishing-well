"use client";
import { IMAGEKIT_ICONS, IMAGEKIT_LOGOS } from "@/assets/imageKit";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TokenDropdownTypes } from "./Mining/types";

export default function Dropdown({
  options,
  selected,
  setSelected,
}: {
  options: TokenDropdownTypes[];
  selected: number;
  setSelected: Dispatch<SetStateAction<number>>;
}) {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {}, [selected]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(Number(event.target.value));
  };

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (targetRef.current && !targetRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  console.log('options', options);

  return (
    <div
      ref={targetRef}
      onClick={toggleOptions}
      className="relative py-[4px] px-[8px] rounded-full bg-gradient-to-b from-[#B4EBF8] to-[#789DFA] tex-agblack font-general-sans font-semibold text-[16px] leading-[16px] h-fit w-full text-nowrap"
    >
      <div className="cursor-pointer grid grid-cols-[24px_auto_16px] place-items-center gap-[4px] select-none">
        <Image
          src={options[selected]?.logoURI ?? IMAGEKIT_LOGOS.LOGO}
          alt={options[selected]?.symbol}
          width={24}
          height={24}
        />
        <select
          name=""
          className="bg-transparent outline-none sr-only"
          defaultValue={selected}
          onChange={handleChange}
        >
          {options.map((option, idx) => (
            <option key={option.symbol} value={idx}>
              {option.symbol}
            </option>
          ))}
        </select>

        {options[selected] ? options[selected].symbol : "Select Token"}
        <Image
          src={IMAGEKIT_ICONS.DOWN}
          alt="Dropdown"
          width={16}
          height={16}
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
          className="origin-center transition-all duration-300 ease-in-out transform rotate-0 cursor-pointer"
        />
      </div>
      <motion.div
        style={{
          height: isOpen ? `fit-content` : "0px",
          padding: isOpen ? "8px 8px" : "0px 8px",
          opacity: isOpen ? 1 : 0,
        }}
        className="absolute top-[calc(100%+8px)] right-0 rounded-[6px] z-10 text-agwhite transition-all duration-300 ease-in-out bg-agblack
			before:content-[''] before:absolute before:inset-0 before:z-[-10] md:before:bg-gradient-to-bl before:from-[#5537A5] before:to-[#BF6841] before:rounded-[inherit] before:overflow-hidden before:m-[-1px]
			after:content-[''] after:absolute after:inset-0 after:z-[-2] md:after:bg-gradient-to-b after:from-[#030404] after:to-[#131A1A] after:rounded-[inherit] after:overflow-hidden"
      >
        <div
          style={{
            display: isOpen ? "grid" : "none",
          }}
          className="relative grid grid-cols-1 justify-start items-center gap-[8px] max-h-[300px] overflow-y-visible w-fit min-w-[140px] overflow-x-hidden"
        >
          {options.map(
            (option, idx) =>
              idx !== selected && (
                <>
                  <div
                    onClick={() => setSelected(idx)}
                    key={option.symbol}
                    className="flex gap-[8px] items-center justify-start w-full cursor-pointer min-w-[120px] select-none"
                  >
                    <Image
                      src={option.logoURI}
                      alt={option?.symbol}
                      width={24}
                      height={24}
                    />
                    {option?.symbol}
                  </div>
                  {selected === options.length - 1
                    ? idx !== options.length - 2 && (
                        <div className="w-full h-[1px] bg-gradient-to-bl from-[#5537A5] via-[#5537A5] to-[#BF6841]" />
                      )
                    : idx !== options.length - 1 && (
                        <div className="w-full h-[1px] bg-gradient-to-bl from-[#5537A5] via-[#5537A5] to-[#BF6841]" />
                      )}
                </>
              ),
          )}
        </div>
      </motion.div>
    </div>
  );
}
