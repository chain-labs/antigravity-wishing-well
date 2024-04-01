import Image from "next/image";
import { useState } from "react";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gray-800 text-white w-1/2 h-[56px] lg:h-[72px] rounded-lg bg-gradient-to-tr from-[#ff5001] via-brred to-arblue p-[2px]">
      <div className="container w-full h-full bg-agblack mx-auto py-4 px-4 md:flex md:items-center md:justify-between rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image src="icon.svg" alt="icon" width="45" height="45" />
            <p className=" from-white to-gray-500 pl-2 font-sans font-extrabold text-2xl bg-gradient-to-b text-transparent bg-clip-text">
              ANTIGRAVITY
            </p>
          </div>
          <div className="block md:hidden">
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
          </div>
        </div>
        <nav
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
        </nav>
      </div>
    </header>
  );
};

export default Header;
