import { useState } from "react";
import Header from "./Header";
import Image from "next/image";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

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

  return (
    <div className="flex relative min-h-screen">
      <div className="relative min-h-screen w-full">
        <Image
          src={isRegistered ? "reg_bg.svg" : "bg_hero_reg.svg"}
          alt="bg_hero_reg"
          className="h-full w-full object-cover"
          fill
          quality={10}
        />
      </div>
      <div className="absolute w-full flex items-center justify-center lg:justify-around py-24">
        <Header />
      </div>
      {!isRegistered && !isSuccess ? (
        <div className="w-full lg:w-1/2 absolute bottom-10 lg:bottom-20 lg:left-24">
          <div className="flex flex-col items-center lg:items-start lg:max-w-[700px]">
            <p className="font-black font-sans text-6xl lg:text-8xl text-white text-center lg:text-left">
              Join The Revolution!
            </p>
            <p className="font-normal font-general-sans text-lg lg:text-xl text-white text-center lg:text-left mt-2 lg:mt-4">
              Do you wish there was a project that could help the people take
              back economic power of crypto from banks and governments? <br />
              Contribute now and freely mine, claim, mint, unwrap, and scrape
              crypto.
            </p>
            <div className="flex flex-col lg:flex-row mt-3 lg:mt-5">
              <button
                onClick={account.isConnected ? handleRegister : handleLogin}
                className="flex items-center gap-x-2 justify-center font-sans font-bold text-agwhite rounded-lg bg-blue px-5 py-2 lg:px-6 lg:py-4 mb-2 lg:mb-0 lg:mr-4 shadow-button"
              >
                <div className="relative h-6 w-6">
                  <Image
                    src={account.isConnected ? "pen.svg" : "wallet.svg"}
                    className="w-6 h-6 lg:w-8 lg:h-8 mr-2"
                    alt="wallet_icon"
                    fill
                  />
                </div>
                {account.isConnected ? "REGISTER NOW" : "CONNECT WALLET"}
              </button>
              <button className="flex items-center gap-x-2 justify-center font-sans text-agwhite font-bold rounded-lg bg-agblack bg-opacity-65 px-5 py-2 lg:px-6 lg:py-4 shadow-button">
                <div className="relative h-6 w-6">
                  <Image
                    src="info.svg"
                    className="lg:w-8 lg:h-8 mr-2"
                    alt="info_icon"
                    fill
                  />
                </div>
                LEARN MORE
              </button>
            </div>
            {account.isConnected && (
              <p className="font-sane font-normal text-sm text-agwhite lg:text-xl mt-2 lg:mt-4 text-center lg:text-left">
                {`Connected: ${account.address}`}
              </p>
            )}
          </div>
        </div>
      ) : isSuccess ? (
        <div className="absolute w-full flex items-center flex-col mt-72">
          <p className="font-sans text-8xl font-black text-center">Success!</p>
          <p className="font-sans text-xl font- mt-4">Here’s your NFT:</p>
          <div className="bg-gray-800 text-white bg-gradient-to-r from-brblue via-brred p-1 my-4 ml-4">
            <div className="bg-agblack w-[272px] flex flex-col items-center p-4">
              <div className="h-[52px] w-[172px]">
                <img src="title.svg" alt="title" className="h-full w-full" />
              </div>
              <div className="border-b-4 bg-gradient-to-r p-1 w-full from-brblue via-brred" />
              <div className="p-4 mb-2 flex flex-col items-start bg-bgblue w-full m-4">
                <p className="text-base font-sans font-bold text-agwhite uppercase">
                  Ethereum
                </p>
                <p className="text-3xl font-sans font-blank">0.4151 ETH</p>
                <p className="text-base font-sans font-bold">0.4151 ETH</p>
              </div>
              <div className="p-4 mb-2 flex flex-col items-start bg-bgblue w-full">
                <p className="text-base font-sans font-bold text-agwhite uppercase">
                  BITCOIN
                </p>
                <p className="text-3xl font-sans font-blank">0.1423 BTC</p>
                <p className="text-base font-sans font-bold">$2,545.65</p>
              </div>
              <div className="p-4 mb-2 flex flex-col items-start bg-bgblue w-full">
                <p className="text-base font-sans font-bold text-agwhite uppercase">
                  TOTAL Value
                </p>
                <p className="text-3xl font-sans font-blank">$4,141.56</p>
                <p className="text-base font-sans font-bold text-agwhite uppercase">
                  TOTAL Points
                </p>
                <p className="text-3xl font-sans font-blank">41,415.65</p>
              </div>
              <div className="p-4 flex flex-col items-start w-full">
                <p className="text-base font-sans font-bold text-agwhite uppercase">
                  Transaction Details
                </p>
                <div className="text-base font-sans font-blank text-agwhite">
                  <p>10 Points / $1</p>
                  <p>Transaction ID:</p>
                  <p className="whitespace-normal break-words font-sans text-base w-[200px]">
                    0x22d1219b09fc08e46273f0f354ba208c93eb07f897aeeeedff7ab6ebddab7e5A
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute w-full flex items-center flex-col mt-96">
          <p className="font-sans text-8xl font-black text-center">
            You’re
            <br /> Registered!
          </p>
          <p className="font-sans text-xl font- mt-4">
            Contribute now on Ethereum or Pulse chain to either of our addresses
            below.
          </p>
          <div className="flex lg:flex-row mt-3 lg:mt-5">
            <button
              onClick={handleSuccess}
              className="flex items-center justify-center font-sans font-extrabold rounded-lg bg-blue px-5 py-2 lg:px-6 lg:py-4 mb-2 lg:mb-0 lg:mr-4"
            >
              <p className="uppercase">wishwell.eth</p>{" "}
              <img src="share.svg" className="w-4 h-4 ml-2" alt="share" />
            </button>
            <button
              onClick={handleSuccess}
              className="flex items-center justify-center font-sans font-extrabold rounded-lg bg-blue px-5 py-2 lg:px-6 lg:py-4 mb-2 lg:mb-0 lg:mr-4"
            >
              <p className="uppercase">wishwell.PLS</p>{" "}
              <img src="share.svg" className="w-4 h-4 ml-2" alt="share" />
            </button>
          </div>
          <p className="font-sans text-xl font- mt-4">
            Here are some tokens that we encourage for contribution:
          </p>
        </div>
      )}
    </div>
  );
};

export default Register;
