import Image from "next/image";
import { useEffect, useState } from "react";
import { IoMenu, IoCloseCircleOutline } from "react-icons/io5";
import { UserConnected } from "./UserConnected";
import IMAGEKIT from "../../../../app/home/images";
import { motion, AnimatePresence } from "framer-motion";
import { RegisterButton } from "./RegisterButton";
import P from "../../../HTML/P";
import toast from "react-hot-toast";
import useContract from "@/abi/wishwell";
import { PublicClient, parseAbiItem } from "viem";
import axios from "axios";
import {
  POLL_TIME,
  PROXY_API_ENDPOINT,
  TEST_NETWORK,
  TIMER,
} from "@/constants";
import { checkCorrectNetwork, getApiNetwork } from "@/utils";
import { base } from "viem/chains";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  usePublicClient,
  useReadContract,
  useTransactionReceipt,
  useWriteContract,
} from "wagmi";
import Button from "@/components/Button";
import { IMAGEKIT_ICONS } from "@/assets/imageKit";

// Use a function to get the latest block number
async function getLatestBlockNumber(publicClient: PublicClient) {
  const block = await publicClient.getBlockNumber();
  return block;
}

const Header = () => {
	// about section dropdown
	const [aboutSectionOpen, setAboutSectionOpen] = useState(false);

	const [isRegistered, setIsRegistered] = useState<boolean>(false);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	// const [payableAmount, setPayableAmount] = useState(0);
	const [tokenId, setTokenId] = useState<BigInt>(BigInt(0));
	const [poll, setPoll] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);
	const AntiGravity = useContract();
	const publicClient = usePublicClient();
	const { openConnectModal } = useConnectModal();

  const [isOpen, setIsOpen] = useState(false);
  // const [currentChain, setCurrentChain] = useState("");

  const account = useAccount();

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

	const toggleMenu = () => {
		setIsOpen(!isOpen);
		setAboutSectionOpen(false);
	};

  const handleLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    if (openConnectModal) {
      openConnectModal();
    }
  };

  return (
    <motion.header
      whileInView={{ y: 0 }}
      initial={{ y: -50 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 1.5 }}
      className="flex flex-col h-full w-full max-[1200px] items-center justify-center gap-3 z-50 font-extrabold"
    >
      <div className="flex text-agwhite w-full xl:w-3/4 max-w-[800px] xl:max-w-full h-14 xl:h-[72px] rounded-lg bg-gradient-to-tr from-brred to-blue p-[2px] overflow-hidden">
        <div className="w-full h-full bg-agblack flex items-center justify-between rounded-lg gap-6 px-4">
          {/* Desktop View */}
          <div className="hidden xl:flex xl:flex-grow xl:items-center h-full xl:justify-between xl:gap-x-6">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => {
                if (window.location.pathname !== "/") {
                  window.location.href = "/";
                }
                scrollToTop();
              }}
            >
              <div className="w-[37px] h-[37px] xl:w-[45px] xl:h-[45px] relative">
                <Image src={IMAGEKIT.HELMET} alt="icon" fill />
              </div>
              <p className="from-white to-[#999999] pl-2 font-sans font-black sm:text-2xl bg-gradient-to-b text-transparent bg-clip-text">
                ANTIGRAVITY
              </p>
            </div>
            <div
              className={`relative flex justify-center items-center font-extrabold text-lg font-sans gap-[16px] oveflow-hidden`}
            >
              <a href={location.pathname === "/wishwell" ? "#" : "/wishwell"}>
                <P
                  uppercase
                  gradient
                  extrabold
                  className="font-sans font-extrabold"
                >
                  Wishwell
                </P>
              </a>
              <a href={location.pathname === "/mining" ? "#" : "/mining"}>
                <P
                  uppercase
                  gradient
                  extrabold
                  className="font-sans font-extrabold"
                >
                  Mining
                </P>
              </a>
              <a
                href={location.pathname === "/collective" ? "#" : "/collective"}
              >
                <P
                  uppercase
                  gradient
                  extrabold
                  className="font-sans font-extrabold"
                >
                  Collective
                </P>
              </a>
              <a
                target="_blank"
                href={process.env.NEXT_PUBLIC_WHITEPAPER || "/"}
              >
                <P
                  uppercase
                  gradient
                  extrabold
                  className="font-sans font-extrabold"
                >
                  WHITEPAPER
                </P>
              </a>
              {account.isConnected ? (
                <>
                  <div className="w-[2px] h-[2.5rem] bg-gradient-to-b from-white via-[#999999] to-[#999999] rounded-full" />
                  <UserConnected />
                </>
              ) : (
                <Button
                  iconSrc={IMAGEKIT_ICONS.WALLET_WHITE}
                  iconPosition="start"
                  innerText="Connect Wallet"
                  onClick={handleLogin}
                />
              )}
            </div>
          </div>
          {/* Mobile View */}
          <div
            className="flex max-w-[500px] xl:hidden items-center cursor-pointer"
            onClick={() => {
              if (window.location.pathname !== "/") {
                window.location.href = "/";
              }
              scrollToTop();
            }}
          >
            <div className="w-[37px] h-[37px] xl:w-[45px] xl:h-[45px] relative">
              <Image src={IMAGEKIT.HELMET} alt="icon" fill />
            </div>
            <p className="from-white to-[#999999] pl-2 font-sans font-extrabold sm:text-2xl bg-gradient-to-b text-transparent bg-clip-text">
              ANTIGRAVITY
            </p>
          </div>
          <div className="flex xl:hidden">
            {isOpen ? (
              <IoCloseCircleOutline
                className="cursor-pointer"
                width={24}
                height={24}
                onClick={toggleMenu}
              />
            ) : (
              <IoMenu
                className="cursor-pointer"
                width={24}
                height={24}
                onClick={toggleMenu}
              />
            )}
          </div>
        </div>
      </div>
      {isOpen ? (
        <div className="flex xl:hidden w-full max-w-[900px] justify-center">
          <div className="flex text-agwhite w-full xl:h-16 rounded-lg bg-gradient-to-tr from-brred to-blue p-[2px] overflow-hidden">
            <div className="w-full h-full bg-agblack px-8 flex flex-col items-center justify-center rounded-lg gap-6 py-4">
              {account.isConnected && <UserConnected />}
              <a href={location.pathname === "/wishwell" ? "#" : "/wishwell"}>
                <P
                  uppercase
                  gradient
                  extrabold
                  className="font-sans font-extrabold"
                >
                  Wishwell
                </P>
              </a>
              <a href={location.pathname === "/mining" ? "#" : "/mining"}>
                <P
                  uppercase
                  gradient
                  extrabold
                  className="font-sans font-extrabold"
                >
                  Mining
                </P>
              </a>
              <a
                href={location.pathname === "/collective" ? "#" : "/collective"}
              >
                <P
                  uppercase
                  gradient
                  extrabold
                  className="font-sans font-extrabold"
                >
                  Collective
                </P>
              </a>
              <a
                target="_blank"
                href={process.env.NEXT_PUBLIC_WHITEPAPER || "/"}
              >
                <P
                  uppercase
                  gradient
                  extrabold
                  className="font-sans font-extrabold"
                >
                  WHITEPAPER
                </P>
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </motion.header>
  );
};

export default Header;
