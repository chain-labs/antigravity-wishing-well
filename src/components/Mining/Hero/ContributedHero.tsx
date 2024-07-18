import useDarkContract from "@/abi/Dark";
import useDarkClaimContract from "@/abi/DarkClaim";
import H1 from "@/components/HTML/H1";
import P from "@/components/HTML/P";
import useClaim from "@/hooks/sc-fns/useClaim";
import { useRestFetch } from "@/hooks/useRestClient";
import { useChainModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { formatUnits } from "viem";
import { useAccount, useReadContract, useSwitchChain } from "wagmi";
import ContributedCard from "./ContributedCard";
import { IMAGEKIT_ICONS } from "@/assets/imageKit";
import Button from "@/components/Button";
import useClaimMerkleTree from "@/hooks/sc-fns/useMerkleTree.claim";
import { checkCorrectNetwork } from "@/components/RainbowKit";
import { TEST_NETWORK } from "@/constants";
import { pulsechain, sepolia } from "viem/chains";
import { StateType } from "../types";
import toast from "react-hot-toast";
import { errorToast } from "@/hooks/frontend/toast";

export default function ContributedHero({
  setState,
}: {
  setState: Dispatch<SetStateAction<StateType>>;
}) {
  const { openConnectModal } = useConnectModal();
  const account = useAccount();
  const { openChainModal } = useChainModal();

  const { data: era2Data } = useRestFetch(["s3"], `/s3?file=era2`, {
    proxy: true,
  });

  const ERA2_DATA: { accounts: string[]; points: string[]; nonces: string[] } =
    useMemo(() => {
      if (era2Data) {
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

  const addresses = useMemo(() => {
    return ERA2_DATA.accounts.filter(
      (address) => account?.address?.toLowerCase() === address.toLowerCase(),
    );
  }, [ERA2_DATA, account.address]);

  const points: string[] = useMemo(() => {
    return ERA2_DATA.points.filter(
      (_, index) =>
        account?.address?.toLowerCase() ===
        ERA2_DATA.accounts[index].toLowerCase(),
    );
  }, [ERA2_DATA, account.address]);

  const pointsToDisplay = useMemo(() => {
    if (account.address) {
      if (points.length) {
        const response = points.reduce((acc, point) => {
          const formattedPoint = formatUnits(BigInt(point), 18);
          return acc + Number(formattedPoint);
        }, 0);

        return response;
      }
      // const accountIndex = ERA2_DATA.accounts.findIndex(
      //   (x) => x.toLowerCase() === account.address?.toLowerCase(),
      // );

      // if (accountIndex > 0) {
      //   const foundPoints = ERA2_DATA.points[accountIndex];

      //   const formattedPoints = formatUnits(BigInt(foundPoints), 18);
      //   return Number(formattedPoints);
      // } else return 0;
    }

    return 30000;
  }, [account.address, era2Data]);

  const nonces = useMemo(() => {
    return ERA2_DATA.nonces.filter(
      (_, index) =>
        account?.address?.toLowerCase() ===
        ERA2_DATA.accounts[index].toLowerCase(),
    );
  }, [ERA2_DATA, account.address]);

  const proofs: string[][] = useMemo(() => {
    if (account.address && ERA2_DATA) {
      const addresses = ERA2_DATA.accounts.filter(
        (address) => account?.address?.toLowerCase() === address.toLowerCase(),
      );

      const points = ERA2_DATA.points.filter(
        (point, index) =>
          ERA2_DATA.accounts[index].toLowerCase() ===
          account.address?.toLowerCase(),
      );

      const nonces = ERA2_DATA.nonces.filter(
        (point, index) =>
          ERA2_DATA.accounts[index].toLowerCase() ===
          account.address?.toLowerCase(),
      );

      const response: string[][] = [];

      addresses.forEach((address, index) => {
        const proof = generateProof(address, points[index], nonces[index]);
        response.push(proof);
      });

      return response || [];
    }
    return [];
  }, [account.address, era2Data]);

  const DarkContract = useDarkContract();
  const DarkClaimContract = useDarkClaimContract();

  const { data: dark_MAX_SUPPLY } = useReadContract({
    address: DarkContract.address as `0x${string}`,
    abi: DarkContract.abi,
    functionName: "MAX_SUPPLY",
    chainId: TEST_NETWORK ? sepolia.id : pulsechain.id,
  });

  const { data: dark_total_points } = useReadContract({
    address: DarkClaimContract.address as `0x${string}`,
    abi: DarkClaimContract.abi,
    functionName: "totalPoints",
    chainId: TEST_NETWORK ? sepolia.id : pulsechain.id,
  });

  const darkTokens = useMemo(() => {
    if (points && dark_MAX_SUPPLY) {
      const MAX_SUPPLY = Number(formatUnits(dark_MAX_SUPPLY as bigint, 18));
      const total_points = Number(formatUnits(dark_total_points as bigint, 18));

      const darkRatio = MAX_SUPPLY / total_points;
      // (dark_MAX_SUPPLY as bigint) / (dark_total_points as bigint);
      const dark = darkRatio * pointsToDisplay * 0.1;
      return dark;
    }
    return 0;
  }, [points, dark_MAX_SUPPLY, dark_total_points]);

  const { claim, transactionLoading, darkBalance, receipt } = useClaim();

  const handleClaim = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (
      addresses.length > 0 &&
      addresses.length === points.length &&
      points.length === nonces.length &&
      nonces.length === proofs.length
    )
      claim(addresses, points, nonces, proofs);
    else {
      errorToast("Something went Wrong with verifying your data");
      console.log(
        "ErrorInfo: Something happened while generating the proofs for the user",
      );
    }
  };

  useEffect(() => {
    if (receipt) {
      setState("Claimed");
    }
  }, [receipt]);

  const { switchChain } = useSwitchChain();

  useEffect(() => {
    if ((darkBalance as bigint) > 0) {
      console.log("darkBalance", darkBalance);
      setState("Claimed");
    }
  }, [darkBalance]);

  return (
    <div className="relative flex flex-col justify-center items-center gap-[24px] mt-[50px] px-[16px] w-full md:w-fit max-w-full">
      <div className="flex flex-col justify-center items-center gap-[8px]">
        <H1 className="text-[64px] leading-[64px] md:text-[64px] md:leading-[64px]">
          Claim $DARK
        </H1>
        <P className="text-[14px] leading-[20.3px] mr-auto md:mx-auto">
          You can now get your $DARK tokens.
        </P>
      </div>
      <div className="flex flex-col justify-center items-center gap-[8px] w-full">
        <ContributedCard
          value={pointsToDisplay}
          pillText="Points"
          pillIconSrc={IMAGEKIT_ICONS.PILL_POINTS}
          pillIconAlt="points"
          animateNumber
          from={0}
          to={points}
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
          pillIconSrc={IMAGEKIT_ICONS.PILL_DARK_X_CLAIMED}
          pillIconAlt="dark x"
          animateNumber
          from={0}
          to={darkTokens}
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
        ) : checkCorrectNetwork(
            account.chainId,
            TEST_NETWORK ? [sepolia.id] : [pulsechain.id],
          ) ? (
          <Button
            innerText={transactionLoading ? "Claiming..." : "Claim Now"}
            loading={transactionLoading}
            disabled={pointsToDisplay === 0}
            iconSrc={IMAGEKIT_ICONS.CLAIM}
            iconAlt="Claim Now"
            onClick={handleClaim}
          />
        ) : (
          <Button
            innerText="Switch Network"
            iconSrc={IMAGEKIT_ICONS.ERROR}
            onClick={() => {
              if (TEST_NETWORK) {
                switchChain({ chainId: sepolia.id });
              } else {
                switchChain({ chainId: pulsechain.id });
              }
            }}
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
      </div>
    </div>
  );
}
