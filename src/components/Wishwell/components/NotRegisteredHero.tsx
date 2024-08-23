"use client";

import H1 from "@/components/HTML/H1";
import P from "@/components/HTML/P";
import { RegisterButton } from "@/components/header/RegisterButton";
import Button from "@/components/Button";
import Image from "next/image";
import { Dispatch, useEffect, useRef, useState } from "react";
import { useChainModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { IMAGEKIT_ICONS, IMAGEKIT_IMAGES } from "@/assets/imageKit";
import { AnimatePresence, motion } from "framer-motion";
import { client } from "../../../../sanity/lib/client";
import { checkCorrectNetwork } from "@/components/RainbowKit";
import { useAccount } from "wagmi";

export default function NotRegisteredHero({
  registrationKit,
}: {
  registrationKit: {
    loading: boolean;
    error: boolean;
    registerIdle: boolean;
    setError: Dispatch<React.SetStateAction<boolean>>;
    handleRegister: any;
    isRegistered: boolean;
  };
}) {
  const { openConnectModal } = useConnectModal();
  const [openYoutubeModel, setOpenYoutubeModel] = useState(false);
  const youtubeModelRef = useRef<HTMLDivElement>(null);
  const youtubeModelContainerRef = useRef<HTMLDivElement>(null);

  const [externalLinks, setExternalLinks] = useState<{
    how_to_contribute: string;
  }>();

  useEffect(() => {
    client
      .fetch(
        `*[_type=="external_links"][0]{
          how_to_contribute
        }`,
      )
      .then((externalLinks) => {
        setExternalLinks(externalLinks);
      });
  }, []);

  const handleLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    if (openConnectModal) {
      openConnectModal();
    }
  };

  const account = useAccount();
  const { openChainModal } = useChainModal();

  const {
    loading,
    error,
    setError,
    isRegistered,
    handleRegister,
    registerIdle,
  } = registrationKit;

  function openYoutubeModelHandler() {
    setOpenYoutubeModel(true);
    document.body.style.overflow = "hidden";
  }

  function closeYoutubeModelHandler() {
    setOpenYoutubeModel(false);
    document.body.style.overflow = "auto";
  }

  return (
    <div className="relative w-screen h-screen z-0">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#000000c0] to-[#00000000] overflow-hidden">
        <div className="absolute bottom-0 left-0 flex flex-col gap-[16px] p-[16px] md:py-[48px] md:px-[96px] z-0">
          <div className="flex flex-col">
            <H1 className="text-[56px] leading-[53.76px] md:text-[64px] md:leading-[64px] font-black text-agwhite">
              Make A Wish
            </H1>
            <P>
              Get points + the WishWell NFT in your wallet.
              <br />
              Earn more points while the bonus is still in play!
              <br/>
              We wait for 120 blocks confirmation
            </P>
          </div>
          <div className="flex flex-col md:flex-row justify-start items-start gap-[16px]">
            {checkCorrectNetwork(account.chainId) ? (
              <RegisterButton
                loading={loading}
                error={error}
                setError={setError}
                handleRegister={handleRegister}
                isRegistered={isRegistered}
                registerIdle={registerIdle}
                handleLogin={handleLogin}
              />
            ) : (
              <Button
                innerText="Switch Network"
                iconSrc={IMAGEKIT_ICONS.ERROR}
                onClick={openChainModal}
                iconAlt="network error"
                iconPosition="start"
                variants={{
                  hover: {
                    animationName: "wiggle",
                    animationDuration: "1s",
                    animationFillMode: "forwards",
                    animationTimingFunction: "linear",
                  },
                }}
              />
            )}
            <Button
              className="bg-[#030404A8] border-"
              innerText="How to Contribute?"
              iconSrc={IMAGEKIT_ICONS.INFO}
              iconAlt="info icon"
              onClick={openYoutubeModelHandler}
              variants={{
                hover: {
                  animationName: "wiggle",
                  animationDuration: "1s",
                  animationFillMode: "forwards",
                  animationTimingFunction: "linear",
                },
              }}
            />
          </div>
        </div>

        <AnimatePresence>
          {openYoutubeModel && (
            <motion.div
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              ref={youtubeModelContainerRef}
              className="fixed inset-0 bg-[#030404A8] flex justify-center items-center p-[16px] w-full h-full z-30 backdrop-blur-sm"
            >
              <motion.div
                exit={{ y: "100vh" }}
                animate={{ y: 0 }}
                initial={{ y: "100vh" }}
                transition={{ duration: 0.5, type: "spring" }}
                ref={youtubeModelRef}
                className="w-full h-full flex justify-center items-center"
              >
                <div
                  className="absolute inset-0 h-full w-full z-[-1]"
                  onMouseDown={closeYoutubeModelHandler}
                ></div>
                <iframe
                  width="560"
                  height="315"
                  src={externalLinks?.how_to_contribute}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="rounded-[12px] w-full h-fit aspect-video max-w-[800px] mx-auto"
                ></iframe>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Image
          src={IMAGEKIT_IMAGES.WISHWELL_BG}
          alt="background"
          height={1080}
          width={1920}
          layout="fixed"
          className="absolute top-0 left-0 -z-[1] w-full h-[120vh] object-[70%_50%] object-none md:w-full md:h-[110vh] md:object-cover"
        />
      </div>
    </div>
  );
}
