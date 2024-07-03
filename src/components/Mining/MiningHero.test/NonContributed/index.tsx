import { IMAGEKIT_ICONS } from '@/assets/imageKit';
import Button from '@/components/Button';
import CountdownTimer from '@/components/CountdownTimer';
import useTimer from '@/hooks/frontend/useTimer';
import useMerkleTree from '@/hooks/sc-fns/useMerkleTree.mine';
import useMining from '@/hooks/sc-fns/useMining';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import NoNFTHero from './NoNFTHero';
import NFTHero from './NFTHero';
import MiningCalculator from './MiningCalculator';
import { IToken, StateType, TokenDropdownTypes } from '../../types';
import { ADDRESS_LIST, MULTIPLIER, TOKEN_OPTIONS } from '../../constants';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { errorToast } from '@/hooks/frontend/toast';

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
    NFTContainerRef.current.addEventListener('click', (e) => {
      // if e.currentTarget is not the NFTRef and button
      if (NFTRef.current && !NFTRef.current.contains(e.target as Node)) {
        setNFTHover(false);
      }
    });

    return () => {
      document.removeEventListener('click', () => {});
    };
  }, [NFTHover, NFTContainerRef, NFTRef]);

  useEffect(() => {
    document.body.style.overflow = NFTHover ? 'hidden' : 'auto';
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

  const { mineToken, transactionLoading, darkXBalance } = useMining(
    TOKEN_OPTIONS[selectedToken],
    value,
    proof.length > 0 ? MULTIPLIER * 2 : MULTIPLIER,
  );

  const handleMine = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!account.address) {
      errorToast('Wallet not Connected! Please connect wallet');
      return;
    }
    if (!proof) {
      errorToast('Something went Wrong! Please Try Again.');
      console.error('Proof not generated');
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
      {state !== 'Claiming' ? (
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
          innerText={transactionLoading ? 'Processing' : 'Mine Now'}
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
