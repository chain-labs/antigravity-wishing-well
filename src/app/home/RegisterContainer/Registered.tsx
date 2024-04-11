import BaseAG from "@/abi/Base";
import BaseSepoliaAG from "@/abi/BaseSepolia";
import PulsechainAG from "@/abi/Pulsechain";
import Button from "@/components/Button";
import { TEST_NETWORK } from "@/constants";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";

interface Props {
  setPoll: (args0: boolean) => void;
}

const Registered = ({ setPoll }: Props) => {
  const account = useAccount();

  const handleCopy = (copyText: string) => {
    setPoll(true);
    toast.success("Copied to Clipboard", { duration: 4000 });
    navigator.clipboard.writeText(copyText);
  };

  return (
    <div className="w-full flex items-center flex-col gap-12 pt-56 h-full overflow-hidden z-20">
      <div className="w-full flex items-center flex-col h-full overflow-hidden z-20 max-w-[1280px]">
        <p className="font-sans text-8xl font-black text-center text-agwhite">
          You’re
          <br /> Registered!
        </p>
        <p className="font-general-sans text-xl font- mt-4 text-agwhite">
          Contribute now on Base or Pulse chain to either of our addresses
          below.
        </p>
        <div className="flex lg:flex-row mt-3 lg:mt-5">
          <Button
            onClick={() =>
              handleCopy(TEST_NETWORK ? BaseSepoliaAG.address : BaseAG.address)
            }
          >
            <Image
              src="/eth-btn.svg"
              alt="eth-btn"
              width={52}
              height={52}
              className="absolute left-0 z-1"
            />
            <p className="uppercase z-10">wishwell.eth</p>
            <Image src="/share.svg" alt="share" width={16} height={16} />
          </Button>

          <Button onClick={() => handleCopy(PulsechainAG.address)}>
            <Image
              src="/pls.svg"
              alt="pls-btn"
              width={52}
              height={52}
              className="absolute left-0 z-1 opacity-55"
            />
            <p className="uppercase z-20">wishwell.PLS</p>
            <Image src="/share.svg" alt="share" width={16} height={16} />
          </Button>
        </div>
        <p className="font-sans text-sm font- mt-4 text-agwhite">
          After contributing, please wait for few minutes before we can display
          the NFT
        </p>
        <p className="font-sans text-xl font- mt-12 text-agwhite">
          Here are some tokens that we encourage for contribution:
        </p>
        <Image
          src="/networks.svg"
          alt="networks"
          width={176}
          height={32}
          className="mt-4"
        />
      </div>


      <div className="hidden 2xl:flex relative w-screen bg-agyellow mt-12 overflow-x-hidden">
        <div className="flex justify-evenly w-full animate-[marquee_15s_infinite_linear] whitespace-nowrap">
          {Array.from({ length: 7 }).map((_, index) => (
            <p
              key={index}
              className="font-sans font-extrabold text-lg text-agblack "
            >
              GET {process.env.NEXT_PUBLIC_MULTIPLIER}X POINTS NOW!
            </p>
          ))}
        </div>
        <div className="absolute top-0 flex w-full animate-[marqueeRev_15s_infinite_linear] whitespace-nowrap justify-evenly">
          {Array.from({ length: 7 }).map((_, index) => (
            <p
              key={index}
              className="font-sans font-extrabold text-lg text-agblack "
            >
              GET {process.env.NEXT_PUBLIC_MULTIPLIER}X POINTS NOW!
            </p>
          ))}
        </div>
      </div>

      <div className="hidden xl:flex 2xl:hidden relative w-screen bg-agyellow mt-12 overflow-x-hidden">
        <div className="flex justify-evenly w-full animate-[marquee_15s_infinite_linear] whitespace-nowrap">
          {Array.from({ length: 6 }).map((_, index) => (
            <p
              key={index}
              className="font-sans font-extrabold text-lg text-agblack "
            >
              GET {process.env.NEXT_PUBLIC_MULTIPLIER}X POINTS NOW!
            </p>
          ))}
        </div>
        <div className="absolute top-0 flex w-full animate-[marqueeRev_15s_infinite_linear] whitespace-nowrap justify-evenly">
          {Array.from({ length: 6 }).map((_, index) => (
            <p
              key={index}
              className="font-sans font-extrabold text-lg text-agblack "
            >
              GET {process.env.NEXT_PUBLIC_MULTIPLIER}X POINTS NOW!
            </p>
          ))}
        </div>
      </div>

      <div className="hidden lg:flex xl:hidden relative w-screen bg-agyellow mt-12 overflow-x-hidden">
        <div className="flex justify-evenly w-full animate-[marquee_15s_infinite_linear] whitespace-nowrap">
          {Array.from({ length: 5 }).map((_, index) => (
            <p
              key={index}
              className="font-sans font-extrabold text-lg text-agblack "
            >
              GET {process.env.NEXT_PUBLIC_MULTIPLIER}X POINTS NOW!
            </p>
          ))}
        </div>
        <div className="absolute top-0 flex w-full animate-[marqueeRev_15s_infinite_linear] whitespace-nowrap justify-evenly">
          {Array.from({ length: 5 }).map((_, index) => (
            <p
              key={index}
              className="font-sans font-extrabold text-lg text-agblack "
            >
              GET {process.env.NEXT_PUBLIC_MULTIPLIER}X POINTS NOW!
            </p>
          ))}
        </div>
      </div>

      <div className="lg:hidden relative flex w-screen bg-agyellow mt-12 overflow-x-hidden">
        <div className="flex justify-evenly w-full animate-[marquee_15s_infinite_linear] whitespace-nowrap">
          {Array.from({ length: 4 }).map((_, index) => (
            <p
              key={index}
              className="font-sans font-extrabold text-lg text-agblack "
            >
              GET {process.env.NEXT_PUBLIC_MULTIPLIER}X POINTS NOW!
            </p>
          ))}
        </div>
        <div className="absolute top-0 flex w-full animate-[marqueeRev_15s_infinite_linear] whitespace-nowrap justify-evenly">
          {Array.from({ length: 4 }).map((_, index) => (
            <p
              key={index}
              className="font-sans font-extrabold text-lg text-agblack "
            >
              GET {process.env.NEXT_PUBLIC_MULTIPLIER}X POINTS NOW!
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Registered;
