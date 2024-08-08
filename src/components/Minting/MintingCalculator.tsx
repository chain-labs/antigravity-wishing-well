"use client";

import { twMerge } from "tailwind-merge";
import {
  Dispatch,
  SetStateAction,
  use,
  useEffect,
  useRef,
  useState,
} from "react";
import { IMAGEKIT_ICONS } from "@/assets/imageKit";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Pill from "@/components/Pill";
import { TokenDropdownTypes } from "../Mining/types";
import Image from "next/image";
import AutomaticIncreamentalNumberCounterWithString from "../Mining/AutomaticIncreamentalNumberCounterWithString";
import { useAccount } from "wagmi";
import pointsConverterToUSCommaseparated from "../pointsConverterToUSCommaseparated";
import USFormatToNumber from "../USFormatToNumber";
import { errorToast } from "@/hooks/frontend/toast";

const MINIMUM_VISUAL_VALUE_BEFORE_SCIENTIFIC_NOTATION = 0.000001;

function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout;
  return function (...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function InputCard({
  inputValue,
  setCurrentInputValue,
  tokenBalance,
}: {
  inputValue: bigint;
  setCurrentInputValue: Dispatch<SetStateAction<bigint>>;
  tokenBalance: bigint;
}) {
  const [outOfFocus, setOutOfFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isInitial, setIsInitial] = useState(true);

  const debouncedHandleInputChange = debounce((inputCurrentValue: bigint) => {
    setCurrentInputValue(inputCurrentValue);
    if (inputRef.current) {
      inputRef.current.value = String(inputCurrentValue);
    }
  }, 100);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    let inputCurrentValue = e.target.value;

    // Remove any non-numeric characters except the decimal point
    inputCurrentValue = inputCurrentValue.replace(/[^0-9.]/g, "");

    // Handle empty input
    if (inputCurrentValue === "") {
      setCurrentInputValue(BigInt(1));
      return;
    }

    // Do not allow decimal value
    if (inputCurrentValue.includes(".")) {
      errorToast("Value must be an integer");
      return;
    }

    // Validate the number with integer
    const numberValue = parseInt(inputCurrentValue);

    if (numberValue < BigInt(1) && numberValue !== 0) {
      errorToast("Value must be greater than or equal to 1");
      if (inputRef.current) {
        inputRef.current.value = "1";
      }
      return;
    }

    if (!isNaN(numberValue) && numberValue >= BigInt(1)) {
      debouncedHandleInputChange(inputCurrentValue);
    }
  }

  const account = useAccount();

  useEffect(() => {
    if (isInitial) {
      if (!account.isConnected) {
        if (inputRef.current) {
          inputRef.current.value = "1";
        }
      } else {
        if (inputRef.current && BigInt(tokenBalance)) {
          inputRef.current.value = String(tokenBalance);
          setCurrentInputValue(tokenBalance);
          setIsInitial(false);
        }
      }
    }
  }, [tokenBalance, account.isConnected]);

  function handleInputOutOfFocus() {
    if (inputRef.current) {
      if (inputRef.current.value === "") {
        inputRef.current.value = "1";
        setCurrentInputValue(BigInt(1));
      }
    }
    setOutOfFocus(true);
  }

  useEffect(() => {
    if (inputValue) {
      if (inputRef.current && inputValue) {
        inputRef.current.value = inputValue.toString();
      }
    }
  }, [inputValue]);

  return (
    <div className="flex flex-col gap-[8px] bg-gradient-to-b from-[#0A1133] to-[#142266] rounded-[6px] px-[12px] py-[16px] w-fit min-w-full border-[1px] border-agyellow z-10">
      <div className="flex justify-center items-center gap-[8px] w-full">
        <div className="flex flex-col justify-center items-start gap-[8px] w-full">
          <form
            onBlur={handleInputOutOfFocus}
            onFocus={(e) => {
              setOutOfFocus(false);
            }}
            onClick={() => {
              setOutOfFocus(false);
              inputRef.current?.focus();
            }}
            style={{
              fontSize: fontsizeClamping(String(inputValue), 7, 16, 32) + "px",
              lineHeight: 32 + "px",
            }}
            className="relative text-agwhite font-extrabold font-sans bg-transparent w-full h-fit flex justify-start items-center min-w-[8ch]"
          >
            <input
              ref={inputRef}
              className="text-agwhite font-extrabold font-sans bg-transparent w-full h-full"
              type="number"
              defaultValue={String(inputValue)}
              max={String(tokenBalance)}
              min={0}
              onBlur={(e) => {
                setOutOfFocus(true);
              }}
              onFocus={(e) => {
                setOutOfFocus(false);
              }}
              style={{
                opacity: outOfFocus ? 0 : 1,
                width: outOfFocus ? "0" : "100%",
                height: outOfFocus ? "0" : "fit-content",
                zIndex: outOfFocus ? 1 : 0,
              }}
              onChange={handleInputChange}
              autoFocus
            />

            <div
              style={{
                opacity: outOfFocus ? 1 : 0,
                width: outOfFocus ? "100%" : "0",
                height: outOfFocus ? "100%" : "0",
                zIndex: outOfFocus ? 0 : 1,
              }}
              className="flex justify-start items-center"
            >
              {inputRef &&
                pointsConverterToUSCommaseparated(
                  Number(inputRef.current?.value),
                )}
            </div>
          </form>
        </div>
        <div className="flex flex-col justify-end items-end gap-[8px]">
          <div
            className={twMerge(
              "flex justify-center items-center gap-[8px] h-full w-fit ml-auto",
            )}
          >
            <Pill
              text={"Dark"}
              iconSrc={IMAGEKIT_ICONS.PILL_DARK_X_CLAIMED}
              iconAlt={"dark"}
            />
          </div>
          {account.isConnected && (
            <div className="flex justify-end items-end gap-[4px]">
              <button
                className="flex justify-center items-center bg-gradient-to-b from-[#B4EBF8] rounded-full to-[#789DFA] p-[1px] box-padding w-fit h-fit"
                onClick={() => {
                  setCurrentInputValue(tokenBalance);
                  if (inputRef.current)
                    inputRef.current.value = tokenBalance.toString();
                }}
              >
                <div className="bg-[#142266] rounded-full w-fit h-fit">
                  <div
                    className={twMerge(
                      "uppercase text-nowrap rounded-full text-[12px] leading-[12px] px-[8px] py-[4px] from-[#B4EBF8] to-[#789DFA] font-general-sans font-semibold bg-gradient-to-b text-transparent",
                      USFormatToNumber(String(inputValue)) <
                        Number(tokenBalance)
                        ? "bg-clip-text text-transparent"
                        : "text-agblack",
                    )}
                  >
                    MAX
                  </div>
                </div>
              </button>
              <a
                href={"/"}
                target="_blank"
                className="flex justify-center items-center bg-gradient-to-b from-[#B4EBF8] rounded-full to-[#789DFA] p-[1px] box-padding w-fit h-fit"
              >
                <div className="bg-[#142266] rounded-full w-fit h-fit">
                  <div className="uppercase text-nowrap rounded-full text-[12px] leading-[12px] px-[8px] py-[4px] from-[#B4EBF8] to-[#789DFA] font-general-sans font-semibold bg-gradient-to-b text-transparent bg-clip-text">
                    Buy More
                  </div>
                </div>
              </a>
            </div>
          )}
        </div>
      </div>
      {account.isConnected && (
        <div
          className={`flex gap-[4px] justify-end items-center text-[16px] leading-[16px] text-agwhite opacity-75 font-general-sans font-semibold text-nowrap`}
        >
          <Image
            src={IMAGEKIT_ICONS.WALLET_WHITE}
            alt="hammer icon"
            width={24}
            height={24}
            className={twMerge("object-cover")}
          />
          {String(tokenBalance)} $DARK
        </div>
      )}
    </div>
  );
}

