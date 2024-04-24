import Button from "@/components/Button";
import { HOW_TO, TEST_NETWORK } from "@/constants";
import { checkCorrectNetwork } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FiLoader } from "react-icons/fi";
import { pulsechain, baseSepolia } from "viem/chains";
import { useAccount, useSwitchChain } from "wagmi";
import YouTubeModal from "./YoutubeModal";

type Props = {
  handleRegister: (args0: React.MouseEvent) => void;
  handleLogin: (args0: React.MouseEvent) => void;
  loading: boolean;
  isRegistered: boolean;
  registerIdle: boolean;
  error: boolean;
  setError: (args0: boolean) => void;
};

const Main = ({
  handleLogin,
  handleRegister,
  loading,
  isRegistered,
  registerIdle,
  error,
  setError,
}: Props) => {
  const account = useAccount();
  const [isModalOpen, setModalOpen] = useState(false);

  const switchChain = useSwitchChain();
  const howToId = process.env.NEXT_PUBLIC_HOW_TO_ID;

  return (
    <div className="min-h-screen w-full pb-24 z-20 px-4 sm:px-10 flex items-end sm:max-w-[1280px] justify-center lg:justify-normal">
      <div className="flex flex-col sm:items-center lg:items-start lg:max-w-[700px]">
        <p className="font-black font-sans text-6xl lg:text-8xl text-white sm:text-center lg:text-left">
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
            onClick={
              !loading
                ? account.isConnected
                  ? checkCorrectNetwork(Number(account.chainId))
                    ? handleRegister
                    : () =>
                        switchChain.switchChain({
                          chainId: TEST_NETWORK
                            ? baseSepolia.id
                            : pulsechain.id,
                        })
                  : handleLogin
                : !account.isConnected
                ? handleLogin
                : error
                ? () => {
                    setError(false);
                  }
                : () => {}
            }
          >
            {(account.address && loading && !error) || !registerIdle ? (
              <div className="animate-[spin_2s_ease-out_infinite]">
                <FiLoader />
              </div>
            ) : (
              <div className="relative h-6 w-6">
                <Image
                  src={
                    account.isConnected
                      ? "https://ik.imagekit.io/xlvg9oc4k/Antigravity/pen.svg"
                      : "https://ik.imagekit.io/xlvg9oc4k/Antigravity/wallet.svg"
                  }
                  className="w-6 h-6 lg:w-8 lg:h-8 mr-2"
                  alt="wallet_icon"
                  fill
                />
              </div>
            )}
            {account.isConnected
              ? checkCorrectNetwork(Number(account.chainId))
                ? loading
                  ? !error
                    ? "Checking your Registration"
                    : "Recheck"
                  : !isRegistered
                  ? registerIdle
                    ? "REGISTER NOW"
                    : "Registering..."
                  : ""
                : "Change Network"
              : "CONNECT WALLET"}
          </Button>
          {/* <a href={HOW_TO} target="_blank"> */}
          <Button
            secondary
            className="uppercase w-full"
            onClick={() => setModalOpen(true)}
          >
            <div className="relative h-6 w-6">
              <Image
                src="https://ik.imagekit.io/xlvg9oc4k/Antigravity/info.svg"
                className="lg:w-8 lg:h-8 mr-2"
                alt="info_icon"
                fill
              />
            </div>
            How to contribute
          </Button>
          {/* </a> */}
          <YouTubeModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            videoId={howToId ? howToId : ""}
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
