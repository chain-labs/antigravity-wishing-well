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
import toast from "react-hot-toast";
import Success from "./Success";
import Main from "./main";

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
    <div className="flex flex-col relative z-0 min-h-screen">
      <div className="fixed top-0 left-0 min-h-screen h-[916px] w-screen">
        <div className="relative min-h-screen h-[916px] w-full">
          <Image
            src={!isRegistered ? IMAGEKIT.HERO_LANDING : IMAGEKIT.REGISTERED}
            alt="bg_hero_reg"
            className="object-cover object-center"
            fill
            priority
          />
        </div>
      </div>
      <div className="absolute w-full flex items-center justify-center lg:justify-around py-16">
        <Header />
      </div>
      {!isRegistered && !isSuccess ? (
        <Main handleLogin={handleLogin} handleRegister={handleRegister} />
      ) : isSuccess ? (
        <Success />
      ) : (
        <Registered handleSuccess={handleSuccess} />
      )}
    </div>
  );
};

export default Register;
