import React, { useEffect, useState } from "react";
import TimerBox from "./TimerBox";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Image from "next/image";
import Button from "@/components/Button";
import IMAGEKIT from "./images";

interface Props {
  handleRegister: () => void;
  targetTime: string;
  isRegistered: boolean;
}

const Timer = ({ handleRegister, targetTime, isRegistered }: Props) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const { openConnectModal } = useConnectModal();
  const account = useAccount();

  const handleLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    if (openConnectModal) {
      openConnectModal();
    }
  };

  function calculateTimeLeft(): {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } {
    const targetDate = new Date(targetTime);
    const currentDate = new Date();
    const difference = targetDate.getTime() - currentDate.getTime();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="bg-agblack z-10 w-full">
      <div
        className={`flex flex-col px-5 pt-16 bg-cover relative items-center w-full pb-48 sm:pb-16`}
        style={{ background: `url(${IMAGEKIT.GRID})` }}
      >
        <div className="flex flex-col gap-8 max-w-[1280px] md:w-3/4">
          <div className="w-fit flex flex-col gap-8">
            <p className="text-4xl lg:text-5xl text-agwhite font-black font-sans capitalize">
              Don't miss out on getting points multiplier...
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full z-10">
              <TimerBox value={timeLeft?.days} text="days" />
              <TimerBox value={timeLeft?.hours} text="hours" />
              <TimerBox value={timeLeft?.minutes} text="minutes" />
              <TimerBox value={timeLeft?.seconds} text="seconds" />
            </div>
          </div>
          {!isRegistered && (
            <Button
              onClick={account.isConnected ? handleRegister : handleLogin}
              className="self-start w-full sm:w-fit z-10"
            >
              <div className="relative h-6 w-6">
                <Image
                  src={
                    account.isConnected
                      ? "https://ik.imagekit.io/xlvg9oc4k/Antigravity/pen.svg"
                      : "https://ik.imagekit.io/xlvg9oc4k/Antigravity/wallet.svg"
                  }
                  className="w-3 h-3 lg:w-8 lg:h-8 mr-2"
                  alt="wallet_icon"
                  fill
                />
              </div>
              {account.isConnected
                ? !isRegistered
                  ? "REGISTER NOW"
                  : ""
                : "CONNECT WALLET"}
            </Button>
          )}
          <div className="absolute w-64 h-64 md:w-64 md:h-64 lg:h-[460px] lg:w-[460px] sm:right-16 sm:top-0 transform z-0 translate-x-10 -bottom-10">
            <Image src={IMAGEKIT.SHIP} alt="timer-ship" fill />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
