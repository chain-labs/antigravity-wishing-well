import Button from "@/components/Button";
import ContributedCard from "./ContributedCard";
import { IMAGEKIT_ICONS, IMAGEKIT_IMAGES } from "@/assets/imageKit";
import Image from "next/image";
import { CLAIM_LISTS } from "../constants";
import useClaim from "@/hooks/sc-fns/useClaim";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { formatUnits } from "viem";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import useClaimMerkleTree from "@/hooks/sc-fns/useMerkleTree.claim";
import { AnimatePresence, motion } from "framer-motion";
import DarkXFieldCanvas from "../DarkXfield";

export default function ClaimedCard({
  setState,
}: {
  setState: Dispatch<SetStateAction<string>>;
}) {
  const { openConnectModal } = useConnectModal();
  const [starfieldAnimationComplete, setStarfieldAnimationComplete] =
    useState(false);
  const [
    pointsConversionAnimationComplete,
    setPointsConversionAnimationComplete,
  ] = useState(true);

  const account = useAccount();

  useEffect(() => {
    if (!account.isConnected) {
      setState("Claiming");
    }
  }, [account.isConnected]);

  function handlePointsConversionAnimationComplete() {
    setTimeout(() => {
      setStarfieldAnimationComplete(true);
    }, 3000);
    setPointsConversionAnimationComplete(false);
  }

  function handlePointsConversionAnimationStart() {
    setPointsConversionAnimationComplete(true);
    setStarfieldAnimationComplete(false);
  }

  const { darkBalance: darkBalanceInHex } = useClaim();

  const darkBalance = useMemo(() => {
    if (darkBalanceInHex) {
      return Number(formatUnits(darkBalanceInHex as bigint, 18));
    } else return 0;
  }, [darkBalanceInHex]);

  useEffect(() => {
    if (darkBalance === 0) {
      setState("Claiming");
    }
  }, [darkBalance]);

  return (
    <>
      <div className="z-1000">
        <AnimatePresence>
          {!starfieldAnimationComplete && (
            <motion.div
              exit={{
                opacity: 0,
              }}
              initial={{ opacity: 1 }}
              className="absolute inset-0 h-full w-full bg-[#00000043] backdrop-blur-lg z-0"
            >
              <DarkXFieldCanvas
                count={100}
                xRange={100}
                yRange={100}
                zRange={100}
                speed={0.75}
                icon={IMAGEKIT_ICONS.PILL_DARK_X_CLAIMED_WHITE}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="relative flex flex-col justify-center items-center gap-[24px] mt-[50px]">
        <div className="relative flex flex-col justify-center items-center gap-[8px] border-[1px] border-agyellow rounded-[0.375rem] overflow-hidden z-0 w-fit h-fit">
          <Image
            src={IMAGEKIT_IMAGES.MINING_TOKENS_CLAIMED}
            height={300}
            width={400}
            alt="mining tokens claimed"
            className="object-cover w-[25rem] h-[14.011rem]"
          />
          <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#00000080] via-[#00000000] to-[#00000080] z-1 flex justify-center items-center">
            <p className="text-[32px] leading-[32px] text-agwhite font-sans font-extrabold h-fit">
              All Claimed!
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-[8px] w-full">
          <div
            style={{
              gap: "11px",
            }}
            className="flex justify-center items-center w-full"
          >
            <div className="text-agwhite uppercase tracking-wider text-nowrap font-bold">
              You have claimed
            </div>
          </div>
          <AnimatePresence>
            {pointsConversionAnimationComplete ? (
              <motion.div
                initial={{ scale: 2 }}
                whileInView={{ scale: 0 }}
                transition={{ duration: 3 }}
                onAnimationComplete={handlePointsConversionAnimationComplete}
                className="w-full"
              >
                <ContributedCard
                  value={darkBalance}
                  pillText="Points"
                  pillIconSrc={IMAGEKIT_ICONS.PILL_POINTS}
                  pillIconAlt="Points"
                  animateNumber
                  from={darkBalance}
                  to={0}
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2, type: "spring" }}
                onAnimationComplete={handlePointsConversionAnimationComplete}
                className="w-full"
              >
                <ContributedCard
                  value={darkBalance}
                  pillText="DARK"
                  pillIconSrc={IMAGEKIT_ICONS.PILL_DARK_X_CLAIMED}
                  pillIconAlt="dark x"
                  animateNumber
                  from={0}
                  to={darkBalance}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <Button
            innerText="All Dark Tokens Claimed!"
            iconSrc={IMAGEKIT_ICONS.TICK}
            iconAlt="tick"
            className="bg-[#3f17a8]"
            variants={{
              hover: {
                animationName: "wiggle",
                animationDuration: "1s",
                animationFillMode: "forwards",
                animationTimingFunction: "linear",
              },
            }}
            onClick={handlePointsConversionAnimationStart}
          />
        </div>
      </div>
    </>
  );
}
