import ValueItem from "./ValueItem";

const Value = () => {
    return (
        <div className="flex flex-col">
            <div className='h-screen w-full'>
                <img
                    src="value.svg"
                    alt="values"
                    className="ih-full w-full object-cover"
                />
            </div>
            <div className="absolute p-24">
                <p className="text-6xl font-black font-sans capitalize">
                    The value of the project
                </p>
                <div className="flex mt-12 flex-col">
                    <div className="flex">
                        <ValueItem imgSrc="limited_supply.svg" imgText="limited_supply" itemTitle="limited supply /no inflation" />
                        <ValueItem imgSrc="limited_minting.svg" imgText="limited_minting" itemTitle="limited minting phases" />
                    </div>
                    <div className="flex">
                        <ValueItem imgSrc="yields_rewards.svg" imgText="yields_rewards" itemTitle="yield that rewards holders" />
                        <ValueItem imgSrc="giveaway_tokens.svg" imgText="giveaway_tokens" itemTitle="giveaways in liquid tokens" />
                    </div>
                    <div className="flex">
                        <ValueItem imgSrc="transfarrable_nft.svg" imgText="transfarrable_nft" itemTitle="Transferable nfts That have actual cash value" />
                        <ValueItem imgSrc="token_crisis.svg" imgText="token_crisis" itemTitle="Programmed Scarcity like you’ve never seen before" />
                        <ValueItem imgSrc="heart_nft.svg" imgText="heart_nft" itemTitle="nfts with a story and heart behind them" />
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Value;