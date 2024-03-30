import { useEffect, useState } from "react";
import TimerBox from "./TimerBox";

const coinsList = [
    {
        name: 'PLS',
        icon: 'pls.svg'
    },
    {
        name: 'ETH',
        icon: 'eth.svg'
    },
    {
        name: 'Tether',
        icon: 'tether.svg'
    },
    {
        name: 'USDC',
        icon: 'usdc.svg'
    }
]

interface SuccessFooterProps {
    isSuccess: boolean;
}
const SuccessFooter = ({ isSuccess }: SuccessFooterProps) => {

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
        <div className='flex w-full'>
            <div className='h-auto w-full'>
                <img
                    src={"reg_footer.svg"}
                    alt="reg_footer"
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="absolute flex p-44 w-full justify-between flex-col">
                {isSuccess && <div className="flex justify-between">
                    <div className="flex flex-col">
                        <p className="font-black font-sans text-5xl text-agyellow mb-2 text-nowrap">
                            Get 10x Points Now!
                        </p>
                        <button className="flex items-center justify-center font-sans font-extrabold rounded-lg bg-blue px-5 py-2 lg:px-6 lg:py-4 mb-2 lg:mr-4">
                            <p className="uppercase">wishwell.eth</p> <img src="share.svg" className="w-4 h-4 ml-2" alt="share" />
                        </button>
                        <button className="flex items-center justify-center font-sans font-extrabold rounded-lg bg-blue px-5 py-2 lg:px-6 lg:py-4 mb-2 lg:mr-4">
                            <p className="uppercase">wishwell.PLS</p> <img src="share.svg" className="w-4 h-4 ml-2" alt="share" />
                        </button>
                    </div>
                    <div className="flex flex-col mt-3">
                        <div className="flex">
                            {coinsList.map((coin) => {
                                return (
                                    <div className="w-[48px] h-[48px]">
                                        <img src={coin.icon} alt={coin.name} />
                                    </div>
                                )
                            })}

                        </div>
                        <p className="text-balance w-[400px]">
                            As you contribute more, your ERC-721 NFT above will uniquely update with future contributions.
                        </p>
                    </div>
                </div>}

                <div className="flex flex-col mt-10">
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

        </div>
    );
};

export default SuccessFooter;