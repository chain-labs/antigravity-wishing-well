"use client";
import { IMAGEKIT_ICONS, IMAGEKIT_LOGOS } from "@/assets/imageKit";
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
          height: isOpen ? `auto` : "0px",
          padding: isOpen ? "2px 2px" : "0px 2px",
          opacity: isOpen ? 1 : 0,
        }}
        className="absolute top-[calc(100%+8px)] right-0 rounded-[6px] z-10 text-agwhite transition-all duration-300 ease-in-out bg-gradient-to-bl from-[#5537A5] to-[#BF6841]"
      >
        <div
          style={{
            display: isOpen ? "grid" : "none",
          }}
          className="relative grid grid-cols-1 gap-[8px] w-fit min-w-[140px] overflow-x-hidden bg-gradient-to-b from-[#030404] to-[#131A1A] rounded-[6px] p-[8px] max-h-[300px] overflow-y-auto"
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
                  {selected === options?.length - 1
                    ? idx !== options?.length - 2 && (
                        <div className="w-full h-[1px] bg-gradient-to-bl from-[#5537A5] via-[#5537A5] to-[#BF6841]" />
                      )
                    : idx !== options?.length - 1 && (
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
