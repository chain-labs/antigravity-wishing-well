import { IMAGEKIT_IMAGES } from '@/assets/imageKit';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import NonContributed from './NonContributed';
import { StateType } from '../types';
import ContributedHero from './ContributedHero';

export default function MiningHero() {
  const [state, setState] = useState<StateType>('Mining');
  const [NFTHover, setNFTHover] = useState(false);
  const NFTRef = useRef<HTMLDivElement>(null);
  const NFTContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <div className="bg-gradient-to-b from-[#000] h-fit to-[#0000] overflow-hidden">
        <div className="flex flex-col justify-center items-center w-full h-[130vh] md:h-screen md:pt-[80px]">
          {state === 'Claiming' ? (
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
        {NFTHover && (
          <div
            ref={NFTContainerRef}
            className="fixed top-0 left-0 w-screen h-screen bg-gradient-to-b from-[#ffffff1f] to-[#ffffff1f] flex justify-center items-center z-10 backdrop-blur-sm"
          >
            <div ref={NFTRef}>
              <Image
                src={IMAGEKIT_IMAGES.NFT_RECEIPT}
                width={265}
                height={481}
                alt="NFT receipt"
                className="object-cover w-[250px] md:w-[290px]"
              />
            </div>
          </div>
        )}
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
