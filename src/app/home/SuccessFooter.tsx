const coinsList = [
  {
    name: "PLS",
    icon: "https://ik.imagekit.io/chainlabs/Antigravity%20-%20Updated/Icon-PLS_CEl42i3W_l.svg?updatedAt=1715260695705",
  },
  {
    name: "ETH",
    icon: "https://ik.imagekit.io/chainlabs/Antigravity%20-%20Updated/Icon-ETH_VCErsaeU-.svg?updatedAt=1715260695756",
  },
  {
    name: "Tether",
    icon: "https://ik.imagekit.io/chainlabs/Antigravity%20-%20Updated/Icon-USDT_Ysey8wxZq.svg?updatedAt=1715260695874",
  },
  {
    name: "USDC",
    icon: "https://ik.imagekit.io/chainlabs/Antigravity%20-%20Updated/Icon-USDC_-I87G5gii.svg?updatedAt=1715260695785",
  },
];

interface SuccessFooterProps {
  isSuccess: boolean;
}

const SuccessFooter = ({ isSuccess }: SuccessFooterProps) => {
  return (
    <div className="flex w-full">
      <div className="h-auto w-full">
        <img src={""} alt="reg_footer" className="h-full w-full object-cover" />
      </div>
      <div className="absolute flex p-44 w-full justify-between flex-col">
        {isSuccess && (
          <div className="flex justify-between">
            <div className="flex flex-col">
              <p className="font-black font-sans text-5xl text-agyellow mb-2 text-nowrap">
                Get {process.env.NEXT_PUBLIC_MULTIPLIER}x Points Now!
              </p>
              <button className="flex items-center justify-center font-sans font-extrabold rounded-lg bg-blue px-5 py-2 lg:px-6 lg:py-4 mb-2 lg:mr-4">
                <p className="uppercase">wishwell.base</p>{" "}
                <img
                  src="https://ik.imagekit.io/chainlabs/Antigravity%20-%20Updated/Icon-ETH_VCErsaeU-.svg?updatedAt=1715260695756"
                  className="w-4 h-4 ml-2"
                  alt="share"
                />
              </button>
              <button className="flex items-center justify-center font-sans font-extrabold rounded-lg bg-blue px-5 py-2 lg:px-6 lg:py-4 mb-2 lg:mr-4">
                <p className="uppercase">wishwell.PLS</p>{" "}
                <img
                  src="https://ik.imagekit.io/chainlabs/Antigravity%20-%20Updated/Icon-PLS_CEl42i3W_l.svg?updatedAt=1715260695705"
                  className="w-4 h-4 ml-2"
                  alt="share"
                />
              </button>
            </div>
            <div className="flex flex-col mt-3">
              <div className="flex">
                {coinsList.map((coin) => {
                  return (
                    <div className="w-[48px] h-[48px]">
                      <img src={coin.icon} alt={coin.name} />
                    </div>
                  );
                })}
              </div>
              <p className="text-balance w-[400px]">
                As you contribute more, your ERC-721 NFT above will uniquely
                update with future contributions.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuccessFooter;
