"use client";
import Leaderboard from "@/components/Collective/Leaderboard";
import CollectiveHero from "@/components/Collective/CollectiveHero";
import Event from "@/components/Collective/Event";
import CollectiveRotatingCarousel from "@/components/Collective/CollectiveRotatingCarousel";
import Youtube from "@/components/Collective/Youtube";
import PointsAndMultiplierInfo from "@/components/Collective/PointsAndMultiplierInfo";
import RankupAndRewardsInfo from "@/components/Collective/RankupAndRewardsInfo";
import Team from "@/components/Collective/Team";
import PromotionAndNewsletter from "@/components/Collective/PromotionAndNewsletter";
import Footer from "@/components/Home/sections/Footer";
import { useAccount } from "wagmi";

export default function CollectivePage() {
  const account = useAccount();
  return (
    <>
      <CollectiveHero />
      <div className="md:h-[50vh]" />
      <div className="block md:hidden">
        <Leaderboard accountIsConnected={account.isConnected} />
      </div>
      <Event />
      <CollectiveRotatingCarousel />
      <Youtube />
      <PointsAndMultiplierInfo />
      <RankupAndRewardsInfo />
      <Team />
      <PromotionAndNewsletter />
      <Footer />
    </>
  );
}
