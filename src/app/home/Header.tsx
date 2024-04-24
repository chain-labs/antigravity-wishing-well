import { condenseAddress } from "@/utils";
import Image from "next/image";
import { useState } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentChain, setCurrentChain] = useState("");

  const account = useAccount();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="flex h-full w-full items-center justify-center gap-3 sm:gap-6 z-50">
      <div className="flex bg-gray-800 text-white w-full sm:w-1/2 h-14 lg:h-16 rounded-lg bg-gradient-to-tr from-[#ff5001] via-brred to-arblue p-[2px]">
        <div className="container w-full h-full bg-agblack mx-auto py-4 px-4 flex items-center justify-between rounded-lg gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image
                src="https://ik.imagekit.io/xlvg9oc4k/Antigravity/icon.svg"
                alt="icon"
                width="45"
                height="45"
              />
              <p className=" from-white to-gray-500 pl-2 font-sans font-extrabold sm:text-2xl bg-gradient-to-b text-transparent bg-clip-text">
                ANTIGRAVITY
              </p>
            </div>
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
          {/* <nav
            className={`md:flex md:flex-grow md:items-center md:justify-end md:gap-x-6 ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <a
              href="#value"
              className="block mt-4 md:inline-block md:mt-0 font-sans text-lg font-bold tracking-wide bg-gradient-to-b from-agwhite to-gray-500 text-transparent bg-clip-text"
            >
              VALUE
            </a>
            <a
              href="#utilities"
              className="block mt-4 md:inline-block md:mt-0 font-sans text-lg font-bold tracking-wide bg-gradient-to-b from-agwhite to-gray-500 text-transparent bg-clip-text"
            >
              UTILITIES
            </a>
            <a
              href="#team"
              className="block mt-4 md:inline-block md:mt-0 font-sans text-lg font-bold tracking-wide bg-gradient-to-b from-agwhite to-gray-500 text-transparent bg-clip-text"
            >
              TEAM
            </a>
          </nav> */}
          {account.isConnected && (
            // <div>
            <p className="uppercase bg-gradient-to-b from-[#B4EBF8] to-[#789DFA] text-transparent text-xs sm:text-lg bg-clip-text font-bold">
              {`Connected: ${condenseAddress(`${account.address}`)}`}
            </p>
            // </div>
          )}
        </div>
      </div>
      {account.isConnected && (
        <div className="bg-gray-800 text-white w-fit h-14 lg:h-16 rounded-lg bg-gradient-to-tr from-[#ff5001] via-brred to-arblue p-[2px]">
          {/* <button
            className="container w-full h-full bg-agblack mx-auto py-4 px-4 md:flex md:items-center md:justify-between rounded-lg cursor-pointer"
            onClick={() => {
              if (openChainModal) {
                openChainModal();
              }
            }}
          >
            {chain}
          </button> */}
          <ConnectButton.Custom>
            {({ chain, openChainModal, mounted }) => {
              if (chain && chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="flex container w-full h-full bg-agblack gap-1 sm:gap-4 items-center px-2 sm:px-4 text-xs sm:text-base rounded-lg cursor-pointer focus:outline-none"
                  >
                    Wrong network
                  </button>
                );
              } else if (chain) {
                if (currentChain !== "" && currentChain != chain.name)
                  location.reload();
                setCurrentChain(chain.name as string);
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="flex container w-full h-full bg-agblack gap-1 sm:gap-4 items-center px-2 sm:px-4 text-xs sm:text-base rounded-lg cursor-pointer focus:outline-none"
                  >
                    {chain.hasIcon ? (
                      <img
                        src={chain.iconUrl}
                        alt={chain.name}
                        className="w-4 h-4 sm:w-6 sm:h-6 rounded-full"
                      />
                    ) : null}
                    {chain.name}
                  </button>
                );
              }
            }}
          </ConnectButton.Custom>
        </div>
      )}
    </header>
  );
};

export default Header;
