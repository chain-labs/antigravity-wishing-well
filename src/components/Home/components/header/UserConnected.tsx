import { condenseAddress } from "@/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { PiWarningCircle } from "react-icons/pi";
import { Badge } from "../../../HTML/Badge";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRestPost } from "@/hooks/useRestClient";
import useUserData from "@/app/(client)/store";
import { TEST_NETWORK } from "@/constants";
import { base, baseSepolia, pulsechain, sepolia } from "viem/chains";
export interface UserData {
  rank: string;
  walletAddress: string; // Add the 'walletAddress' property
  nftURL: string; // Add the 'nftURL' property
  wishwellPoints: number; // Add the 'wishwellPoints' property
  miningPoints: number; // Add the 'miningPoints' property
  totalPoints: number;
  wishwellPulsechainTokenId: string;
  wishwellBaseTokenId: string;
  antigravityBaseTokenId: string;
  antigravityPulsechainTokenId: string;
  // Add other properties if necessary
}

export const UserConnected: React.FC = () => {
  const account = useAccount();
  const { mutation: storeUserData, rank } = useUserData();
  const [tokenId, setTokenId] = useState(0);

  const { data: userData, mutate: mutateUserData } = useRestPost<UserData>(
    ["user"],
    "/api/user",
  );

  const { data: NFTData, mutate: mutateNFTData } = useRestPost<any>(
    ["generate-nft"],
    "/api/generate-nft",
  );

  useEffect(() => {
    if (account.isConnected) {
      mutateUserData({
        walletAddress: account.address?.toLowerCase(),
      });
    }
  }, [account.isConnected]);

  useEffect(() => {
    if (userData) {
      storeUserData({
        walletAddress: userData.walletAddress,
        rank: userData.rank,
        wishwellPulsechainTokenId: userData.wishwellPulsechainTokenId,
        wishwellBaseTokenId: userData.wishwellBaseTokenId,
        antigravityBaseTokenId: userData.antigravityBaseTokenId,
        antigravityPulsechainTokenId: userData.antigravityPulsechainTokenId,
        wishwellPoints: userData.wishwellPoints,
        miningPoints: userData.miningPoints,
        totalPoints: userData.totalPoints,
      });
      let tokenId = "0";
      let blockchain = "pulsechain";

      if (TEST_NETWORK) {
        if (account.chainId === sepolia.id) {
          tokenId = userData.antigravityPulsechainTokenId;
          blockchain = "pulsechain";
        } else if (account.chainId === baseSepolia.id) {
          tokenId = userData.antigravityBaseTokenId;
          blockchain = "base";
        }
      } else {
        if (account.chainId === pulsechain.id) {
          tokenId = userData.antigravityPulsechainTokenId;
          blockchain = "pulsechain";
        } else if (account.chainId === base.id) {
          tokenId = userData.antigravityBaseTokenId;
          blockchain = "base";
        }
      }
      mutateNFTData({
        tokenId: Number(tokenId),
        era: 2,
        blockchain,
      });
    }
  }, [userData]);

  useEffect(() => {
    if (NFTData) {
      storeUserData({
        nftURL: NFTData.url,
      });
    }
  }, [NFTData]);

  return (
    <div className="flex text-lg">
      <ConnectButton.Custom>
        {({ chain, openChainModal, mounted, openAccountModal }) => {
          if (chain && chain.unsupported) {
            return (
              <div>
                <div
                  className="flex text-red-400 w-full h-full bg-agblack gap-2 items-center rounded-lg cursor-pointer focus:outline-none peer"
                  onClick={openChainModal}
                >
                  <PiWarningCircle className="text-brred w-8 h-8" />
                  <p className="uppercase font-extrabold text-brred bg-clip-text z-[100]">
                    {condenseAddress(`${account.address}`)}
                  </p>
                </div>
                <div className="peer-hover:flex hidden absolute bg-brred -bottom-8 z-10 rounded font-normal text-base px-8">
                  Wrong network
                </div>
              </div>
            );
          } else if (chain) {
            // if (currentChain !== "" && currentChain != chain.name)
            //   location.reload();
            // setCurrentChain(chain.name as string);
            return (
              <div className="flex w-full h-full bg-agblack gap-2 items-center rounded-lg cursor-pointer focus:outline-none">
                {chain.hasIcon ? (
                  <>
                    <img
                      src={chain.iconUrl ?? ""}
                      alt={chain.name ?? ""}
                      className="w-[40px] h-[40px] rounded-full aspect-square"
                      onClick={openChainModal}
                    />
                    <p
                      className="flex flex-col justify-start items-start gap-0 text-[16px] leading-[16px] uppercase bg-gradient-to-b font-extrabold from-[#B4EBF8] to-[#789DFA] text-transparent bg-clip-text"
                      onClick={openAccountModal}
                    >
                      {condenseAddress(`${account.address}`)}
                      <Badge className="text-agwhite border-agwhite pb-[4px] opacity-[66%]">
                        {rank}
                      </Badge>
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
