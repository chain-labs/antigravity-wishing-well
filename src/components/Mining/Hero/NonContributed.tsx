import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { IToken, StateType } from "../types";
import useTimer from "@/hooks/frontend/useTimer";
import { useChainModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useRestFetch, useRestPost } from "@/hooks/useRestClient";
import useMerkleTree from "@/hooks/sc-fns/useMerkleTree.mine";
import useMining from "@/hooks/sc-fns/useMining";
import { MULTIPLIER } from "../constants";
import { errorToast } from "@/hooks/frontend/toast";
import NFTHero from "./NFTHero";
import NoNFTHero from "./NoNFTHero";
import MiningCalculator from "../MiningCalculator";
import Button from "@/components/Button";
import { IMAGEKIT_ICONS } from "@/assets/imageKit";
import CountdownTimer from "@/components/CountdownTimer";
import { TEST_NETWORK } from "@/constants";
import { checkCorrectNetwork } from "@/components/RainbowKit";
import useUserData from "@/app/(client)/store";

export default function NonContributed({
  state,
  NFTHover,
  setNFTHover,
  NFTContainerRef,
  NFTRef,
  setMinedSuccess,
}: {
  state: StateType;
  NFTHover: boolean;
  setNFTHover: Dispatch<SetStateAction<boolean>>;
  NFTContainerRef: React.RefObject<HTMLDivElement>;
  NFTRef: React.RefObject<HTMLDivElement>;
  setMinedSuccess: Dispatch<SetStateAction<boolean>>;
}) {
  const [value, setValue] = useState(40000);
  const timerState = useTimer();

  const getEra = (era: string) => {
    switch (era) {
      case "wishwell":
        return 1;
      case "mining":
        return 2;
      case "minting":
        return 3;
      default:
        return 2;
    }
  };

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
  const { openChainModal } = useChainModal();

  const { data: s3Data } = useRestFetch(["s3"], `/s3`, { proxy: true });

  const tokens: IToken[] = useMemo(() => {
    if (!account.isConnected || !checkCorrectNetwork(account.chainId)) {
      return (s3Data as any)?.data?.tokens;
    }
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
  }, [account.address, ERA1_ADDRESSES]);

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
      setMinedSuccess(true);
    }
  }, [receipt]);

  const {
    data: predictedPointsData,
    isSuccess: predictedPointsSuccess,
    mutate: predictPointsFn,
  } = useRestPost(
    ["token_price", tokens?.[selectedToken]?.address],
    TEST_NETWORK ? "/api/predict-points" : "/api/predict-points",
    // { enabled: !!usdValue },
  );

  useEffect(() => {
    if (usdValue && account.isConnected) {
      predictPointsFn({
        walletAddress: account.address,
        amount: value * usdValue || 0,
      });
    }
  }, [account.address, usdValue, value]);

  const [multiplyer, setMultiplyer] = useState(0);

  const calculateMultiplyer = (points: number) => {
    const multiplyerData = points / (value * (usdValue || 0));
    setMultiplyer(multiplyerData);
  };

  const predictedPoints = useMemo(() => {
    if (predictedPointsData) {
      // @ts-ignore
      const currentPoints = predictedPointsData?.points;
      if (multiplyer === 0) calculateMultiplyer(currentPoints);
      return currentPoints || 0;
    }
    return 0;
  }, [predictedPointsData, predictedPointsSuccess]);

  useEffect(() => {
    if (usdValue) {
      calculateMultiplyer(predictedPoints);
    }
  }, [account.address, usdValue]);

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

  const { nftURL } = useUserData();

  return (
    <div className="max-w-full relative flex flex-col justify-center items-center gap-[8px] mt-[50px]">
      {(darkXBalance as bigint) > 0 && nftURL !== "" ? (
        <NFTHero NFTHover={NFTHover} setNFTHover={setNFTHover} />
      ) : (
        <NoNFTHero />
      )}

      <MiningCalculator
        tokenBalance={tokenBalances?.[selectedToken] || "0"}
        value={value}
        points={predictedPoints || 0}
        setValue={setValue}
        conversionRateToUSD={0.245}
        era={getEra(timerState.era)}
        phase={timerState.phase}
        multiplyer={multiplyer}
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
          variants={{
            hover: {
              animationName: "wiggle",
              animationDuration: "1s",
              animationFillMode: "forwards",
              animationTimingFunction: "linear",
            },
          }}
        />
      ) : checkCorrectNetwork(account.chainId) ? (
        <Button
          loading={transactionLoading}
          innerText={transactionLoading ? "Processing" : "Mine Now"}
          iconSrc={IMAGEKIT_ICONS.HAMMER}
          iconAlt="hammer"
          onClick={handleMine}
          variants={{
            hover: {
              scale: !transactionLoading ? 1.35 : 1,
              rotate: !transactionLoading ? 390 : 0,
              transition: {
                duration: 1,
                type: "spring",
              },
            },
          }}
          disabled={
            value === 0 || value > Number(tokenBalances?.[selectedToken])
          }
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
      <div className="p-[8px] rounded-[6px] bg-[#030404A8]">
        <CountdownTimer state={timerState} fontDesktopSize={56} />
      </div>
    </div>
  );
}
