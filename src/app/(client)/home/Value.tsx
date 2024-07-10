// import Image from "next/image";
// import ValueItem from "./ValueItem";
// import IMAGEKIT from "./images";

// const Value = () => {
//   return (
//     <div className="flex flex-col sm:max-h-screen bg-agblack relative items-center overflow-hidden px-4">
//       <div className="absolute top-0 left-0 w-screen h-full mix-blend-luminosity">
//         <div className="relative h-full w-full -z-1">
//           <Image
//             src={IMAGEKIT.VALUE_BG}
//             className="object-value-bg object-cover"
//             alt="value section background"
//             fill
//           />
//         </div>
//       </div>
//       <div className="py-12 z-10 w-full gap-8 flex flex-col sm:max-w-[1280px]">
//         <p className="font-sans text-5xl sm:text-[56px] font-black text-agwhite">
//           The Value Of The Project
//         </p>
//         <div className="flex flex-col gap-6">
//           <div className="grid sm:grid-cols-2 w-full sm:w-fit gap-6">
//             <div>
//               <ValueItem
//                 imgSrc={IMAGEKIT.VALUE_LIMITED_SUPPLY}
//                 imgText="limited_supply"
//                 itemTitle="limited supply / no inflation"
//               />
//             </div>
//             <div>
//               <ValueItem
//                 imgSrc={IMAGEKIT.VALUE_LIMITED_MINTING}
//                 imgText="limited_minting"
//                 itemTitle="limited minting phases"
//               />
//             </div>
//             <div>
//               <ValueItem
//                 imgSrc={IMAGEKIT.VALUE_YIELD}
//                 imgText="yields_rewards"
//                 itemTitle="yield that rewards holders"
//               />
//             </div>
//             <div>
//               <ValueItem
//                 imgSrc={IMAGEKIT.VALUE_GIVEAWAYS}
//                 imgText="giveaway_tokens"
//                 itemTitle="giveaways in liquid tokens"
//               />
//             </div>
//           </div>
//           <div className="grid gap-6 sm:grid-cols-3 w-full sm:w-fit ">
//             <div>
//               <ValueItem
//                 imgSrc={IMAGEKIT.VALUE_TRANSFERABLE}
//                 imgText="transfarrable_nft"
//                 itemTitle="Transferable nfts That have actual cash value"
//               />
//             </div>
//             <div>
//               <ValueItem
//                 imgSrc={IMAGEKIT.VALUE_TOKEN_CRISIS}
//                 imgText="token_crisis"
//                 itemTitle="Programmed Scarcity like you’ve never seen before"
//               />
//             </div>
//             <div>
//               <ValueItem
//                 imgSrc={IMAGEKIT.VALUE_NFT_STORY}
//                 imgText="heart_nft"
//                 itemTitle="nfts with a story and heart behind them"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="h-[800px] w-[800px] sm:h-[700px] sm:w-[700px] absolute bottom-0 sm:-bottom-40 sm:-right-40">
//         <Image
//           src={IMAGEKIT.ROCK_BIG}
//           alt="big rock"
//           fill
//           className="object-cover"
//         />
//       </div>
//     </div>
//   );
// };

// export default Value;
