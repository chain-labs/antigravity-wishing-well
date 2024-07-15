import useDarkContract from "@/abi/Dark";
import useDarkClaimContract from "@/abi/DarkClaim";
import H1 from "@/components/HTML/H1";
import P from "@/components/HTML/P";
import useClaim from "@/hooks/sc-fns/useClaim";
import { useRestFetch } from "@/hooks/useRestClient";
import { useChainModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { useMemo } from "react";
import { formatUnits } from "viem";
import { useAccount, useReadContract } from "wagmi";
import ContributedCard from "./ContributedCard";
import { IMAGEKIT_ICONS } from "@/assets/imageKit";
import Button from "@/components/Button";
import useClaimMerkleTree from "@/hooks/sc-fns/useMerkleTree.claim";
import { checkCorrectNetwork } from "@/components/RainbowKit";

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
      const total_points = Number(formatUnits(dark_total_points as bigint, 18));

      const darkRatio = MAX_SUPPLY / total_points;
      // (dark_MAX_SUPPLY as bigint) / (dark_total_points as bigint);
      const dark = darkRatio * points * 0.1;

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

    setState("Claimed");
  };

  return (
    <div className="relative flex flex-col justify-center items-center gap-[24px] mt-[50px]">
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
          pillIconSrc={IMAGEKIT_ICONS.PILL_DARK_X_CLAIMED}
          pillIconAlt="dark x"
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
            innerText={transactionLoading ? "Claiming..." : "Claim Now"}
            loading={transactionLoading}
            disabled={points === 0}
            iconSrc={IMAGEKIT_ICONS.CLAIM}
            iconAlt="Claim Now"
            onClick={handleClaim}
          />
        ) : (
          <Button
            innerText="Switch Network"
            iconSrc={IMAGEKIT_ICONS.ERROR}
            onClick={openChainModal}
            iconAlt="network error"
            iconPosition="start"
          />
        )}
      </div>
    </div>
  );
}