function fontsizeClamping(
  value: string,
  maxLengthForClamping: number,
  minFontSize: number,
  maxFontSize: number,
) {
  return value?.length >= maxLengthForClamping
    ? maxFontSize - (value?.length - maxLengthForClamping) >= minFontSize
      ? maxFontSize - (value?.length - maxLengthForClamping)
      : minFontSize
    : maxFontSize;
}

export function Card({
  value,
  multiplyer,
  pillIconSrc,
  pillText,
  pillIconAlt,
  onlyValue = false,
  addToWalletLink,
}: {
  isEditable?: boolean;
  value: bigint;
  multiplyer?: string;
  pillIconSrc: string | StaticImport;
  pillText: string;
  dropDownSelected?: number;
  pillIconAlt: string;
  onlyValue?: boolean;
  addToWalletLink?: string;
}) {
  const [currentValue, setCurrentValue] = useState<bigint>(value);
  const targetValueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // if value is not changed withing 300ms, update the value
    const timeout = setTimeout(() => {
      setCurrentValue(value);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  return (
    <div className="flex justify-between gap-[16px] bg-gradient-to-b from-[#0A1133] to-[#142266] rounded-[6px] px-[12px] py-[16px] w-full min-w-full border-[1px] border-agyellow">
      <div className="flex flex-col justify-start items-start gap-[8px] w-full">
        <div
          ref={targetValueRef}
          style={{
            fontSize:
              fontsizeClamping(
                String(USFormatToNumber(String(currentValue))),
                7,
                16,
                32,
              ) + "px",
            lineHeight: 32 + "px",
          }}
          className={` text-agwhite font-extrabold font-sans`}
        >
          {targetValueRef.current && (
            <AutomaticIncreamentalNumberCounterWithString
              from={targetValueRef.current?.textContent ?? "0"}
              // to={USFormatToNumber(currentValue.toString())}
              to={String(currentValue)}
              float={String(currentValue).includes(".")}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-[8px] justify-end items-end my-auto h-fit">
        <Pill
          text={String(pillText)}
          iconSrc={pillIconSrc}
          iconAlt={pillIconAlt}
          imageClassName="mix-blend-multiply"
        />
        {addToWalletLink && (
          <a
            href={addToWalletLink}
            target="_blank"
            className="flex justify-center items-center bg-gradient-to-b from-[#B4EBF8] rounded-full to-[#789DFA] p-[1px] box-padding w-fit h-fit"
          >
            <div className="bg-[#142266] rounded-full w-fit h-fit">
              <div className="uppercase text-nowrap rounded-full text-[12px] leading-[12px] px-[8px] py-[4px] from-[#B4EBF8] to-[#789DFA] font-general-sans font-semibold bg-gradient-to-b text-transparent bg-clip-text">
                Add to wallet
              </div>
            </div>
          </a>
        )}
      </div>
    </div>
  );
}

function Multiplyer({
  journey = 2,
  multiplyer = 33,
  bonus = 1,
}: {
  journey: number;
  bonus: number;
  multiplyer: number;
}) {
  return (
    <div className="grid grid-flow-col place-items-center gap-[8px] mx-auto">
      <div className="relative flex flex-col justify-center items-center p-[8px] rounded-[6px] border border-agyellow overflow-hidden w-fit z-0 h-full">
        <div className="absolute inset-0 opacity-[0.66] bg-agblack -z-[1]"></div>
        <div className="text-[16px] leading-[19.2px] text-agwhite font-extrabold font-sans">
          Minting
        </div>
      </div>
      <div className="relative flex flex-col justify-center items-center p-[8px] rounded-[6px] border border-agyellow overflow-hidden w-fit z-0">
        <div className="absolute inset-0 opacity-[0.66] bg-agblack -z-[1]"></div>
        <div className="text-[16px] leading-[19.2px] text-agwhite font-extrabold font-sans">
          Journey
        </div>
        <div className="text-[32px] leading-[32px] text-agwhite font-extrabold font-sans">
          {journey}
        </div>
      </div>
      <div className="relative flex flex-col justify-center items-center p-[8px] rounded-[6px] border border-agyellow overflow-hidden w-fit z-0">
        <div className="absolute inset-0 opacity-[0.66] bg-agblack -z-[1]"></div>
        <div className="text-[16px] leading-[19.2px] text-agwhite font-extrabold font-sans">
          Multiplier
        </div>
        <div className="text-[32px] leading-[32px] text-agwhite font-extrabold font-sans">
          {multiplyer}X
        </div>
      </div>
      <div className="flex flex-col justify-center items-center p-[8px] overflow-hidden text-agwhite text-[16px] font-semibold font-general-sans w-fit">
        =
      </div>
      <div className="relative flex flex-col justify-center items-center p-[8px] rounded-[6px] border border-agyellow overflow-hidden w-fit z-0">
        <div className="absolute inset-0 opacity-[0.66] bg-agblack -z-[1]"></div>
        <div className="text-[16px] leading-[19.2px] text-agwhite font-extrabold font-sans">
          Bonus
        </div>
        <div className="text-[32px] leading-[32px] text-agwhite font-extrabold font-sans">
          {bonus}X
        </div>
      </div>
    </div>
  );
}

export default function MiningCalculator({
  value,
  setValue,
  multiplyer,
  tokenBalance,
  bonus,
  journey,
}: {
  value: bigint;
  setValue: Dispatch<SetStateAction<bigint>>;
  journey: number;
  multiplyer: number;
  tokenBalance: bigint;
  bonus: number;
}) {
  return (
    <div className="relative flex flex-col gap-[8px] h-fit min-w-[400px] max-w-full scale-[0.9] md:scale-100 z-10">
      <InputCard
        inputValue={value}
        setCurrentInputValue={setValue}
        tokenBalance={tokenBalance}
      />
      <Multiplyer journey={journey} bonus={bonus} multiplyer={multiplyer} />
      <div
        style={{
          gap: "11px",
        }}
        className="flex justify-center items-center"
      >
        <div
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "#FF5001",
            borderRadius: "100px",
          }}
        ></div>
        <div className="text-agblack uppercase tracking-wider text-nowrap font-bold font-general-sans rounded-[6px] backdrop-blur-[4px] bg-[#FEFFFF26] px-[8px] py-[4px]">
          you get:
        </div>
        <div
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "#FF5001",
            borderRadius: "100px",
          }}
        ></div>
      </div>
      <Card
        value={BigInt(value)}
        multiplyer={pointsConverterToUSCommaseparated(multiplyer)}
        pillIconAlt="fuel cells"
        pillIconSrc={IMAGEKIT_ICONS.FUEL_CELL}
        pillText="Fuel Cells"
      />
      <Card
        value={BigInt(value)}
        multiplyer={pointsConverterToUSCommaseparated(multiplyer)}
        pillIconAlt="points"
        pillIconSrc={IMAGEKIT_ICONS.PILL_POINTS}
        pillText="Points"
      />
    </div>
  );
}
