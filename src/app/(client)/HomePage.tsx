"use client";
import Hero from "@/components/Home/sections/Hero";
import Countdown from "@/components/Home/sections/Countdown";
import Newsletter from "@/components/Home/sections/Newsletter";
import Footer from "@/components/Home/sections/Footer";
import Testimonials from "@/components/Home/sections/Testimonials";
import Eras from "@/components/Home/sections/Eras";
import Leaderboard from "@/components/Home/sections/Leaderboard";
import NFTReceipt from "@/components/Home/sections/NFTReceipt";
import { useAccount } from "wagmi";

export default function HomePage() {
  const account = useAccount();
  return (
    <>
      <Hero />
      <Leaderboard accountIsConnected={account.isConnected} typeOfLeaderboard="allTimeLeaderboard" />
      <Testimonials />
      <NFTReceipt />
      <Eras />
      <Countdown />
      <Newsletter />
      <Footer />
    </>
  );
}
