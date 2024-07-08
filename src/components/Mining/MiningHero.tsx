import {
  IMAGEKIT_ICONS,
  IMAGEKIT_IMAGES,
  IMAGEKIT_LOGOS,
} from "@/assets/imageKit";
import Button from "@/components/Button";
import CountdownTimer from "@/components/CountdownTimer";
import H1 from "@/components/HTML/H1";
import P from "@/components/HTML/P";
import MiningCalculator, {
  pointsConverterToUSCommaseparated,
} from "@/components/Mining/MiningCalculator";
import useTimer from "@/hooks/frontend/useTimer";
import Image from "next/image";
import React, {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Pill from "../Pill";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { base, pulsechain } from "viem/chains";
import { IToken, StateType, TokenDropdownTypes } from "./types";
import useMining from "@/hooks/sc-fns/useMining";
import useMerkleTree from "@/hooks/sc-fns/useMerkleTree.mine";
import useClaimMerkleTree from "@/hooks/sc-fns/useMerkleTree.claim";
import { useAccount, useReadContract } from "wagmi";
import { MULTIPLIER } from "./constants";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { errorToast } from "@/hooks/frontend/toast";
import useClaim from "@/hooks/sc-fns/useClaim";
import { formatUnits } from "viem";
import { AnimatePresence, motion } from "framer-motion";
import { useRestFetch } from "@/hooks/useRestClient";
import AutomaticIncreamentalNumberCounter from "../Home/components/spinner/AutomaticIncreamentalNumberCounter";
import BadgeIncrementalCounter from "./BadgeIncrementalCounter";
import StarFieldCanvas from "./Starfeild";
import useDarkContract from "@/abi/Dark";
import useDarkClaimContract from "@/abi/DarkClaim";

function NoNFTHero() {
  return (
    <div className="md:absolute top-0 left-0 md:translate-x-[calc(-100%-48px)] flex flex-col justify-start items-start gap-[16px] md:max-w-[220px] p-[16px] md:p-0">
      <H1 className="text-agwhite text-[56px] leading-[53.76px] md:text-[64px] md:leading-[64px]">
        Mining
      </H1>
      <P>
        Everyone is going to say you got lucky!
        <br />
        <br />
        Start mining with the recommended tokens and get Points and $DARKX
        tokens.
        <br />
        <br />
        Try the interactive demo! ➡️
      </P>
    </div>
  );
}

function NFTHero({
  NFTHover,
  setNFTHover,
}: {
  NFTHover: boolean;
  setNFTHover: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <>
      <div className="md:absolute top-0 left-0 md:translate-x-[calc(-100%-48px)] flex flex-col justify-start items-start gap-[16px] md:max-w-[220px] p-[16px] md:p-0 z-10">
        <H1 className="text-agwhite text-[56px] leading-[53.76px] md:text-[64px] md:leading-[64px]">
          Mining
        </H1>
        <P>
          Everyone is going to say you got lucky!
          <br />
          <br />
          Start mining with the recommended tokens and get Points and $DARKX
          tokens.
        </P>
        <div className="flex justify-center items-center gap-[16px] z-50">
          <div className="hidden md:block">
            <Image
              onMouseEnter={() => setNFTHover(true)}
              src={IMAGEKIT_LOGOS.WISHWELL_LOGO}
              height={80}
              width={80}
              alt="wishwell logo hidden md:block"
            />
          </div>
          <div className="flex justify-center items-center gap-[16px] md:hidden">
            <Image
              src={IMAGEKIT_LOGOS.WISHWELL_LOGO}
              height={80}
              width={80}
              alt="wishwell logo"
            />
            <Button
              onClick={() => setNFTHover(true)}
              innerText="View Your NFT"
              iconSrc={IMAGEKIT_ICONS.ROCKET}
              iconAlt="rocket"
              className="bg-[#030404A8] md:hidden"
            />
          </div>
        </div>
      </div>
    </>
  );
}

function ContributedCard({
  value,
  pillText,
  pillIconSrc,
  pillIconAlt,
}: {
  value: number;
  pillText: string;
  pillIconSrc: string | StaticImport;
  pillIconAlt: string;
}) {
  return (
    <div
      className="relative flex justify-between z-0 text-agwhite transition-all duration-300 ease-in-out bg-agblack rounded-[6px] px-[12px] py-[16px] w-full border-[1px]
		before:content-[''] before:absolute before:inset-0 before:z-[-10] md:before:bg-gradient-to-bl before:from-[#5537A5] before:to-[#BF6841] before:rounded-[inherit] before:overflow-hidden before:m-[-1px]
		after:content-[''] after:absolute after:inset-0 after:z-[-2] after:bg-gradient-to-b after:from-[#0A1133] after:to-[#142266] after:rounded-[inherit] after:overflow-hidden"
    >
      <H1 className="text-[32px] leading-[32px] md:text-[32px] md:leading-[32px]">
        {pointsConverterToUSCommaseparated(value)}
      </H1>
      <div className="flex flex-col justify-center items-center">
        <Pill text={pillText} iconSrc={pillIconSrc} iconAlt={pillIconAlt} />
      </div>
    </div>
  );
}

function ContributedHero() {
  const { openConnectModal } = useConnectModal();
  const account = useAccount();

  const { data: era2Data } = useRestFetch(["s3"], `/s3?file=era2`, {
    proxy: true,
  });

  const ERA2_DATA: { accounts: string[]; points: string[]; nonces: string[] } =
    useMemo(() => {
      if (era2Data) {
        console.log({ era2Data });
        // @ts-ignore
        const era2DataStream = era2Data?.data?.era2;
        return era2DataStream;
      }
      return { accounts: [], points: [], nonces: [] };
    }, [era2Data]);

  const { generateProof } = useClaimMerkleTree(
    ERA2_DATA.accounts,
    ERA2_DATA.points,
    ERA2_DATA.nonces,
  );

  const points = useMemo(() => {
    if (account.address) {
      const accountIndex = ERA2_DATA.accounts.findIndex(
        (x) => x.toLowerCase() === account.address?.toLowerCase(),
      );

      if (accountIndex > 0) {
        const foundPoints = ERA2_DATA.points[accountIndex];

        const formattedPoints = formatUnits(BigInt(foundPoints), 18);
        return Number(formattedPoints);
      } else return 0;
    }

    return 40000;
  }, [account.address, era2Data]);

  const proof: string[] = useMemo(() => {
    if (account.address && ERA2_DATA) {
      const accountIndex = ERA2_DATA.accounts.findIndex(
        (x) => x.toLowerCase() === account.address?.toLowerCase(),
      );

      const generatedProof = generateProof(
        account.address,
        ERA2_DATA.points[accountIndex],
        ERA2_DATA.nonces[accountIndex],
      );

      console.log({ generatedProof });
      return generatedProof || [];
    }
    return [];
  }, [account.address, era2Data]);

  const DarkContract = useDarkContract();
  const DarkClaimContract = useDarkClaimContract();

  const { data: dark_MAX_SUPPLY } = useReadContract({
    address: DarkContract.address as `0x${string}`,
    abi: DarkContract.abi,
    functionName: "MAX_SUPPLY",
  });

  const { data: dark_total_points } = useReadContract({
    address: DarkClaimContract.address as `0x${string}`,
    abi: DarkClaimContract.abi,
    functionName: "totalPoints",
  });

  const darkTokens = useMemo(() => {
    console.log({ dark_total_points, dark_MAX_SUPPLY, points });
    if (points && dark_MAX_SUPPLY) {
      const MAX_SUPPLY = Number(formatUnits(dark_MAX_SUPPLY as bigint, 18));
      const totalPoints = Number(formatUnits(dark_total_points as bigint, 18));
      const dark = (((points * MAX_SUPPLY) / totalPoints) * 10) / 100;
      return dark;
    }
    return 0;
  }, [points, dark_MAX_SUPPLY, dark_total_points]);

  const { claim, transactionLoading } = useClaim();

  const handleClaim = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const accountIndex = ERA2_DATA.accounts.findIndex(
      (x) => x.toLowerCase() === account.address?.toLowerCase(),
    );

    claim(
      ERA2_DATA.points[accountIndex],
      ERA2_DATA.nonces[accountIndex],
      proof,
    );
  };

  return (
    <div className="relative flex flex-col justify-center items-center gap-[24px] -mt-[50px]">
      <div className="flex flex-col justify-center items-center gap-[8px]">
        <H1 className="text-[64px] leading-[64px] md:text-[64px] md:leading-[64px]">
          Claim $DARK
        </H1>
        <P className="text-[14px] leading-[20.3px]">
          You can now get your $DARK tokens.
        </P>
      </div>
      <div className="flex flex-col justify-center items-center gap-[8px] w-full">
        <ContributedCard
          value={points}
          pillText="Points"
          pillIconSrc={IMAGEKIT_ICONS.PILL_POINTS}
          pillIconAlt="points"
        />
        <div
          style={{
            gap: "11px",
          }}
          className="flex justify-center items-center w-full"
        >
          <div
            style={{
              width: "100%",
              height: "1px",
              backgroundColor: "#FF5001",
              borderRadius: "100px",
            }}
          ></div>
          <div className="text-agwhite uppercase tracking-wider text-nowrap font-bold">
            So you get:
          </div>
          <div
            style={{
              width: "100%",
              height: "1px",
              backgroundColor: "#FF5001",
              borderRadius: "100px",
            }}
          ></div>
        </div>
        <ContributedCard
          value={darkTokens}
          pillText="DARK"
          pillIconSrc={IMAGEKIT_ICONS.PILL_DARK_X}
          pillIconAlt="dark x"
        />
        {!account.isConnected ? (
          <Button
            innerText="Connect Wallet"
            iconSrc={IMAGEKIT_ICONS.WALLET_WHITE}
            iconAlt="wallet"
            onClick={openConnectModal}
          />
        ) : (
          <Button
            innerText={transactionLoading ? "Claiming..." : "Claim Now"}
            loading={transactionLoading}
            disabled={points === 0}
            iconSrc={IMAGEKIT_ICONS.CLAIM}
            iconAlt="Claim Now"
            onClick={handleClaim}
          />
        )}
      </div>
    </div>
  );
}

function NonContributed({
  state,
  NFTHover,
  setNFTHover,
  NFTContainerRef,
  NFTRef,
}: {
  state: StateType;
  NFTHover: boolean;
  setNFTHover: Dispatch<SetStateAction<boolean>>;
  NFTContainerRef: React.RefObject<HTMLDivElement>;
  NFTRef: React.RefObject<HTMLDivElement>;
}) {
  const [value, setValue] = useState(40000);
  const timerState = useTimer();

  const { openConnectModal } = useConnectModal();

  useEffect(() => {
    if (!NFTHover) return;
    if (!NFTContainerRef.current) return;
    NFTContainerRef.current.addEventListener("click", (e) => {
      // if e.currentTarget is not the NFTRef and button
      if (NFTRef.current && !NFTRef.current.contains(e.target as Node)) {
        setNFTHover(false);
      }
    });

    return () => {
      document.removeEventListener("click", () => {});
    };
  }, [NFTHover, NFTContainerRef, NFTRef]);

  useEffect(() => {
    document.body.style.overflow = NFTHover ? "hidden" : "auto";
  }, [NFTHover]);

  const [selectedToken, setSelectedToken] = useState(0);

  const account = useAccount();

  const { data: s3Data } = useRestFetch(["s3"], `/s3`, { proxy: true });

  const tokens: IToken[] = useMemo(() => {
    if (s3Data) {
      const tokensData = (s3Data as any)?.data?.tokens?.filter(
        (token: IToken) => token.chainId === account.chainId,
      );
      return tokensData;
    }
    return [];
  }, [s3Data, account.chainId]);

  const ERA1_ADDRESSES: string[] = useMemo(() => {
    if (s3Data) {
      const era1Data = (s3Data as any)?.data?.era1?.accounts;
      console.log({ era1Data });
      return era1Data;
    }
    return [];
  }, [s3Data]);

  const { generateProof } = useMerkleTree(ERA1_ADDRESSES);

  const proof = useMemo(() => {
    if (account.address) {
      const address = account.address;

      return generateProof(address as `0x${string}`);
    } else return [];
  }, [account.address]);

  const {
    mineToken,
    transactionLoading,
    darkXBalance,
    tokenBalances,
    receipt,
  } = useMining(
    selectedToken,
    tokens,
    value,
    proof.length > 0 ? MULTIPLIER * 2 : MULTIPLIER,
  );
  // useEffect(() => {
  //   if (tokenBalances) {
  //     console.log({ selectedToken });
  //   }
  // }, [tokenBalances]);

  const { data: tokenPrice } = useRestFetch<{ price: number }>(
    ["token_price", tokens?.[selectedToken]?.address],
    `/be/coinPrices?token=${tokens?.[selectedToken]?.address}&pool=${tokens?.[selectedToken]?.pool}&network=${tokens?.[selectedToken]?.chainId}`,
    { proxy: true, enabled: !!tokens?.[selectedToken]?.address },
  );

  const usdValue = useMemo(() => {
    console.log({ tokenPrice });
    return tokenPrice?.price;
  }, [tokenPrice]);
  useEffect(() => {
    if (receipt) {
      setNFTHover(true);
    }
  }, [receipt]);

  const handleMine = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!account.address) {
      errorToast("Wallet not Connected! Please connect wallet");
      return;
    }
    if (!proof) {
      errorToast("Something went Wrong! Please Try Again.");
      console.error("Proof not generated");
      return;
    }

    if (account.address && proof) {
      await mineToken(proof);
    }
  };

  // TODO: Fetch or set current era here
  const era = useMemo<1 | 2 | 3>(() => {
    return 2;
  }, []);

  // TODO: Fetch or set current phase here
  const phase = useMemo<1 | 2 | 3>(() => {
    return 1;
  }, []);

  useEffect(() => {
    if (
      (darkXBalance as bigint) > 0 &&
      localStorage.getItem("nft-reveal-first-time") === "false"
    ) {
      localStorage.setItem("nft-reveal-first-time", "true");
      setNFTHover(true);
      return;
    }

    if ((darkXBalance as bigint) <= 0) {
      console.log("here");
      localStorage.setItem("nft-reveal-first-time", "false");
    }
  }, [darkXBalance]);

  return (
    <div className="relative flex flex-col justify-center items-center gap-[8px] mt-[50px]">
      {state !== "Claiming" ? (
        (darkXBalance as bigint) > 0 ? (
          <NFTHero NFTHover={NFTHover} setNFTHover={setNFTHover} />
        ) : (
          <NoNFTHero />
        )
      ) : (
        <></>
      )}
      <MiningCalculator
        tokenBalance={tokenBalances?.[selectedToken] || "0"}
        value={value}
        setValue={setValue}
        conversionRateToUSD={0.245}
        era={era}
        phase={phase}
        multiplyer={proof.length > 0 ? MULTIPLIER * 2 : MULTIPLIER}
        inputOptions={
          tokens?.map((token) => ({
            ...token,
            USDvalue: usdValue,
          })) || []
        }
        setSelectedToken={setSelectedToken}
      />
      {!account.isConnected ? (
        <Button
          innerText="Connect Wallet"
          iconSrc={IMAGEKIT_ICONS.WALLET_WHITE}
          iconAlt="wallet"
          onClick={openConnectModal}
        />
      ) : (
        <Button
          loading={transactionLoading}
          innerText={transactionLoading ? "Processing" : "Mine Now"}
          iconSrc={IMAGEKIT_ICONS.HAMMER}
          iconAlt="hammer"
          onClick={handleMine}
        />
      )}
      <div className="p-[8px] rounded-[6px] bg-[#030404A8]">
        <CountdownTimer state={timerState} fontDesktopSize={56} />
      </div>
    </div>
  );
}

