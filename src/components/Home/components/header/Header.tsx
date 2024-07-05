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
} from "wagmi";
import Button from "@/components/Button";
import { IMAGEKIT_ICONS } from "@/assets/imageKit";
import Link from "next/link";

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
      <div className="flex text-agwhite w-full xl:w-3/4 max-w-[800px] xl:max-w-full h-14 xl:h-[72px] rounded-lg bg-gradient-to-tr from-brred to-blue p-[2px]">
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
              <Link
                href={location.pathname === "/wishwell" ? "#" : "/wishwell"}
              >
                <P
                  uppercase
                  gradient
                  extrabold
                  className="font-sans font-extrabold"
                >
                  Wishwell
                </P>
              </Link>
              <Link href={location.pathname === "/mining" ? "#" : "/mining"}>
                <P
                  uppercase
                  gradient
                  extrabold
                  className="font-sans font-extrabold"
                >
                  Mining
                </P>
              </Link>
              <Link
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
              </Link>
              <P
                onClick={() => setAboutSectionOpen(!aboutSectionOpen)}
                uppercase
                gradient
                extrabold
                className="relative font-sans font-extrabold flex justify-center items-center cursor-pointer"
              >
                About{" "}
                <Image
                  src={IMAGEKIT_ICONS.DOWN_WHITE}
                  alt="Dropdown"
                  width={16}
                  height={16}
                  style={{
                    transform: aboutSectionOpen
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                  }}
                  className="origin-center transition-all duration-300 ease-in-out transform rotate-0 cursor-pointer"
                />
                <AnimatePresence>
                  {aboutSectionOpen && (
                    <motion.div
                      exit={{
                        height: 0,
                        opacity: 0,
                        gap: 0,
                        padding: 0,
                      }}
                      animate={{
                        height: "fit-content",
                        opacity: 1,
                        gap: "8px",
                        padding: "10px 16px",
                      }}
                      initial={{
                        height: 0,
                        opacity: 0,
                        gap: 0,
                        padding: 0,
                      }}
                      transition={{
                        duration: 0.3,
                        type: "spring",
                      }}
                      className="absolute w-fit top-[calc(100%+32px)] left-1/2 -translate-x-1/2 rounded-[8px] z-10 p-[16px] text-agwhite transition-all duration-300 ease-in-out bg-agblack
									before:content-[''] before:absolute before:inset-0 before:z-[-10] md:before:bg-gradient-to-bl before:from-[#3C00DC] before:to-[#FF5001] before:rounded-[inherit] before:overflow-hidden before:m-[-1px]
									after:content-[''] after:absolute after:inset-0 after:z-[-2] md:after:bg-gradient-to-b after:from-[#030404] after:to-[#131A1A] after:rounded-[inherit] after:overflow-hidden"
                    >
                      <motion.div
                        exit={{ height: 0, opacity: 0 }}
                        animate={{
                          height: "fit-content",
                          opacity: 1,
                        }}
                        initial={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className="flex flex-col justify-center items-center gap-[16px] overflow-hidden"
                      >
                        <a
                          target="_blank"
                          href={process.env.NEXT_PUBLIC_WHITEPAPER || "/"}
                        >
                          <P
                            uppercase
                            gradient
                            extrabold
                            center
                            className="font-sans font-extrabold text-nowrap"
                          >
                            Dark Paper
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
                            center
                            className="font-sans font-extrabold text-nowrap"
                          >
                            Darker Paper
                          </P>
                        </a>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </P>
              {account.isConnected ? (
                <>
                  <div className="w-[2px] h-[2.5rem] bg-gradient-to-b from-white via-[#999999] to-[#999999] rounded-full" />
                  <UserConnected />
                </>
              ) : (
                <Button
                  onClick={handleLogin}
                  iconSrc={IMAGEKIT_ICONS.WALLET_WHITE}
                  iconAlt="wallet"
                  iconPosition="start"
                  innerText="Connect Wallet"
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
              <Link
                href={location.pathname === "/wishwell" ? "#" : "/wishwell"}
              >
                <P
                  uppercase
                  gradient
                  extrabold
                  className="font-sans font-extrabold"
                >
                  Wishwell
                </P>
              </Link>
              <Link href={location.pathname === "/mining" ? "#" : "/mining"}>
                <P
                  uppercase
                  gradient
                  extrabold
                  className="font-sans font-extrabold"
                >
                  Mining
                </P>
              </Link>
              <Link
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
              </Link>
              <P
                onClick={() => setAboutSectionOpen(!aboutSectionOpen)}
                uppercase
                gradient
                extrabold
                className="relative font-sans font-extrabold cursor-pointer w-full flex flex-col gap-[8px]"
              >
                <div className="flex justify-center items-center">
                  About{" "}
                  <Image
                    src={IMAGEKIT_ICONS.DOWN_WHITE}
                    alt="Dropdown"
                    width={16}
                    height={16}
                    style={{
                      transform:
                        aboutSectionOpen && isOpen
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                    }}
                    className="origin-center transition-all duration-300 ease-in-out transform rotate-0 cursor-pointer"
                  />
                </div>
                <AnimatePresence>
                  {aboutSectionOpen && isOpen && (
                    <motion.div
                      exit={{
                        height: 0,
                        opacity: 0,
                        gap: 0,
                        padding: 0,
                      }}
                      animate={{
                        height: "fit-content",
                        opacity: 1,
                        gap: "8px",
                        padding: "10px 16px",
                      }}
                      initial={{
                        height: 0,
                        opacity: 0,
                        gap: 0,
                        padding: 0,
                      }}
                      transition={{
                        duration: 0.3,
                        type: "spring",
                      }}
                      className="w-full rounded-[8px] z-10 p-[16px] text-agwhite transition-all duration-300 ease-in-out bg-agblack bg-gradient-to-b from-[#0A1133] to-[#142266] "
                    >
                      <motion.div
                        exit={{ height: 0, opacity: 0 }}
                        animate={{
                          height: "fit-content",
                          opacity: 1,
                        }}
                        initial={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className="flex flex-col justify-center items-center gap-[2rem] overflow-hidden"
                      >
                        <a
                          target="_blank"
                          href={process.env.NEXT_PUBLIC_WHITEPAPER || "/"}
                        >
                          <P
                            uppercase
                            gradient
                            extrabold
                            center
                            className="font-sans font-extrabold text-nowrap"
                          >
                            Dark Paper
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
                            center
                            className="font-sans font-extrabold text-nowrap"
                          >
                            Darker Paper
                          </P>
                        </a>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </P>
            </div>
          </div>
        </div>
      ) : null}
    </motion.header>
  );
};

export default Header;
