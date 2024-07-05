"use client";

import React, { Suspense, useEffect, useLayoutEffect, useState } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/Home/sections/Hero";
import Header from "@/components/Home/components/header/Header";
import CanvasRendering from "@/components/Home/components/saturn/CanvasRendering";
import StarFieldCanvas from "@/components/Home/components/background/Starfeild";
import Countdown from "@/components/Home/sections/Countdown";
import Newsletter from "@/components/Home/sections/Newsletter";
import Footer from "@/components/Home/sections/Footer";
import Testimonials from "@/components/Home/sections/Testimonials";
import Eras from "@/components/Home/sections/Eras";
import Leaderboard from "@/components/Home/sections/Leaderboard";
import NFTReceipt from "@/components/Home/sections/NFTReceipt";
import { useAccount } from "wagmi";
import Image from "next/image";
import { IMAGEKIT_IMAGES } from "@/assets/imageKit";
import { ReactLenis } from "lenis/react";

export default function HomePage() {
  const account = useAccount();
  return (
    <>
      <Hero />
      <Leaderboard accountIsConnected={account.isConnected} />
      <Testimonials />
      <NFTReceipt />
      <Eras />
      <Countdown />
      <Newsletter />
    </>
  );
}
