import Image from "next/image";
import { useState } from "react";
import { useAccount } from "wagmi";
import { IoMenu, IoCloseCircleOutline } from "react-icons/io5";
import { UserConnected } from "./UserConnected";
import IMAGEKIT from "./images";
import { motion } from "framer-motion";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [currentChain, setCurrentChain] = useState("");

  const account = useAccount();

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.header
      animate={{ y: 0 }}
      initial={{ y: -100 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col h-full w-full items-center justify-center gap-3 z-50 font-extrabold">
      <div className="flex text-white w-full md:w-3/4 h-14 lg:h-16 rounded-lg bg-gradient-to-tr from-brred to-blue p-[2px] overflow-hidden">
        <div className="w-full h-full bg-agblack px-8 flex items-center justify-between rounded-lg gap-6 py-4">
          <div
            className="flex items-center cursor-pointer"
            onClick={scrollToTop}
          >
            <div className="w-[37px] h-[37px] md:w-[45px] md:h-[45px] relative">
              <Image src={IMAGEKIT.HELMET} alt="icon" fill />
            </div>
            <p className="from-white to-[#999999] pl-2 font-sans font-extrabold sm:text-2xl bg-gradient-to-b text-transparent bg-clip-text">
              ANTIGRAVITY
            </p>
            {/* <div className="block md:hidden">
              <button
                onClick={toggleMenu}
                className="text-white focus:outline-none"
              >
                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                  <path
                    d="M4 6h16M4 12h16m-7 6h7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
            </div> */}
          </div>

          {/* Desktop View */}
          <div className="hidden md:flex md:flex-grow md:items-center h-full md:justify-end md:gap-x-6">
            <div className={`flex font-extrabold text-lg font-sans gap-6`}>
              <a
                target="_blank"
                href={process.env.NEXT_PUBLIC_WHITEPAPER || "/"}
                className="bg-gradient-to-b from-white to-[#999999] text-transparent bg-clip-text"
              >
                WHITEPAPER
              </a>
              <a
                href="#value"
                className="bg-gradient-to-b from-white to-[#999999] text-transparent bg-clip-text"
              >
                VALUE
              </a>
              <a
                href="#utilities"
                className="bg-gradient-to-b from-white to-[#999999] text-transparent bg-clip-text"
              >
                UTILITIES
              </a>
              <a
                href="#team"
                className="bg-gradient-to-b from-white to-[#999999] text-transparent bg-clip-text"
              >
                TEAM
              </a>
            </div>
            {account.isConnected && (
              <>
                <div className="w-[1px] h-full bg-gradient-to-b from-white to-[#999999]" />
                <UserConnected />
              </>
            )}
          </div>
          {/* Mobile View */}
          <div className="flex md:hidden">
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
        <div className="flex md:hidden w-full justify-center">
          <div className="flex text-white w-full lg:h-16 rounded-lg bg-gradient-to-tr from-brred to-blue p-[2px] overflow-hidden">
            <div className="w-full h-full bg-agblack px-8 flex flex-col items-center justify-center rounded-lg gap-6 py-4">
              {account.isConnected && <UserConnected />}
              <a
                target="_blank"
                href={process.env.NEXT_PUBLIC_WHITEPAPER || "/"}
                className="bg-gradient-to-b from-white to-[#999999] text-transparent bg-clip-text"
              >
                WHITEPAPER
              </a>
              <a
                href="#value"
                className="bg-gradient-to-b from-white to-[#999999] text-transparent bg-clip-text"
              >
                VALUE
              </a>
              <a
                href="#utilities"
                className="bg-gradient-to-b from-white to-[#999999] text-transparent bg-clip-text"
              >
                UTILITIES
              </a>
              <a
                href="#team"
                className="bg-gradient-to-b from-white to-[#999999] text-transparent bg-clip-text"
              >
                TEAM
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </motion.header>
  );
};

export default Header;
