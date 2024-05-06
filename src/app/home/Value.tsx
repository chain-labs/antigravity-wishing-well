import Image from "next/image";
import ValueItem from "./ValueItem";
import IMAGEKIT from "./images";

const Value = () => {
  return (
    <div className="flex flex-col sm:max-h-screen bg-agblack relative items-center overflow-hidden">
      <div className="absolute top-0 left-0 w-screen h-full mix-blend-luminosity">
        <div className="relative h-full w-full -z-1">
          <Image
            src={IMAGEKIT.VALUE_BG}
            className="object-value-bg object-cover"
            alt="value section background"
            fill
          />
        </div>
      </div>
      <div className="px-10 py-16 z-10 w-full gap-12 flex flex-col sm:w-3/4 sm:max-w-[1280px]">
        <p className="font-sans text-5xl sm:text-[64px] font-black text-agwhite">
          The Value Of The Project
        </p>
        <div className="flex flex-col gap-6">
          <div className="grid sm:grid-cols-2 w-full sm:w-fit gap-6">
            <div>
              <ValueItem
                imgSrc="https://ik.imagekit.io/xlvg9oc4k/Antigravity/limited_supply.svg"
                imgText="limited_supply"
                itemTitle="limited supply / no inflation"
              />
            </div>
            <div>
              <ValueItem
                imgSrc="https://ik.imagekit.io/xlvg9oc4k/Antigravity/limited_minting.svg"
                imgText="limited_minting"
                itemTitle="limited minting phases"
              />
            </div>
            <div>
              <ValueItem
                imgSrc="https://ik.imagekit.io/xlvg9oc4k/Antigravity/yields_rewards.svg"
                imgText="yields_rewards"
                itemTitle="yield that rewards holders"
              />
            </div>
            <div>
              <ValueItem
                imgSrc="https://ik.imagekit.io/xlvg9oc4k/Antigravity/giveaway_tokens.svg"
                imgText="giveaway_tokens"
                itemTitle="giveaways in liquid tokens"
              />
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-3 w-full sm:w-fit ">
            <div>
              <ValueItem
                imgSrc="https://ik.imagekit.io/xlvg9oc4k/Antigravity/transfarrable_nft.svg"
                imgText="transfarrable_nft"
                itemTitle="Transferable nfts That have actual cash value"
              />
            </div>
            <div>
              <ValueItem
                imgSrc="https://ik.imagekit.io/xlvg9oc4k/Antigravity/token_crisis.svg"
                imgText="token_crisis"
                itemTitle="Programmed Scarcity like you’ve never seen before"
              />
            </div>
            <div>
              <ValueItem
                imgSrc="https://ik.imagekit.io/xlvg9oc4k/Antigravity/heart_nft.svg"
                imgText="heart_nft"
                itemTitle="nfts with a story and heart behind them"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[800px] w-[800px] sm:h-[700px] sm:w-[700px] absolute bottom-0 sm:-bottom-28 sm:-right-28">
        <Image src={IMAGEKIT.ROCK_BIG} alt="big rock" fill quality={20} />
      </div>
    </div>
  );
};

export default Value;
