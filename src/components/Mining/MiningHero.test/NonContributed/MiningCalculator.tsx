// "use client";

// import P from "@/components/HTML/P";
// import { twMerge } from "tailwind-merge";
// import { Dispatch, SetStateAction, useEffect, useState } from "react";
// import { IMAGEKIT_ICONS } from "@/assets/imageKit";
// import { StaticImport } from "next/dist/shared/lib/get-img-props";
// import Dropdown from "@/components/Dropdown";
// import Badge from "@/components/Badge";
// import Pill from "@/components/Pill";
// import { TokenDropdownTypes } from "../../types";

// export function InputCard({
//   inputValue,
//   setCurrentInputValue,
//   conversion,
//   dropdownOptions,
//   dropDownSelected,
//   setDropDownSelected,
// }: {
//   inputValue: string;
//   setCurrentInputValue: Dispatch<SetStateAction<string>>;
//   conversion: string;
//   dropdownOptions: TokenDropdownTypes[];
//   dropDownSelected: number;
//   setDropDownSelected: Dispatch<SetStateAction<number>>;
// }) {
//   return (
//     <div className="flex justify-between bg-gradient-to-b from-[#0A1133] to-[#142266] rounded-[6px] px-[12px] py-[16px] w-full border-[1px] border-agyellow">
//       <div className="flex flex-col justify-start items-start gap-[8px] w-full">
//         <input
//           className="text-[32px] leading-[32px] text-agwhite font-extrabold font-sans bg-transparent w-[10ch]"
//           type="text"
//           value={inputValue}
//           onChange={(e) => {
//             let inputCurrentValue = e.target.value;

//             // Remove any non-numeric characters except the decimal point
//             inputCurrentValue = inputCurrentValue.replace(/[^0-9.]/g, "");

//             // Ensure only one decimal point
//             const parts = inputCurrentValue.split(".");
//             if (parts.length > 2) {
//               inputCurrentValue = parts[0] + "." + parts.slice(1).join("");
//             }

//             // Handle empty input
//             if (inputCurrentValue === "") {
//               setCurrentInputValue("0");
//               return;
//             }

//             // Allow input ending with a decimal point
//             if (inputCurrentValue.endsWith(".")) {
//               setCurrentInputValue(inputCurrentValue);
//               return;
//             }

//             // Validate the number
//             const numberValue = parseFloat(inputCurrentValue);

//             if (!isNaN(numberValue) && numberValue >= 0) {
//               setCurrentInputValue(inputCurrentValue);
//             }
//           }}
//         />
//         <P extrabold className="opacity-75">
//           {conversion}
//         </P>
//       </div>
//       <div
//         className={twMerge("flex flex-col justify-center items-center h-full")}
//       >
//         <Dropdown
//           options={dropdownOptions ?? []}
//           selected={dropDownSelected}
//           setSelected={setDropDownSelected}
//         />
//       </div>
//     </div>
//   );
// }

// export function Card({
//   value,
//   conversion,
//   multiplyer,
//   pillIconSrc,
//   pillText,
//   pillIconAlt,
//   onlyValue = false,
// }: {
//   isEditable?: boolean;
//   value: string;
//   conversion: string;
//   multiplyer?: string;
//   pillIconSrc: string | StaticImport;
//   pillText: string;
//   dropDownSelected?: number;
//   pillIconAlt: string;
//   onlyValue?: boolean;
// }) {
//   return (
//     <div className="flex justify-between gap-[16px] bg-gradient-to-b from-[#0A1133] to-[#142266] rounded-[6px] px-[12px] py-[16px] w-fit min-w-full border-[1px] border-agyellow">
//       <div className="flex flex-col justify-start items-start gap-[8px] w-fit">
//         <div className="text-[32px] leading-[32px] text-agwhite font-extrabold font-sans">
//           {value}
//         </div>
//         {onlyValue ? null : (
//           <div className="flex opacity-75 gap-[8px]">
//             <P extrabold>{conversion}</P>
//             <P extrabold>x</P>
//             <P extrabold>{multiplyer}</P>
//             <Badge>Multiplied!</Badge>
//           </div>
//         )}
//       </div>
//       <div className="flex flex-col justify-center items-center">
//         <Pill
//           text={String(pillText)}
//           iconSrc={pillIconSrc}
//           iconAlt={pillIconAlt}
//         />
//       </div>
//     </div>
//   );
// }

