"use client";

import { useEffect, useState } from "react";
import TimerBox from "./TimerBox";
import Image from "next/image";
import IMAGEKIT from "./images";
import { RegisterButton } from "./RegisterButton";

interface Props {
  targetTime: string;
  handleRegister: (args0: React.MouseEvent) => void;
  handleLogin: (args0: React.MouseEvent) => void;
  loading: boolean;
  isRegistered: boolean;
  registerIdle: boolean;
  error: boolean;
  setError: (args0: boolean) => void;
}

const Timer = ({
  targetTime,
  handleLogin,
  handleRegister,
  loading,
  isRegistered,
  registerIdle,
  error,
  setError,
}: Props) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // const handleLogin = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   if (openConnectModal) {
  //     openConnectModal();
  //   }
  // };

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
  }, [timeLeft]);

  return (
    <div className="bg-agblack z-10 w-full">
      <div
        className={`flex flex-col pt-12 sm:pt-8 bg-cover bg-center pb-48 sm:pb-8 relative items-center w-full px-2 overflow-hidden`}
        style={{ background: `url(${IMAGEKIT.GRID})` }}
      >
        <div className="flex flex-col gap-8 max-w-[1000px] items-center">
          <div className="w-full flex flex-col gap-4 z-10 items-center">
            <p className="text-5xl text-agwhite font-black font-sans text-center">
              Get {process.env.NEXT_PUBLIC_MULTIPLIER}x Points Now!
            </p>
            {timeLeft && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-fit z-10">
                <TimerBox value={timeLeft?.days} text="days" />
                <TimerBox value={timeLeft?.hours} text="hours" />
                <TimerBox value={timeLeft?.minutes} text="minutes" />
                <TimerBox value={timeLeft?.seconds} text="seconds" />
              </div>
            )}
            {!isRegistered && (
              <RegisterButton
                loading={loading}
                error={error}
                registerIdle={registerIdle}
                handleLogin={handleLogin}
                setError={setError}
                handleRegister={handleRegister}
                isRegistered={isRegistered}
              />
            )}
          </div>

          <div className="absolute -rotate-[15deg] sm:-rotate-[45deg] w-64 h-64 md:w-64 md:h-64 lg:h-[320px] lg:w-[320px] sm:right-0 sm:top-1/2 transform sm:-translate-y-1/2 z-0 -bottom-10">
            <Image src={IMAGEKIT.SHIP} alt="timer-ship" fill />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
