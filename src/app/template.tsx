"use client";

import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import ReactLenis from "lenis/react";
import useLoading from "@/hooks/frontend/useLoading";
import Header from "@/components/Home/components/header/Header";
import Footer from "@/components/Home/sections/Footer";
import LoadingPage from "./LoadingPage";

export default function Template({ children }: { children: React.ReactNode }) {
  const { loading, strictNoLoading } = useLoading();
  return (
    <ReactLenis root>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="min-h-screen"
      >
        <div className="z-[0]">
          <div className="z-[100]">
            {!strictNoLoading && <LoadingPage contentLoaded={!loading} />}
          </div>
          <div className="fixed top-0 w-full z-50 items-center pt-[16px] md:pt-12 px-4">
            <Header />
          </div>
          <div className="z-100">
            {children}
            <Footer />
          </div>
        </div>
      </motion.main>
    </ReactLenis>
  );
}
