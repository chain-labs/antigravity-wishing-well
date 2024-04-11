import Button from "@/components/Button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import IMAGEKIT from "../images";
import { handleCopy } from "../utils";
import { API_ENDPOINT, PROXY_API_ENDPOINT } from "@/constants";
import { getApiNetwork } from "@/utils";
import { useAccount } from "wagmi";
import { FiLoader } from "react-icons/fi";

interface Props {
  tokenId: BigInt;
}

const Success = ({ tokenId }: Props) => {
  const [imageLoading, setImageLoading] = useState(true);
  const account = useAccount();

  useEffect(() => {
    console.log({
      uri: `${PROXY_API_ENDPOINT}svg/${tokenId}?blockchain=${getApiNetwork(
        Number(account.chainId)
      )}`,
    });
  }, [tokenId]);

  const handleLoad = () => {
    setImageLoading(false);
  };

  return (
    <div className="w-full flex items-center flex-col min-h-screen z-20">
      <div className="flex items-center flex-col min-h-screen pt-56">
        <p className="font-sans text-8xl font-black text-center text-agwhite">
          Success!
        </p>
        <p className="font-sans text-xl font- mt-4 text-agwhite">
          Here’s your NFT:
        </p>
        <div className="bg-gray-80 p-1 my-4 ml-4 z-20">
          <img
            src={`${PROXY_API_ENDPOINT}/svg/${tokenId}?blockchain=${getApiNetwork(
              Number(account.chainId)
            )}`}
            alt="nft"
            className={`z-10 ${imageLoading ? "invisible" : "visible"}`}
            onLoad={handleLoad}
          />
          {imageLoading && (
            <div className="bg-gray-600 bg-opacity-75 rounded-lg p-12 flex flex-col items-center justify-center text-2xl text-agwhite gap-2">
              <div className="animate-[spin_2s_ease-out_infinite]">
                <FiLoader size={32} />
              </div>
              Loading...
            </div>
          )}
        </div>
        <div className="relative w-screen flex gap-x-16 px-48 py-12 justify-center">
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
                  className="absolute left-0 z-1 opacity-55"
                />
                <p className="uppercase z-20">wishwell.PLS</p>
                <Image src="/share.svg" alt="share" width={16} height={16} />
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-y-8 z-10">
            <Image src="/networks.svg" alt="networks" height="48" width="240" />
            <p className="font-general-sans text-agwhite text-xl">
              As you contribute more, your{" "}
              <span className="underline ">
                <a
                  href="https://ethereum.org/en/developers/docs/standards/tokens/erc-721/"
                  target="_blank"
                >
                  ERC-721 NFT
                </a>
              </span>{" "}
              above
              <br /> will uniquely update with future contributions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
