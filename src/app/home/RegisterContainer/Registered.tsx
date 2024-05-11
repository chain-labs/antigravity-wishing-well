import BaseAG from "@/abi/Base";
import BaseSepoliaAG from "@/abi/BaseSepolia";
import PulsechainAG from "@/abi/Pulsechain";
import Button from "@/components/Button";
import { TEST_NETWORK } from "@/constants";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

interface Props {
  setPoll: (args0: boolean) => void;
}

const Registered = ({ setPoll }: Props) => {

  const handleCopy = (copyText: string) => {
    setPoll(true);
    toast.success("Copied to Clipboard", { duration: 4000 });
    navigator.clipboard.writeText(copyText);
  };

  return (
    <div className="w-full flex items-center absolute flex-col sm:gap-12 h-full overflow-hidden z-20">
      <div className="w-full flex items-center flex-col h-full overflow-hidden z-20 max-w-[1280px] px-5 justify-center">
        <p className="font-sans text-6xl sm:text-8xl font-black text-center text-agwhite">
          You’re
          <br /> Registered!
        </p>
        <p className="font-general-sans text-center text-xl mt-4 text-agwhite">
          Contribute now on Base or PulseChain to either of our addresses below.
        </p>
        <div className="flex flex-col w-full gap-2 md:gap-0 sm:flex-row pt-5 justify-center">
          <Button
            onClick={() =>
              handleCopy(TEST_NETWORK ? BaseSepoliaAG.address : BaseAG.address)
            }
            className="overflow-hidden"
          >
            <Image
              src="https://ik.imagekit.io/xlvg9oc4k/Antigravity/eth-btn.svg"
              alt="eth-btn"
              width={52}
              height={52}
              className="absolute left-0 z-1"
            />
            <p className="uppercase z-10">wishwell.base</p>
            <Image
              src="https://ik.imagekit.io/xlvg9oc4k/Antigravity/share.svg"
              alt="share"
              width={16}
              height={16}
            />
          </Button>

          <Button
            onClick={() => handleCopy(PulsechainAG.address)}
            className="overflow-hidden"
          >
            <Image
              src="https://ik.imagekit.io/xlvg9oc4k/Antigravity/pls.svg"
              alt="pls-btn"
              width={52}
              height={52}
              className="absolute left-0 z-1 opacity-55"
            />
            <p className="uppercase z-20">wishwell.PLS</p>
            <Image
              src="https://ik.imagekit.io/xlvg9oc4k/Antigravity/share.svg"
              alt="share"
              width={16}
              height={16}
            />
          </Button>
        </div>
        <p className="font-sans text-sm text-agwhite text-center p-4">
          After contributing, please wait a few minutes before we can display
          the NFT
        </p>
        <p className="font-sans text-xl text-agwhite p-4 mt-4 text-center">
          Here are some tokens that we encourage for contribution:
        </p>
        <Image
          src="https://ik.imagekit.io/xlvg9oc4k/Antigravity/networks.svg"
          alt="networks"
          width={176}
          height={32}
        />
      </div>

      <div className="hidden 2xl:flex 2xl:absolute top-0 relative w-screen bg-agyellow overflow-x-hidden">
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


      <div className="hidden xl:flex 2xl:hidden xl:absolute top-0 relative w-screen bg-agyellow overflow-x-hidden">
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

      <div className="hidden lg:flex lg:absolute top-0 xl:hidden relative w-screen bg-agyellow overflow-x-hidden">
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
      
      <div className="hidden md:flex md:absolute top-0 lg:hidden relative w-screen bg-agyellow overflow-x-hidden">
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

      <div className="md:hidden absolute top-0 flex w-screen bg-agyellow overflow-x-hidden">
        <div className="flex justify-evenly w-full animate-[marquee_15s_infinite_linear] whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, index) => (
            <p
              key={index}
              className="font-sans font-extrabold text-lg text-agblack "
            >
              GET {process.env.NEXT_PUBLIC_MULTIPLIER}X POINTS NOW!
            </p>
          ))}
        </div>
        <div className="absolute top-0 flex w-full animate-[marqueeRev_15s_infinite_linear] whitespace-nowrap justify-evenly">
          {Array.from({ length: 2 }).map((_, index) => (
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
