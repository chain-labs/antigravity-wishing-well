import React, { useEffect, useState } from "react";
import TimerBox from "./TimerBox";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Image from "next/image";

interface Props {
  handleRegister: () => void;
}

const Timer = ({ handleRegister }: Props) => {
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
    const targetDate = new Date("2024-04-01T21:00:00+05:30");
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
    <div className="flex flex-col px-28 py-16 bg-timer bg-cover relative">
      <p className="text-5xl text-agwhite font-black  font-sans capitalize">
        Phase 1 for contributing ends in...
      </p>
      <div className="flex mt-8 gap-x-4">
        <TimerBox value={timeLeft?.days} text="days" />
        <TimerBox value={timeLeft?.hours} text="hours" />
        <TimerBox value={timeLeft?.minutes} text="minutes" />
        <TimerBox value={timeLeft?.seconds} text="seconds" />
      </div>
      <button
        onClick={account.isConnected ? handleRegister : handleLogin}
        className="mt-8 flex items-center gap-x-2 justify-center font-sans font-bold text-agwhite rounded-lg bg-blue px-5 py-2 lg:px-6 lg:py-4 mb-2 lg:mb-0 lg:mr-4 shadow-button self-start"
      >
        <div className="relative h-6 w-6">
          <Image
            src={account.isConnected ? "pen.svg" : "wallet.svg"}
            className="w-6 h-6 lg:w-8 lg:h-8 mr-2"
            alt="wallet_icon"
            fill
          />
        </div>
        {account.isConnected ? "REGISTER NOW" : "CONNECT WALLET"}
      </button>
      <div className="absolute right-40 top-0">
        <div className="relative h-[460px] w-[460px]">
          <Image src="/timer-ship.svg" alt="timer-ship" fill />
        </div>
      </div>
    </div>
  );
};

export default Timer;
