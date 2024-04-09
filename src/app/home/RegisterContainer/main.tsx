import Button from "@/components/Button";
import { TEST_NETWORK } from "@/constants";
import { checkCorrectNetwork } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiLoader } from "react-icons/fi";
import { pulsechain, baseSepolia } from "viem/chains";
import { useAccount, useSwitchChain } from "wagmi";

type Props = {
  handleRegister: (args0: React.MouseEvent) => void;
  handleLogin: (args0: React.MouseEvent) => void;
  loading: boolean;
  isRegistered: boolean;
  registerIdle: boolean;
};

const Main = ({
  handleLogin,
  handleRegister,
  loading,
  isRegistered,
  registerIdle,
}: Props) => {
  const account = useAccount();

  const switchChain = useSwitchChain();

  return (
    <div className="min-h-screen w-full lg:w-1/2 pb-24 z-20 px-32 flex items-end">
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
            onClick={
              !loading
                ? account.isConnected
                  ? checkCorrectNetwork(Number(account.chainId))
                    ? handleRegister
                    : () =>
                        switchChain.switchChain({
                          chainId: TEST_NETWORK ? baseSepolia.id : pulsechain.id,
                        })
                  : handleLogin
                : !account.isConnected
                ? handleLogin
                : () => {}
            }
          >
            {(account.address && loading) || !registerIdle ? (
              <div className="animate-[spin_2s_ease-out_infinite]">
                <FiLoader />
              </div>
            ) : (
              <div className="relative h-6 w-6">
                <Image
                  src={account.isConnected ? "/pen.svg" : "/wallet.svg"}
                  className="w-6 h-6 lg:w-8 lg:h-8 mr-2"
                  alt="wallet_icon"
                  fill
                />
              </div>
            )}
            {account.isConnected
              ? checkCorrectNetwork(Number(account.chainId))
                ? loading
                  ? "Checking your Registration"
                  : !isRegistered
                  ? registerIdle
                    ? "REGISTER NOW"
                    : "Registering..."
                  : ""
                : "Change Network"
              : "CONNECT WALLET"}
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

        <p
          className={`font-sane font-normal text-sm text-agwhite lg:text-xl mt-2 lg:mt-4 text-center lg:text-left ${
            account.isConnected ? "visible" : "invisible"
          }`}
        >
          {`Connected: ${account.address}`}
        </p>
      </div>
    </div>
  );
};

export default Main;
