"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { IoMenu, IoCloseCircleOutline } from "react-icons/io5";
import { UserConnected } from "./UserConnected";
import { motion, AnimatePresence } from "framer-motion";
import P from "../HTML/P";
import { PublicClient } from "viem";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Button from "@/components/Button";
import { IMAGEKIT_ICONS, IMAGEKIT_LOGOS } from "@/assets/imageKit";
import Link from "next/link";
import useLoading from "@/hooks/frontend/useLoading";
import { client } from "../../../sanity/lib/client";
import useTimer from "@/hooks/frontend/useTimer";

// Use a function to get the latest block number
async function getLatestBlockNumber(publicClient: PublicClient) {
  const block = await publicClient.getBlockNumber();
  return block;
}

const Header = () => {
  // about section dropdown
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const timer = useTimer();
  const [aboutSectionOpen, setAboutSectionOpen] = useState(false);
  const { openConnectModal } = useConnectModal();

  const [isOpen, setIsOpen] = useState(false);
  // const [currentChain, setCurrentChain] = useState("");

  const [externalLinks, setExternalLinks] = useState<{
    darkpaper: string;
    darkerpaper: string;
  }>();

  useEffect(() => {
    client
      .fetch(
        `*[_type=="external_links"][0]{
          darkpaper, darkerpaper
        }`,
      )
      .then((externalLinks) => {
        setExternalLinks(externalLinks);
      });
  }, []);

  const account = useAccount();

  const { strictNoLoading } = useLoading();

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
      whileInView={{ y: 0, opacity: 1 }}
      initial={{
        y: strictNoLoading ? 0 : -50,
        opacity: strictNoLoading ? 1 : 0,
      }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 1.5 }}
      className="flex flex-col h-full w-full max-[1200px] items-center justify-center gap-3 z-50 font-extrabold lg:mt-[16px]"
    >
      <div className="flex text-agwhite w-full xl:w-3/4 max-w-[800px] xl:max-w-full h-14 xl:h-[72px] rounded-lg bg-gradient-to-tr from-brred to-blue p-[2px]">
        <div className="w-full h-full bg-agblack flex items-center justify-between rounded-lg gap-6 px-4">
          {/* Desktop View */}
          <div className="hidden xl:flex xl:flex-grow xl:items-center h-full xl:justify-between xl:gap-x-6">
            <Link className="flex items-center cursor-pointer" href="/">
              <div className="w-[37px] h-[37px] xl:w-[45px] xl:h-[45px] relative">
                <Image src={IMAGEKIT_LOGOS.LOGO} alt="icon" fill />
              </div>
              <p className="from-white to-[#999999] pl-2 font-sans font-black sm:text-2xl bg-gradient-to-b text-transparent bg-clip-text">
                ANTIGRAVITY
              </p>
            </Link>
            <div
              className={`relative flex justify-center items-center font-extrabold text-lg font-sans gap-[16px] oveflow-hidden`}
            >
              <>
                {timer.era === "wishwell" ? (
                  <Link
                    href={
                      location.pathname === "/wishwell"
                        ? "/wishwell#"
                        : "/wishwell"
                    }
                    className="relative"
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
                ) : (
                  <div
                    onMouseEnter={() =>
                      timer.era !== "wishwell" ? setTooltipOpen(true) : null
                    }
                    onMouseLeave={() =>
                      timer.era !== "wishwell" ? setTooltipOpen(false) : null
                    }
                    className="select-none relative"
                  >
                    <P
                      uppercase
                      gradient
                      extrabold
                      className="font-sans font-extrabold opacity-[0.66]"
                    >
                      Wishwell
                    </P>
                    <AnimatePresence>
                      {tooltipOpen && (
                        <motion.div
                          initial={{
                            height: 0,
                            opacity: 0,
                          }}
                          animate={{
                            height: "fit-content",
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          className="absolute top-[calc(100%+32px)] left-1/2 -translate-x-1/2 flex text-agwhite w-fit rounded-[4px] bg-gradient-to-tr from-brred to-blue p-[1px]"
                        >
                          <div className="w-fit h-fit bg-gradient-to-b from-[#030404] to-[#131A1A] flex items-center justify-between rounded-[inherit] gap-6 px-[16px] py-[8px] text-[16px] text-nowrap">
                            Currently by invitation only.
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </>
              <Link
                href={location.pathname === "/mining" ? "/mining#" : "/mining"}
              >
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
                href={
                  location.pathname === "/collective"
                    ? "/collective#"
                    : "/collective"
                }
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
                          href={externalLinks?.darkpaper || "/"}
                          rel="noreferrer"
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
                          href={externalLinks?.darkerpaper || "/"}
                          rel="noreferrer"
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
                  variants={{
                    hover: {
                      animationName: "wiggle",
                      animationDuration: "1s",
                      animationFillMode: "forwards",
                      animationTimingFunction: "linear",
                    },
                  }}
                />
              )}
            </div>
          </div>
          {/* Mobile View */}
          <Link
            className="flex max-w-[500px] xl:hidden items-center cursor-pointer"
            href="/"
          >
            <div className="w-[37px] h-[37px] xl:w-[45px] xl:h-[45px] relative">
              <Image src={IMAGEKIT_LOGOS.LOGO} alt="icon" fill />
            </div>
            <p className="from-white to-[#999999] pl-2 font-sans font-extrabold sm:text-2xl bg-gradient-to-b text-transparent bg-clip-text">
              ANTIGRAVITY
            </p>
          </Link>
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
              <>
                {timer.era === "wishwell" ? (
                  <Link
                    href={
                      location.pathname === "/wishwell"
                        ? "/wishwell#"
                        : "/wishwell"
                    }
                    className="relative"
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
                ) : (
                  <div
                    onMouseEnter={() =>
                      timer.era !== "wishwell" ? setTooltipOpen(true) : null
                    }
                    onMouseLeave={() =>
                      timer.era !== "wishwell" ? setTooltipOpen(false) : null
                    }
                    className="select-none relative"
                  >
                    <P
                      uppercase
                      gradient
                      extrabold
                      className="font-sans font-extrabold opacity-[0.66]"
                    >
                      Wishwell
                    </P>
                    <AnimatePresence>
                      {tooltipOpen && (
                        <motion.div
                          initial={{
                            height: 0,
                            opacity: 0,
                          }}
                          animate={{
                            height: "fit-content",
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          className="absolute top-[calc(100%+32px)] left-1/2 -translate-x-1/2 flex text-agwhite w-fit rounded-[4px] bg-gradient-to-tr from-brred to-blue p-[1px]"
                        >
                          <div className="w-fit h-fit bg-gradient-to-b from-[#030404] to-[#131A1A] flex items-center justify-between rounded-[inherit] gap-6 px-[16px] py-[8px] text-[16px] text-nowrap">
                            Currently by invitation only.
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </>
              <Link
                href={location.pathname === "/mining" ? "/mining#" : "/mining"}
              >
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
                href={
                  location.pathname === "/collective"
                    ? "/collective#"
                    : "/collective"
                }
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
