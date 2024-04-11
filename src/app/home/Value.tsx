import Image from "next/image";
import ValueItem from "./ValueItem";
import IMAGEKIT from "./images";

const Value = () => {
  return (
    <div className="flex flex-col bg-agblack relative">

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
      <div className="max-w-screen-xl flex flex-row">
        <div className="p-24 relative z-10">
          <p className="font-sans text-[64px] font-black text-agwhite">
            The Value Of The Project
          </p>
          <div className="flex mt-12 flex-col gap-6">
            <div className="flex gap-6">
              <ValueItem
                imgSrc="/limited_supply.svg"
                imgText="limited_supply"
                itemTitle="limited supply / no inflation"
              />
              <ValueItem
                imgSrc="/limited_minting.svg"
                imgText="limited_minting"
                itemTitle="limited minting phases"
              />
            </div>
            <div className="flex gap-6">
              <ValueItem
                imgSrc="/yields_rewards.svg"
                imgText="yields_rewards"
                itemTitle="yield that rewards holders"
              />
              <ValueItem
                imgSrc="/giveaway_tokens.svg"
                imgText="giveaway_tokens"
                itemTitle="giveaways in liquid tokens"
              />
            </div>
            <div className="flex gap-6">
              <ValueItem
                imgSrc="/transfarrable_nft.svg"
                imgText="transfarrable_nft"
                itemTitle="Transferable nfts That have actual cash value"
              />
              <ValueItem
                imgSrc="/token_crisis.svg"
                imgText="token_crisis"
                itemTitle="Programmed Scarcity like you’ve never seen before"
              />
              <ValueItem
                imgSrc="/heart_nft.svg"
                imgText="heart_nft"
                itemTitle="nfts with a story and heart behind them"
              />
            </div>
          </div>
        </div>
        <div className="absolute top-0 w-1/2" style={{ right: '10%' }}>
          <div className="relative h-[1000px] w-full">
            <Image
              src={IMAGEKIT.ROCK_BIG}
              alt="big rock"
              fill
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Value;
