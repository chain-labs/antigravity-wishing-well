import { IMAGEKIT_ICONS } from "@/assets/imageKit";
import ContributedCard from "./ContributedCard";
import Button from "@/components/Button";
import H1 from "@/components/HTML/H1";
import P from "@/components/HTML/P";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import useMerkleTree from "@/hooks/sc-fns/useMerkleTree.claim";
import { CLAIM_LISTS } from "../../constants";
import { useMemo } from "react";
import { formatUnits } from "viem";
import useClaim from "@/hooks/sc-fns/useClaim";

function ContributedHero() {
  const { openConnectModal } = useConnectModal();
  const account = useAccount();

  const { generateProof } = useMerkleTree(
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

export default ContributedHero;
