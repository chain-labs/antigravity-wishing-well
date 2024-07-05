"use client";

import Footer from "@/components/Home/sections/Footer";
import Newsletter from "@/components/Home/sections/Newsletter";
import Leaderboard from "@/components/Home/sections/Leaderboard";
import ContributedHero from "@/components/Wishwell/components/ContributedHero";

export default function Contributed({ tokenId }: { tokenId: string }) {
  return (
    <>
      <ContributedHero tokenId={tokenId} />
      <Leaderboard accountIsConnected />
      <Newsletter />
    </>
  );
}
