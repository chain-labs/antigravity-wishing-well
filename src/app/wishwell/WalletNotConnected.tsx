import Image from "next/image";
import Header from "@/components/Home/components/header/Header";
import WalletNotConnectedHero from "@/components/Wishwell/components/WalletNotConnectedHero";
import { Dispatch, useEffect, useState } from "react";
import CanvasRendering from "@/components/Home/components/saturn/CanvasRendering";
import StarFieldCanvas from "@/components/Home/components/background/Starfeild";
import Newsletter from "@/components/Home/sections/Newsletter";
import Footer from "@/components/Home/sections/Footer";
import { IMAGEKIT_IMAGES } from "@/assets/imageKit";

export default function WalletNotConnected({
  registrationKit,
}: {
  registrationKit: {
    loading: boolean;
    error: boolean;
    registerIdle: boolean;
    setError: Dispatch<React.SetStateAction<boolean>>;
    handleRegister: any;
    isRegistered: boolean;
  };
}) {
  return (
    <>
      <WalletNotConnectedHero registrationKit={registrationKit} />
      <Newsletter />
    </>
  );
}