function NFTPopUp({
  NFTContainerRef,
  NFTRef,
}: {
  NFTContainerRef: React.RefObject<HTMLDivElement>;
  NFTRef: React.RefObject<HTMLDivElement>;
}) {
  const points = {
    wishwell: 41415.65,
    mining: 41415.65,
    total: 82831.3,
    conversion: 10,
    badge: "Specialist Technician",
  };
  const [completeAnimationComplete, setCompleteAnimationComplete] =
    useState(false);
  const [starfieldAnimationComplete, setStarfieldAnimationComplete] =
    useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // when mouse is over nft move the card to z axis
    const currentRef = NFTRef.current;
    if (!currentRef) return;

    currentRef.addEventListener("mousemove", (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    });

    return () => {
      currentRef.removeEventListener("mousemove", () => {});
    };
  }, [NFTRef]);

  useEffect(() => {
    setTimeout(() => {
      setCompleteAnimationComplete(true);
    }, 3000);
  }, []);

  return (
    <motion.div
      exit={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      initial={{
        opacity: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      ref={NFTContainerRef}
      className="fixed top-0 left-0 w-screen h-screen bg-gradient-to-b from-[#0000001f] to-[#0000001f] flex justify-center items-center z-10 backdrop-blur-lg"
    >
      <AnimatePresence>
        {!starfieldAnimationComplete && (
          <motion.div
            exit={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            initial={{ opacity: 0 }}
            transition={{
              duration: 2,
            }}
            onAnimationComplete={() => setStarfieldAnimationComplete(true)}
            className="absolute inset-0 h-full w-full"
          >
            <StarFieldCanvas
              count={100}
              xRange={100}
              yRange={100}
              zRange={100}
              speed={0.75}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        exit={{
          scale: 0,
        }}
        animate={{
          scale: 1,
        }}
        initial={{
          scale: 0,
        }}
        transition={{
          duration: 0.5,
          type: "spring",
        }}
        ref={NFTRef}
        style={{
          z: cursorPos.y,
          perspective: "1000px",
        }}
        className="z-0"
      >
        <AnimatePresence>
          {!completeAnimationComplete && (
            <motion.div
              exit={{
                opacity: 0,
              }}
              transition={{ duration: 2 }}
              className="relative w-fit max-w-[265px] h-fit flex flex-col justify-center items-center gap-[8px] p-[16px] rounded-[12px] bg-agblack border-[6px] z-0
            before:content-[''] before:absolute before:inset-0 before:z-[-10] before:bg-gradient-to-tr before:from-[#3C00DC] before:to-[#FF5001] before:rounded-[inherit] before:overflow-hidden before:m-[-6px]
			after:content-[''] after:absolute after:inset-0 after:z-[-2] after:bg-agblack after:rounded-[inherit] after:overflow-hidden
        "
            >
              <Image
                src={IMAGEKIT_IMAGES.COUNTDOWN_BG_GRID}
                alt="countdown bg grid"
                width={800}
                height={800}
                className="absolute inset-0 z-[-1] w-full h-full object-cover user-select-none pointer-events-none"
              />
              <H1 className="uppercase text-[36px] leading-[36px] md:text-[36px] md:leading-[36px]">
                ANTIGRAVITY
              </H1>
              <div className="h-[2.796px] w-full bg-gradient-to-r from-[#FF5001] to-[#3C00DC]"></div>
              <div className="p-[12px] bg-[rgba(60,0,220,0.33)] w-full h-fit">
                <P
                  uppercase
                  className="text-agwhite opacity-[0.66] text-[16px] leading-normal md:text-[16px] md:leading-normal tracking-normal font-normal font-sans"
                >
                  Your Rank
                </P>
                <div className="overflow-hidden">
                  <motion.div
                    animate={{
                      y: 0,
                    }}
                    initial={{
                      y: 100,
                    }}
                    transition={{
                      duration: 1,
                      type: "spring",
                      bounce: 0.25,
                    }}
                  >
                    <P
                      uppercase
                      className="text-transparent text-[26px] leading-[26px] md:text-[26px] md:leading-[26px] bg-clip-text bg-gradient-to-b from-[#B4EBF8] to-[#789DFA] font-black tracking-normal font-sans"
                    >
                      {points.badge}
                      {/* <BadgeIncrementalCounter badge="Cheif Navigator" /> */}
                    </P>
                  </motion.div>
                </div>
              </div>
              <div className="p-[12px] bg-[rgba(60,0,220,0.33)] w-full h-fit">
                <P
                  uppercase
                  className="text-agwhite opacity-[0.66] text-[16px] leading-normal md:text-[16px] md:leading-normal tracking-normal font-normal font-sans"
                >
                  Wishwell Era Points
                </P>
                <P
                  uppercase
                  className="text-agwhite text-[26px] leading-[26px] md:text-[26px] md:leading-[26px] font-black tracking-normal font-sans"
                >
                  <AutomaticIncreamentalNumberCounter
                    from={0}
                    to={points.wishwell}
                    float={true}
                    floatingPoint={String(points.wishwell).split(".")[1].length}
                  />
                </P>
              </div>
              <div className="p-[12px] bg-[rgba(60,0,220,0.33)] w-full h-fit">
                <P
                  uppercase
                  className="text-agwhite opacity-[0.66] text-[16px] leading-normal md:text-[16px] md:leading-normal tracking-normal font-normal font-sans"
                >
                  Mining Era Points
                </P>
                <P
                  uppercase
                  className="text-agwhite text-[26px] leading-[26px] md:text-[26px] md:leading-[26px] font-black tracking-normal font-sans"
                >
                  <AutomaticIncreamentalNumberCounter
                    from={0}
                    to={points.mining}
                    float={true}
                    floatingPoint={String(points.mining).split(".")[1].length}
                  />
                </P>
              </div>
              <div className="p-[12px] bg-[rgba(60,0,220,0.33)] w-full h-fit">
                <P
                  uppercase
                  className="text-agwhite opacity-[0.66] text-[16px] leading-normal md:text-[16px] md:leading-normal tracking-normal font-normal font-sans"
                >
                  Total Points
                </P>
                <P
                  uppercase
                  className="text-agyellow text-[26px] leading-[26px] md:text-[26px] md:leading-[26px] font-black tracking-normal font-sans"
                >
                  <AutomaticIncreamentalNumberCounter
                    from={0}
                    to={points.total}
                    float={true}
                    floatingPoint={String(points.total).split(".")[1].length}
                  />
                </P>
              </div>
              <P
                uppercase
                className="ml-auto text-agwhite opacity-[0.66] text-[16px] leading-normal md:text-[16px] md:leading-normal tracking-normal font-bold font-sans"
              >
                {points.conversion} Points / $1
              </P>
            </motion.div>
          )}
          {completeAnimationComplete && (
            <Image
              src={IMAGEKIT_IMAGES.NFT_RECEIPT}
              alt="nft card"
              width={265}
              height={400}
              className="w-[265px] h-auto object-cover z-[-1]"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default function MiningHero() {
  const [state, setState] = useState<StateType>("Claiming");
  const [NFTHover, setNFTHover] = useState(false);
  const NFTRef = useRef<HTMLDivElement>(null);
  const NFTContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full min-h-screen h-fit">
      <div className="bg-gradient-to-b from-[#000] h-fit to-[#0000]">
        <div className="flex flex-col justify-center items-center w-full h-fit pt-[30px] md:pt-[100px]">
          {state === "Claiming" ? (
            <ContributedHero />
          ) : (
            <NonContributed
              state={state}
              NFTContainerRef={NFTContainerRef}
              NFTRef={NFTRef}
              NFTHover={NFTHover}
              setNFTHover={setNFTHover}
            />
          )}
        </div>
        <AnimatePresence>
          {NFTHover && (
            <NFTPopUp NFTContainerRef={NFTContainerRef} NFTRef={NFTRef} />
          )}
        </AnimatePresence>
        <Image
          src={IMAGEKIT_IMAGES.MINING_BG}
          height={1080}
          width={1920}
          alt="background"
          layout="cover"
          objectFit="cover"
          className="absolute top-0 left-0 -z-[1] w-full h-[120%] object-[15%_50%] object-none md:w-full md:h-[110%] md:object-cover"
        />
      </div>
    </div>
  );
}
