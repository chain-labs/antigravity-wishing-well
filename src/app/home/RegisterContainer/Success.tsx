import Button from "@/components/Button";
import Image from "next/image";
import React from "react";
import IMAGEKIT from "../images";
import { handleCopy } from "../utils";

const Success = () => {
  return (
    <div className="w-full flex items-center flex-col pt-56 z-20">
      <p className="font-sans text-8xl font-black text-center text-agwhite">
        Success!
      </p>
      <p className="font-sans text-xl font- mt-4 text-agwhite">
        Here’s your NFT:
      </p>
      <div className="bg-gray-80 p-1 my-4 ml-4 z-20">
        <Image
          src="/nft.svg"
          alt="nft"
          width={350}
          height={600}
          className="z-10"
        />
      </div>
      <div className="relative w-screen flex gap-x-16 px-48 pt-56 pb-32 -mt-48 justify-center overflow-hidden bg-agblack z-10">
        <div className="absolute bottom-0 z-1 mix-blend-hard-light">
          <div className="relative w-screen h-[600px]">
            <Image
              src={IMAGEKIT.STARS_BG}
              alt="feature-bg"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-4 flex-1 z-10">
          <h1 className="font-sans text-agyellow text-5xl font-black">
            Get 10x Points Now
          </h1>
          <div className="flex flex-col gap-y-6">
            <Button
              onClick={() => handleCopy("wishwell.eth")}
              className="self-start"
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
            <Button
              onClick={() => handleCopy("wishwell.pls")}
              className="self-start"
            >
              <Image
                src="/pls.svg"
                alt="pls-btn"
                width={52}
                height={52}
                className="absolute left-0 z-1 opacity-15"
              />
              <p className="uppercase z-20">wishwell.PLS</p>
              <Image src="/share.svg" alt="share" width={16} height={16} />
            </Button>
          </div>
          I
        </div>
        <div className="flex flex-col gap-y-8 z-10">
          <Image src="/networks.svg" alt="networks" height="48" width="240" />
          <p className="font-general-sans text-agwhite text-xl">
            As you contribute more, your{" "}
            <span className="underline ">
              <a>ERC-721 NFT</a>
            </span>{" "}
            above
            <br /> will uniquely update with future contributions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Success;
