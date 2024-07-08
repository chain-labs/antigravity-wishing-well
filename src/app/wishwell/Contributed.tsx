"use client";
import ContributedHero from "@/components/Wishwell/components/ContributedHero";

export default function Contributed({ tokenId }: { tokenId: string }) {
  return (
    <>
      <ContributedHero tokenId={tokenId} />
    </>
  );
}
