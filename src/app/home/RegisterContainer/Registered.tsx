import Button from "@/components/Button";
import Image from "next/image";
import React from "react";
import { mainnet, pulsechain, pulsechainV4, sepolia } from "viem/chains";
import { useAccount } from "wagmi";

interface Props {
  handleSuccess: () => void;
}

const Registered = ({ handleSuccess }: Props) => {
  const account = useAccount();

  const handleCopy = (copyText: string) => {
    navigator.clipboard.writeText(copyText);
  };

  return (
    <div className="absolute w-full flex items-center flex-col mt-72">
      <p className="font-sans text-8xl font-black text-center text-agwhite">
        You’re
        <br /> Registered!
      </p>
      <p className="font-general-sans text-xl font- mt-4 text-agwhite">
        Contribute now on Ethereum or Pulse chain to either of our addresses
        below.
      </p>
      <div className="flex lg:flex-row mt-3 lg:mt-5">
        <Button>
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
            className="absolute left-0 z-1 opacity-25"
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
    </div>
  );
};

export default Registered;
