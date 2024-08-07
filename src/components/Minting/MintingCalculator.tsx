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
  conversion,
  dropdownOptions,
  dropDownSelected,
  setDropDownSelected,
  tokenBalance,
  setSelectedToken,
  customSymbol,
}: {
  inputValue: string;
  setCurrentInputValue: Dispatch<SetStateAction<string>>;
  conversion: string;
  dropdownOptions: TokenDropdownTypes[];
  dropDownSelected: number;
  setDropDownSelected: Dispatch<SetStateAction<number>>;
  setSelectedToken: Dispatch<SetStateAction<number>>;
  tokenBalance: string;
  customSymbol?: string;
}) {
  const [outOfFocus, setOutOfFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentConversion, setCurrentConversion] = useState<string>("");
  const conversionRef = useRef<HTMLDivElement>(null);
  const [isInitial, setIsInitial] = useState(true);

  useEffect(() => {
    // if value is not changed withing 300ms, update the value
    const timeout = setTimeout(() => {
      setCurrentConversion(conversion);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [conversion]);

  const debouncedHandleInputChange = debounce((inputCurrentValue: string) => {
    setCurrentInputValue(inputCurrentValue);
    // if (inputRef.current) {
    //   inputRef.current.value = inputCurrentValue;
    // }
  }, 500);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    let inputCurrentValue = e.target.value;

    // Remove any non-numeric characters except the decimal point
    inputCurrentValue = inputCurrentValue.replace(/[^0-9.]/g, "");

    // Ensure only one decimal point
    const parts = inputCurrentValue.split(".");
    if (parts?.length > 2) {
      inputCurrentValue = parts[0] + "." + parts.slice(1).join("");
    }

    // Handle empty input
    if (inputCurrentValue === "") {
      setCurrentInputValue("0");
      return;
    }

    // Allow input ending with a decimal point
    if (inputCurrentValue.endsWith(".")) {
      setCurrentInputValue(inputCurrentValue);
      return;
    }

    // Validate the number
    const numberValue = parseFloat(inputCurrentValue);

    if (numberValue < 0.000001 && numberValue !== 0) {
      errorToast("Value must be greater than 0.000001");
      if (inputRef.current) {
        inputRef.current.value = "0.000001";
      }
      return;
    }

    if (!isNaN(numberValue) && numberValue >= 0) {
      debouncedHandleInputChange(inputCurrentValue);
    }
  }

  useEffect(() => {
    if (dropDownSelected >= 0) {
      setSelectedToken(dropDownSelected);
    }
  }, [dropDownSelected]);

  const account = useAccount();

  useEffect(() => {
    if (isInitial) {
      if (!account.isConnected) {
        if (inputRef.current) {
          inputRef.current.value = "40000";
        }
      }
      // else {
      //   if (inputRef.current && Number(tokenBalance)) {
      //     inputRef.current.value = tokenBalance;
      //     setCurrentInputValue(tokenBalance);
      //     setIsInitial(false);
      //   }
      // }
    }
  }, [tokenBalance, account.isConnected]);

  return (
    <div className="flex flex-col gap-[8px] bg-gradient-to-b from-[#0A1133] to-[#142266] rounded-[6px] px-[12px] py-[16px] w-fit min-w-full border-[1px] border-agyellow z-10">
      <div className="flex justify-center items-center gap-[8px] w-full">
        <div className="flex flex-col justify-center items-start gap-[8px] w-full">
          <form
            onBlur={(e) => {
              setOutOfFocus(true);
            }}
            onFocus={(e) => {
              setOutOfFocus(false);
            }}
            onClick={() => {
              setOutOfFocus(false);
              inputRef.current?.focus();
            }}
            style={{
              fontSize: fontsizeClamping(inputValue, 7, 16, 32) + "px",
              lineHeight: 32 + "px",
            }}
            className="relative text-agwhite font-extrabold font-sans bg-transparent w-full h-fit flex justify-start items-center min-w-[8ch]"
          >
            <input
              ref={inputRef}
              className="text-agwhite font-extrabold font-sans bg-transparent w-full h-full"
              type="number"
              defaultValue={inputValue}
              max={Math.floor(Number(tokenBalance))}
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
                  setCurrentInputValue(tokenBalance.toString());
                  if (inputRef.current)
                    inputRef.current.value = tokenBalance.toString();
                }}
              >
                <div className="bg-[#142266] rounded-full w-fit h-fit">
                  <div
                    className={twMerge(
                      "uppercase text-nowrap rounded-full text-[12px] leading-[12px] px-[8px] py-[4px] from-[#B4EBF8] to-[#789DFA] font-general-sans font-semibold bg-gradient-to-b text-transparent",
                      USFormatToNumber(inputValue) < Number(tokenBalance)
                        ? "bg-clip-text text-transparent"
                        : "text-agblack",
                    )}
                  >
                    MAX
                  </div>
                </div>
              </button>
              <a
                href={dropdownOptions[dropDownSelected]?.buyLink ?? ""}
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
          {`${parseFloat(tokenBalance).toLocaleString()} ${customSymbol ?? dropdownOptions?.[dropDownSelected]?.symbol ?? "TOKEN"}`}
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
  conversion,
  multiplyer,
  pillIconSrc,
  pillText,
  pillIconAlt,
  onlyValue = false,
  addToWalletLink,
}: {
  isEditable?: boolean;
  value: string;
  conversion: string;
  multiplyer?: string;
  pillIconSrc: string | StaticImport;
  pillText: string;
  dropDownSelected?: number;
  pillIconAlt: string;
  onlyValue?: boolean;
  addToWalletLink?: string;
}) {
  const [currentValue, setCurrentValue] = useState<string>(value);
  const targetValueRef = useRef<HTMLDivElement>(null);
  const [currentConversion, setCurrentConversion] =
    useState<string>(conversion);
  const conversionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // if value is not changed withing 300ms, update the value
    const timeout = setTimeout(() => {
      setCurrentValue(value);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [value]);
  useEffect(() => {
    // if value is not changed withing 300ms, update the value
    const timeout = setTimeout(() => {
      setCurrentConversion(conversion);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [conversion]);

  return (
    <div className="flex justify-between gap-[16px] bg-gradient-to-b from-[#0A1133] to-[#142266] rounded-[6px] px-[12px] py-[16px] w-full min-w-full border-[1px] border-agyellow">
      <div className="flex flex-col justify-start items-start gap-[8px] w-full">
        <div
          ref={targetValueRef}
          style={{
            fontSize:
              fontsizeClamping(
                USFormatToNumber(currentValue) <
                  MINIMUM_VISUAL_VALUE_BEFORE_SCIENTIFIC_NOTATION
                  ? `${MINIMUM_VISUAL_VALUE_BEFORE_SCIENTIFIC_NOTATION}`
                  : currentValue,
                7,
                16,
                32,
              ) + "px",
            lineHeight: 32 + "px",
          }}
          className={` text-agwhite font-extrabold font-sans`}
        >
          {USFormatToNumber(currentValue) <
            MINIMUM_VISUAL_VALUE_BEFORE_SCIENTIFIC_NOTATION &&
            USFormatToNumber(currentValue) !== 0 &&
            "< "}
          {targetValueRef.current && (
            <AutomaticIncreamentalNumberCounterWithString
              from={targetValueRef.current?.textContent ?? "0"}
              to={
                USFormatToNumber(currentValue) <
                  MINIMUM_VISUAL_VALUE_BEFORE_SCIENTIFIC_NOTATION &&
                USFormatToNumber(currentValue) !== 0
                  ? `${MINIMUM_VISUAL_VALUE_BEFORE_SCIENTIFIC_NOTATION}`
                  : currentValue
              }
              float={currentValue.includes(".")}
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

export default function MiningCalculator({
  value,
  setValue,
  conversionRateToUSD,
  points,
  era,
  phase,
  multiplyer,
  inputOptions,
  setSelectedToken,
  tokenBalance,
  customSymbol,
  selectedToken,
  txLoading,
}: {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  conversionRateToUSD: number;
  points: number;
  era: 1 | 2 | 3;
  phase: 1 | 2 | 3;
  multiplyer: number;
  inputOptions: TokenDropdownTypes[];
  setSelectedToken: Dispatch<SetStateAction<number>>;
  tokenBalance: string;
  customSymbol?: string;
  selectedToken: number;
  txLoading?: boolean;
}) {
  const [isInitialBalance, setIsInitialBalance] = useState(true);
  const [currentValue, setCurrentValue] = useState<string>("1");
  const [selectedOption, setSelectedOption] = useState<number>(selectedToken);
  const [USDValue, setUSDValue] = useState(
    value * (inputOptions[0]?.USDvalue || 0),
  );
  const account = useAccount();

  useEffect(() => {
    setSelectedOption(selectedToken);
  }, [selectedToken]);

  useEffect(() => {
    const value = Number(currentValue.replace(/,/g, ""));
    if (!isNaN(value) && value >= 0) {
      const usdValue = value * (inputOptions[selectedOption]?.USDvalue || 0);
      setUSDValue(Number(usdValue));
      setValue(value);
    }
  }, [
    currentValue,
    conversionRateToUSD,
    selectedOption,
    inputOptions,
    tokenBalance,
  ]);

  useEffect(() => {
    setCurrentValue(pointsConverterToUSCommaseparated(value));
  }, [value]);

  useEffect(() => {
    if (isInitialBalance) {
      if (!account.isConnected) {
        setCurrentValue("40000");
      } else {
        setCurrentValue(tokenBalance);
        setValue(Number(tokenBalance));
        setIsInitialBalance(false);
      }
    }
  }, [tokenBalance, account.isConnected, isInitialBalance]);

  useEffect(() => {
    console.log({ value, currentValue });
  }, [value, currentValue]);

  return (
    <div className="relative flex flex-col gap-[8px] h-fit min-w-[400px] max-w-full scale-[0.9] md:scale-100 z-10">
      <InputCard
        inputValue={currentValue}
        setCurrentInputValue={setCurrentValue}
        conversion={pointsConverterToUSCommaseparated(USDValue)}
        dropdownOptions={inputOptions}
        dropDownSelected={selectedOption}
        setDropDownSelected={setSelectedOption}
        tokenBalance={tokenBalance}
        customSymbol={customSymbol}
        setSelectedToken={setSelectedToken}
      />
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
        value={pointsConverterToUSCommaseparated(
          Number(Number(currentValue).toFixed(20)),
        )}
        conversion={pointsConverterToUSCommaseparated(USDValue)}
        multiplyer={pointsConverterToUSCommaseparated(multiplyer)}
        pillIconAlt="fuel cells"
        pillIconSrc={IMAGEKIT_ICONS.FUEL_CELL}
        pillText="Fuel Cells"
      />
    </div>
  );
}
