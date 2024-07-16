"use client";

import "@rainbow-me/rainbowkit/styles.css";
import dynamic from "next/dynamic";

const Homepage = dynamic(() => import("./HomePage"), {
  ssr: false,
});

export default function Home() {
  return <Homepage />;
}
