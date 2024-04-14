"use client";

import { useEffect, useState } from "react";
import TimerBox from "./TimerBox";

const coinsList = [
  {
    name: "PLS",
    icon: "https://ik.imagekit.io/xlvg9oc4k/Antigravity/pls.svg?updatedAt=1713111272613",
  },
  {
    name: "ETH",
    icon: "https://ik.imagekit.io/xlvg9oc4k/Antigravity/eth.svg?updatedAt=1713111241339",
  },
  {
    name: "Tether",
    icon: "https://ik.imagekit.io/xlvg9oc4k/Antigravity/tether.svg?updatedAt=1713111638123",
  },
  {
    name: "USDC",
    icon: "https://ik.imagekit.io/xlvg9oc4k/Antigravity/usdc.svg?updatedAt=1713111648269",
  },
];

interface SuccessFooterProps {
  isSuccess: boolean;
}

const SuccessFooter = ({ isSuccess }: SuccessFooterProps) => {
  return (
    <div className="flex w-full">
      <div className="h-auto w-full">
        <img
          src={"https://ik.imagekit.io/xlvg9oc4k/Antigravity/reg_footer.svg?updatedAt=1713116000414"}
          alt="reg_footer"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute flex p-44 w-full justify-between flex-col">
        {isSuccess && (
          <div className="flex justify-between">
            <div className="flex flex-col">
              <p className="font-black font-sans text-5xl text-agyellow mb-2 text-nowrap">
                Get {process.env.NEXT_PUBLIC_MULTIPLIER}x Points Now!
              </p>
              <button className="flex items-center justify-center font-sans font-extrabold rounded-lg bg-blue px-5 py-2 lg:px-6 lg:py-4 mb-2 lg:mr-4">
                <p className="uppercase">wishwell.base</p>{" "}
                <img src="https://ik.imagekit.io/xlvg9oc4k/Antigravity/share.svg?updatedAt=1713111393185" className="w-4 h-4 ml-2" alt="share" />
              </button>
              <button className="flex items-center justify-center font-sans font-extrabold rounded-lg bg-blue px-5 py-2 lg:px-6 lg:py-4 mb-2 lg:mr-4">
                <p className="uppercase">wishwell.PLS</p>{" "}
                <img src="https://ik.imagekit.io/xlvg9oc4k/Antigravity/share.svg?updatedAt=1713111393185" className="w-4 h-4 ml-2" alt="share" />
              </button>
            </div>
            <div className="flex flex-col mt-3">
              <div className="flex">
                {coinsList.map((coin) => {
                  return (
                    <div className="w-[48px] h-[48px]">
                      <img src={coin.icon} alt={coin.name} />
                    </div>
                  );
                })}
              </div>
              <p className="text-balance w-[400px]">
                As you contribute more, your ERC-721 NFT above will uniquely
                update with future contributions.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuccessFooter;
