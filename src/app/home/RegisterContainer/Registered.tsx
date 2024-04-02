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
        {(account.chainId === mainnet.id || account.chainId === sepolia.id) && (
          <button
            onClick={() => handleCopy("wishwell.eth")}
            className="relative flex items-center gap-x-2 justify-center font-sans font-bold text-agwhite rounded-lg bg-blue px-5 py-2 lg:px-6 lg:py-4 mb-2 lg:mb-0 lg:mr-4 shadow-button"
          >
            <Image
              src="/eth-btn.svg"
              alt="eth-btn"
              width={52}
              height={52}
              className="absolute left-0 z-1"
            />
            <p className="uppercase z-10">wishwell.eth</p>
            <Image src="share.svg" alt="share" width={16} height={16} />
          </button>
        )}
        {(account.chainId === pulsechain.id ||
          account.chainId === pulsechainV4.id) && (
          <button
            onClick={() => handleCopy("wishwell.pls")}
            className="flex items-center gap-x-2 justify-center font-sans font-bold text-agwhite rounded-lg bg-blue px-5 py-2 lg:px-6 lg:py-4 mb-2 lg:mb-0 lg:mr-4 shadow-button"
          >
            <Image
              src="/pls.svg"
              alt="pls-btn"
              width={52}
              height={52}
              className="absolute left-0 z-1"
            />
            <p className="uppercase z-20">wishwell.PLS</p>
            <Image src="share.svg" alt="share" width={16} height={16} />
          </button>
        )}
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
