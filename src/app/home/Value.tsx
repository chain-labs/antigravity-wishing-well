import Image from "next/image";
import ValueItem from "./ValueItem";

const Value = () => {
  return (
    <div className="flex flex-col bg-cover">
      <div className="p-24 bg-value bg-cover bg-blend-screen">
        <p className="font-sans text-[64px] font-black text-agwhite">
          The Value Of The Project
        </p>
        <div className="flex mt-12 flex-col">
          <div className="flex">
            <ValueItem
              imgSrc="limited_supply.svg"
              imgText="limited_supply"
              itemTitle="limited supply / no inflation"
            />
            <ValueItem
              imgSrc="limited_minting.svg"
              imgText="limited_minting"
              itemTitle="limited minting phases"
            />
          </div>
          <div className="flex">
            <ValueItem
              imgSrc="yields_rewards.svg"
              imgText="yields_rewards"
              itemTitle="yield that rewards holders"
            />
            <ValueItem
              imgSrc="giveaway_tokens.svg"
              imgText="giveaway_tokens"
              itemTitle="giveaways in liquid tokens"
            />
          </div>
          <div className="flex">
            <ValueItem
              imgSrc="transfarrable_nft.svg"
              imgText="transfarrable_nft"
              itemTitle="Transferable nfts That have actual cash value"
            />
            <ValueItem
              imgSrc="token_crisis.svg"
              imgText="token_crisis"
              itemTitle="Programmed Scarcity like you’ve never seen before"
            />
            <ValueItem
              imgSrc="heart_nft.svg"
              imgText="heart_nft"
              itemTitle="nfts with a story and heart behind them"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Value;
