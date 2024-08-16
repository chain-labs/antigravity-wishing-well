"use client";

import { IMAGEKIT_ICONS } from "@/assets/imageKit";
import Button from "@/components/Button";
import CountdownTimer from "@/components/CountdownTimer";
import H1 from "@/components/HTML/H1";
import P from "@/components/HTML/P";
import useTimer from "@/hooks/frontend/useTimer";
import Link from "next/link";

export default function MintingTransitionWait() {
  const timer = useTimer();
  return (
    <div className="h-screen px-[16px] flex flex-col justify-center items-center gap-[24px] pb-[50px] md:pb-[100px]">
      <div className="flex flex-col justify-center md:items-center gap-[8px] mt-auto md:mt-0">
        <H1 className="text-[64px] leading-[64px] md:text-[64px] md:leading-[64px] text-agwhite">
          Minting has started.
        </H1>
        <P className="text-[14px] leading-[20.3px]">
          Mining & Claiming has ended. Thank you for participating. Now you can
          start mint.
        </P>
        <Link href="/minting">
          <Button iconSrc={IMAGEKIT_ICONS.CUBE} innerText="Start Minting" iconAlt="minting" />
        </Link>
      </div>
      <div className="p-[8px] rounded-[6px] bg-[#030404A8]">
        <CountdownTimer state={timer} fontDesktopSize={56} />
      </div>
    </div>
  );
}
