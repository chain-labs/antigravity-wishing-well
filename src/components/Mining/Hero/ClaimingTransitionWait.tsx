"use client";

import { IMAGEKIT_ICONS } from "@/assets/imageKit";
import Button from "@/components/Button";
import CountdownTimer from "@/components/CountdownTimer";
import H1 from "@/components/HTML/H1";
import P from "@/components/HTML/P";
import useTimer from "@/hooks/frontend/useTimer";
import Link from "next/link";

export default function ClaimTransitionWait() {
  const timer = useTimer();
  return (
    <div className="h-screen px-[16px] flex flex-col justify-center items-center gap-[24px] pb-[50px] md:pb-[100px]">
      <div className="flex flex-col justify-center md:items-center gap-[8px] mt-auto md:mt-0">
        <H1
          center
          className="text-[64px] leading-[64px] md:text-[64px] md:leading-[64px] text-agwhite text-center md:text-center"
        >
          Mining has ended. <br />
          Thank you for participating.
        </H1>
        <P className="text-[14px] leading-[20.3px]">
          Claim will start after Public Testnet and Bug Bounty
        </P>
        {/* PROD-TODO: update this */}
        <Link href="https://test.agproject.io/">
          <Button
            innerText="Go to Public Testnet"
            iconSrc={IMAGEKIT_ICONS.CUBE}
            iconAlt="Cube Icon"
          />
        </Link>
      </div>
    </div>
  );
}
