"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import ReactLenis from "lenis/react";
import useLoading from "@/hooks/frontend/useLoading";

const LoadingPage = dynamic(() => import("@/app/(client)/LoadingPage"), {
  ssr: false,
});

const Header = dynamic(
  () => import("@/components/Home/components/header/Header"),
  {
    ssr: false,
  },
);
const Footer = dynamic(() => import("@/components/Home/sections/Footer"), {
  ssr: false,
});

export default function Template({ children }: { children: React.ReactNode }) {
  const { loading, strictNoLoading } = useLoading();
  return (
    <ReactLenis root>
      <main className="min-h-screen">
        <div className="z-[0]">
          <div className="z-[100]">
            {!strictNoLoading && <LoadingPage contentLoaded={!loading} />}
          </div>
          <div className="fixed top-0 w-full z-50 items-center pt-[16px] md:pt-12 px-4">
            <Header />
          </div>
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
              className="z-100"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </ReactLenis>
  );
}
