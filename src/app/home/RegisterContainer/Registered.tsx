import Image from "next/image";
import React from "react";

interface Props {
  handleSuccess: () => void;
}

const Registered = ({ handleSuccess }: Props) => {
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
        <button
          onClick={handleSuccess}
          className="flex items-center gap-x-2 justify-center font-sans font-bold text-agwhite rounded-lg bg-blue px-5 py-2 lg:px-6 lg:py-4 mb-2 lg:mb-0 lg:mr-4 shadow-button"
        >
          <p className="uppercase">wishwell.eth</p>{" "}
          <Image src="share.svg" alt="share" width={16} height={16} />
        </button>
        <button
          onClick={handleSuccess}
          className="flex items-center gap-x-2 justify-center font-sans font-bold text-agwhite rounded-lg bg-blue px-5 py-2 lg:px-6 lg:py-4 mb-2 lg:mb-0 lg:mr-4 shadow-button"
        >
          <p className="uppercase">wishwell.PLS</p>{" "}
          <Image src="share.svg" alt="share" width={16} height={16} />
        </button>
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
