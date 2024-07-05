"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Home/components/header/Header";
import Footer from "@/components/Home/sections/Footer";
import Newsletter from "@/components/Home/sections/Newsletter";
import RegisteredHero from "@/components/Wishwell/components/RegisteredHero";
import Image from "next/image";
import StarFieldCanvas from "@/components/Home/components/background/Starfeild";
import CanvasRendering from "@/components/Home/components/saturn/CanvasRendering";
import Leaderboard from "@/components/Home/sections/Leaderboard";
import { IMAGEKIT_IMAGES } from "@/assets/imageKit";

export default function Registered() {
  return (
    <>
      <RegisteredHero />
      <Leaderboard accountIsConnected />
      <Newsletter />
    </>
  );
}
