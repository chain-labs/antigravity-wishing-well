"use client";

import P from "@/components/HTML/P";
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
import Dropdown from "@/components/Dropdown";
import Badge from "@/components/Badge";
import Pill from "@/components/Pill";
import { TokenDropdownTypes } from "./types";
import Image from "next/image";
import AutomaticIncreamentalNumberCounterWithString from "./AutomaticIncreamentalNumberCounterWithString";
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
}: {
  inputValue: string;
  setCurrentInputValue: Dispatch<SetStateAction<string>>;
  conversion: string;
  dropdownOptions: TokenDropdownTypes[];
  dropDownSelected: number;
  setDropDownSelected: Dispatch<SetStateAction<number>>;
  setSelectedToken: Dispatch<SetStateAction<number>>;
  tokenBalance: string;
}) {
  const [outOfFocus, setOutOfFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentConversion, setCurrentConversion] = useState<string>("");
  const conversionRef = useRef<HTMLDivElement>(null);

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
      if(inputRef.current) {
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
    if (!account.isConnected) {
      if (inputRef.current) {
        inputRef.current.value = "40000";
      }
    } else {
      if (inputRef.current) {
        inputRef.current.value = parseFloat(tokenBalance).toLocaleString();
      }
    }
  }, [tokenBalance, account.isConnected]);

  return (
    <div className="flex justify-between gap-[8px] bg-gradient-to-b from-[#0A1133] to-[#142266] rounded-[6px] px-[12px] py-[16px] w-fit min-w-full border-[1px] border-agyellow z-10">
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

        <P
          ref={conversionRef}
          style={{
            // fontSize: fontsizeClamping(inputValue, 7, 8, 16) + "px",
            fontSize: 16 + "px",
            lineHeight: 16 + "px",
          }}
          extrabold
          className="opacity-75 h-fit flex justify-start items-center w-fit"
        >
          {USFormatToNumber(currentConversion) <
            MINIMUM_VISUAL_VALUE_BEFORE_SCIENTIFIC_NOTATION &&
            USFormatToNumber(currentConversion) !== 0 &&
            "< "}
          {"$"}
          {conversionRef.current && (
            <AutomaticIncreamentalNumberCounterWithString
              from={conversionRef.current?.textContent ?? "0"}
              to={
                USFormatToNumber(currentConversion) <
                  MINIMUM_VISUAL_VALUE_BEFORE_SCIENTIFIC_NOTATION &&
                USFormatToNumber(currentConversion) !== 0
                  ? `${MINIMUM_VISUAL_VALUE_BEFORE_SCIENTIFIC_NOTATION}`
                  : currentConversion
              }
              float={currentConversion.includes(".")}
            />
          )}
        </P>
      </div>
      <div className="flex flex-col justify-end items-end gap-[8px]">
        <div
          className={twMerge(
            "flex justify-center items-center gap-[8px] h-full w-fit ml-auto",
          )}
        >
          <Dropdown
            options={dropdownOptions ?? []}
            selected={dropDownSelected}
            setSelected={setDropDownSelected}
          />
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
            {`${parseFloat(tokenBalance).toLocaleString()} ${dropdownOptions?.[dropDownSelected]?.symbol ?? "Symbol"}`}
          </div>
        )}
        {account.isConnected && (
          <div className="flex justify-end items-end gap-[4px]">
            <button
              className="flex justify-center items-center bg-gradient-to-b from-[#B4EBF8] rounded-full to-[#789DFA] p-[1px] box-padding w-fit h-fit"
              onClick={() => {
                setCurrentInputValue(parseFloat(tokenBalance).toLocaleString());
                if (inputRef.current)
                  inputRef.current.value =
                    parseFloat(tokenBalance).toLocaleString();
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
        {onlyValue ? null : (
          <div className="flex justify-center items-center opacity-75 gap-[8px]">
            <P
              ref={conversionRef}
              style={{
                fontSize:
                  fontsizeClamping(
                    USFormatToNumber(currentConversion) <
                      MINIMUM_VISUAL_VALUE_BEFORE_SCIENTIFIC_NOTATION
                      ? `${MINIMUM_VISUAL_VALUE_BEFORE_SCIENTIFIC_NOTATION}`
                      : currentConversion,
                    7,
                    10,
                    16,
                  ) + "px",
                lineHeight: 16 + "px",
              }}
              extrabold
            >
              {USFormatToNumber(currentConversion) <
                MINIMUM_VISUAL_VALUE_BEFORE_SCIENTIFIC_NOTATION &&
                USFormatToNumber(currentConversion) !== 0 &&
                "< "}
              {"$"}
              {conversionRef.current && (
                <AutomaticIncreamentalNumberCounterWithString
                  from={conversionRef.current?.textContent ?? "0"}
                  to={
                    USFormatToNumber(currentConversion) <
                      MINIMUM_VISUAL_VALUE_BEFORE_SCIENTIFIC_NOTATION &&
                    USFormatToNumber(currentConversion) !== 0
                      ? `${MINIMUM_VISUAL_VALUE_BEFORE_SCIENTIFIC_NOTATION}`
                      : currentConversion
                  }
                  float={currentConversion.includes(".")}
                />
              )}
            </P>
            <P extrabold>x</P>
            <P extrabold>{multiplyer}</P>
            <Badge>Multiplied!</Badge>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-[8px] justify-end items-end my-auto h-fit">
        <Pill
          text={String(pillText)}
          iconSrc={pillIconSrc}
          iconAlt={pillIconAlt}
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
  era = 2,
  phase = 1,
  multiplyer = 33,
}: {
  era: 1 | 2 | 3;
  phase: 1 | 2 | 3;
  multiplyer: number;
}) {
  return (
    <div className="flex justify-center items-center gap-[8px]">
      <div className="relative flex flex-col justify-start items-start p-[8px] rounded-[6px] border border-agyellow overflow-hidden w-fit min-w-[80px] z-0">
        <div className="absolute inset-0 opacity-[0.66] bg-agblack -z-[1]"></div>
        <div className="text-[16px] leading-[19.2px] text-agwhite font-extrabold font-sans">
          Era
        </div>
        <div className="text-[32px] leading-[32px] text-agwhite font-extrabold font-sans">
          {era}
        </div>
      </div>
      <div className="relative flex flex-col justify-start items-start p-[8px] rounded-[6px] border border-agyellow overflow-hidden w-fit min-w-[80px] z-0">
        <div className="absolute inset-0 opacity-[0.66] bg-agblack -z-[1]"></div>
        <div className="text-[16px] leading-[19.2px] text-agwhite font-extrabold font-sans">
          Phase
        </div>
        <div className="text-[32px] leading-[32px] text-agwhite font-extrabold font-sans">
          {phase}
        </div>
      </div>
      <div className="flex flex-col justify-start items-start p-[8px] overflow-hidden text-agwhite text-[16px] font-semibold font-general-sans">
        =
      </div>
      <div className="relative flex flex-col justify-start items-start p-[8px] rounded-[6px] border border-agyellow overflow-hidden w-[80%] z-0">
        <div className="absolute inset-0 opacity-[0.66] bg-agblack -z-[1]"></div>
        <div className="text-[16px] leading-[19.2px] text-agwhite font-extrabold font-sans">
          Current Multiplier
        </div>
        <div className="text-[32px] leading-[32px] text-agyellow font-extrabold font-sans">
          {multiplyer}x
        </div>
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
  selectedToken,
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
  selectedToken: number;
}) {
  const [currentValue, setCurrentValue] = useState<string>(value + "");
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
    if (!account.isConnected) {
      setCurrentValue("40000");
    } else {
      setCurrentValue(tokenBalance);
    }
  }, [tokenBalance, account.isConnected]);

  return (
    <div className="relative flex flex-col gap-[8px] h-fit min-w-[400px] max-w-full scale-[0.8] xs:scale-[0.9] md:scale-100 z-10">
      <InputCard
        inputValue={currentValue}
        setCurrentInputValue={setCurrentValue}
        conversion={pointsConverterToUSCommaseparated(USDValue)}
        dropdownOptions={inputOptions}
        dropDownSelected={selectedOption}
        setDropDownSelected={setSelectedOption}
        tokenBalance={tokenBalance}
        setSelectedToken={setSelectedToken}
      />
      <Multiplyer era={era} phase={phase} multiplyer={multiplyer} />
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
        <div className="text-agwhite uppercase tracking-wider text-nowrap font-bold">
          So you get both:
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
        value={pointsConverterToUSCommaseparated(Number(points.toFixed(20)))}
        conversion={pointsConverterToUSCommaseparated(USDValue)}
        multiplyer={pointsConverterToUSCommaseparated(multiplyer)}
        pillIconAlt="points"
        pillIconSrc={IMAGEKIT_ICONS.PILL_POINTS}
        pillText="Points"
      />
      <Card
        value={pointsConverterToUSCommaseparated(Number(points.toFixed(20)))}
        conversion={pointsConverterToUSCommaseparated(USDValue)}
        multiplyer={pointsConverterToUSCommaseparated(multiplyer)}
        pillIconAlt="dark x"
        pillIconSrc={IMAGEKIT_ICONS.PILL_DARK_X}
        pillText="DARKX"
        
        // add real link
        addToWalletLink="https://app.uniswap.org/#/swap?outputCurrency=0x0Ae055097C6d159879521C384F1D2123D1f195e6"
      />
    </div>
  );
}