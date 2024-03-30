import { useEffect, useState } from "react";
import TimerBox from "./TimerBox";

const Timer = () => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft(): { days: number, hours: number, minutes: number, seconds: number } {
        const targetDate = new Date('2024-04-02T00:00:00Z');
        const currentDate = new Date();
        const difference = targetDate.getTime() - currentDate.getTime();
        let timeLeft = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / (1000 * 60)) % 60),
                seconds: Math.floor((difference / 1000) % 60)
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
        <div className="flex flex-col">
            <div className='h-auto w-full'>
                <img
                    src="timer.svg"
                    alt="timer"
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="absolute p-24">
                <p className="text-5xl font-black font-sans capitalize">
                    Phase 1 for contributing ends in...
                </p>
                <div className="flex mt-8">
                    <TimerBox value={timeLeft?.days} text="days" />
                    <TimerBox value={timeLeft?.hours} text="hours" />
                    <TimerBox value={timeLeft?.minutes} text="minutes" />
                    <TimerBox value={timeLeft?.seconds} text="seconds" />
                </div>
            </div>


        </div>
    );
};

export default Timer;