import Button from "@/components/Button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import IMAGEKIT from "../images";
import { handleCopy } from "../utils";
import { API_ENDPOINT, PROXY_API_ENDPOINT, TEST_NETWORK } from "@/constants";
import { getApiNetwork } from "@/utils";
import { useAccount } from "wagmi";
import { FiLoader } from "react-icons/fi";
import axios from "axios";
import BaseSepoliaAG from "@/abi/BaseSepolia";
import BaseAG from "@/abi/Base";
import PulsechainAG from "@/abi/Pulsechain";

interface Props {
  tokenId: BigInt;
}

const Success = ({ tokenId }: Props) => {
  const [imageLoading, setImageLoading] = useState(true);

  const [uri, seturi] = useState("");
  const account = useAccount();

  useEffect(() => {
    console.log({
      uri: `${PROXY_API_ENDPOINT}svg/${tokenId}?blockchain=${getApiNetwork(
        Number(account.chainId)
      )}`,
    });
    fetchImage();
  }, [tokenId, uri]);

  const fetchImage = async () => {
    setImageLoading(true);
    seturi(
      `${PROXY_API_ENDPOINT}svg/${tokenId}?blockchain=${getApiNetwork(
        Number(account.chainId)
      )}`
    );
  };

  const handleLoad = () => {
    setImageLoading(false);
  };

  return (
    <div className="w-full flex items-center flex-col min-h-screen z-20 max-w-[1280px]">
      <div className="flex items-center flex-col min-h-screen pt-48 w-full">
        <p className="font-sans text-6xl sm:text-8xl font-black text-center text-agwhite">
          Success!
        </p>
        <div className="flex justify-between w-80 items-center">
          <p className="font-sans text-xl font- mt-4 text-agwhite">
            Here’s your NFT:
          </p>
          <p
            className="font-sans text-md font- mt-4 text-agwhite/40 underline cursor-pointer"
            onClick={() => {
              seturi("");
            }}
          >
            Refresh
          </p>
        </div>
        <div className="bg-gray-80 p-1 my-4 z-20">
          <img
            src={uri}
            alt="nft"
            // className={`z-10 ${imageLoading ? "invisible" : "visible"}`}
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
        <div className="relative w-full flex flex-col sm:flex-row px-4 gap-10 py-12 justify-between">
          <div className="flex flex-col gap-y-4 flex-1 z-10 sm:w-1/2">
            <h1 className="font-sans text-agyellow text-4xl sm:text-5xl font-black">
              Get {process.env.NEXT_PUBLIC_MULTIPLIER}x Points Now
            </h1>
            <div className="flex flex-col gap-2 sm:gap-y-6">
              <Button
                onClick={() =>
                  handleCopy(
                    TEST_NETWORK ? BaseSepoliaAG.address : BaseAG.address
                  )
                }
                className="self-start overflow-hidden"
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
                className="self-start overflow-hidden"
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
          </div>
          <div className="flex flex-col gap-y-8 z-10 sm:w-5/12 sm:pl-16">
            <Image
              src="https://ik.imagekit.io/xlvg9oc4k/Antigravity/networks.svg"
              alt="networks"
              height="48"
              width="240"
            />
            <p className="font-general-sans text-agwhite sm:text-xl">
              As you contribute more, your{" "}
              <span className="underline ">
                <a
                  href="https://ethereum.org/en/developers/docs/standards/tokens/erc-721/"
                  target="_blank"
                >
                  ERC-721 NFT
                </a>
              </span>{" "}
              above will uniquely update with future contributions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
