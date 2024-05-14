import React from "react";

interface Props {
  children: React.ReactNode;
  onClick?: (args0: React.MouseEvent) => void;
  className?: string;
  secondary?: boolean;
}

const Button = ({ children, onClick, className, secondary }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`${className} relative flex items-center gap-x-2 justify-center font-sans font-bold text-agwhite cursor-pointer
      rounded-lg px-4 py-[14px] shadow-button hover:translate-y-1 transition-[all_150ms] hover:shadow-none active:bg-agblack
       ${secondary ? "bg-agblack bg-opacity-65" : "bg-blue"}`}
      //    before:w-full before:h-full relative z-[100] before:absolute before:top-0 before:left-0  before:bg-gradient-to-tr before:from-[#ff5001] before:to-blue before:rounded-lg  before:scale-105 before:z-0 before:invisible active:before:visible before:transition-[all_250ms] `}
    >
      {children}
    </button>
  );
};

export default Button;
