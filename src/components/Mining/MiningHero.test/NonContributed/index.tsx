import { IMAGEKIT_ICONS } from "@/assets/imageKit";
import Button from "@/components/Button";
import CountdownTimer from "@/components/CountdownTimer";
import useTimer from "@/hooks/frontend/useTimer";
import useMerkleTree from "@/hooks/sc-fns/useMerkleTree";
import useMining from "@/hooks/sc-fns/useMining";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";
import NoNFTHero from "./NoNFTHero";
import NFTHero from "./NFTHero";
import MiningCalculator from "./MiningCalculator";
import { IToken, StateType, TokenDropdownTypes } from "../../types";
import { ADDRESS_LIST, TOKEN_OPTIONS } from "../../constants";
import { useConnectModal } from "@rainbow-me/rainbowkit";

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
  const [value, setValue] = useState(0);
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

  const { root, generateProof } = useMerkleTree(ADDRESS_LIST);

  const proof = useMemo(() => {
    if (account.address) {
      const address = account.address;

      return generateProof(address as `0x${string}`);
    } else return [];
  }, [account.address]);

  const { mineToken, transactionLoading } = useMining(
    TOKEN_OPTIONS[selectedToken],
    value
  );

  const handleMine = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!account.address) {
      // TODO error toast here
      console.log("Wallet not connected");
      return;
    }
    if (!proof) {
      // TODO error toast here
      console.log("Proof not generated");
      return;
    }

    if (account.address && proof) {
      await mineToken(proof);
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center gap-[8px] mt-[50px]">
      {
        {
          "No NFT": <NoNFTHero />,
          "NFT Present": (
            <NFTHero NFTHover={NFTHover} setNFTHover={setNFTHover} />
          ),
          Claiming: <></>,
        }[state]
      }
      <MiningCalculator
        value={value}
        setValue={setValue}
        conversionRateToUSD={0.245}
        era={2}
        phase={1}
        multiplyer={33}
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

export default NonContributed;
