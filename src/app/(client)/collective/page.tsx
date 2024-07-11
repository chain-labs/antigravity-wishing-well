"use client";

import "@rainbow-me/rainbowkit/styles.css";
import dynamic from "next/dynamic";

const CollectivePage = dynamic(() => import("./CollectivePage"), {
  ssr: false,
});

export default function Wishwell() {
  return <CollectivePage />;
}
