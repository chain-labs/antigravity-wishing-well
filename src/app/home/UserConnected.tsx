import { condenseAddress } from "@/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { PiWarningCircle } from "react-icons/pi";

export const UserConnected: React.FC = () => {
  const account = useAccount();
  return (
    <div className="flex text-lg">
      <ConnectButton.Custom>
        {({ chain, openChainModal, mounted }) => {
          if (chain && chain.unsupported) {
            return (
              <div
                onClick={openChainModal}
                className="flex text-red-400 w-full h-full bg-agblack gap-1 sm:gap-4 items-center px-2 sm:px-4 rounded-lg cursor-pointer focus:outline-none"
              >
                <PiWarningCircle className="text-brred w-8 h-8" />
                <p className="uppercase bg-gradient-to-b font-extrabold text-brred text-transparent bg-clip-text text-lg">
                  {condenseAddress(`${account.address}`)}
                </p>
              </div>
            );
          } else if (chain) {
            // if (currentChain !== "" && currentChain != chain.name)
            //   location.reload();
            // setCurrentChain(chain.name as string);
            return (
              <div
                className="flex w-full h-full bg-agblack gap-2 items-center rounded-lg cursor-pointer focus:outline-none"
                onClick={openChainModal}
              >
                {chain.hasIcon ? (
                  <>
                    <img
                      src={chain.iconUrl}
                      alt={chain.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <p className="uppercase bg-gradient-to-b font-extrabold from-[#B4EBF8] to-[#789DFA] text-transparent bg-clip-text">
                      {condenseAddress(`${account.address}`)}
                    </p>
                  </>
                ) : null}
              </div>
            );
          }
        }}
      </ConnectButton.Custom>
    </div>
  );
};
