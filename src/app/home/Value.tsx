import Image from "next/image";
import ValueItem from "./ValueItem";
import IMAGEKIT from "./images";

const Value = () => {
  return (
    <div className="flex flex-col bg-agblack relative items-center">
      <div className="absolute top-0 left-0 w-screen h-[1000px] mix-blend-luminosity">
        <div className="relative h-full w-full -z-1">
          <Image
            src={IMAGEKIT.VALUE_BG}
            alt="value section background"
            className=""
            fill
          />
        </div>
      </div>
      <div className="px-10 py-24 z-10 w-3/4 max-w-[1280px]">
        <p className="font-sans text-[64px] font-black text-agwhite">
          The Value Of The Project
        </p>
        <div className="flex mt-12 flex-col gap-6">
          <div className="flex gap-6">
            <ValueItem
              imgSrc="https://ik.imagekit.io/xlvg9oc4k/Antigravity/limited_supply.svg"
              imgText="limited_supply"
              itemTitle="limited supply / no inflation"
            />
            <ValueItem
              imgSrc="https://ik.imagekit.io/xlvg9oc4k/Antigravity/limited_minting.svg"
              imgText="limited_minting"
              itemTitle="limited minting phases"
            />
          </div>
          <div className="flex gap-6">
            <ValueItem
              imgSrc="https://ik.imagekit.io/xlvg9oc4k/Antigravity/yields_rewards.svg"
              imgText="yields_rewards"
              itemTitle="yield that rewards holders"
            />
            <ValueItem
              imgSrc="https://ik.imagekit.io/xlvg9oc4k/Antigravity/giveaway_tokens.svg"
              imgText="giveaway_tokens"
              itemTitle="giveaways in liquid tokens"
            />
          </div>
          <div className="flex gap-6">
            <ValueItem
              imgSrc="https://ik.imagekit.io/xlvg9oc4k/Antigravity/transfarrable_nft.svg"
              imgText="transfarrable_nft"
              itemTitle="Transferable nfts That have actual cash value"
            />
            <ValueItem
              imgSrc="https://ik.imagekit.io/xlvg9oc4k/Antigravity/token_crisis.svg"
              imgText="token_crisis"
              itemTitle="Programmed Scarcity like you’ve never seen before"
            />
            <ValueItem
              imgSrc="https://ik.imagekit.io/xlvg9oc4k/Antigravity/heart_nft.svg"
              imgText="heart_nft"
              itemTitle="nfts with a story and heart behind them"
            />
          </div>
        </div>
      </div>
      <Image
        src={IMAGEKIT.ROCK_BIG}
        alt="big rock"
        width={700}
        height={700}
        quality={20}
        className="absolute top-1/2 -translate-y-1/2 right-0"
      />
    </div>
  );
};

export default Value;
