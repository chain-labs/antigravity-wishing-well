// import React, { MouseEvent, useMemo } from "react";
// import H1 from "../HTML/H1";
// import H3 from "../HTML/H3";

// export const MINTING_STATES = {
//   INITIAL: "INITIAL",
//   APPROVAL: "APPROVAL",
//   MINT: "MINT",
//   RECEIPT: "RECEIPT",
//   SUCCESS: "SUCCESS",
// };

// const MintingHero = () => {
//   const [mintState, setMintState] = useState<string>(MINTING_STATES.INITIAL);
//   const [txLoading, setTxLoading] = useState(false);
//   const [darkInput, setDarkInput] = useState(1);

//   const { darkBalance, mintLogic, allowance } = useMinting(
//     darkInput,
//     setMintState,
//     setTxLoading,
//   );
//   const { openConnectModal } = useConnectModal();
//   const account = useAccount();

//   const buttonConfigs = useMemo(() => {
//     switch (mintState) {
//       case MINTING_STATES.INITIAL:
//         return {
//           text: "Approve Contract",
//           loading: false,
//           disabled: false,
//           icon: IMAGEKIT_ICONS.TICK,
//         };
//       case MINTING_STATES.APPROVAL:
//         return {
//           text: "Approving",
//           loading: true,
//           disabled: true,
//           icon: IMAGEKIT_ICONS.CUBE,
//         };
//       case MINTING_STATES.MINT:
//         return {
//           text: txLoading ? "Minting" : "Mint Now",
//           loading: txLoading,
//           disabled: txLoading,
//           icon: IMAGEKIT_ICONS.CUBE,
//         };

//       case MINTING_STATES.RECEIPT:
//         return {
//           text: "BUILDING FUEL CELLS",
//           loading: true,
//           disabled: true,
//           icon: IMAGEKIT_ICONS.CUBE,
//         };

//       case MINTING_STATES.SUCCESS:
//         return {
//           text: "Minted Fuel Cells!",
//           loading: false,
//           disabled: false,
//           icon: IMAGEKIT_ICONS.CUBE,
//         };

//       default:
//         return {
//           text: "Approve Contract",
//           loading: false,
//           disabled: false,
//           icon: IMAGEKIT_ICONS.CUBE,
//         };
//     }
//   }, [mintState]);

//   const handleMintButton = (e: MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     mintLogic();
//   };

//   return (
//     <div className="pt-56 flex flex-col items-center gap-y-4">
//       <H1>Minting Dev</H1>
//       <input
//         type="number"
//         min="1"
//         max={darkBalance}
//         step={1}
//         onChange={(e) => {
//           // @ts-ignore
//           setDarkInput(Number(e.target.value) || 0);
//         }}
//         value={darkInput || ""}
//         className="w-48 px-2 py-2"
//         placeholder="Enter number of Dark"
//       />
//       <H3>
//         You have <span className="text-yellow-300">{darkBalance} $Dark</span>{" "}
//         Tokens
//       </H3>
//       <H3>
//         You&apos;ll get <span className="text-blue">{darkInput} Fuel Cell</span>{" "}
//         Tokens
//       </H3>
//       {account.isConnected ? (
//         <Button
//           innerText={buttonConfigs.text}
//           loading={buttonConfigs.loading}
//           iconPosition="start"
//           iconAlt="mint-btn-icon"
//           iconSrc={buttonConfigs.icon}
//           animateButton
//           disabled={buttonConfigs.disabled}
//           onClick={handleMintButton}
//         />
//       ) : (
//         <Button
//           innerText="CONNECT WALLET"
//           iconPosition="start"
//           iconSrc={IMAGEKIT_ICONS.WALLET_WHITE}
//           onClick={openConnectModal}
//         />
//       )}
//       <Stepper state={mintState} txLoading={txLoading} />
//     </div>
//   );
// };

// export default MintingHero;

// import { useState } from "react";
// import { twMerge } from "tailwind-merge";

// import Button from "../Button";
// import { IMAGEKIT_ICONS } from "@/assets/imageKit";
// import { useAccount } from "wagmi";
// import { useConnectModal } from "@rainbow-me/rainbowkit";
// import useMinting from "../Minting/useMinting";

// const Stepper = ({
//   state,
//   txLoading,
// }: {
//   state: string;
//   txLoading: boolean;
// }) => {
//   const textColors = useMemo(() => {
//     switch (state) {
//       case MINTING_STATES.INITIAL:
//         return {
//           approve: "text-white",
//           arrow1: "text-white",
//           mint: "text-white",
//           arrow2: "text-white",
//           success: "text-white",
//         };
//       case MINTING_STATES.APPROVAL:
//         return {
//           approve: "text-yellow-400",
//           arrow1: "text-white",
//           mint: "text-white",
//           arrow2: "text-white",
//           success: "text-white",
//         };
//       case MINTING_STATES.MINT:
//         return {
//           approve: "text-green-400",
//           arrow1: "text-green-400",
//           mint: txLoading ? "text-yellow-400" : "text-white",
//           arrow2: "text-white",
//           success: "text-white",
//         };
//       case MINTING_STATES.RECEIPT:
//         return {
//           approve: "text-green-400",
//           arrow1: "text-green-400",
//           mint: "text-green-400",
//           arrow2: "text-green-400",
//           success: "text-yellow-400",
//         };
//       case MINTING_STATES.SUCCESS:
//         return {
//           approve: "text-green-400",
//           arrow1: "text-green-400",
//           mint: "text-green-400",
//           arrow2: "text-green-400",
//           success: "text-green-400",
//         };
//     }
//   }, [state]);

//   return (
//     <div className="flex flex-col items-center gap-4">
//       <div className="flex items-center">
//         <H3>
//           <span className={twMerge(textColors?.approve)}>Approve</span>
//         </H3>
//         <H3>
//           <span className={twMerge(textColors?.arrow1)}>{"-->"}</span>
//         </H3>
//         <H3>
//           <span className={twMerge(textColors?.mint)}>Mint</span>
//         </H3>
//         <H3>
//           <span className={twMerge(textColors?.arrow2)}>{"-->"}</span>
//         </H3>
//         <H3>
//           <span className={twMerge(textColors?.success)}>Success</span>
//         </H3>
//       </div>
//     </div>
//   );
// };
