import toast, { ToastOptions, ToastPosition } from "react-hot-toast";
import Image from "next/image";
import { IMAGEKIT_ICONS, IMAGEKIT_LOGOS } from "@/assets/imageKit";
var uniqid = require("uniqid");

let GLOBALS: {
  duration: number;
  position: string;
  style: any;
} = {
  duration: 3000,
  position: "bottom-right",
  style: {
    width: "fit",
    maxWidth: "400px",
    borderRadius: "6px",
    boxShadow: "0 0 15px 0 #03040480",
    padding: "16px",
    gap: "0px",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "20.3px",
    fontFamily: "General Sans, sans-serif",
    display: "flex",
    justifyContent: "start",
    alignItems: "start",
    "& div": {
      margin: 0,
      padding: 0,
    },
  },
};

function marginLeft(referencePositionX: number): `${number}px` {
  if (window) {
    if (window.innerWidth > 768) {
      return `${referencePositionX}px`;
    } else {
      return `0px`;
    }
  }
  return `0px`;
}

export function successToast(message: string, options?: ToastOptions, referencePositionX?: number) {
  const id = uniqid();
  toast(
    <span className="flex justify-start items-start gap-[8px] translate-y-[-4px] mb-[-4px]">
      {message}
      <button
        onClick={() => toast.dismiss(id)}
        className="close-button w-[16px] h-[16px] leading-[18px] text-[18px] font-general-sans"
        type="button"
      >
        ×
      </button>
    </span>,
    {
      id,
      duration: 3000,
      position: GLOBALS.position as ToastPosition,
      style: {
        ...GLOBALS.style,
        background: "#00B031",
        color: "#FEFFFF",
        marginLeft: referencePositionX ? marginLeft(referencePositionX) : "0px",
      },
      icon: (
        <Image src={IMAGEKIT_ICONS.TICK} alt="Tick" height={24} width={24} />
      ),
      ...options,
    },
  );
}

export function errorToast(message: string, options?: ToastOptions, referencePositionX?: number) {
  const id = uniqid();
  toast(
    <span className="flex justify-start items-start gap-[8px] translate-y-[-4px] mb-[-4px]">
      {message}
      <button
        onClick={() => toast.dismiss(id)}
        className="close-button w-[16px] h-[16px] leading-[18px] text-[18px] font-general-sans"
        type="button"
      >
        ×
      </button>
    </span>,
    {
      id,
      duration: GLOBALS.duration,
      position: GLOBALS.position as ToastPosition,
      style: {
        ...GLOBALS.style,
        background: "#FF5001",
        color: "#FEFFFF",
        marginLeft: referencePositionX ? marginLeft(referencePositionX) : "0px",
      },
      icon: (
        <Image src={IMAGEKIT_ICONS.ERROR} alt="Error" height={24} width={24} />
      ),
      ...options,
    },
  );
}

export function warningToast(message: string, options?: ToastOptions, referencePositionX?: number) {
  toast(message, {
    duration: GLOBALS.duration,
    position: GLOBALS.position as ToastPosition,
    style: {
      ...GLOBALS.style,
      background: "#F5EB00",
      color: "#030404",
      marginLeft: referencePositionX ? marginLeft(referencePositionX) : "0px",
    },
    icon: (
      <Image
        src={IMAGEKIT_ICONS.INFO_BLACK}
        alt="Warning"
        height={24}
        width={24}
      />
    ),
    ...options,
  });
}

export function generalToast(
  message: string,
  options?: ToastOptions,
  referencePositionX?: number,
) {
  toast(message, {
    duration: GLOBALS.duration,
    position: GLOBALS.position as ToastPosition,
    style: {
      ...GLOBALS.style,
      background: "#030404A8",
      color: "#FEFFFF",
      marginLeft: referencePositionX ? marginLeft(referencePositionX) : "0px",
    },
    icon: <Image src={IMAGEKIT_ICONS.INFO} alt="Info" height={24} width={24} />,
    ...options,
  });
}

export function miningNotif(message: string, options?: ToastOptions, referencePositionX?: number) {
  toast(message, {
    duration: 8000,
    position: GLOBALS.position as ToastPosition,
    style: {
      ...GLOBALS.style,
      background: "#030404A8",
      color: "#FF5001",
      marginLeft: referencePositionX ? marginLeft(referencePositionX) : "0px",
    },
    icon: (
      <Image
        src={IMAGEKIT_LOGOS.MINING_LOGO}
        alt="Rocket"
        height={40}
        width={40}
      />
    ),
    ...options,
  });
}

// warning tost with infinite duration with a closing button
export function warningToastInfinite(message: React.ReactNode, options?: ToastOptions, referencePositionX?: number) {
  const id = uniqid();
  toast(
    <span className="flex justify-start items-start gap-[8px] translate-y-[-4px] mb-[-4px]">
      {message}
      <button
        onClick={() => toast.dismiss(id)}
        className="close-button w-[16px] h-[16px] leading-[18px] text-[18px] font-general-sans"
        type="button"
      >
        ×
      </button>
    </span>,
    {
      id,
      duration: Infinity,
      position: GLOBALS.position as ToastPosition,
      style: {
        ...GLOBALS.style,
        background: "#F5EB00",
        color: "#030404",
        marginLeft: referencePositionX ? marginLeft(referencePositionX) : "0px",
      },
      icon: (
        <Image
          src={IMAGEKIT_ICONS.INFO_BLACK}
          alt="Warning"
          height={24}
          width={24}
        />
      ),
      ...options,
    },
  );

  return id;
}