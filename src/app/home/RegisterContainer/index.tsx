import { useState } from "react";
import Image from "next/image";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Link from "next/link";
import Header from "../Header";
import Registered from "./Registered";
import { mainnet, pulsechain, pulsechainV4, sepolia } from "viem/chains";
import Button from "@/components/Button";
import IMAGEKIT from "../images";

interface RegisterProps {
  isRegistered: boolean;
  handleRegister: () => void;
  isSuccess: boolean;
  handleSuccess: () => void;
}

const Register = ({
  isRegistered,
  handleRegister,
  isSuccess,
  handleSuccess,
}: RegisterProps) => {
  const { openConnectModal } = useConnectModal();
  const account = useAccount();

  const handleLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    if (openConnectModal) {
      openConnectModal();
    }
  };

  const handleCopy = (copyText: string) => {
    navigator.clipboard.writeText(copyText);
  };

  return (
    <div className="flex flex-col relative min-h-screen ">
      <div className="relative min-h-screen w-full">
        <Image
          src={!isRegistered ? IMAGEKIT.HERO_LANDING : IMAGEKIT.REGISTERED}
          alt="bg_hero_reg"
          className="h-full w-full object-cover object-center"
          fill
          quality={10}
        />
      </div>
      <div className="absolute w-full flex items-center justify-center lg:justify-around py-16">
        <Header />
      </div>
      {!isRegistered && !isSuccess ? (
        <div className="w-full lg:w-1/2 absolute bottom-10 lg:bottom-20 lg:left-24">
          <div className="flex flex-col items-center lg:items-start lg:max-w-[700px]">
            <p className="font-black font-sans text-6xl lg:text-8xl text-white text-center lg:text-left">
              Join The Revolution!
            </p>
            {/* <p className="font-normal font-general-sans text-lg lg:text-xl text-white text-center lg:text-left mt-2 lg:mt-4">
              Do you wish there was a project that could help the people take
              back economic power of crypto from banks and governments? <br />
              Contribute now and freely mine, claim, mint, unwrap, and scrape
              crypto.
            </p> */}
            <div className="flex flex-col lg:flex-row mt-3 lg:mt-5">
              <Button
                onClick={account.isConnected ? handleRegister : handleLogin}
              >
                <div className="relative h-6 w-6">
                  <Image
                    src={account.isConnected ? "/pen.svg" : "/wallet.svg"}
                    className="w-6 h-6 lg:w-8 lg:h-8 mr-2"
                    alt="wallet_icon"
                    fill
                  />
                </div>
                {account.isConnected ? "REGISTER NOW" : "CONNECT WALLET"}
              </Button>
              <Link href="/#value">
                <Button secondary>
                  <div className="relative h-6 w-6">
                    <Image
                      src="/info.svg"
                      className="lg:w-8 lg:h-8 mr-2"
                      alt="info_icon"
                      fill
                    />
                  </div>
                  LEARN MORE
                </Button>
              </Link>
            </div>
            {account.isConnected && (
              <p className="font-sane font-normal text-sm text-agwhite lg:text-xl mt-2 lg:mt-4 text-center lg:text-left">
                {`Connected: ${account.address}`}
              </p>
            )}
          </div>
        </div>
      ) : isSuccess ? (
        <div className="absolute w-full flex items-center flex-col mt-72 z-10">
          <p className="font-sans text-8xl font-black text-center text-agwhite">
            Success!
          </p>
          <p className="font-sans text-xl font- mt-4 text-agwhite">
            Here’s your NFT:
          </p>
          <div className="bg-gray-80 p-1 my-4 ml-4">
            <Image
              src="nft.svg"
              alt="nft"
              width={350}
              height={600}
              className="z-10"
            />
          </div>
        </div>
      ) : (
        <Registered handleSuccess={handleSuccess} />
      )}
      {isRegistered && !isSuccess && (
        <div className="flex absolute bottom-20 left-1/2 w-[120vw] bg-agyellow -translate-x-1/2 ">
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
          {/* <div className="flex gap-x-10 absolute">
            <p className="font-sans font-extrabold text-lg text-agblack animate-[marquee_linear_20s_6s_both_infinite]">
              GET 10X POINTS NOW!
            </p>
            <p className="font-sans font-extrabold text-lg text-agblack animate-[marquee_linear_20s_6s_both_infinite]">
              GET 10X POINTS NOW!
            </p>
            <p className="font-sans font-extrabold text-lg text-agblack animate-[marquee_linear_20s_6s_both_infinite]">
              GET 10X POINTS NOW!
            </p>
            <p className="font-sans font-extrabold text-lg text-agblack animate-[marquee_linear_20s_6s_both_infinite]">
              GET 10X POINTS NOW!
            </p>
          </div> */}
        </div>
      )}
      {isSuccess && (
        <div className="relative flex gap-x-16 px-48 pt-56 pb-32 justify-center overflow-hidden">
          <div className="absolute bottom-0 z-1 mix-blend-hard-light">
            <div className="relative w-screen h-[600px]">
              <Image
                src="/feature-bg.svg"
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
            <div>
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
                  className="absolute left-0 z-1 opacity-15"
                />
                <p className="uppercase z-20">wishwell.PLS</p>
                <Image src="/share.svg" alt="share" width={16} height={16} />
              </Button>
            </div>
            I
          </div>
          <div className="flex flex-col gap-y-8 z-10">
            <Image src="networks.svg" alt="networks" height="48" width="240" />
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
      )}
    </div>
  );
};

export default Register;
