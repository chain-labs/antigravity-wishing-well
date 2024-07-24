"use client";
import { IMAGEKIT_ICONS } from "@/assets/imageKit";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TokenDropdownTypes } from "./Mining/types";

export default function Dropdown({
  icon,
  options,
  selected,
  setSelected,
}: {
  icon: StaticImport | string;
  options: {
    label: string;
    value: string;
  }[];
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}) {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
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
      className="uppercase tracking-widest w-fit relative flex items-center gap-x-2 justify-center font-sans font-extrabold text-agwhite cursor-pointer text-nowrap rounded-[4px] px-[10px] py-[6px] shadow-[0_4px_0_#414343] hover:translate-y-1 hover:shadow-none transition-[all_150ms] z-50 border-[1px] border-[#414343] bg-agblack active:bg-[#414343] box-border"
    >
      <div className="cursor-pointer grid grid-cols-[24px_auto_16px] place-items-center gap-[8px] select-none">
        <motion.div
          whileHover={{
            animation: "wiggle 1s linear forwards",
          }}
        >
          <Image src={icon} alt={"icon"} width={24} height={24} />
        </motion.div>

        <select
          name=""
          className="bg-transparent outline-none sr-only"
          defaultValue={selected}
          onChange={handleChange}
        >
          {options.map((option, idx: number) => (
            <option key={idx} value={options[idx].value}>
              {options[idx].label}
            </option>
          ))}
        </select>
        {options.map(
          (option, idx) => selected === option.value && option.label,
        )}

        <Image
          src={IMAGEKIT_ICONS.DOWN}
          alt="Dropdown"
          width={16}
          height={16}
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
          className="origin-center transition-all duration-300 ease-in-out transform rotate-0 cursor-pointer invert"
        />
      </div>
      <motion.div
        style={{
          height: isOpen ? `fit-content` : "0px",
          padding: isOpen ? "12px 16px" : "0px 16px",
          opacity: isOpen ? 1 : 0,
        }}
        className="absolute top-[calc(100%+8px)] left-0 rounded-[6px] shadow-[0_4px_0_#414343] z-10 text-agwhite transition-all duration-300 ease-in-out bg-gradient-to-b from-[#030404] to-[#131A1A] border-[1px] border-[#414343]"
      >
        <div
          style={{
            display: isOpen ? "flex" : "none",
          }}
          className="flex flex-col justify-center items-center gap-[24px] select-none"
        >
          {options.map(
            (option, idx) =>
              option.value !== selected && (
                <>
                  <div
                    onClick={() => setSelected(option.value)}
                    key={option.value}
                    className="flex gap-[8px] items-center justify-start w-full cursor-pointer min-w-[120px] select-none"
                  >
                    {option.label}
                  </div>
                </>
              ),
          )}
        </div>
      </motion.div>
    </div>
  );
}
