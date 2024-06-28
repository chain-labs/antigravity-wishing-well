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
import { StateType, TokenDropdownTypes } from "./types";
import useMining from "@/hooks/sc-fns/useMining";
import useMerkleTree from "@/hooks/sc-fns/useMerkleTree.mine";
import useClaimMerkleTree from "@/hooks/sc-fns/useMerkleTree.claim";
import { useAccount } from "wagmi";
import {
  ADDRESS_LIST,
  CLAIM_LISTS,
  MULTIPLIER,
  TOKEN_OPTIONS,
} from "./constants";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { errorToast } from "@/hooks/frontend/toast";
import useClaim from "@/hooks/sc-fns/useClaim";
import { formatUnits } from "viem";
import { AnimatePresence, motion } from "framer-motion";

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
				Start mining with the recommended tokens and get Points and
				$DARKX tokens.
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
				<Pill
					text={pillText}
					iconSrc={pillIconSrc}
					iconAlt={pillIconAlt}
				/>
			</div>
		</div>
	);
}

function ContributedHero() {
  const { openConnectModal } = useConnectModal();
  const account = useAccount();

  const { generateProof } = useClaimMerkleTree(
    CLAIM_LISTS.accounts,
    CLAIM_LISTS.points,
    CLAIM_LISTS.nonces
  );

  const points = useMemo(() => {
    if (account.address) {
      const accountIndex = CLAIM_LISTS.accounts.findIndex(
        (x) => x.toLowerCase() === account.address?.toLowerCase()
      );

      if (accountIndex > 0) {
        const foundPoints = CLAIM_LISTS.points[accountIndex];

        const formattedPoints = formatUnits(
          BigInt(CLAIM_LISTS.points[accountIndex]),
          18
        );
        return Number(formattedPoints);
      } else return 0;
    }

    return 30000;
  }, [account.address]);

  const proof: string[] = useMemo(() => {
    if (account.address) {
      const accountIndex = CLAIM_LISTS.accounts.findIndex(
        (x) => x.toLowerCase() === account.address?.toLowerCase()
      );

      const generatedProof = generateProof(
        account.address,
        CLAIM_LISTS.points[accountIndex],
        CLAIM_LISTS.nonces[accountIndex]
      );

      return generatedProof || [];
    }
    return [];
  }, [account.address]);

  const { claim, transactionLoading } = useClaim();

  const handleClaim = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const accountIndex = CLAIM_LISTS.accounts.findIndex(
      (x) => x.toLowerCase() === account.address?.toLowerCase()
    );

    claim(
      CLAIM_LISTS.points[accountIndex],
      CLAIM_LISTS.nonces[accountIndex],
      proof
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
          value={points}
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

  const { generateProof } = useMerkleTree(ADDRESS_LIST);

  const proof = useMemo(() => {
    if (account.address) {
      const address = account.address;

      return generateProof(address as `0x${string}`);
    } else return [];
  }, [account.address]);

  const { mineToken, transactionLoading, darkXBalance, tokenBalance } =
    useMining(
      TOKEN_OPTIONS[selectedToken],
      value,
      proof.length > 0 ? MULTIPLIER * 2 : MULTIPLIER
    );

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

  return (
    <div className="relative flex flex-col justify-center items-center gap-[8px] mt-[50px]">
      {/* {
        {
          "No NFT": <NoNFTHero />,
          "NFT Present": (
            <NFTHero NFTHover={NFTHover} setNFTHover={setNFTHover} />
          ),
          Claiming: <></>,
        }[state]
      } */}
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
        value={value}
        setValue={setValue}
        conversionRateToUSD={0.245}
        era={era}
        phase={phase}
        multiplyer={proof.length > 0 ? MULTIPLIER * 2 : MULTIPLIER}
        inputOptions={TOKEN_OPTIONS}
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

export default function MiningHero() {
  const [state, setState] = useState<StateType>("Mining");
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
							className="fixed top-0 left-0 w-screen h-screen bg-gradient-to-b from-[#ffffff1f] to-[#ffffff1f] flex justify-center items-center z-10 backdrop-blur-sm"
						>
							<motion.div
								exit={{
									y: "100vh",
								}}
								animate={{
									y: 0,
								}}
								initial={{
									y: "100vh",
								}}
								transition={{
									duration: 0.5,
									type: "spring",
								}}
								ref={NFTRef}
							>
								<Image
									src={IMAGEKIT_IMAGES.NFT_RECEIPT}
									width={265}
									height={481}
									alt="NFT receipt"
									className="object-cover w-[250px] md:w-[290px]"
								/>
							</motion.div>
						</motion.div>
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
