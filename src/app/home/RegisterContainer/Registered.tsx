import Button from "@/components/Button";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";

const Registered = () => {
  const account = useAccount();

  const handleCopy = (copyText: string) => {
    toast.success("Copied to Clipboard", { duration: 4000 });
    navigator.clipboard.writeText(copyText);
  };

  return (
    <div className="w-full flex items-center flex-col pt-56 h-full overflow-hidden z-20 ">
      <p className="font-sans text-8xl font-black text-center text-agwhite">
        You’re
        <br /> Registered!
      </p>
      <p className="font-general-sans text-xl font- mt-4 text-agwhite">
        Contribute now on Ethereum or Pulse chain to either of our addresses
        below.
      </p>
      <div className="flex lg:flex-row mt-3 lg:mt-5">
        <Button onClick={() => handleCopy("wishwell.eth")}>
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

        <Button onClick={() => handleCopy("wishwell.pls")}>
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

      <div className="flex w-[120vw] bg-agyellow  mt-12">
        <div className="flex gap-x-6">
          <p className="font-sans font-extrabold text-lg text-agblack animate-[marquee_15s_infinite_linear]">
            GET 10X POINTS NOW!
          </p>
          <p className="font-sans font-extrabold text-lg text-agblack animate-[marquee_15s_infinite_linear]">
            GET 10X POINTS NOW!
          </p>
          <p className="font-sans font-extrabold text-lg text-agblack animate-[marquee_15s_infinite_linear]">
            GET 10X POINTS NOW!
          </p>
          <p className="font-sans font-extrabold text-lg text-agblack animate-[marquee_15s_infinite_linear]">
            GET 10X POINTS NOW!
          </p>
          <p className="font-sans font-extrabold text-lg text-agblack animate-[marquee_15s_infinite_linear]">
            GET 10X POINTS NOW!
          </p>
          <p className="font-sans font-extrabold text-lg text-agblack animate-[marquee_15s_infinite_linear]">
            GET 10X POINTS NOW!
          </p>
          <p className="font-sans font-extrabold text-lg text-agblack animate-[marquee_15s_infinite_linear]">
            GET 10X POINTS NOW!
          </p>
          <p className="font-sans font-extrabold text-lg text-agblack animate-[marquee_15s_infinite_linear]">
            GET 10X POINTS NOW!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registered;
