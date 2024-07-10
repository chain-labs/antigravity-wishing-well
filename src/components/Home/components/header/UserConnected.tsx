import { condenseAddress } from "@/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { PiWarningCircle } from "react-icons/pi";
import { Badge } from "../../../HTML/Badge";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRestPost } from "@/hooks/useRestClient";

export const UserConnected: React.FC = () => {
  const account = useAccount();
  const [badge, setBadge] = useState("");

  interface UserData {
    rank: string;
    antigravityTokenId: string; // Add the 'antigravityTokenId' property
    // Add other properties if necessary
  }

  const { data: userData, mutate: mutateUserData } = useRestPost<UserData>(
    ["user"],
    "/api/user",
  );

  const { data: NFTData, mutate: mutateNFTData } = useRestPost<any>(
    ["generate-nft"],
    "/api/generate-nft",
  );

  // useEffect(() => {
  //   fetch("http://3.90.153.171:3000/api/user", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       walletAddress: account.address?.toLowerCase(),
  //     }),
  //   }).then((res) =>
  //     res.json().then(async (data) => {
  //       setBadge(data.rank);
  //       fetch("http://3.90.153.171:3000/api/generate-nft", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           tokenId: data.antigravityTokenId,
  //           era: 2,
  //           blockchain: "base",
  //         }),
  //       }).then((res) =>
  //         res
  //           .json()
  //           .then(async (NFTdata) =>
  //             localStorage.setItem(
  //               "user-data",
  //               JSON.stringify({ ...data, nftURL: NFTdata.url }),
  //             ),
  //           ),
  //       );
  //     }),
  //   );
  // }, []);

  useEffect(() => {
    const userDataString = localStorage.getItem("user-data");
    if (userDataString) {
      const userData = JSON.parse(userDataString) as UserData;
      setBadge(userData?.rank as string);
    }
    if (account.isConnected) {
      mutateUserData({
        walletAddress: account.address?.toLowerCase(),
      });
    }
  }, [account.isConnected]);

  useEffect(() => {
    if (userData) {
      localStorage.setItem("user-data", JSON.stringify(userData));
      setBadge(userData?.rank as string);
      mutateNFTData({
        tokenId: userData.antigravityTokenId,
        era: 2,
        blockchain: "base",
      });
    }
  }, [userData]);

  useEffect(() => {
    if (NFTData) {
      localStorage.setItem(
        "user-data",
        JSON.stringify({ ...userData, nftURL: NFTData.url }),
      );
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
                        {badge}
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
