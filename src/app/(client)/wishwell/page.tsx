"use client";

import dynamic from "next/dynamic";

const WishwellPage = dynamic(() => import("./WishwellPage"), {
  ssr: false,
});

export default function Wishwell() {
  return <WishwellPage />;
}
