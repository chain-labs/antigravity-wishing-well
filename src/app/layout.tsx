import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import "@rainbow-me/rainbowkit/styles.css";
import RainbowKitContext from "@/components/RainbowKit";
import { Toaster } from "react-hot-toast";
import MobileView from "./home/MobileView";
import GoogleAnalytics from "./analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Antigravity | Join The Revolution!",
  description: "Join the Revolution.",
  icons: { icon: "https://ik.imagekit.io/xlvg9oc4k/Antigravity/icon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleAnalytics />
      <body className={inter.className}>
        <div>
          <Toaster />
          <RainbowKitContext>{children}</RainbowKitContext>
        </div>
        {/* <div className="sm:hidden block">
          <MobileView />
        </div> */}
      </body>
    </html>
  );
}
