import BaseAG from "@/abi/Base";
import BaseSepoliaAG from "@/abi/BaseSepolia";
import PulsechainAG from "@/abi/Pulsechain";
import Button from "@/components/Button";
import { TEST_NETWORK } from "@/constants";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";
import { MarqueeBanner } from "./MarqueeBanner";

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
        <div className="flex flex-col w-full gap-4 sm:flex-row pt-5 justify-center">
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
      <MarqueeBanner />
    </div>
  );
};

export default Registered;
