import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import "@rainbow-me/rainbowkit/styles.css";
import RainbowKitContext from "@/components/RainbowKit";
import { Toaster } from "react-hot-toast";
import MobileView from "./home/MobileView";
import GoogleAnalytics from "./analytics";
import {
  Icon,
  IconDescriptor,
} from "next/dist/lib/metadata/types/metadata-types";

const inter = Inter({ subsets: ["latin"] });

const title = "Antigravity | Join The Revolution!";
const description = "Join the Revolution.";
const previewImage =
  "https://ik.imagekit.io/chainlabs/AntiGravity/antigravity-rich-link-preview_enafjw_JE.png";
const websiteUrl = new URL("https://agproject.io");

export const metadata: Metadata = {
  title: title,
  description: description,
  // manifest: "./site.webmanifest",
  metadataBase: websiteUrl,
  applicationName: "Antigravity",
  openGraph: {
    type: "website",
    url: websiteUrl,
    title: title,
    description: description,
    siteName: "Antigravity",
    images: [
      {
        url: previewImage,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@HexrayVision",
    creator: "@HexrayVision",
    title: title,
    description: description,
    images: {
      url: previewImage,
      alt: "Antigravity Preview image",
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  other: {
    "twitter:url": "https://agproject.io",
  },
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