// function Multiplyer({
//   era = 2,
//   phase = 1,
//   multiplyer = 33,
// }: {
//   era: 1 | 2 | 3;
//   phase: 1 | 2 | 3;
//   multiplyer: number;
// }) {
//   return (
//     <div className="flex justify-center items-center gap-[8px]">
//       <div className="relative flex flex-col justify-start items-start p-[8px] rounded-[6px] border border-agyellow overflow-hidden w-fit min-w-[80px]">
//         <div className="absolute inset-0 opacity-[0.66] bg-agblack -z-[1]"></div>
//         <div className="text-[16px] leading-[19.2px] text-agwhite font-extrabold font-sans">
//           Era
//         </div>
//         <div className="text-[32px] leading-[32px] text-agwhite font-extrabold font-sans">
//           {era}
//         </div>
//       </div>
//       <div className="relative flex flex-col justify-start items-start p-[8px] rounded-[6px] border border-agyellow overflow-hidden w-fit min-w-[80px]">
//         <div className="absolute inset-0 opacity-[0.66] bg-agblack -z-[1]"></div>
//         <div className="text-[16px] leading-[19.2px] text-agwhite font-extrabold font-sans">
//           Phase
//         </div>
//         <div className="text-[32px] leading-[32px] text-agwhite font-extrabold font-sans">
//           {phase}
//         </div>
//       </div>
//       <div className="flex flex-col justify-start items-start p-[8px] overflow-hidden text-agwhite text-[16px] font-semibold font-general-sans">
//         =
//       </div>
//       <div className="relative flex flex-col justify-start items-start p-[8px] rounded-[6px] border border-agyellow overflow-hidden w-[80%]">
//         <div className="absolute inset-0 opacity-[0.66] bg-agblack -z-[1]"></div>
//         <div className="text-[16px] leading-[19.2px] text-agwhite font-extrabold font-sans">
//           Current Multiplier
//         </div>
//         <div className="text-[32px] leading-[32px] text-agyellow font-extrabold font-sans">
//           {multiplyer}x
//         </div>
//       </div>
//     </div>
//   );
// }

// export function pointsConverterToUSCommaseparated(points: number): string {
//   const [integerPart, decimalPart] = points.toString().split(".");
//   const formattedIntegerPart = integerPart.replace(
//     /\B(?=(\d{3})+(?!\d))/g,
//     ",",
//   );

//   return decimalPart
//     ? `${formattedIntegerPart}.${decimalPart}`
//     : formattedIntegerPart;
// }

// export default function MiningCalculator({
//   value,
//   setValue,
//   conversionRateToUSD,
//   era,
//   phase,
//   multiplyer,
//   inputOptions,
//   setSelectedToken,
// }: {
//   value: number;
//   setValue: Dispatch<SetStateAction<number>>;
//   conversionRateToUSD: number;
//   era: 1 | 2 | 3;
//   phase: 1 | 2 | 3;
//   multiplyer: number;
//   inputOptions: TokenDropdownTypes[];
//   setSelectedToken: Dispatch<SetStateAction<number>>;
// }) {
//   const [currentValue, setCurrentValue] = useState<string>(
//     pointsConverterToUSCommaseparated(value),
//   );
//   const [selectedOption, setSelectedOption] = useState<number>(0);
//   const [USDValue, setUSDValue] = useState(value * inputOptions[0].USDvalue);

//   useEffect(() => {
//     console.log(selectedOption);
//     const value = Number(currentValue.replace(/,/g, ""));
//     if (!isNaN(value) && value >= 0) {
//       const usdValue = value * inputOptions[selectedOption].USDvalue;
//       setUSDValue(Number(usdValue));
//       setValue(value);
//     }
//   }, [currentValue, conversionRateToUSD, selectedOption, inputOptions]);

//   useEffect(() => {
//     setCurrentValue(pointsConverterToUSCommaseparated(value));
//   }, [value]);

//   return (
//     <div className="relative flex flex-col gap-[8px] h-fit w-[400px]">
//       <InputCard
//         inputValue={currentValue}
//         setCurrentInputValue={setCurrentValue}
//         conversion={`$${pointsConverterToUSCommaseparated(USDValue)}`}
//         dropdownOptions={inputOptions}
//         dropDownSelected={selectedOption}
//         setDropDownSelected={setSelectedOption}
//       />
//       <Multiplyer era={era} phase={phase} multiplyer={multiplyer} />
//       <div
//         style={{
//           gap: "11px",
//         }}
//         className="flex justify-center items-center"
//       >
//         <div
//           style={{
//             width: "100%",
//             height: "1px",
//             backgroundColor: "#FF5001",
//             borderRadius: "100px",
//           }}
//         ></div>
//         <div className="text-agwhite uppercase tracking-wider text-nowrap font-bold">
//           So you get both:
//         </div>
//         <div
//           style={{
//             width: "100%",
//             height: "1px",
//             backgroundColor: "#FF5001",
//             borderRadius: "100px",
//           }}
//         ></div>
//       </div>
//       <Card
//         value={pointsConverterToUSCommaseparated(Number(USDValue * multiplyer))}
//         conversion={`$${pointsConverterToUSCommaseparated(USDValue)}`}
//         multiplyer={pointsConverterToUSCommaseparated(multiplyer)}
//         pillIconAlt="points"
//         pillIconSrc={IMAGEKIT_ICONS.PILL_POINTS}
//         pillText="Points"
//       />
//       <Card
//         value={pointsConverterToUSCommaseparated(Number(USDValue * multiplyer))}
//         conversion={`$${pointsConverterToUSCommaseparated(USDValue)}`}
//         multiplyer={pointsConverterToUSCommaseparated(multiplyer)}
//         pillIconAlt="dark x"
//         pillIconSrc={IMAGEKIT_ICONS.PILL_DARK_X}
//         pillText="DARK X"
//       />
//     </div>
//   );
// }
